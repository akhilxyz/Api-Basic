const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:{ type: String, required: [true,"Service Name is Required"] },
  description:{ type: String, default: null },
  price:{ type: Number, required: [true,"Service Price is Required"] },
  created_on: {type: Date, default: Date.now},
  modified_on: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Service', Schema)