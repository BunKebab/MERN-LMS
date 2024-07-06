import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

// Import Pages
import Login from "./pages/Login";
import Options from "./pages/Options";
// Import Admin Pages
import AdminHome from "./pages/admin/AdminHome";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminBorrowings from "./pages/admin/AdminBorrowings";
import AdminUsers from "./pages/admin/AdminUsers";
// Import User Pages
import UserHome from "./pages/user/UserHome";
import UserBooks from "./pages/user/UserBooks";

// Import Components
import Header from "./components/Header";
import Navbar from "./components/Navbar";

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        {/* Conditionally render Header or Navbar based on user authentication */}
        {user ? <Navbar /> : <Header />}

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {/* Routes setup */}
          <Routes>
            <Route path="/" element={<Login />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/books" element={<AdminBooks />} />
            <Route path="/admin/requests" element={<AdminRequests />} />
            <Route path="/admin/borrowings" element={<AdminBorrowings />} />
            <Route path="/admin/users" element={<AdminUsers />} />

            {/* User routes */}
            <Route path="/user" element={<UserHome />} />
            <Route path="/user/books" element={<UserBooks />} />

            {/* Options route */}
            <Route path="/options" element={<Options />} />
          </Routes>
        </main>
      </BrowserRouter>

      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
};

export default App;
