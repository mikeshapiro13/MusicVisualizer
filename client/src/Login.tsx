import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router';

export const Login = () => {
  const [username, setUser] = useState('Kyle');
  const [password, setPass] = useState('kylepass');
  const navigate = useNavigate();
  const alert = useRef(null)

  const handleLogin = async (e) => {
    try {
      const response = await fetch('query/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      });
      if (response.ok) {
        // login successful
        console.log('Login successful');
        navigate('/home');

      } else {
        // login failed
        alert.current.hidden = false;
        console.log('Login failed');
      }

    } catch (error) {
      console.error('Error: ', error);
    }
  }

  return (
    <div style={{margin: '0 auto'}}>
      <div style={{color:'#f00'}} ref={alert} hidden>Invalid Credentials!</div>
      <h3>
        Username: <input defaultValue={username} onChange={(e) => setUser(e.target.value)} />
        <br/>
        Password: <input defaultValue={password} onChange={(e) => setPass(e.target.value)} />
      </h3>
      <button onClick={handleLogin}>Submit</button>
    </div>
  )
}
