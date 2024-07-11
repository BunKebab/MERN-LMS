import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import actions
import { getBooks } from "../../actions/bookSlice";
import { getMembers } from "../../actions/memberSlice";
import { getBorrowings } from "../../actions/borrowingSlice";
import { getRequests } from "../../actions/requestSlice";

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Global state selectors
  const booksCount = useSelector((state) => state.books.books.length);
  const membersCount = useSelector((state) => state.members.members.length);
  const borrowingsCount = useSelector((state) => state.borrowings.borrowings.length);
  const requestsCount = useSelector((state) => state.requests.requests.length);

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!user) {
      navigate("/");
    } else {
      // Fetch data on component mount
      dispatch(getBooks());
      dispatch(getMembers());
      dispatch(getBorrowings());
      dispatch(getRequests());
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="bg-base-100 min-h-screen p-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center sm:text-left">Admin Dashboard</h1>
        <hr className="border-t border-gray-300 mt-2" />
      </div>

      {/* Welcome message */}
      <div className="mb-4 flex items-center justify-between flex-col sm:flex-row">
        <h1 className="text-2xl font-bold text-center sm:text-left">
          Welcome {user ? user.name : ""}
        </h1>
      </div>

      <hr className="border-t border-gray-300 mt-2" />

      {/* Data Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Books */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-2">Books</h2>
          <p className="text-3xl font-bold">{booksCount}</p>
        </div>

        {/* Members */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-2">Members</h2>
          <p className="text-3xl font-bold">{membersCount}</p>
        </div>

        {/* Borrowings */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-2">Borrowings</h2>
          <p className="text-3xl font-bold">{borrowingsCount}</p>
        </div>

        {/* Requests */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-2">Requests</h2>
          <p className="text-3xl font-bold">{requestsCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
