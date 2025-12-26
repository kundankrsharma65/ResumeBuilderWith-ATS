import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./auth/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import CreateResume from "./pages/CreateResume";
import ResumeHistory from "./pages/ResumeHistory";
import AtsResult from "./pages/AtsResult";

export default function App() {
  return (
    <BrowserRouter>
      {/* 🌍 Global Navbar */}
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* PROTECTED */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateResume />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <ResumeHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ats-result"
          element={
            <ProtectedRoute>
              <AtsResult />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
