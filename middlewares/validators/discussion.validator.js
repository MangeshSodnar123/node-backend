const Joi = require('joi');
const {Discussions} = require('../../models/discussion.model');
const Users = require('../../models/users.model');

const discussionSchema = Joi.object().keys({
    title:Joi.string().max(150).required(),
    author:Joi.string().required(),
    content:Joi.string().default("")
})


const getQueryErrors = (data)=>{
    const result = discussionSchema.validate(data);
    return result.error;
}

const validateDiscussion = (req, res, next)=>{
    const {title,author,content} = req.body;

    const error = getQueryErrors({title,author,content});

    if(error){
        res.status(422).json(error);
    }

    next();
}

const fetchUserInCollection =async (req, res, next)=>{
    const user = await Users.findOne({userName:req.body.author});

    if(!user){
        return res.status(404).json({message:'user not found'});
    } 
    // return user;
    next();
}

const verifyAuthor = async (req, res, next)=>{
    try{
        const discussion = await Discussions.findOne({_id: req.params.id});

        if(!discussion || discussion.length===0){
            return res.status(404).json({ message: 'Discussion not found' });
        }
        else if(discussion.author!==req.body.author){
            
            return res.status(403).json({ message: 'Unauthorized Access' });
        }
    }
    catch(error){
            return res.status(500).json({ message: 'Unable to verify author' });
    }

    next();
}


const fetchDiscussion = async(req, res, next)=>{

    try{ 
        console.log(req.params.id)
        const discussion = await Discussions.findById(req.params.id);
        console.log(discussion)
        if(!discussion || discussion.length===0){
            return res.status(404).json({message: 'discussion not found', discussionId: id});
        }
    }
    catch(error){
        return res.status(500).json({message:'Unable to verify discussion', error:error.message});
    }

    next();
}

//code to validate comment schema

const commentSchema = Joi.object().keys({
    author:Joi.string().required(),
    content:Joi.string().required().max(500)
})

const validateCommentQuery = (data)=>{
    const result = commentSchema.validate(data);

    return result.error;
}

const validateComment = async (req, res, next)=>{
    try{
        const data = req.body;
        const error = validateCommentQuery(data);

        if(error){
            // return res.status(422).json(error);
            return res.status(422).json({message:error.message});
        }
    }
    catch(error){
        return res.status(500).json({message:'Unable to validate comment'});
    }

    next();
}


module.exports = {
    validateDiscussion,
    verifyAuthor,
    fetchUserInCollection,
    fetchDiscussion,
    validateComment 
}
