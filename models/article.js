const mongoose  = require('mongoose');
const slugify = require('slugify');


const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        rquired:true
    },
    description:{
        type:String,
        rquired:true
    },
    Info:{
        type:String,
        rquired:true
    },
    author:{
        type:String,
        rquired:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    slug:{
       type:String,
       required:true,
       unique:true
    }

})
//article schema
articleSchema.pre('validate',function(next){
    if(this.title){
        this.slug = slugify(this.title,{lower:true,strict:true})
    }
    next()
})

module.exports = mongoose.model("Article",articleSchema)