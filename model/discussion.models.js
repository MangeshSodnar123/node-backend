const mongoose = require('mongoose');



const commentSchema = new mongoose.Schema({
    author:{
        type:String,
        required:true,
        immutable:true
    },
    content:{
        type:String,
        required:true,
        maxLength:500
    }
},{
    timestamps:true
})

const discussionSchema = new mongoose.Schema({
    title:{
        type:String,
        maxLength:150,
        required:true
    },
    author:{
        type:String,
        required:true,
        immutable:true
    },
    content:{
        type:String,
        default:""
    },
    comments:{
        type:[commentSchema],
        default:[]
    }
},{
    timestamps:true
})

const Discussions = mongoose.model('Discussions',discussionSchema);
const Comments = mongoose.model('Comments', commentSchema)

module.exports = {
    Discussions,
    Comments
}
