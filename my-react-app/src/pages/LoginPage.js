import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserSession } from '../services/Authentication';
import axios from 'axios';
import '../App.css';
const loginUrl = 'https://vg6znkujdb.execute-api.us-east-1.amazonaws.com/production/login';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (message) {
          alert(message);
        }
    }, [message]);

    const loginHandle = (event) => {
        event.preventDefault();
        const requestBody = {
            email: email,
            password: password
        }
        axios.post(loginUrl, requestBody).then((response) => {
            setUserSession(response.data.user, response.data.token);
            navigate('/home');
        }).catch((error) => {
            console.error('Error details:', error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                setMessage(error.response.data.message);
            } else {
                setMessage('The backend server is down!!! Please try again later');
            }
        })

    }

    const redirectToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="container">
            <h1>Login Page</h1>
            <form onSubmit={loginHandle}>
                <div>
                    <input
                        type="text"
                        placeholder ="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder = "Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                
                <button className="register" onClick={redirectToRegister}>Create new account</button>
            </form>
        </div>
    );
}

export default LoginPage;