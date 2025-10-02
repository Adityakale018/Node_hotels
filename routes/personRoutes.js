const express = require('express');
const router =  express.Router();
const person=require('./../models/person');
const { findByIdAndUpdate, findById } = require('../models/menuitems');
const {jwtMiddleware,generateToken} = require('./../jwt');

router.post('/signup', async (req,res)=>{
    try{
    const data=req.body; // req body contains person data
    //create new person document using mongoose model
    const Newperson = new person(data);

    const response =await Newperson.save();
    console.log("Data saved successfully");

    const payload = {
        id:response.id,
        username:response.username
    }

    const token = generateToken(payload);
    console.log("token is:",token)

    res.status(200).json({response:response,token:token})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    } 
})

//login route

router.post('/login',async(req,res)=>{
    try{

    
    // Extract username and pass from user
    const {username,password} = req.body;

    //find user by username
    const user = await person.findOne({username: username});

    // if user dont exist or invalid pass then return error
    if(!user || !(await user.comparepassword(password))){
        return res.status(401).json({error:'Invalid username or password'});
    }

    // generate token
    const payload ={
        id:user.id,
        username:user.username
    }
    const token = generateToken(payload);
    res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({error:'internal server error'});
    } 
})

//profile route
router.get('/profile',jwtMiddleware,async(req,res)=>{
    try{
        const userData = req.user;
        console.log("user:",userData);

        const userID = userData.id;
        const user = await person.findById(userID);

        res.status(200).json({user});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'internal server error'});
    }
})

router.get('/',jwtMiddleware,async(req,res)=>{
  try{
       const data = await person.find();
       console.log("Data fetched successfully");
       res.status(200).json(data);

  }
  catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
  }
})

router.get('/:workType', async(req,res)=>{
  try{
    const workType = req.params.workType; //extract workType from URL
    if(workType=='cheif' || workType=='waiter' || workType=='manager'){
      const response=await person.find({ work : workType});
      console.log("Data fetched successfully");
      res.status(200).json(response);
    }
  }
  catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
  }
})

router.put('/:id', async (req, res) => {
    try {

        //console.log('Request Body:', req.body);
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        const updatedPersonData = req.body; // Extract the update data from the request body

        // Find the document by ID and update it
        const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,           // This option returns the modified document, not the original
            runValidators: true, // This option ensures that updates adhere to your schema's validation rules
        });

        // If no document is found with the given ID, return a 404 error
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        // Send a success response with the updated document
        console.log('Data updated');
        res.status(200).json(response);

    } catch (err) {
        // If there's a server-side error, log it and send a 500 response
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {

        //console.log('Request Body:', req.body);
        const personId = req.params.id; // Extract the person's ID from the URL parameter
         // Extract the update data from the request body

        // Find the document by ID and update it
        const response = await person.findByIdAndDelete(personId);
       

        // If no document is found with the given ID, return a 404 error
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        // Send a success response with the updated document
        console.log('Data deleted');
        res.status(200).json({message:'data deleted successfully'});

    } catch (err) {
        // If there's a server-side error, log it and send a 500 response
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;

