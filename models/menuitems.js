const mongoose = require('mongoose');

const menuitemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','sour','spicy'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default :false
    },
    ingredients:{
        type:[String],
        defualt:[]
    },

    


});

const menuitems = mongoose.model('menuitems',menuitemSchema);
module.exports=menuitems;