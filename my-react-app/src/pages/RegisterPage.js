import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const registerUrl = 'https://vg6znkujdb.execute-api.us-east-1.amazonaws.com/production/register';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (message) {
          alert(message);
        }
    }, [message]);

    const registerHandler = (event) => {
        event.preventDefault();
        const requestBody = {
            email: email,
            user_name: username,
            password: password
        }
        axios.post(registerUrl, requestBody).then((response) => {
            setMessage('Registeration Successful');
            if (window.confirm('Registeration Successful')) {
                navigate('/');
            }
        }).catch((error) => {
            if (error.response && error.response.status === 401){
                setMessage(error.response.data.message);
            } else {
                setMessage('The backend server is down!!! Please try again later');
            }
        })
    }

    return (
        <div className="container">
            <h1>Register Page</h1>
            <form onSubmit={registerHandler}>
                <div>
                    <input
                        type="text"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
          </form>
        </div>
    );
}

export default RegisterPage;