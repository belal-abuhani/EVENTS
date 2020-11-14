const mongoose = require('mongoose')
// const { string } = require('prop-types')

const userSchema = mongoose.Schema({

    name :{
        type:String,
        required:true,
        min : 6,
        max : 255
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min : 6,
        max : 255
    },
    date:{
        type:Date,
        default:Date.now

    }

})

const User = mongoose.model('User', userSchema)
module.exports.User = User