const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');   
require('dotenv').config();

const userRoute = require('./route/User_route')
const pktRoute = require('./route/Pkt_route')
const mainuserRoute = require('./route/MainUser_route')
const pktLogin = require('./route/pktlogin_route')
const adminUser = require('./route/AdminUser_route')

const app = express();

app.use(cors());
//TO KEEP TRACK WHICH API WE HIT
app.use(express.json());
app.use((req, res, next) => {
    console.log("HTTP method = " + req.method + " , URL - " + req.url);
    next();
});

//path --> Route
app.use('/api/user',userRoute)
app.use('/api/pkt',pktRoute)
app.use('/api/mainuser',mainuserRoute)
app.use('/api/real',pktLogin)
app.use('/api/admin',adminUser)

//Connection to MongoDB
mongoose.connect(process.env.MONGODB_URL)
.then(()=>app.listen(5000))
.then(()=>console.log(`MongoDB connected Succesfully to Port ${process.env.PORT}`))
.catch((err)=> console.log(err));