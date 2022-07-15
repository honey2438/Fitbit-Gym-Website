const mongoose=require("mongoose");

const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    city: String,
    mobileNo: String,
  });
  
  const contact = mongoose.model("contact", contactSchema);
  module.exports = contact;