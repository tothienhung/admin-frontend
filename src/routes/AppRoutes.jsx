// src/routes.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';
import User from '../pages/dashboard/User';
import ChangePassword from '../pages/dashboard/ChangePassword';
import Layout from '../pages/dashboard/Layout';
import ForgotPasswordPage from '../pages/forgotpassword/ForgotPasswordPage'
import ResetPasswordPage from '../pages/resetpassword/ResetPasswordPage';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route path="/home" element={<Layout />}>
          {/* <Route path="list-user" element={<ListUser />} /> */}
          <Route path="change" element={<ChangePassword />} />
          <Route path="list" element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
