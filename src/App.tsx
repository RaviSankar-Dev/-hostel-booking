import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Facilities from "./pages/Facilities";
import FoodMenu from "./pages/FoodMenu";
import About from "./pages/About";

import Dashboard from "./pages/Dashboard"; // Student Dashboard
import AdminDashboard from "./pages/AdminDashboard";
import AdminAuth from "./pages/AdminAuth";
import Auth from "./pages/Auth"; // Student login/register
import RentTracking from "./pages/RentTracking"; // Admin rent tracking
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

// ProtectedRoute wrapper
interface ProtectedRouteProps {
  children: React.ReactNode;
  type: "student" | "admin";
}

function ProtectedRoute({ children, type }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const student = localStorage.getItem("currentUser");
      const admin = localStorage.getItem("currentAdmin");

      if (type === "student" && student) setIsAllowed(true);
      if (type === "admin" && admin === "admin@pg.com") setIsAllowed(true);

      setLoading(false);
    }, 500); // small delay for loader
  }, [type]);

  if (loading) return <Loader />;

  if (!isAllowed) {
    return <Navigate to={type === "admin" ? "/admin-login" : "/auth"} replace />;
  }

  return <>{children}</>;
}

// 👇 Cursor logic component
function CursorManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/dashboard")) {
      document.body.classList.add("dashboard-cursor");
    } else {
      document.body.classList.remove("dashboard-cursor");
    }
  }, [location.pathname]);

  return null; // nothing to render
}

function App() {
  const currentUser = localStorage.getItem("currentUser");
  const currentAdmin = localStorage.getItem("currentAdmin");

  return (
    <Router>
      <CursorManager /> {/* 👈 Add cursor logic here */}
      <Navbar />
      <Routes>
        {/* Public Routes with redirects if logged in */}
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : currentAdmin ? (
              <Navigate to="/admin" replace />
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/rooms"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : currentAdmin ? (
              <Navigate to="/admin" replace />
            ) : (
              <Rooms />
            )
          }
        />
        <Route
          path="/facilities"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : currentAdmin ? (
              <Navigate to="/admin" replace />
            ) : (
              <Facilities />
            )
          }
        />
        <Route
          path="/foodmenu"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : currentAdmin ? (
              <Navigate to="/admin" replace />
            ) : (
              <FoodMenu />
            )
          }
        />
        <Route
          path="/about"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : currentAdmin ? (
              <Navigate to="/admin" replace />
            ) : (
              <About />
            )
          }
        />

        {/* Student Auth */}
        <Route
          path="/auth"
          element={
            currentUser ? <Navigate to="/dashboard" replace /> : <Auth />
          }
        />

        {/* Student Dashboard (Protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute type="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Login */}
        <Route
          path="/admin-login"
          element={
            currentAdmin ? <Navigate to="/admin" replace /> : <AdminAuth />
          }
        />

        {/* Admin Dashboard (Protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute type="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Rent Tracking (Protected) */}
        <Route
          path="/admin/rent-tracking"
          element={
            <ProtectedRoute type="admin">
              <RentTracking />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
