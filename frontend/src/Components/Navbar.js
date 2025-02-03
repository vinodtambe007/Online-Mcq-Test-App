import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button (if needed) */}
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-white text-blue-600 px-2 py-2 rounded">PKT TestMaster</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link
                to="/"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-xl font-bold"
              >
                Test Login
              </Link>
              <Link
                to="/uploadpkt"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-xl font-bold"
              >
                Upload PKT
              </Link>
              <Link
                to="/submittedtest"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-xl font-bold"
              >
                Submitted Test
              </Link>
              <Link
                to="/requestretest"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-xl font-bold"
              >
               Request For Retest
              </Link>
              <Link
                to="/viewallpkt"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-xl font-bold"
              >
               View All PKT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
