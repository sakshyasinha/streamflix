import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const VideoPlayerControls = ({ 
  isPlaying = false,
  currentTime = 0,
  duration = 0,
  volume = 1,
  isMuted = false,
  isFullscreen = false,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onFullscreenToggle,
  onBack,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [tempTime, setTempTime] = useState(currentTime);
  const hideTimeoutRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  const navigate = useNavigate();

  // Auto-hide controls
  useEffect(() => {
    const resetHideTimeout = () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      
      setIsVisible(true);
      
      if (isPlaying && !isDragging) {
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      }
    };

    resetHideTimeout();

    const handleMouseMove = () => {
      resetHideTimeout();
    };

    const handleKeyPress = () => {
      resetHideTimeout();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPlaying, isDragging]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          onPlayPause && onPlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onSeek && onSeek(Math.max(0, currentTime - 10));
          break;
        case 'ArrowRight':
          e.preventDefault();
          onSeek && onSeek(Math.min(duration, currentTime + 10));
          break;
        case 'ArrowUp':
          e.preventDefault();
          onVolumeChange && onVolumeChange(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          onVolumeChange && onVolumeChange(Math.max(0, volume - 0.1));
          break;
        case 'KeyM':
          e.preventDefault();
          onMuteToggle && onMuteToggle();
          break;
        case 'KeyF':
          e.preventDefault();
          onFullscreenToggle && onFullscreenToggle();
          break;
        case 'Escape':
          if (isFullscreen) {
            onFullscreenToggle && onFullscreenToggle();
          } else {
            handleBack();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentTime, duration, volume, isFullscreen, onPlayPause, onSeek, onVolumeChange, onMuteToggle, onFullscreenToggle]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    if (!progressRef.current || !onSeek) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    onSeek(newTime);
  };

  const handleProgressDrag = (e) => {
    if (!isDragging || !progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const dragX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, dragX / rect.width));
    const newTime = percentage * duration;
    
    setTempTime(newTime);
  };

  const handleProgressMouseDown = (e) => {
    setIsDragging(true);
    handleProgressClick(e);
    
    const handleMouseMove = (e) => handleProgressDrag(e);
    const handleMouseUp = () => {
      setIsDragging(false);
      if (onSeek) onSeek(tempTime);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleVolumeClick = (e) => {
    if (!volumeRef.current || !onVolumeChange) return;
    
    const rect = volumeRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const percentage = 1 - (clickY / rect.height);
    const newVolume = Math.max(0, Math.min(1, percentage));
    
    onVolumeChange(newVolume);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const displayTime = isDragging ? tempTime : currentTime;
  const progressPercentage = duration > 0 ? (displayTime / duration) * 100 : 0;

  return (
    <div className={`absolute inset-0 z-player transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    } ${className}`}>
      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-white hover:bg-white/20"
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Icon name="Cast" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Center Play/Pause */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPlayPause}
          className="w-16 h-16 text-white hover:bg-white/20 rounded-full"
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={32} />
        </Button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div
            ref={progressRef}
            className="relative h-2 bg-white/30 rounded-full cursor-pointer group"
            onClick={handleProgressClick}
            onMouseDown={handleProgressMouseDown}
          >
            <div
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-150"
              style={{ width: `${progressPercentage}%` }}
            />
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{ left: `${progressPercentage}%`, marginLeft: '-8px' }}
            />
          </div>
        </div>

        {/* Control Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPlayPause}
              className="text-white hover:bg-white/20"
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSeek && onSeek(Math.max(0, currentTime - 10))}
              className="text-white hover:bg-white/20"
            >
              <Icon name="RotateCcw" size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSeek && onSeek(Math.min(duration, currentTime + 10))}
              className="text-white hover:bg-white/20"
            >
              <Icon name="RotateCw" size={20} />
            </Button>

            {/* Volume Control */}
            <div 
              className="relative flex items-center space-x-2"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onMuteToggle}
                className="text-white hover:bg-white/20"
              >
                <Icon 
                  name={isMuted || volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"} 
                  size={20} 
                />
              </Button>
              
              {showVolumeSlider && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-black/80 rounded">
                  <div
                    ref={volumeRef}
                    className="w-2 h-20 bg-white/30 rounded-full cursor-pointer relative"
                    onClick={handleVolumeClick}
                  >
                    <div
                      className="absolute bottom-0 left-0 w-full bg-primary rounded-full"
                      style={{ height: `${volume * 100}%` }}
                    />
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full"
                      style={{ bottom: `${volume * 100}%`, marginBottom: '-6px' }}
                    />
                  </div>
                </div>
              )}
            </div>

            <span className="text-white text-sm font-mono">
              {formatTime(displayTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Icon name="Subtitles" size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onFullscreenToggle}
              className="text-white hover:bg-white/20"
            >
              <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerControls;