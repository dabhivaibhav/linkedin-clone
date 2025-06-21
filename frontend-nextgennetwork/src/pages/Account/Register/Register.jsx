import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Registration() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  
  // Form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    phone: '',
    location: ''
  });
  
  // Validation errors
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    phone: '',
    location: ''
  });
  
  // Password strength
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasLower: false,
    hasUpper: false,
    hasDigit: false,
    hasSpecial: false,
    hasMinLength: false
  });
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Check password strength if password field
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };
  
  // Check password strength
  const checkPasswordStrength = (password) => {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;
    
    let score = 0;
    if (hasLower) score++;
    if (hasUpper) score++;
    if (hasDigit) score++;
    if (hasSpecial) score++;
    if (hasMinLength) score++;
    
    setPasswordStrength({
      score,
      hasLower,
      hasUpper,
      hasDigit,
      hasSpecial,
      hasMinLength
    });
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    
    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (passwordStrength.score < 4) {
      newErrors.password = 'Password is not strong enough';
      isValid = false;
    }
    
    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    // Birthdate validation
    if (!formData.birthdate) {
      newErrors.birthdate = 'Birthdate is required';
      isValid = false;
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/i.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Invalid phone number';
      isValid = false;
    }
    
    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    setFormValid(isValid);
    return isValid;
  };
  
  // Check form validity on data change
  useEffect(() => {
    validateForm();
  }, [formData]);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setToastMessage('Registration successful! Welcome to NextGenNetwork.');
        setToastType('success');
        setShowToast(true);
        
        // Redirect to login after successful registration
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }, 1500);
    }
  };
  
  // Handle location suggestions (mock implementation)
  const handleLocationSuggestion = (e) => {
    // In a real implementation, this would call the Google Maps API
    // For now, we'll just simulate suggestions
    if (formData.location.length > 2) {
      // Mock suggestions would appear here
    }
  };
  
  return (
    <div className="registration-container">
      <header className="registration-header">
        <div className="logo">
          <h1>NGN</h1>
        </div>
      </header>
      
      <main className="registration-main">
        <div className="registration-form-container">
          <h2>Create your account</h2>
          <p>Join our professional network</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                  required
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                  required
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                required
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input 
                  type="password" 
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  required
                />
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
              
              <div className="password-strength">
                <div className="strength-meter">
                  <div 
                    className="strength-meter-fill" 
                    style={{ 
                      width: `${(passwordStrength.score / 5) * 100}%`,
                      backgroundColor: 
                        passwordStrength.score < 2 ? '#ff4d4f' : 
                        passwordStrength.score < 4 ? '#faad14' : 
                        '#52c41a'
                    }}
                  ></div>
                </div>
                <div className="strength-text">
                  {passwordStrength.score === 0 && 'Enter a password'}
                  {passwordStrength.score === 1 && 'Very weak'}
                  {passwordStrength.score === 2 && 'Weak'}
                  {passwordStrength.score === 3 && 'Medium'}
                  {passwordStrength.score === 4 && 'Strong'}
                  {passwordStrength.score === 5 && 'Very strong'}
                </div>
              </div>
              
              <div className="password-requirements">
                <p>Password must contain:</p>
                <ul>
                  <li className={passwordStrength.hasLower ? 'met' : ''}>
                    Lowercase letter
                  </li>
                  <li className={passwordStrength.hasUpper ? 'met' : ''}>
                    Uppercase letter
                  </li>
                  <li className={passwordStrength.hasDigit ? 'met' : ''}>
                    Number
                  </li>
                  <li className={passwordStrength.hasSpecial ? 'met' : ''}>
                    Special character
                  </li>
                  <li className={passwordStrength.hasMinLength ? 'met' : ''}>
                    At least 8 characters
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                required
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="birthdate">Birthdate</label>
              <input 
                type="date" 
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                className={errors.birthdate ? 'error' : ''}
                required
              />
              {errors.birthdate && <span className="error-text">{errors.birthdate}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input 
                type="tel" 
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                className={errors.phone ? 'error' : ''}
                required
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input 
                type="text" 
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                onKeyUp={handleLocationSuggestion}
                placeholder="City, State, Country"
                className={errors.location ? 'error' : ''}
                required
              />
              {errors.location && <span className="error-text">{errors.location}</span>}
              <div className="location-suggestions">
                {/* Location suggestions would appear here */}
              </div>
            </div>
            
            <button 
              type="submit" 
              className="register-button"
              disabled={!formValid || isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="login-prompt">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </main>
      
      {showToast && (
        <div className={`toast ${toastType}`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default Registration;