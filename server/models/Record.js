const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  postingYear: { type: Number, required: true },
  postingMonth: { type: String, required: true },
  actionType: { type: String, required: true },
  actionName: { type: String, required: true },
  status: { type: String, required: true },
  Impact: { type: String, required: true }
});

const Record = mongoose.model('Record', RecordSchema);
module.exports = Record;
