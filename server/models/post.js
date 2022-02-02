const mongoose = require('mongoose')
const {ObjectId}= mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String
        
    },
    photo:{
        type:String,
        required:true
    },
    postedBy:{
            type:ObjectId,
            ref:'User'

    },
    likes:[{type:ObjectId,ref:'USer'}],
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:'User'}
    }]
})
mongoose.model('Post',postSchema)