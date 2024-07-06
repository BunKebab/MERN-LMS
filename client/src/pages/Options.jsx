import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//import components
import Logout from "../components/modals/Logout";

const Options = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user, navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Options</h2>

        <div className="mb-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-2">
            Change Password
          </button>
          <div className="flex justify-center">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
