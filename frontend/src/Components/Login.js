import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../StateContext';
import toast from "react-hot-toast";

const Login = () => {
  const [empId, setEmpId] = useState('');
  const [userName, setUserName] = useState('');
  const [pktType, setPktType] = useState('');
  const [message, setMessage] = useState('');
  const { setIsAuth } = useStateContext();

  const navigte = useNavigate();

  useEffect(()=>{
    localStorage.clear()
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!empId || !userName || !pktType) {
      toast.error("Please fill in all fields.")
      setMessage('Please fill in all fields.');
      return;
    }

    const formData = {
      emp_id: empId,
      user_name: userName,
      pkt_type: pktType,
    };

    try {
      console.log(process.env.REACT_APP_API)
      const response = await fetch(`${process.env.REACT_APP_API}/real/pktlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      if(response.status === 200){
        const userdata = result.data;
        console.log("userdata",userdata) 
        setIsAuth(true)
        navigte('/pktscore', { state: { userdata } });
        toast.success("Already Attempted PKT ");
      }
      if(response.status === 201){
        localStorage.setItem('pktType',pktType)
        localStorage.setItem('EmpId',empId)
        setIsAuth(true)
          navigte('/home')
          toast.success("Succesfully Login");
      }
      setMessage(result.message || 'Submission successful!');
    } catch (error) {
      toast.success("Unable To Login");
      console.error('Error submitting form:', error);
      setMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="mb-4">
          <label htmlFor="emp_id" className="block text-lg font-medium text-gray-700 mb-2">Employee ID:</label>
          <input
            type="text"
            id="emp_id"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="user_name" className="block text-lg font-medium text-gray-700 mb-2">Username:</label>
          <input
            type="text"
            id="user_name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pkt_type" className="block text-lg font-medium text-gray-700 mb-2">Select Packet Type:</label>
          <select
            id="pkt_type"
            value={pktType}
            onChange={(e) => setPktType(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>Select Type</option>
            <option value="web_development">Web Development</option>
            <option value="power_apps">Power Apps</option>
            <option value="general">General</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Submit
        </button>
        <div className='mt-2 flex'>
            <Link to='/adminlogin' className='text-white bg-blue-600 px-2 py-1 rounded'>Admin Login</Link>
        </div>
        <p className='text-red-600 font-semibold'>Warning - Only Admin Accesible this <span className='underline'>Admin Login</span> Button</p>

      </form>
      {message && <p className="mt-4 text-center text-xl text-gray-700">{message}</p>}
    </div>
  );
};

export default Login;
