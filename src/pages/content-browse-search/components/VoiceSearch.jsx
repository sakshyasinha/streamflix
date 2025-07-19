import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceSearch = ({ onResult, onError, className = '' }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        if (onResult) {
          onResult(transcript);
        }
      };

      recognitionInstance.onerror = (event) => {
        setIsListening(false);
        if (onError) {
          onError(event.error);
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onResult, onError]);

  const startListening = () => {
    if (recognition && !isListening) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Speech recognition error:', error);
        if (onError) {
          onError('Failed to start voice recognition');
        }
      }
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={isListening ? stopListening : startListening}
        className={`transition-all duration-200 ${
          isListening 
            ? 'text-primary bg-primary/10 animate-pulse' :'text-muted-foreground hover:text-foreground'
        }`}
        disabled={!isSupported}
      >
        <Icon name="Mic" size={16} />
      </Button>

      {isListening && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-elevation-2 whitespace-nowrap z-dropdown animate-slide-in">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-popover-foreground">Listening...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSearch;