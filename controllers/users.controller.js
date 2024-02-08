const Users = require('../models/users.model');

const registerUser = async(req, res)=>{
    try{

        const {userName,email} = req.body;
        const existingUser = await Users.findOne({ $or: [{ userName }, { email }] });

        console.log(existingUser);
        if (existingUser) {
        return res.status(409).json({
            message: 'Failed to create new user',
            reason: 'Already Exists in DB'
        });
        }

        const newUser = new Users({
            ...req.body
        })
        console.log(newUser);
        const result = await newUser.save();
        
        return res.json(result);
    }catch(error){
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

//function to get all users
const getAllUsers = async (req,res)=>{
    try{
        const users = await Users.find({});
        if(!users){
            return res.status(404).json({message: 'No Users found'});
        }
        console.log(users);
        res.json(users);
    }catch(error){
        console.log(error);
    }
}

const getUserByUserName = async (req, res)=>{
    try{

        const userName = req.params.username;
        const user = await Users.findOne({userName});
        if(user){
            return res.json(user);
        }else{
            return res.status(404).json({ message: `User not found!, ${userName}` })
        }
    }catch(error){
        return res.status(500);    
    }

}


module.exports = {
    registerUser,
    getAllUsers,
    getUserByUserName
} 
