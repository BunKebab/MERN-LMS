import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//import components
import Options from "./modals/Options";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="navbar bg-base-100 fixed top-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {user && user.role === "Admin" ? (
              <>
                <li>
                  <Link to="/admin/books">Books</Link>
                </li>
                <li>
                  <Link>Borrowings</Link>
                  <ul className="p-2">
                    <li>
                      <Link to="/admin/borrowings">All</Link>
                    </li>
                    <li>
                      <Link to="/admin/requests">Requests</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/admin/members">Members</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/member/books">Books</Link>
              </li>
            )}
          </ul>
        </div>
        {user.role === "Admin" ? (
          <Link to="/admin/" className="btn btn-ghost text-xl">
            Library Managment System
          </Link>
        ) : (
          <Link to="/member/" className="btn btn-ghost text-xl">
            Library Managment System
          </Link>
        )}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {user && user.role === "Admin" ? (
            <>
              <li>
                <Link to="/admin/books">Books</Link>
              </li>
              <li>
                <details>
                  <summary>Borrowings</summary>
                  <ul className="p-2">
                    <li>
                      <Link to="/admin/borrowings">All</Link>
                    </li>
                    <li>
                      <Link to="/admin/requests">Requests</Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link to="/admin/members">Members</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/member/books">Books</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        <Options />
      </div>
    </div>
  );
};

export default Navbar;
