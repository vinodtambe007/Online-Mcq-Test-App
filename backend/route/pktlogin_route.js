const express = require('express')
const router = express.Router()

const {pktLogin ,fetchpktLogindata,fetchPktDataRequestRetest,AcceptRequestByadmin,logoutWithoutSubmit,removefromRetest} =
 require('../controller/Pktlogin_Controller');


//path
router.post('/pktlogin',pktLogin);
router.get('/getpktlogindata',fetchpktLogindata);
router.get('/fetchdatarequestretest',fetchPktDataRequestRetest)
router.post('/acceptretestrequest',AcceptRequestByadmin)
router.post('/logoutwithoutsubmit',logoutWithoutSubmit)
router.post('/removefromretest',removefromRetest)

module.exports=router;