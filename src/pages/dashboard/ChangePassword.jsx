import { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken'); // Lấy JWT token từ localStorage

      const response = await axios.post(
        'https://dev-to-backend-gold.vercel.app/api/auth/change-password',
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
      } else {
        console.error('Error changing password: Status', response.status);
        setMessage('Error changing password');
      }
    } catch (error) {
      console.error('Error changing password', error);
      setMessage('Error changing password');
    }
  };

  return (
    <div className="w-full p-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-1/2 p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <h2 className="mt-2 mb-2 text-xl font-semibold text-gray-800">Password Requirements:</h2>
        <ul className='text-sm font-medium text-gray-700 '>
          <li>. Minimum 8 characters long - the more, the better</li>
          <li>. At least one lowercase character</li>
          <li>. At least one number, symbol, or whitespace character</li>
        </ul>
        <button
          type="submit"
          className="px-4 py-2 mr-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Change
        </button>
        <button
          type="button"
          className="px-4 py-2 ml-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default ChangePassword;
