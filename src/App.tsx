import React from 'react';

import { useTheme } from './theme/useTheme';

import { ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';

const App = () => {
  const {theme} = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      
    </ThemeProvider>
  );
}

export default App;
