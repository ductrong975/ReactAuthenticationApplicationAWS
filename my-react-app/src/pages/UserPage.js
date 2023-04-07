import React from 'react';
import Navbar from '../Navbar';
import { getUser } from '../services/Authentication';

function UserPage() {
  const user = getUser();
  const name = user !== 'undefined' && user ? user.user_name : '';
  return (
    <div className="container">
      <Navbar/>
      {user && <div className="welcome-box">Welcome, {name}!</div>}
    </div>
  );
}

export default UserPage;