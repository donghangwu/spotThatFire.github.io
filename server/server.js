const express = require('express');
const mongoose = require('mongoose');

//load env variable from .env file
require('dotenv').config();

//connect to mongodb
const connectMongo=async()=>
{
        const conn= await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false
       });
       console.log('successfully connect to mongoDB',conn.connection.host);
}

connectMongo();
const app = express();
app.use(express.json());
app.get('/',(req,res)=>{res.send('home page mother fuckers!!!')})
//route: /data
const dataRoute = require('./route/dataRoute');
app.use('/data',dataRoute);

const PORT= process.env.PORT||3000;
app.listen(PORT,()=>{console.log('Server started at ',PORT)})