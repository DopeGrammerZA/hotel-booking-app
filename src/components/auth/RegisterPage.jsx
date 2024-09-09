
import React from 'react';

const RegisterForm = ({ name, email, password, confirmPassword, setName, setEmail, setPassword, setConfirmPassword, handleRegister, error, handleTabChange }) => {
  return (
    <form className="register-form" onSubmit={handleRegister}>
      <h2>Register</h2>
      <div className="form-group">
        <label htmlFor="register-name">Full Name</label>
        <input
          type="text"
          id="register-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="register-email">Email</label>
        <input
          type="email"
          id="register-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="register-password">Password</label>
        <input
          type="password"
          id="register-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="register-confirm-password">Confirm Password</label>
        <input
          type="password"
          id="register-confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="btn-submit">Register</button>
      <p className="form-link">
        Already have an account? <button type="button" onClick={() => handleTabChange('login')}>Login</button>
      </p>
    </form>
  );
};

export default RegisterForm;
