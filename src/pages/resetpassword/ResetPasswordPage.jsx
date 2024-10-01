import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from './resetPasswordSchema'; // Định nghĩa schema cho xác thực
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordPage = () => {
  const { token } = useParams(); // Lấy token từ URL
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Đính kèm token vào URL và gửi password trong body
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`, {
        password: data.password, // Gửi password trong body
      });

      if (response.status === 200) {
        toast.success("Mật khẩu đã được đặt lại thành công.");
        // Có thể chuyển hướng đến trang đăng nhập
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[450px] max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold">Reset Your Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="password" className="block">New Password</label>
            <input
              {...register('password')}
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block">Confirm Password</label>
            <input
              {...register('confirmPassword')}
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}
          </div>
          <button type="submit" className={`w-full p-2 text-white bg-blue-600 rounded-md ${isLoading ? 'opacity-50' : ''}`} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Reset Password'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordPage;
