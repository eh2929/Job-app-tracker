import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-center bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-200">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/apply" className="text-white hover:text-gray-200">
            Create New Job Application
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
