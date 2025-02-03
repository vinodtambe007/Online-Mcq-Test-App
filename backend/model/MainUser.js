const mongoose = require('mongoose')

const {Schema} = mongoose

const UserSchema1 = new Schema({
    user_name : {
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    pkt_type : {
        type : String
    }
})

module.exports = mongoose.model("MainUser",UserSchema1)