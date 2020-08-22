const express = require('express');
const router = express.Router();
const Data = require('../models/data')
//Getting all 
router.get('/', async(req,res)=>{
    try {
        const allData = await Data.find();
        res.json(allData);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})


//Getting one
router.get('/:id',async(req,res)=>{
    try {
        const data = await Data.findById(req.params.id);
        if(data==null)
        {
            return res.status(404).json({message:"cannot find the locations"})

        }
        res.json(data);
    } catch (error) {
        return res.status(404).json({message:"cannot find the locations"})
    }
   

})
//Creating one
router.post('/', async(req,res)=>{
    try {
        await Data.create(req.body);
    } catch (error) {
        console.log('post error:',error)
    }

})
//Updating one
router.put('/:id',async(req,res)=>{
    try {
        const data = await Data.findById(req.params.id);
        if(data==null)
        {
            return res.status(404).json({message:"cannot find the locations"})

        }
        await Data.findByIdAndUpdate({_id:req.params.id},req.body)
        res.json({message:`successful update:${data}`})
    } catch (error) {
        return res.status(404).json({message:"404 some wrong!"})
    }
})
//Deleting one
router.delete('/:id', async(req,res)=>{
    try {
        const data = await Data.findById(req.params.id);
        if(data==null)
        {
            return res.status(404).json({message:"cannot find the locations"})

        }
        await data.remove();
        res.json({message:'successful delete data'})
    } catch (error) {
        return res.status(404).json({message:"cannot find the locations"})
    }
   
})

module.exports = router