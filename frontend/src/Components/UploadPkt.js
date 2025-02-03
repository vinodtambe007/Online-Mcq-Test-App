import React, { useState } from "react";
import Navbar from "./Navbar";
import toast from "react-hot-toast";
// import 'react-toastify/dist/ReactToastify.css';

const UploadPkt = () => {
  const [file, setFile] = useState(null);
  const [pktType, setPktType] = useState("");
  const [message, setMessage] = useState("");

  // Handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle pkt_type dropdown change
  const handlePktTypeChange = (event) => {
    setPktType(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !pktType) {
      toast.error("select a file and PKT type.");
      setMessage("Please select a file and PKT type.");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pkt_type", pktType);

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/pkt/uploadfile`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.text(); // Use .json() if your backend returns JSON
      setMessage(result);
      // alert("File Uploaded succesfully");
      toast.success("File Uploaded succesfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("An error occurred while uploading the file.");
    }
  };

  return (
    <>
    <Navbar />
      <div className="container mx-auto p-6 max-w-lg">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Upload PKT
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Choose file:
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="pkt_type"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Select Packet Type:
            </label>
            <select
              id="pkt_type"
              value={pktType}
              onChange={handlePktTypeChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="web_development">Web Development</option>
              <option value="power_apps">Power Apps</option>
              <option value="general">General</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Upload
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-lg text-gray-700">{message}</p>
        )}
      </div>
    </>
  );
};

export default UploadPkt;
