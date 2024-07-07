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
    <>
      <BrowserRouter>
        {/* Conditionally render Header or Navbar based on user authentication */}
        {user ? <Navbar /> : <Header />}

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
      </BrowserRouter>

      {/* Toast notifications container */}
      <ToastContainer />
    </>
  );
};

export default App;
