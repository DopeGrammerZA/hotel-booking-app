import React, { useState } from 'react';
import '../css/Register.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleTabChange = (type) => {
    setIsLogin(type === 'login');
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
            <LoginForm />
          ) : (
            <RegisterForm />
          )}
        </div>
      </div>
    </div>
  );
};

const LoginForm = () => {
  return (
    <form className="login-form">
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input type="email" id="login-email" placeholder="Enter your email" required />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input type="password" id="login-password" placeholder="Enter your password" required />
      </div>
      <button type="submit" className="btn-submit">Login</button>
      <p className="form-link">
        Don't have an account? <button type="button" onClick={() => handleTabChange('register')}>Register</button>
      </p>
    </form>
  );
};

const RegisterForm = () => {
  return (
    <form className="register-form">
      <h2>Register</h2>
      <div className="form-group">
        <label htmlFor="register-name">Full Name</label>
        <input type="text" id="register-name" placeholder="Enter your full name" required />
      </div>
      <div className="form-group">
        <label htmlFor="register-email">Email</label>
        <input type="email" id="register-email" placeholder="Enter your email" required />
      </div>
      <div className="form-group">
        <label htmlFor="register-password">Password</label>
        <input type="password" id="register-password" placeholder="Enter your password" required />
      </div>
      <div className="form-group">
        <label htmlFor="register-confirm-password">Confirm Password</label>
        <input type="password" id="register-confirm-password" placeholder="Confirm your password" required />
      </div>
      <button type="submit" className="btn-submit">Register</button>
      <p className="form-link">
        Already have an account? <button type="button" onClick={() => handleTabChange('login')}>Login</button>
      </p>
    </form>
  );
};

export default AuthPage;
