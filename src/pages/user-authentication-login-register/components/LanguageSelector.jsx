import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    setIsOpen(false);
    localStorage.setItem('streamflix-language', languageCode);
  };

  return (
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="text-white/80 hover:text-white hover:bg-white/10 h-10 px-3"
      >
        <span className="mr-2">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
        <Icon name="ChevronDown" size={16} className="ml-2" />
      </Button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 z-dropdown animate-slide-in">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
                selectedLanguage === language.code
                  ? 'bg-primary/10 text-primary' :'text-popover-foreground hover:bg-muted/50'
              }`}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
              {selectedLanguage === language.code && (
                <Icon name="Check" size={16} className="ml-auto text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;