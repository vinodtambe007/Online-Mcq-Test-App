const mongoose = require('mongoose')

const {Schema} = mongoose

const PktSchema = new Schema({
    qnumber : {
        type : Number
    },
    question : {
        type : String,
    },
    option_a : {
        type : String,
    },
    option_b : {
        type : String,
    },
    option_c : {
        type : String,
    },
    option_d : {
        type : String,
    },
    answer : {
        type : String,
    },
})

module.exports = mongoose.model("Pkt",PktSchema)