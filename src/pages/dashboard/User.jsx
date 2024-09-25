import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEllipsisV } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 3;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('https://dev-to-backend-gold.vercel.app/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.error('Error fetching users: Status', response.status);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const displayedUsers = users.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage);

  return (
    <div className="flex min-h-screen bg-gray-100">



      {/* Main content */}
      <div className="flex-1 p-6">


        <main>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {/* Statistics Cards */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-medium text-l">Section</h3>
              <p className="text-2xl font-bold">1,230</p>
              <h3 className="font-medium text-l">Total Users</h3>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium">Active Users</h3>
              <p className="mt-4 text-2xl font-bold">895</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium">Pending Tasks</h3>
              <p className="mt-4 text-2xl font-bold">48</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium">Messages</h3>
              <p className="mt-4 text-2xl font-bold">67</p>
            </div>
          </div>
        </main>

        {/* Search Filter */}
        <div className="p-6 mt-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-medium">Search Filter</h3>
          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-end">
              <button className="w-full p-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* User Data Table */}
        <div className="p-6 mt-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-medium">User Data</h3>
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="p-2 text-center border">{user.id}</td>
                  <td className="p-2 text-center border">{user.username}</td>
                  <td className="p-2 text-center border">{user.email}</td>
                  <td className="p-2 text-center border">
                    <div className="flex justify-center space-x-2">
                      <FaEdit className="w-5 h-5 text-blue-600 cursor-pointer" />
                      <FaTrash className="w-5 h-5 text-red-600 cursor-pointer" />
                      <FaEllipsisV className="w-5 h-5 text-gray-600 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={'«'}
            nextLabel={'»'}
            breakLabel={'...'}
            pageCount={Math.ceil(users.length / usersPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'flex justify-center mt-4'}
            pageClassName={'mx-1'}
            pageLinkClassName={'px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200'}
            previousClassName={'mx-1'}
            previousLinkClassName={'px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200'}
            nextClassName={'mx-1'}
            nextLinkClassName={'px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200'}
            activeClassName={'bg-blue-500 text-white'}
          />
        </div>
      </div>
    </div>
  );
};

export default User;