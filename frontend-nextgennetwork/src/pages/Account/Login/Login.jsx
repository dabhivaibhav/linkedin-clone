import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        navigate('/home');
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="logo">
          <h1>NextGenNetwork</h1>
        </div>
      </header>
      
      <main className="login-main">
        <div className="login-form-container">
          <h2>Sign in</h2>
          <p>Stay updated on your professional network</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Email or Phone" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={email ? 'has-value' : ''}
                required
              />
              {email && <span className="input-valid-icon">✓</span>}
            </div>
            
            <div className="form-group password-group">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
            
            <button 
              type="submit" 
              className={`sign-in-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <button className="google-sign-in">
            <span className="btn-icon">G</span>
            Sign in with Google
          </button>
          
          <button className="apple-sign-in">
            <span className="btn-icon">A</span>
            Sign in with Apple
          </button>
        </div>
        
        <div className="sign-up-prompt">
          New to NextGenNetwork? <Link to="/register">Join now</Link>
        </div>
      </main>
    </div>
  );
}

export default Login;