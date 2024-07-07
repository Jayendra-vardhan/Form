const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://jayendravardhan:YI5svAZd08hCBtEp@stantox-form.uqx2ymw.mongodb.net/Form', {});
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
