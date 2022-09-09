
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    taskName : String,
    category:String,
    taskTime:String
    
})


module.exports = mongoose.model("tasklists",userSchema);

