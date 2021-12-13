const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId , // noi cai user vao day 
        ref:'user' //noi collection user sang day 
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    url:{
        type:String
    },
    status:{
        type:String,
        enum:['LEARNED','LEARNING','TO LEARN'] // set 3 trang thai hoc cua user
    }
},{timestamps:true})

module.exports = mongoose.model('posts',PostSchema)