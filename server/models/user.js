const mongoose= require('mongoose')
const {ObjectId}= mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dtm704hzn/image/upload/v1643719510/oznmk5gqqihrgkge0wgb.jpg"  
    }
    ,
    password:{
        type:String,
        required:true
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"USer"}]
})
mongoose.model('User',userSchema)