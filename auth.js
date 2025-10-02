const passport = require('passport');
const localstrategy = require('passport-local').Strategy;
const person = require('./models/person')

passport.use(new localstrategy(async(username,password,done)=>{
  //authentication logic
  try{
    //console.log('Received credentials : ',username,password);
    const user = await person.findOne({username:username});
    if(!user)
      return done(null,false,{message:'Incorrect username.'});
    const isPasswordmatch= await user.comparepassword(password);
    if(isPasswordmatch){
      return done ( null,user);
    }
    else{
      return done (null,false,{message:'Incorrect Password.'});
    }
    
  }
  catch(err){
     return done(err);
  }
}))

module.exports = passport;