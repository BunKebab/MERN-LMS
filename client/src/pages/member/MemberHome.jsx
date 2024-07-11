import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserBorrowing, reset } from "../../actions/borrowingSlice";
import { toast } from "react-toastify";

// Import components
import BorrowedBook from "../../components/modals/books/BorrowedBook";
import Loader from "../../components/Loader";

const MemberHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { borrowings, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.borrowings
  );

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }

    dispatch(getUserBorrowing(user.id));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && message) {
      toast.success(message);
    }
  }, [isError, isSuccess, message]);

  return (
    <div className="bg-base-100 min-h-screen p-4">
      {/* Invisible Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center sm:text-left">Home</h1>
        <hr className="border-t border-gray-300 mt-2" />
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex items-center justify-between flex-col sm:flex-row">
        <h1 className="text-2xl font-bold text-center sm:text-left">
          Welcome {user.name}
        </h1>
      </div>

      <hr className="border-t border-gray-300 mt-2" />

      {/* Table */}
      <div className="overflow-x-auto mt-10">
        {isLoading ? (
          <Loader />
        ) : borrowings.length !== 0 ? (
          <div>
            <h3>Borrowed Book</h3>
            <BorrowedBook borrowing={borrowings} />
          </div>
        ) : (
          <h3>You are not borrowing any books</h3>
        )}
      </div>
    </div>
  );
};

export default MemberHome;
