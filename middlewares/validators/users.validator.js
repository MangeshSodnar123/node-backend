const Joi = require('joi');

const userValidationSchema  = Joi.object().keys({
    fullName:Joi.string().max(50).default(""),
    userName:Joi.string().max(25).required(),
    email:Joi.string().email().required()
})
 
const validateUser = (data)=>{
    const result = userValidationSchema.validate(data);
    return result.error;
}

const validatePostUserQuery = (req, res, next)=>{
    const fullName = req.body.fullName;
    const userName = req.body.userName;
    const email = req.body.email;

    const error = validateUser({fullName,userName,email});

    if(error){
        res.status(500).json(error);
    }

    next();
}

module.exports = {
    validatePostUserQuery
}
