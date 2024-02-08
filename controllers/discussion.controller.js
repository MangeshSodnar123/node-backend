const {Discussions,Comments} = require('../models/discussion.model');


const createNewDiscussion = async (req, res)=>{
    try{
        const newDiscussion = new Discussions({...req.body});
        const result = await newDiscussion.save();
        return res.json(result);

    }catch(error){
        return res.json({message:`${error}`});
    }
} 


const getAllDiscussions = async (req, res)=>{
    try{

        const discussions = await Discussions.find({});

        if(!discussions){
            return res.status(404).json({message:'No Discussions found'});
        }

        return res.json(discussions);

    }catch(error){
        return res.status(500).json({message:'Internal server error.'});

    }
}


const getDiscussionByUserName = async (req, res)=>{
    try{
        const username = req.params.username;
        const user = await fetchUserInCollection(username);
        if(!user){
            return res.status(404).json({message:'User is not found', username});
        }

        const discussions = await Discussions.find({author:username});
        console.log(discussions);
        if(discussions.length === 0){
            return res.status(404).json({ message:'No discussions found for this user', username });
            
        }
        return res.json(discussions);
        
        
    }catch(error){
        return res.status(404).json({ message:'No discussions found for this user', username, error });
    }
}

const getDiscussionById = async(req, res)=>{
    try{
        // console.log(req.params.id)
        const discussion = await Discussions.find({_id:req.params.id});
        if(discussion.length===0 || !discussion){
            return res.status(404).json({ message: "No discussions found with this id", discussionId: id })
        }
        return res.json(discussion);

    }catch(error){
        // console.log(error);
        return res.status(500).json({message:error.message});
    }
}

const deleteDiscussionByUserAndId = async (req, res) => {
    try {
        const result = await Discussions.findOneAndRemove({
            author: req.body.author,
            _id: req.params.id
        });

        return res.json(result);
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateDiscussionByUserAndId = async (req, res) => {
    try {

        const result = await Discussions.findOneAndUpdate({
            author: req.body.author,
            _id: req.params.id
        },{
            ...req.body
        },{
            new:true
        });

        return res.json(result);

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


const putCommentOnDiscussion = async(req, res)=>{

    try{
        const newComment = new Comments({
            ...req.body
        })

        const result = await newComment.save();

        const updatedDiscussion = await Discussions.findOneAndUpdate({
            _id:req.params.id
        },{
            $push:{comments:newComment}
        },{
            new:true
        })

        return res.json(updatedDiscussion)


    }
    catch(error){
        return res.status(500).json({message:'Internal server error'})
    }
}




module.exports = {
    createNewDiscussion,
    getAllDiscussions,
    getDiscussionByUserName,
    getDiscussionById,
    deleteDiscussionByUserAndId,
    updateDiscussionByUserAndId,
    putCommentOnDiscussion
}
