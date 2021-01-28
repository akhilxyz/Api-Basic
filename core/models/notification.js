const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  company:{ type: Array, required: [true,"Company Name is Required"] },
  services:{ type: Array, required: [true,"Service Name is Required"] },
  expiry:{ type: Date, required: [true,"Expiry date is Required"] },
  email:{ type: String, required: [true,"Email is Required"] },
  renew:{ type: Date, required: [true,"Renew date is Required"] },
  message:{ type: String, required: [true,"Renew date is Required"]},
  created_on: {type: Date, default: Date.now},
  modified_on: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Notification', Schema)


