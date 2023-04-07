import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { removeUserSession } from './services/Authentication';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUserSession();
    navigate('/');
  };

  return (
    <div className="container">
      <NavLink className="Navlink" exact to="/user" activeClassName="active">
        User Area
      </NavLink>
      <NavLink className="Navlink" to="/subscription" activeClassName="active">
        Subscription Area
      </NavLink>
      <NavLink className="Navlink" to="/query" activeClassName="active">
        Query Area
      </NavLink>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
