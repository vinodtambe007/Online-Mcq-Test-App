const PktLogin = require('../model/PktLogin')

const pktLogin = async (req,res) => {
    try {
        const { emp_id, user_name, pkt_type } = req.body;
    // console.log(emp_id, user_name, pkt_type)
        if (!emp_id || !user_name || !pkt_type) {
          return res.status(400).json({ message: 'Please provide all required fields.' });
        }
        const pktuser = await PktLogin.findOne({Emp_id:emp_id});
        if(pktuser){
          return  res.status(200).json({ data:pktuser,message: 'User Already There.'});
        }
    
        const pktLogin = new PktLogin({
          Emp_id:emp_id,
          user_name,
          pkt_type,
        });
    
        await pktLogin.save();
    
        return  res.status(201).json({ message: 'User login details saved successfully.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving the user login details.' });
      }
}

const fetchpktLogindata = async (req,res) => {
  try {
    const data =  await PktLogin.find({});
    if(!data){
      return res.status(400).json({message:"data not present"})
    }
    return res.status(200).json({data})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

const fetchPktDataRequestRetest = async (req, res) => {
  try {
    const data = await PktLogin.find({ request_retest: true });
    // console.log(data)
    if (data.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const AcceptRequestByadmin = async (req,res) => {
  try {
    const {Emp_id,status} = req.body;
    if(!Emp_id){
      return res.status(404).json({message:"Emp_Id is not There "});
    }
    
    const data = await PktLogin.findOne({ Emp_id});
    console.log("dara",data)

    console.log(data)
    if (data.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    if(status === "Accept"){
      data.admin_request = "Accept";
    }
    else if(status === "Reject"){
      data.admin_request = "Reject";
    }
    
    // data.request_retest=false;
    await data.save();

    return res.status(200).json({ message : "Request Accepted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

const logoutWithoutSubmit = async (req,res) => {
  try {
    const {empId} = req.body;
    if(!empId){
      return res.status(400).json({message:'empId not present'});
    }

    const deletedata = await PktLogin.findOneAndDelete({Emp_id:empId})

    return res.status(200).json({message:"Deleted emp data that logout without submitting exam."})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

const removefromRetest = async ( req,res) => {
  try {
    const {empId} = req.body;
    if(!empId){
      return res.status(400).json({message:"Emp Id Is not There"});
    }
    const userData = await PktLogin.findOne({Emp_id:empId});
    console.log(userData)
    userData.request_retest=false;
    await userData.save();
    return res.status(200).json({message:"Request Romove from retest"})
  } catch (error) {
    return res.status(500).json({error:error})
  }
}

// const deleteandNewTest = async (req,res) => {
//   try {
//     const {Emp_id} = req.body;
//     i
//   } catch (error) {
    
//   }
// }

module.exports = {pktLogin,fetchpktLogindata,fetchPktDataRequestRetest,
                  AcceptRequestByadmin,logoutWithoutSubmit,removefromRetest}