import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Router from 'next/router';




const Login = () => {
  const {register,formState: { errors },handleSubmit , reset} = useForm({criteriaMode: "all"});

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  async function onSubmitForm() {

    let config = {
      method: 'post',
      url: `/api/login`,
      headers: {
        'Content-Type': 'application/json',
      },
        data: {username, password},
      }
      const response = await axios(config);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        Router.push('/');
      } else {
        setError('Username or password is incorrect');
      }
    } 
  

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default Login;




