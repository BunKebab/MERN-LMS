import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRequests, reset } from "../../actions/requestSlice";
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";

// Import components
import Loader from "../../components/Loader";
import RequestRow from "../../components/modals/requests/RequestRow";

const AdminRequests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { isLoading, isError, isSuccess, requests, message } = useSelector(
    (state) => state.requests
  );

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    dispatch(getRequests());

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
  }, [isError, isSuccess, message, dispatch]);

  return (
    <div className="bg-base-100 min-h-screen p-4">
      {/* Invisible Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center sm:text-left">Requests</h1>
        <hr className="border-t border-gray-300 mt-2" />
      </div>

      {/* Search Bar and Add Book Button */}
      <div className="mb-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex gap-5 items-center">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-center sm:text-left">
              Requests
            </h1>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300 mt-2" />

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Member email</th>
                <th className="px-4 py-2 text-left">Book reference ID</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <RequestRow key={request._id} request={request} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminRequests;
