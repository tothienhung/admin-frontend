import { useState } from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thực hiện logic đăng nhập ở đây
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[450px]  max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">

        <h1 className="font-['Public_Sans'] text-center text-black font-black   text-[35px]  leading-[14px]">DEVTO</h1>
        <div className="space-y-[6px]">
          <h1 className="text-[var(--Light-Typography-Color-Heading-Text,#4B465C)]  font-semibold font-['Public_Sans'] text-[22px] leading-[30px]    ">Welcome!</h1>
          <h1 className="font-['Public_Sans'] text-[15px] font-normal  text-[var(--Light-Typography-Color-Body-Text,#4B465C)] leading-[22px]">
            Please sign in to your account and start the adventure
          </h1>
        </div>        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="font-['Public_Sans'] block text-[13px] font-normal text-gray-700">Email or Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="font-['Public_Sans'] block text-[13px] font-normal text-gray-700">Password</label>
              <a href="#" className="font-['Public_Sans']  text-[13px]  text-indigo-500 hover:text-indigo-600">Forgot Password?</a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="w-[18px] h-[18px] text-indigo-600 transition duration-150 ease-in-out form-checkbox" />
            <h1 className="ml-2 font-['Public_Sans'] text-[15px] font-normal  text-[var(--Light-Typography-Color-Body-Text,#4B465C)] leading-[22px]">Remember me</h1>
          </div>
          <button
            type="submit"
            className="w-full font-['Public_Sans'] px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
          <div className="flex justify-center mt-8">
            <p className="text-gray-700 font-['Public_Sans'] text-[15px] font-normal  text-[var(--Light-Typography-Color-Body-Text,#4B465C)] leading-[22px] ">
              New on our platform?
              <a href="#" className="ml-1   text-blue-500 hover:text-blue-700 font-['Public_Sans'] text-[15px] font-normal   leading-[22px]">
                Create an account
              </a>
            </p>
          </div>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 font-['Public_Sans'] text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex justify-center space-x-4">
            <FaFacebook className="text-blue-500 transition-colors duration-300 hover:text-blue-700" />
            <FaTwitter className="text-blue-400 transition-colors duration-300 hover:text-blue-600" />
            <FcGoogle className="text-gray-500 transition-colors duration-300 hover:text-gray-700" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
