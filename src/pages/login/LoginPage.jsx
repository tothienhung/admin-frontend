import axios from 'axios';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signinSchema } from './signinSchema';

import googleImage from '/src/imgs/Google.png';
import facebookImage from '/src/imgs/Facebook.png';
import twitterImage from '/src/imgs/Twitter.png';
import { useEffect, useState } from 'react';
const LoginPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });
  const [rMe, setrMe] = useState(false);


  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signin`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const result = response.data;
        console.log(result);

        if (rMe) {
          localStorage.setItem('email', data.email);
          localStorage.setItem('password', data.password);
          localStorage.setItem('rememberMe', true);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }
      } else {
        console.error('Login failed with status:', response.status);
      }

    } catch (error) {
      console.error('There was a problem with the axios operation:', error);
    }
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
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="font-['Public_Sans'] block text-[13px] font-normal text-gray-700">Email or Username</label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && (
              <span className="text-red-900">{errors.email.message}</span>
            )}
          </div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="font-['Public_Sans'] block text-[13px] font-normal text-gray-700">Password</label>
              <a href="#" className="font-['Public_Sans']  text-[13px]  text-indigo-500 hover:text-indigo-600">Forgot Password?</a>
            </div>
            <input
              {...register('password')}
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && (
              <span className="text-red-900">{errors.password.message}</span>
            )}
          </div>
          <div className="flex items-center">
            <input type="checkbox" {...register('rememberMe')}
              checked={rMe}
              onChange={(e) => setrMe(e.target.checked)}
              className="w-[18px] h-[18px] text-indigo-600 transition duration-150 ease-in-out form-checkbox" />
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

            <img src={facebookImage} alt="Facebook" />
            <img src={twitterImage} alt="Twitter" />
            <img src={googleImage} alt="Google" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
