const express = require('express')
const router = express.Router()

const upload = require('../middleware/Upload');
const {processExcelFile,fetchQuestion,userAnswers,viewPktByType,requestForRetest } = require('../controller/pktController');


//path
router.post('/uploadfile', upload.single('file'), processExcelFile);
router.get('/getquestion/:pktType',fetchQuestion);
router.post('/submitanswer',userAnswers);
router.post('/viewallpktbytype',viewPktByType);
router.post('/requestforretest',requestForRetest)

module.exports=router;