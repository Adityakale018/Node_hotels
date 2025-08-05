const express = require('express');
const router =  express.Router();
const menuitems = require('./../models/menuitems');

router.post('/', async (req,res)=>{
    try{
    const data=req.body; // req body contains person data
    //create new person document using mongoose model
    const menu = new menuitems(data);

    const response =await menu.save();
    console.log("Data saved successfully");
    res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    } 
})

router.get('/',async(req,res)=>{
  try{
       const data = await menuitems.find();
       console.log("Data fetched successfully");
       res.status(200).json(data);

  }
  catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
  }
})

router.get('/:taste', async(req,res)=>{
  try{
    const taste = req.params.taste; //extract workType from URL
    if(taste=='sweet' || taste=='sour' || taste=='spicy'){
      const response=await menuitems.find({ taste : taste});
      console.log("Data fetched successfully");
      res.status(200).json(response);
    }
  }
  catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
  }
})

module.exports = router;
