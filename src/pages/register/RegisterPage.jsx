
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from './registerSchema';

import { useState } from 'react';
import { registerService } from './../../services/registerService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const [rMe, setrMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await registerService.register(data);

      if (response.status === 200) {
        const result = response.data;
        console.log(result);
        toast.success('Registration successful!');
        // if (rMe) {
        //   localStorage.setItem('email', data.email);
        //   localStorage.setItem('password', data.password);
        //   localStorage.setItem('rememberMe', true);
        // } else {
        //   localStorage.removeItem('email');
        //   localStorage.removeItem('password');
        //   localStorage.removeItem('rememberMe');
        // }

      } else {
        toast.error(`Registration failed: ${response.status}`);
      }

    } catch (error) {
      if (error.response) {
        toast.error(`Registration failed: ${error.response.data.message}`);
      } else {
        toast.error('There was a problem with the axios operation');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[450px]  max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">

        <h1 className="font-['Public_Sans'] text-center text-black font-black   text-[35px]  leading-[14px] mb-10">DEVTO</h1>
        <div className="space-y-[6px] ">
          <h1 className="text-[var(--Light-Typography-Color-Heading-Text,#4B465C)]  font-semibold font-['Public_Sans'] text-[22px] leading-[30px]    ">Adventure starts here</h1>
          <h1 className="font-['Public_Sans'] text-[15px] font-normal  text-[var(--Light-Typography-Color-Body-Text,#4B465C)] leading-[22px]">
            Make your app management easy and fun!
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="font-['Public_Sans'] block text-[13px] font-normal text-gray-700">Username</label>
            <input
              {...register('username')}
              type="username"
              id="username"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.username && (
              <span className="text-red-900">{errors.username.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="email" className="font-['Public_Sans'] block text-[13px] font-normal text-gray-700">Email</label>
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
            <p className=" ml-2 text-gray-700 font-['Public_Sans'] text-[15px] font-normal  text-[var(--Light-Typography-Color-Body-Text,#4B465C)] leading-[22px] ">
              I agree to
              <a href="#" className="ml-1   text-blue-500 hover:text-blue-700 font-['Public_Sans'] text-[15px] font-normal   leading-[22px]">
                privacy policy & terms
              </a>
            </p>

          </div>
          <button
            type="submit"
            className={`w-full font-['Public_Sans'] px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isLoading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign up'}
          </button>
          <div className="flex justify-center mt-8">
            <p className="text-gray-700 font-['Public_Sans'] text-[15px] font-normal  text-[var(--Light-Typography-Color-Body-Text,#4B465C)] leading-[22px] ">
              Already have an account?
              <a href="/" className="ml-1   text-blue-500 hover:text-blue-700 font-['Public_Sans'] text-[15px] font-normal   leading-[22px]">
                Sign in instead!
              </a>
            </p>
          </div>

        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterPage;
