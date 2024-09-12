import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from './authSlice';
import { useNavigate } from 'react-router-dom';
import '../../components/Register.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleTabChange = (type) => {
    setIsLogin(type === 'login');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-tabs">
          <button className={`auth-tab ${isLogin ? 'active' : ''}`} onClick={() => handleTabChange('login')}>
            Login
          </button>
          <button className={`auth-tab ${!isLogin ? 'active' : ''}`} onClick={() => handleTabChange('register')}>
            Register
          </button>
        </div>
        <div className="auth-form">{isLogin ? <LoginForm /> : <RegisterForm />}</div>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((res) => {
      if (!res.error) {
        if (user.isAdmin) {
          navigate('/adminDashboard');
        } else {
          navigate('/accomodationList');
        }
      }
    });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(registerUser({ email, password })).then((res) => {
      if (!res.error) {
        navigate('/');
      }
    });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="register-email">Email</label>
        <input type="email" id="register-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="register-password">Password</label>
        <input type="password" id="register-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="register-confirm-password">Confirm Password</label>
        <input type="password" id="register-confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default AuthPage;
