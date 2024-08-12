// src/routes.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/login/LoginPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
