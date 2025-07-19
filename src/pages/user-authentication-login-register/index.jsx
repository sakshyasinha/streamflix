import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AuthTabs from './components/AuthTabs';
import AuthForm from './components/AuthForm';
import SocialLogin from './components/SocialLogin';
import HeroBackground from './components/HeroBackground';
import LanguageSelector from './components/LanguageSelector';
import HelpSection from './components/HelpSection';

const UserAuthenticationLoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authData = localStorage.getItem('streamflix-auth');
    if (authData) {
      const parsed = JSON.parse(authData);
      if (parsed.isAuthenticated) {
        navigate('/home-dashboard');
      }
    }
  }, [navigate]);

  const handleToggleMode = (loginMode) => {
    setIsLogin(loginMode);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-background">
      {/* Hero Background */}
      <HeroBackground />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Play" size={28} color="white" />
            </div>
            <h1 className="text-3xl font-bold text-white">StreamFlix</h1>
          </div>
          <p className="text-white/80 text-lg">
            {isLogin ? 'Welcome back!' : 'Join millions of viewers'}
          </p>
        </div>

        {/* Auth Container */}
        <div className="bg-background/95 backdrop-blur-md rounded-2xl shadow-elevation-3 p-8 border border-border/50">
          {/* Auth Tabs */}
          <AuthTabs isLogin={isLogin} onToggle={handleToggleMode} />

          {/* Auth Form */}
          <AuthForm isLogin={isLogin} onToggleMode={() => setIsLogin(!isLogin)} />

          {/* Social Login */}
          <div className="mt-6">
            <SocialLogin isLogin={isLogin} />
          </div>
        </div>

        {/* Help Section */}
        <HelpSection />

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between">
          <LanguageSelector />
          
          <div className="flex items-center space-x-4">
            <Button
              variant="link"
              className="text-white/60 hover:text-white text-sm p-0 h-auto"
            >
              Privacy
            </Button>
            <Button
              variant="link"
              className="text-white/60 hover:text-white text-sm p-0 h-auto"
            >
              Terms
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} StreamFlix. All rights reserved.
          </p>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-16 w-16 h-16 border border-white/20 rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/20 rounded-lg rotate-12"></div>
      </div>
    </div>
  );
};

export default UserAuthenticationLoginRegister;