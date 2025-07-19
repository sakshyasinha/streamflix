import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const VideoPlayerSubtitles = ({
  isVisible = false,
  subtitles = [],
  currentSubtitle = null,
  availableLanguages = [],
  selectedLanguage = 'en',
  fontSize = 'medium',
  fontColor = '#FFFFFF',
  backgroundColor = 'rgba(0, 0, 0, 0.8)',
  onLanguageChange,
  onFontSizeChange,
  onFontColorChange,
  onBackgroundColorChange,
  onToggle,
  className = ""
}) => {
  const [showSettings, setShowSettings] = useState(false);

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'Extra Large' }
  ];

  const colorOptions = [
    { value: '#FFFFFF', label: 'White' },
    { value: '#FFFF00', label: 'Yellow' },
    { value: '#00FF00', label: 'Green' },
    { value: '#FF0000', label: 'Red' },
    { value: '#0000FF', label: 'Blue' },
    { value: '#FF00FF', label: 'Magenta' },
    { value: '#00FFFF', label: 'Cyan' }
  ];

  const backgroundOptions = [
    { value: 'rgba(0, 0, 0, 0.8)', label: 'Black (80%)' },
    { value: 'rgba(0, 0, 0, 0.6)', label: 'Black (60%)' },
    { value: 'rgba(0, 0, 0, 0.4)', label: 'Black (40%)' },
    { value: 'rgba(0, 0, 0, 0)', label: 'Transparent' },
    { value: 'rgba(255, 255, 255, 0.8)', label: 'White (80%)' }
  ];

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      case 'extra-large': return 'text-xl';
      default: return 'text-base';
    }
  };

  const languageOptions = availableLanguages.map(lang => ({
    value: lang.code,
    label: lang.name
  }));

  return (
    <div className={`relative ${className}`}>
      {/* Subtitle display */}
      {isVisible && currentSubtitle && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 max-w-4xl px-4">
          <div
            className={`${getFontSizeClass()} font-medium text-center px-4 py-2 rounded leading-relaxed`}
            style={{
              color: fontColor,
              backgroundColor: backgroundColor,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
            }}
          >
            {currentSubtitle.text}
          </div>
        </div>
      )}

      {/* Subtitle controls */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSettings(!showSettings)}
          className="text-white hover:bg-white/20 transition-colors"
          title="Subtitle settings"
        >
          <Icon name="Settings" size={18} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={`transition-colors ${
            isVisible 
              ? 'text-primary hover:bg-primary/20' :'text-white hover:bg-white/20'
          }`}
          title="Toggle subtitles"
        >
          <Icon name="Subtitles" size={18} />
        </Button>

        {/* Settings panel */}
        {showSettings && (
          <div className="absolute bottom-full right-0 mb-2 w-80 bg-black/90 border border-white/20 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-medium">Subtitle Settings</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(false)}
                className="text-white hover:bg-white/20"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            {/* Language selection */}
            {languageOptions.length > 0 && (
              <div>
                <Select
                  label="Language"
                  options={languageOptions}
                  value={selectedLanguage}
                  onChange={onLanguageChange}
                  className="text-white"
                />
              </div>
            )}

            {/* Font size */}
            <div>
              <Select
                label="Font Size"
                options={fontSizeOptions}
                value={fontSize}
                onChange={onFontSizeChange}
                className="text-white"
              />
            </div>

            {/* Font color */}
            <div>
              <Select
                label="Text Color"
                options={colorOptions}
                value={fontColor}
                onChange={onFontColorChange}
                className="text-white"
              />
            </div>

            {/* Background */}
            <div>
              <Select
                label="Background"
                options={backgroundOptions}
                value={backgroundColor}
                onChange={onBackgroundColorChange}
                className="text-white"
              />
            </div>

            {/* Preview */}
            <div className="border-t border-white/20 pt-4">
              <p className="text-white text-xs mb-2">Preview:</p>
              <div
                className={`${getFontSizeClass()} font-medium text-center px-3 py-2 rounded`}
                style={{
                  color: fontColor,
                  backgroundColor: backgroundColor,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                }}
              >
                Sample subtitle text
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayerSubtitles;