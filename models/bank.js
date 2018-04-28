var mongoose = require("mongoose");
 
var bankSchema = new mongoose.Schema({
   ifsc: String,
   bank_id: Number,
   branch: String,
   address: String,
   city: String,
   district: String,
   state: String,
   bank_name: String
});
 
module.exports = mongoose.model("Bank", bankSchema);


