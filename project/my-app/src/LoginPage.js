import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  HelpCircle, 
  Settings, 
  MessageCircle ,
  AtomIcon
} from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add login authentication logic here
    console.log('Login attempted:', { username, password });
  };

  return (
    <div className="login-container">
      {/* Navigation Menu Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="app-title">MyApp</div>
          <div className="nav-links">
            <a href="#" className="nav-link">
              <Home className="nav-icon" size={20} /> Home
            </a>
            <a href="#" className="nav-link">
              <Users className="nav-icon" size={20} /> About Us
            </a>
            <a href="#" className="nav-link">
              <MessageCircle className="nav-icon" size={20} /> Contact
            </a>
            <a href="#" className="nav-link">
              <HelpCircle className="nav-icon" size={20} /> Support
            </a>
            <a href="#" className="nav-link">
              <Settings className="nav-icon" size={20} /> Settings
            </a>
          </div>
        </div>
      </nav>

      {/* Login Container */}
      <div className="login-wrapper">
        <div className="login-box">
          <h2 className="login-title">
            Login to Your Account
          </h2>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input 
                type="text" 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="login-button"
            >
              Login
            </button>
          </form>
          
          <div className="signup-link">
            <p>
              Don't have an account? {' '}
              <a href="/SignupPage" className="signup-text">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        © 2025 MyApp. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;