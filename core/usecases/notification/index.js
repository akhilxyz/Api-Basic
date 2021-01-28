//import model
const model = require("../../models/notification");
const mongoose = require("mongoose");

const add = async (data) => {
  data._id = new mongoose.Types.ObjectId();
  return (await new model(data).save()).toObject();  
}

const get = async (filters) => {
  return await model.find(filters).exec()
}

const update = async (id,data) => {
  let updateResponse = await model.updateOne( {_id:id},{ $set: data }).exec() 
 if(updateResponse.ok == 1){
  return {Message:"Service Updated"}    
  }
 else{
     return {Error: "Something went wrong!!!"}
 }
}

const remove = async (notificationId) => {
  let deleteResponse = await model.deleteOne({ _id: notificationId }).exec() 
 if(deleteResponse.ok == 1){
  return true;
 }
 else{
     return false;
 }
}

module.exports = {
  get,
  update,
  remove,
  add,
}