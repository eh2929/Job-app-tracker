import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/apply">Create New Job Application</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
