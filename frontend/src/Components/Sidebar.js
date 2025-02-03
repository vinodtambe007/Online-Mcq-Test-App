import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Sidebar toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-0 left-0 p-4 text-white bg-blue-600"
      >
        {isOpen ? 'Close' : 'Open DashBoard'}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-blue-600 text-white transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 shadow-lg`}
        style={{ zIndex: 1000 }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <Link to="/" className="block px-4 py-2 hover:bg-blue-700">
            Test Login
          </Link>
          <Link to="/uploadpkt" className="block px-4 py-2 hover:bg-blue-700">
            Upload PKT
          </Link>
          <Link to="/submittedtest" className="block px-4 py-2 hover:bg-blue-700">
            Submitted Test
          </Link>
          <Link to="/requestretest" className="block px-4 py-2 hover:bg-blue-700">
            Request For Retest
          </Link>
          <Link to="/viewallpkt" className="block px-4 py-2 hover:bg-blue-700">
            View All PKT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
