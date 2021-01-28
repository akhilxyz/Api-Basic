
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,

  name:{ type: String, required: [true,"Company Name is Required"] },

  vat:{ type:String, required: [true,"Company Va No. is Required"]},

  phone:{ type:Number, default:null},

  website:{ type:String, default:null},

  address:{ type: String, required: [true,"Company Address is Required"] },

  service:{ type: Array, required: [true,"Service Name is Required "] },

  created_on: {type: Date, default: Date.now},

  modified_on: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Company', Schema)
