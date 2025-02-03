const mongoose = require('mongoose')

const {Schema} = mongoose

const AdminUserSchema = new Schema({
    user_name : {
        type : String,
        unique : true
    },
    password : {
        type : String
    }
})

module.exports = mongoose.model("AdminUser",AdminUserSchema)