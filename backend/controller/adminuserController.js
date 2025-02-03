const AdminUser = require('../model/AdminUser');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const jwtSecreat= process.env.SECREAT_KEY;

const RegisterUser = async ( req,res) => {
    try {
        const {user_name,password} = req.body;
        console.log(user_name,password)
    
        const salt = await bcrypt.genSalt(10)
        const secpass = await bcrypt.hashSync(password,salt)
    
        const newuser = await AdminUser.create({
            user_name,
            password : secpass,
        })
    
        return res.status(200).json({success:true,message:"New user Register Succesfully",data:newuser})
    } catch (error) {
        return res.status(400).json({error})
    }
  }
  
  const LoginUser = async ( req,res) => {
    try {
        const { user_name, password } = req.body;

        const userdata = await AdminUser.findOne({ user_name });

        if (!userdata) {
            return res.status(404).json({ success: false, errors: "User Name Not Registered" });
        }

        const pwdCompare = await bcrypt.compare(password, userdata.password);
        
        if (!pwdCompare) {
            return res.status(401).json({ success: false, errors: "Password is Incorrect" });
        }

        // console.log(pwdCompare);

        const data = {
            user: {
                id: userdata.id,
                user_name: userdata.user_name,
            }
        };

        const authToken = await jwt.sign(data, jwtSecreat);
        console.log('User Name:', userdata.user_name);
        return res.status(200).json({ success: true, data: authToken,name : userdata.user_name });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, errors: "Server Error" });
    }
  }

  module.exports = { RegisterUser ,LoginUser};