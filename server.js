const express = require('express')
const app = express()
app.use(express.json());
const port = 3000
const db=require('./db');
const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);
const menuRoutes = require('./routes/menuRoutes');
app.use('/menuitems',menuRoutes);
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/chicken',(req,res)=>{
    res.send('give me some chicken')
})

//post route to add person

/*app.post('/person', async (req,res)=>{
    try{
    const data=req.body; // req body contains person data
    //create new person document using mongoose model
    const Newperson = new person(data);

    const response =await Newperson.save();
    console.log("Data saved successfully");
    res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    } 
})

app.get('/person',async(req,res)=>{
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

app.get('/person/:workType', async(req,res)=>{
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
app.post('/menuitems', async (req,res)=>{
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

app.get('/menuitems',async(req,res)=>{
  try{
       const data = await menuitems.find();
       console.log("Data fetched successfully");
       res.status(200).json(data);

  }
  catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
  }
})*/




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
