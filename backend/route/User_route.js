const express = require('express')
const router = express.Router()

const upload = require('../middleware/Upload');
const {processExcelFile } = require('../controller/userController');


//path
router.post('/uploadfile', upload.single('file'), processExcelFile);

module.exports=router;