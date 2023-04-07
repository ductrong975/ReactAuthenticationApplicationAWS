import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserPage from './pages/UserPage';
import SubscriptionPage from './pages/SubscriptionPage';
import QueryPage from './pages/QueryPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route index path="/" element={<LoginPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/user" element={<UserPage/>}/>
            <Route path="/subscription" element={<SubscriptionPage/>}/>
            <Route path="/query" element={<QueryPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
