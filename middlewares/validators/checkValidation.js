const checkValidation = (req, res, next)=>{
    const header = req.headers;
    const x_api_key = header.x_api_key;

    //check if x-api-key is present or not
    if(!x_api_key){
        return res.status(500).json({message:'x-api-key is not present'});
    }

    //if x-api-key is present then check if it's matching or not
    if(process.env.x_api_key!==x_api_key){
        return res.status(403).json({message: 'Unauthorised Access'});
    } 
 
    next();
}

module.exports = checkValidation;
