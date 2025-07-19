import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const SocialLogin = ({ isLogin }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);
  const navigate = useNavigate();

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    
    try {
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social login
      localStorage.setItem('streamflix-auth', JSON.stringify({
        email: `user@${provider}.com`,
        fullName: `${provider} User`,
        provider: provider,
        isAuthenticated: true,
        loginTime: new Date().toISOString()
      }));
      
      navigate('/profile-selection-management');
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300',
      action: () => handleSocialLogin('google')
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 text-white hover:bg-blue-700',
      action: () => handleSocialLogin('facebook')
    }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            Or {isLogin ? 'sign in' : 'sign up'} with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.name}
            type="button"
            variant="outline"
            onClick={provider.action}
            loading={loadingProvider === provider.name.toLowerCase()}
            disabled={loadingProvider !== null}
            className={`h-12 ${provider.color}`}
            iconName={provider.icon}
            iconPosition="left"
            iconSize={20}
          >
            {provider.name}
          </Button>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <Button variant="link" className="text-xs p-0 h-auto text-primary">
            Terms of Service
          </Button>{' '}
          and{' '}
          <Button variant="link" className="text-xs p-0 h-auto text-primary">
            Privacy Policy
          </Button>
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;