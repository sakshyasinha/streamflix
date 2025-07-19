import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HelpSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const helpItems = [
    {
      question: "Can\'t sign in?",
      answer: "Try resetting your password or check if your email is correct. Make sure your internet connection is stable."
    },
    {
      question: "Forgot your password?",
      answer: "Click on \'Forgot Password\' link and we\'ll send you instructions to reset your password via email."
    },
    {
      question: "Account locked?",
      answer: "If you've tried signing in multiple times unsuccessfully, your account may be temporarily locked for security."
    },
    {
      question: "Need to contact support?",
      answer: "Visit our Help Center or contact customer support for personalized assistance with your account."
    }
  ];

  return (
    <div className="mt-8">
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-white/80 hover:text-white hover:bg-white/10 w-full justify-center"
      >
        <Icon name="HelpCircle" size={16} className="mr-2" />
        Need Help?
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="ml-2" 
        />
      </Button>

      {isExpanded && (
        <div className="mt-4 space-y-3 animate-slide-in">
          {helpItems.map((item, index) => (
            <details key={index} className="group">
              <summary className="cursor-pointer text-white/70 hover:text-white font-medium">
                {item.question}
              </summary>
              <div className="mt-2 text-white/60 text-sm pl-4">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpSection;