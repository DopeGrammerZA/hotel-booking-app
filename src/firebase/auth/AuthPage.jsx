import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
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
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to login. Please check your email and password.');
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input
          type="email"
          id="login-email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-submit">Login</button>
      <button
        type="button"
        className="btn-reset-password"
        onClick={() => navigate('/forgot-password')} 
      >
        Forgot Password?
      </button>
    </form>
  );
};

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user data to Firestore
      await setDoc(doc(collection(db, 'users'), user.uid), {
        name: name,
        email: email,
        // Add other fields as needed
      });

      // Redirect to dashboard or another page
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to register. Please try again.');
      console.error('Error registering:', error.message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="register-name">Full Name</label>
        <input
          type="text"
          id="register-name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="register-email">Email</label>
        <input
          type="email"
          id="register-email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="register-password">Password</label>
        <input
          type="password"
          id="register-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="register-confirm-password">Confirm Password</label>
        <input
          type="password"
          id="register-confirm-password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-submit">Register</button>
    </form>
  );
};

export default AuthPage;
