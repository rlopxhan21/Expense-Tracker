import React from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { useTheme } from "./theme/useTheme";

import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { PrivateRouter } from "./components/PrivateRoute/PrivateRouter";
import { auth } from "./firebase/firebase-config";
import { authActions } from "./redux/auth-slice";

const App = () => {
  const { theme } = useTheme();

  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    user &&
      dispatch(
        authActions.setUser({ uid: user?.uid, displayName: user?.displayName })
      );
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRouter>
              <DashboardPage />
            </PrivateRouter>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRouter>
              <DashboardPage />
            </PrivateRouter>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
