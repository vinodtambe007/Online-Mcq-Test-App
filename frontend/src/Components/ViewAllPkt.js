import React, { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ViewAllPkt = () => {
  const [pktType, setPktType] = useState("");
  const [pktData, setPktData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePktTypeChange = (e) => {
    setPktType(e.target.value);
  };

  const fetchPktData = async () => {
    if (!pktType) {
      toast.error("Please Select PKT Type");
      setError("Please select a PKT type.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/pkt/viewallpktbytype`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pkt_type: pktType }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setPktData(result.data);
      toast.success(`${pktType} data fetch Succesfully`);
    } catch (error) {
      toast.error("Failed To fetch data");
      setError(`Failed to fetch data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">View Uploaded PKT Questions and Answers</h1>

        <div className="mb-4 flex items-center">
          <p className="bg-blue-600 px-2 py-2 text-white rounded">Select The PKT Type</p>
          <select
            value={pktType}
            onChange={handlePktTypeChange}
            className="px-4 py-2 border border-gray-300 rounded-md mr-4"
          >
            <option value="">Select PKT Type</option>
            <option value="web_development">Web Development</option>
            <option value="power_apps">Power Apps</option>
            <option value="general">General</option>
          </select>
          <button
            onClick={fetchPktData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Fetch Data
          </button>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {pktData.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-blue-500 rounded-md">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Q Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Question
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Option A
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Option B
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Option C
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Option D
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Answer
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pktData.map((item) => (
                  <tr key={item.qnumber} className="bg-white">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.qnumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.question}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.option_a}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.option_b}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.option_c}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.option_d}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.answer}
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

export default ViewAllPkt;
