import React, { useState } from 'react';
import { auth } from './firebase-config'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from './auth';

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in successfully');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registered successfully');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default AuthComponent;
