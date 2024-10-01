import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signinSchema } from './signinSchema';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://dev-to-backend-gold.vercel.app/api/auth/forgotpassword', data);

      if (response.status === 200) {
        toast.success("Một liên kết đặt lại mật khẩu đã được gửi đến email của bạn.");

        // Chuyển hướng về trang chủ sau khi thành công
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error(`Không thành công: ${response.status}`);
      }

    } catch (error) {
      if (error.response) {
        toast.error(`Không thành công: ${error.response.data.message}`);
      } else {
        toast.error('Có sự cố xảy ra với yêu cầu.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Logic khi người dùng nhấn nút Cancel
    navigate('/'); // Hoặc bạn có thể chuyển hướng tới trang khác, ví dụ như trang chủ
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[450px] max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
        <div className="space-y-[6px]">
          <h1 className="text-[var(--Light-Typography-Color-Heading-Text,#4B465C)] font-semibold font-inter text-[22px] leading-[30px]">Find Your Account</h1>
          <h1 className="font-inter text-[15px] font-normal text-[var(--Light-Typography-Color-Body-Text,#4B465C)] leading-[22px]">
            Please enter your email address or mobile number to search for your account.
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="font-inter block text-[13px] font-normal text-gray-700">Email Address</label>
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel} // Gọi hàm handleCancel khi nhấn nút Cancel
              className="w-auto px-4 py-2 ml-2 text-black bg-gray-200 rounded-md font-inter focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-auto font-inter px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isLoading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'} ml-2`}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Search'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPasswordPage;
