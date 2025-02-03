import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const SubmittedTest = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/real/getpktlogindata`
        ); // Adjust the endpoint as needed
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.data);
        setFilteredData(result.data);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) =>
          item.pkt_type.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, data]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">All Submitted Test By Employee</h1>
        <div className="mb-4 flex">
          <p className="w-[12vw] h-10 bg-blue-600 text-white text-xl px-2 py-2">
            Serach By Pkt Type
          </p>
          <input
            type="text"
            placeholder="Search by pkt_type"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-md "
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-blue-500 rounded-md">
            <thead className="bg-blue-600 text-white">
              <tr className="text-xl font-bold">
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                  Emp ID
                </th>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                  Pkt Type
                </th>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                  Pkt Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xl font-semibold">
              {filteredData.map((item, index) => (
                <tr
                  key={item.Emp_id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{item.Emp_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.user_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.pkt_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.pkt_score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SubmittedTest;
