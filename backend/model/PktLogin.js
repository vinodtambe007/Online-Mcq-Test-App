const mongoose = require('mongoose')

const {Schema} = mongoose

const PktLoginSchema = new Schema({
    Emp_id : {
        type : String,
        unique : true
    },
    user_name : {
        type : String,
    },
    pkt_type : {
        type : String
    },
    pkt_score : {
        type : String
    },
    request_retest: {
        type: Boolean,
        default: false
    },
    admin_request: {
        type: String,
        enum: ['Accept', 'Reject'],
        default: null
    }
})

module.exports = mongoose.model("PktLogin",PktLoginSchema)