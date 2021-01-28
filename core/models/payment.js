const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Company:{ type: String, required: [true,"Company Name is Required"] },
  Services	:{ type: String, required: [true,"Company Name is Required"]  },
  Account:{ type: Number, required: [true,"Account is Required"] },
  BillAmount:{ type: Number, required: [true,"Bill Amount is Required"] },
  Duration:{type: Date, required: [true,"Duration is Required"] },
  created_on: {type: Date, default: Date.now},
  modified_on: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Payment', Schema)