import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../auth/authSlice';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import '../../components/Register.css';

const auth = getAuth();

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();

        dispatch(setUser({ uid: user.uid, email: user.email, role: user?.role || 'user' }));

        if (userData?.role === 'admin' && user.email === 'AdminOnly@gmail.com') {
          navigate('/adminDashboard');
        } else {
          navigate('/Dashboard');
        }
      } catch (error) {
        setError('Failed to login. Please check your email and password.');
        console.error('Error signing in:', error.message);
      }
    };

    return (
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        {error && <p className="error-message">{error}</p>}
      </form>
    );
  }

  function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          role: 'user',
        });

        dispatch(setUser({ uid: user.uid, email: user.email, role: 'user' }));
        navigate('/Dashboard');
      } catch (error) {
        setError('Failed to register. Please try again.');
        console.error('Error registering:', error.message);
      }
    };

    return (
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

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
        {error && <p className="error-message">{error}</p>}
      </form>
    );
  }
};

export default AuthPage;
