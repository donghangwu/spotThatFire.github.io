const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({

    lat:{
        type:String,
        required:true
    },
    lng:{
       type:String,
       required:true 
    },
    temp:{
        type:String,
        required:true
    },
    humidity:{
        type:String,
        required:true
    },
   date:{
        type: Date,
        default:Date.now
   }
    

})

module.exports = mongoose.model('data',dataSchema);