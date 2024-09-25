// src/components/Layout.js

import { Outlet, } from 'react-router-dom';
import { FaSearch, FaUser, FaBell } from 'react-icons/fa';

import { useState } from 'react';
const Layout = () => {


  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    // Chuyển hướng đến URL tương ứng khi chọn
    if (value) {
      window.location.href = value;
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-extrabold">DEVTO</h1>
        </div>
        <nav>
          <ul>
            <li className="flex items-center p-4 hover:bg-gray-200">
              <FaUser className="w-5 h-5 mr-2 text-gray-600" />
              <a href="#">User</a>
            </li>
          </ul>
        </nav>
        <nav className="p-4 bg-white rounded-lg shadow">
          <select
            value={selectedOption}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" disabled>Select an option</option>
            <option value="/home/list">User List</option>
            <option value="/home/change">Change Password</option>
          </select>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 ">
        <header className="p-4 m-6 mb-6 bg-white shadow-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-600" />
            <FaBell className="absolute right-14 top-3.5 text-gray-600 cursor-pointer" />
            <div className="absolute right-3 top-1.5 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
              <span className="text-green">A</span>
            </div>
          </div>
        </header>

        {/* Nội dung chính sẽ được hiển thị ở đây */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;