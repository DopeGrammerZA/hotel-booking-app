import React from 'react';

const LoginForm = ({ email, password, setEmail, setPassword, handleLogin, error, handleTabChange }) => {
  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input
          type="email"
          id="login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="btn-submit">Login</button>
      <p className="form-link">
        Don't have an account? <button type="button" onClick={() => handleTabChange('register')}>Register</button>
      </p>
    </form>
  );
};

export default LoginForm;
