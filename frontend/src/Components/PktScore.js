import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const PktScore = () => {
  const location = useLocation();
  const userdata = location.state?.userdata;

  const navigate = useNavigate()

  const handleRetestRequest = async () => {
    const empId = userdata.Emp_id;
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/pkt/requestforretest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ empId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // const result = await response.json();
      if(response.status===200){
        toast.success(`Request Send To Admin`);
      }
    } catch (error) {
      toast.success(error);
    }
  };

  const handleRetest =async(empId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/real/logoutwithoutsubmit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ empId }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
        toast.error("something went wrong")
      }
      if(response.status===200){
        navigate('/');
        toast.success('You Can Login For New Test !')
      }
    } catch (error) {}
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Candidate Score</h1>
        {userdata ? (
          <div className="mb-6 text-center">
            <p className="text-xl font-semibold mb-2">Name: {userdata.user_name}</p>
            <p className="text-lg font-medium">Previous PKT Score: {userdata.pkt_score}</p>
            <p className="text-lg font-medium">Pkt Type: {userdata.pkt_type}</p>
          </div>
        ) : (
          <p className="text-center text-red-500">No score data available.</p>
        )}
        {
           userdata.request_retest ===true ?(
            <p className='text-lg text-green-500 font-semibold ml-[100px]'>Your Request Send To The Admin</p>
        ):(
          <div>
          </div>
        )
        }
         {
          userdata.admin_request ==="Accept" ?(
            <div className="text-center">
                <button
                  onClick={()=>handleRetest(userdata.Emp_id)}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Retest
                </button>
            </div>
          ):(
            <div className="text-center">
              <button
                onClick={handleRetestRequest}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Request Retest
              </button>
            </div>
          )
        }
        {/* {
          userdata.request_retest ===true ?(
              <p className='text-lg text-green-500 font-semibold ml-[100px]'>Your Request Send To The Admin</p>
          ):(
            <div className="text-center">
                <button
                  onClick={handleRetestRequest}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Request Retest
                </button>
            </div>
          )
        }
         {
          userdata.admin_request ==="Accept" ?(
            <div className="text-center">
                <button
                  onClick={()=>handleRetest(userdata.Emp_id)}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Retest
                </button>
            </div>
          ):(
            <>
            </>
          )
        } */}
        
      </div>
    </div>
  );
};

export default PktScore;
