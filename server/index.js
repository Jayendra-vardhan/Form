const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./database');
const Record = require('./models/Record');
const Counter = require('./models/counter');

const app = express();
app.use(cors({
  origin: ["http://localhost:3000","https://form-clientservice.vercel.app/"], 
  methods: ["POST", "GET", "PUT", "DELETE", "UPDATE"],
  credentials: true,
}));
app.use(bodyParser.json());

connectDB();

const getNextSequenceValue = async (sequenceName) => {
  try {
    const sequenceDocument = await Counter.findOneAndUpdate(
      { id: sequenceName },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    return sequenceDocument.seq;
  } catch (err) {
    console.error(`Error getting next sequence value: ${err.message}`);
    throw err;
  }
};

app.get('/records', async (req, res) => {
  try {
    const records = await Record.find().sort({ id: -1 });
    res.json(records);
  } catch (err) {
    console.error(`Error fetching records: ${err.message}`);
    res.status(500).send(`Error fetching records: ${err.message}`);
  }
});

app.post('/records', async (req, res) => {
  const body = req.body;
  const postingYear = new Date().getFullYear();
  const postingMonth = new Date().toLocaleString('default', { month: 'long' });

  try {
    const id = await getNextSequenceValue('recordId');
    const newRecord = new Record({
      id: id,
      quantity: body.quantity,
      amount: body.amount,
      postingYear: postingYear,
      postingMonth: postingMonth,
      actionType: body.actionType,
      actionName: body.actionName,
      status: body.status,
      Impact: body.Impact
    });
    const record = await newRecord.save();
    res.status(201).json(record);
    console.log(record)
  } catch (err) {
    console.error(`Error creating record: ${err.message}`);
    res.status(500).send(`Error creating record: ${err.message}`);
  }
});

app.put('/records/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity, amount, postingYear, postingMonth, actionType, actionName, status, Impact } = req.body;

  try {
    const updatedRecord = await Record.findOneAndUpdate(
      { id: id },
      { quantity, amount, postingYear, postingMonth, actionType, actionName, status, Impact, timestamp: Date.now() },
      { new: true }
    );
    res.status(200).json(updatedRecord);
  } catch (err) {
    console.error(`Error updating record: ${err.message}`);
    res.status(500).send(`Error updating record: ${err.message}`);
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
