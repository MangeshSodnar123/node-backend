require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const userRoutes = require('./routes/users.routes');
const discussionRoutes = require('./routes/discussion.routes');
const app = express();
const DB_URI = 'mongodb://127.0.0.1:27017';

mongoose.connect(`${DB_URI}`).then(()=>{
    console.log("MongoDb database connected...")

    app.listen(8082,()=>{
        console.log("Server Listening at PORT 8082");
    })
}).catch((e)=>{
    console.log("Failed to connect to db: ",e);
}) 

//middleware to extract json from request body.
app.use(express.json());
//routing 
app.use('/user',userRoutes);

app.use('/discussion', discussionRoutes);
  
