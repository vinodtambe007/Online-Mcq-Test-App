import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Navbar from "./Navbar";

const RequestRetest = () => {
  const [pktData, setPktData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPktData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/real/fetchdatarequestretest`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setPktData(result.data);
      console.log(result);
      // toast.success(`data fetch Succesfully`);
    } catch (error) {
      toast.error("Failed To fetch data");
      setError(`Failed to fetch data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPktData();
  }, []);

  const handleAcceptRequest = async (Emp_id, status) => {
    if (!Emp_id) {
      toast.success("Emp_Id Unable To fetch");
    }
    try {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/real/acceptretestrequest`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Emp_id, status }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        if (response.status === 200) {
          toast.success(`Request Accepted Succesfully`);
          fetchPktData();
        }
        console.log(result);
      } catch (error) {
        toast.error("Unable To Accept Request");
        setError(`Unable To Accept Request: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } catch (error) {}
  };

  const handleRemove = async(empId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/real/removefromretest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ empId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if(response.ok){
        toast.success('remove from')
      }
    } catch (error) {
      
    }
  }
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Request For Retest</h1>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {pktData.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-blue-500 rounded-md">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider">
                    Emp Id
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider">
                    User Name
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider">
                    Previous Pkt Score
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pktData.map((item) => (
                  <tr key={item.qnumber} className="bg-white">
                    <td className="px-6 py-4 text-lg whitespace-nowrap font-bold">
                      {item.Emp_id}
                    </td>
                    <td className="px-6 py-4 text-lg whitespace-nowrap font-bold">
                      {item.user_name}
                    </td>
                    <td className="px-6 py-4 text-lg whitespace-nowrap font-bold">
                      {item.pkt_score}
                    </td>
                    <td className="px-6 py-4 text-lg whitespace-nowrap font-bold">
                      {item.admin_request === "Accept" ? (
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded"
                          onClick={() =>
                            handleAcceptRequest(item.Emp_id, "Reject")
                          }
                        >
                          Reject Request{" "}
                        </button>
                      ) : (
                        <button
                          className="px-3 py-1 bg-green-600 text-white rounded"
                          onClick={() =>
                            handleAcceptRequest(item.Emp_id, "Accept")
                          }
                        >
                          Accept Request{" "}
                        </button>
                      )}
                    </td>
                    <td>
                        <MdDelete className="w-10 h-10" onClick={()=>handleRemove(item.Emp_id)}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default RequestRetest;
