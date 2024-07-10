import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMembers, reset } from "../../actions/memberSlice";
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";

// Import components
import Loader from "../../components/Loader";
import MemberRow from "../../components/modals/members/MemberRow";
import AddMember from "../../components/modals/members/AddMember";

const AdminMembers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { isLoading, isError, isSuccess, members, message } = useSelector(
    (state) => state.members
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    dispatch(getMembers());

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

  const filteredMembers = members.filter(
    (members) =>
      members.email &&
      members.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-base-100 min-h-screen p-4">
      {/* Invisible Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center sm:text-left">Members</h1>
        <hr className="border-t border-gray-300 mt-2" />
      </div>

      {/* Search Bar and Add Book Button */}
      <div className="mb-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex gap-5 items-center">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-center sm:text-left">
              Members
            </h1>
          </div>
          <div className="relative max-w-md w-full sm:w-auto mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search for email"
              className="input input-bordered w-full pl-10 pr-3 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AiOutlineSearch className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <AddMember />
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
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <MemberRow key={member._id} member={member} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminMembers;
