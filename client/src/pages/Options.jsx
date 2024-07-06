import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//import components
import Logout from "../components/modals/Logout";
import ChangePassword from "../components/modals/ChangePassword";

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
        <div className="flex justify-center">
            <ChangePassword />
          </div>
          <div className="flex justify-center">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
