const mongoose = require('mongoose');
const Counter = require('./models/counter');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://jayendravardhan:YI5svAZd08hCBtEp@stantox-form.uqx2ymw.mongodb.net/Form', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    const recordCounter = await Counter.findOne({ id: 'recordId' });
    if (!recordCounter) {
      await new Counter({ id: 'recordId', seq: 0 }).save();
      console.log('Counter initialized');
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
