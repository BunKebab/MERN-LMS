import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

// Import Pages
import Login from "./pages/Login";
// Import Admin Pages
import AdminHome from "./pages/admin/AdminHome";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminBorrowings from "./pages/admin/AdminBorrowings";
import AdminMembers from "./pages/admin/AdminMembers";
// Import Member Pages
import MemberHome from "./pages/member/MemberHome";
import MemberBooks from "./pages/member/MemberBooks";

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
            <Route path="/admin/members" element={<AdminMembers />} />

            {/* Member routes */}
            <Route path="/member" element={<MemberHome />} />
            <Route path="/member/books" element={<MemberBooks />} />
          </Routes>
        </main>
      </BrowserRouter>

      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
};

export default App;
