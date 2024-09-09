import React, { useState } from 'react';
import { auth } from '../firebase';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Register.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleTabChange = (type) => {
    setIsLogin(type === 'login');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Login
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => handleTabChange('register')}
          >
            Register
          </button>
        </div>
        <div className="auth-form">
          {isLogin ? (
            <LoginForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleLogin={handleLogin}
              error={error}
              handleTabChange={handleTabChange}
            />
          ) : (
            <RegisterForm
              name={name}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              handleRegister={handleRegister}
              error={error}
              handleTabChange={handleTabChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
