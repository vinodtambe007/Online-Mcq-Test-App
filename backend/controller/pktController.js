// controllers/userController.js
const fs = require('fs');
const XLSX = require('xlsx');
const Pkt = require('../model/Pkt');
const WebDevPkt = require('../model/WebDevpPkt')
const PowerAppPkt = require('../model/PoweAppPkt')
const path = require('path');
const pktLogin = require('../model/PktLogin');
const PktLogin = require('../model/PktLogin');

const processExcelFile = async (req, res) => {
  try {
    const { pkt_type } = req.body;
    console.log(pkt_type);
    
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(__dirname, '../public/uploads', req.file.filename);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    fs.unlinkSync(filePath); 

    if (pkt_type === "web_development") {
      await WebDevPkt.deleteMany({});
      await WebDevPkt.insertMany(data);
    } else if (pkt_type === "power_apps") {
      await PowerAppPkt.deleteMany({});
      await PowerAppPkt.insertMany(data);
    } else if (pkt_type === "general") {
      await Pkt.deleteMany({});
      await Pkt.insertMany(data);
    } else {
      return res.status(400).send('Select a valid packet type.');
    }
    res.status(200).send('File processed and data saved successfully.');
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).send('An error occurred while processing the file.');
    }
  }
};

const fetchQuestion = async (req,res) => {
  try {
    const { pktType } = req.params;
    console.log(pktType)
    let data={}
    if(pktType === 'web_development'){
      data = await WebDevPkt.find({});
    }
    else if(pktType === 'power_apps'){
      data = await PowerAppPkt.find({});
    }
    else if(pktType === 'general'){
      data = await Pkt.find({});
    }
   

    return res.status(200).json({data})
  } catch (error) {
    
  }
}

const userAnswers = async (req,res) => {
  try {
    const {answers,pktType,empId} = req.body;
    console.log(pktType,answers,empId)
    let questions ={};
    if(pktType === "web_development"){
      questions = await WebDevPkt.find({ qnumber: { $in: Object.keys(answers).map(Number) } });
    }
    else if(pktType === "power_apps"){
      questions = await PowerAppPkt.find({ qnumber: { $in: Object.keys(answers).map(Number) } });
    }
    else if(pktType === "general"){
      questions = await Pkt.find({ qnumber: { $in: Object.keys(answers).map(Number) } });
    } 
    let score = 0;

    questions.forEach(question => {
      if (answers[question.qnumber] === question.answer) {
        score += 10; 
      }
    });

    const User = await pktLogin.findOne({Emp_id:empId})
    User.pkt_score = score;
    await User.save();
    
    console.log(score)
    console.log(questions);

    res.json({ score });

  } catch (error) {
    console.log(error)
  }
}

const viewPktByType = async (req,res) => {
  try {
    const {pkt_type} = req.body;

    if(!pkt_type){
      return res.status(400).json({message:"PKT Type Is Not Selected"})
    }

    let pktdata ={}
    if(pkt_type ==="web_development"){
      pktdata = await WebDevPkt.find({}) 
      return res.status(201).json({data:pktdata})
    }
    else if(pkt_type === "power_apps"){
      pktdata = await PowerAppPkt.find({}) 
      return res.status(201).json({data:pktdata})
    }else if(pkt_type === "general"){
      pktdata = await Pkt.find({});
      return res.status(201).json({data:pktdata})
    }else {
      return res.status(400).json({message:"pkt Type not valid"})
    }
  } catch (error) {
    return res.status(500).json({error:error})
  }
}

const requestForRetest = async ( req,res) => {
  try {
    const {empId} = req.body;
    if(!empId){
      return res.status(400).json({message:"Emp Id Is not There"});
    }
    const userData = await PktLogin.findOne({Emp_id:empId});
    userData.request_retest=true;
    await userData.save();
    return res.status(200).json({message:"Request Send The Admin"})
  } catch (error) {
    return res.status(500).json({error:error})
  }
}
module.exports = { processExcelFile ,fetchQuestion,userAnswers,viewPktByType,requestForRetest};
