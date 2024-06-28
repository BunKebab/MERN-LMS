import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//importing components
import Navbar from "./components/Navbar";
import Header from "./components/Header";

//Login page
import Login from "./pages/Login";

//importing Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminProfile from "./pages/admin/AdminProfile";

//importing User pages
import UserDashboard from "./pages/user/UserDashboard";
import UserBooks from "./pages/user/UserBooks";
import UserProfile from "./pages/user/UserProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        /**Login routing */
        <Route path="/" element={<Login />} />
        /**Admin routing */
        <Route path="/admin/" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<AdminBooks />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/requests" element={<AdminRequests />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        /**User routing */
        <Route path="/user/" element={<UserDashboard />} />
        <Route path="/user/books" element={<UserBooks />} />
        <Route path="/user/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
