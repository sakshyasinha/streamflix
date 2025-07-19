import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AuthForm = ({ isLogin, onToggleMode }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for authentication
  const mockCredentials = {
    email: 'user@streamflix.com',
    password: 'StreamFlix123!'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!isLogin && formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Email addresses do not match';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!isLogin && !formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { text: 'Very Weak', color: 'text-error' },
      { text: 'Weak', color: 'text-warning' },
      { text: 'Fair', color: 'text-warning' },
      { text: 'Good', color: 'text-success' },
      { text: 'Strong', color: 'text-success' }
    ];

    return { strength, ...levels[strength] };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (isLogin) {
        // Check mock credentials
        if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
          // Successful login
          localStorage.setItem('streamflix-auth', JSON.stringify({
            email: formData.email,
            isAuthenticated: true,
            loginTime: new Date().toISOString()
          }));
          navigate('/profile-selection-management');
        } else {
          setErrors({
            email: 'Invalid email or password. Use: user@streamflix.com / StreamFlix123!',
            password: 'Invalid email or password. Use: user@streamflix.com / StreamFlix123!'
          });
        }
      } else {
        // Registration successful
        localStorage.setItem('streamflix-auth', JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          isAuthenticated: true,
          registrationTime: new Date().toISOString()
        }));
        navigate('/profile-selection-management');
      }
    } catch (error) {
      setErrors({
        submit: 'An error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = !isLogin ? getPasswordStrength(formData.password) : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!isLogin && (
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleInputChange}
          error={errors.fullName}
          required
          disabled={isLoading}
        />
      )}

      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        required
        disabled={isLoading}
      />

      {!isLogin && (
        <Input
          label="Confirm Email"
          type="email"
          name="confirmEmail"
          placeholder="Confirm your email"
          value={formData.confirmEmail}
          onChange={handleInputChange}
          error={errors.confirmEmail}
          required
          disabled={isLoading}
        />
      )}

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
          disabled={isLoading}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
          disabled={isLoading}
        >
          <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
        </Button>
      </div>

      {!isLogin && passwordStrength && formData.password && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  passwordStrength.strength <= 1 ? 'bg-error' :
                  passwordStrength.strength <= 3 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
              />
            </div>
            <span className={`text-sm font-medium ${passwordStrength.color}`}>
              {passwordStrength.text}
            </span>
          </div>
        </div>
      )}

      {!isLogin && (
        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
            disabled={isLoading}
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
          </Button>
        </div>
      )}

      {isLogin && (
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="link"
            className="text-primary hover:text-primary/80 p-0 h-auto"
            disabled={isLoading}
          >
            Forgot Password?
          </Button>
        </div>
      )}

      {!isLogin && (
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleInputChange}
          error={errors.acceptTerms}
          required
          disabled={isLoading}
        />
      )}

      {errors.submit && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-error text-sm">{errors.submit}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="h-12"
      >
        {isLogin ? 'Sign In' : 'Create Account'}
      </Button>

      <div className="text-center">
        <span className="text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
        </span>
        <Button
          type="button"
          variant="link"
          onClick={onToggleMode}
          className="text-primary hover:text-primary/80 p-0 h-auto"
          disabled={isLoading}
        >
          {isLogin ? 'Sign up' : 'Sign in'}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;