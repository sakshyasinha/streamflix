import React from 'react';
import Button from '../../../components/ui/Button';

const AuthTabs = ({ isLogin, onToggle }) => {
  return (
    <div className="flex bg-muted rounded-lg p-1 mb-8">
      <Button
        type="button"
        variant={isLogin ? "default" : "ghost"}
        onClick={() => onToggle(true)}
        className={`flex-1 h-10 ${
          isLogin 
            ? 'bg-background text-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Sign In
      </Button>
      <Button
        type="button"
        variant={!isLogin ? "default" : "ghost"}
        onClick={() => onToggle(false)}
        className={`flex-1 h-10 ${
          !isLogin 
            ? 'bg-background text-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthTabs;