import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddComplaint from "./pages/AddComplaint";
import ComplaintList from "./pages/ComplaintList";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

// Helper component to conditionally render Navbar based on path and token state reactively
function Navigation({ token, setToken }) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/register";
  
  if (isAuthPage || !token) {
    return null;
  }
  
  return <Navbar setToken={setToken} />;
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Navigation token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaints"
          element={
            <ProtectedRoute>
              <ComplaintList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}