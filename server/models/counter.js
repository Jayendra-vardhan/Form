const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('Counter', CounterSchema);
