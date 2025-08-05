const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    work:{
        type:String,
        enum:['cheif','waiter','manager'],
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }
});

//create person model

const person = mongoose.model('person',personSchema);
module.exports=person;
