const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});

//create person model
personSchema.pre('save',async function(next){
    const person = this;

    // hash the pass only if it is new or modified
    if(!person.isModified('password')) return next();
    try{
         // hash pass generation

         const salt = await bcrypt.genSalt(10);

         // hash pass

         const hashPassword = await bcrypt.hash(person.password,salt);

         person.password = hashPassword;
        next();

    }
    catch(err){
          return next(err);
    }
})

personSchema.methods.comparepassword = async function (candidatepassword) {
    try{
       const isMatch = await bcrypt.compare(candidatepassword,this.password);
       return isMatch;
    }
    catch(err){
         throw err;
    }
}

const person = mongoose.model('person',personSchema);
module.exports=person;
