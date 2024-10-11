import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signinSchema } from './signinSchema';
import { apiService } from '/src/services/apiService';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import facebookImage from '/src/imgs/Facebook.png';
import twitterImage from '/src/imgs/Twitter.png';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });
  const [rMe, setrMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await apiService.login(data);
      if (response.status === 200) {
        const result = response.data;
        toast.success("Login successful!");

        if (rMe) {
          localStorage.setItem('email', data.email);
          localStorage.setItem('password', data.password);
          localStorage.setItem('rememberMe', true);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        toast.error(`Login failed: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Login failed: ${error.response.data.message}`);
      } else {
        toast.error('There was a problem with the axios operation');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const responseGoogle = async (response) => {
    if (response.error) {
      toast.error('Google login failed: ' + response.error);
      return;
    }

    const { tokenId } = response;
    console.log('Google Token ID:', tokenId);

    try {
      const result = await apiService.loginWithGoogle(tokenId);
      if (result.status === 200) {
        toast.success("Google login successful!");
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('refreshToken', result.data.refreshToken);
        navigate('/home');
      } else {
        toast.error(`Google login failed: ${result.status}`);
      }
    } catch (error) {
      toast.error('There was a problem with Google login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[450px] max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
        <h1 className="font-inter text-center text-black font-black text-[35px] leading-[14px]">DEVTO</h1>
        <div className="space-y-[6px]">
          <h1 className="text-[#5d586c] font-semibold font-inter text-[22px] leading-[30px]">Welcome!</h1>
          <h1 className="font-inter text-[15px] font-normal text-[#6f6b7d] leading-[22px]">
            Please sign in to your account and start the adventure
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="font-inter block text-[13px] font-normal text-[#6f6b7d]">Email or Username</label>
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
              <label htmlFor="password" className="font-inter block text-[13px] font-normal text-[#6f6b7d]">Password</label>
              <a href="/forgot-password" className="font-inter text-[13px] text-indigo-500 hover:text-indigo-600">Forgot Password?</a>
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
            <h1 className="ml-2 font-inter text-[15px] font-normal text-[#6f6b7d] leading-[22px]">Remember me</h1>
          </div>
          <button
            type="submit"
            className={`w-full font-inter px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isLoading ? 'bg-gray-500' : 'bg-[#7367f0] hover:bg-[#5a53d1]'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign in'}
          </button>

          <div className="flex justify-center mt-8">
            <p className="font-inter text-[15px] font-normal text-[#6f6b7d] leading-[22px] ">
              New on our platform?
              <a href="/register" className="ml-1 text-blue-500 hover:text-blue-700 font-inter text-[15px] font-normal leading-[22px]">
                Create an account
              </a>
            </p>
          </div>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-500 font-inter">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex justify-center space-x-4">
            <img src={facebookImage} alt="Facebook" />
            <img src={twitterImage} alt="Twitter" />
            <div>
              <GoogleLogin
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                autoLoad={false}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                  <button
                    className="flex items-center p-2 border border-gray-300 rounded-md"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FaGoogle size={14} className="mr-2" />
                    Login with Google
                  </button>
                )}
              />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
