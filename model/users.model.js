const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        default:""
    },
    userName:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    }
},{
    timestamps:true
})

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;
