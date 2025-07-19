import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayerControls = ({
  isPlaying = false,
  currentTime = 0,
  duration = 0,
  volume = 1,
  isMuted = false,
  isFullscreen = false,
  subtitlesEnabled = false,
  qualityOptions = [],
  currentQuality = 'Auto',
  onPlayPause,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onFullscreenToggle,
  onSubtitlesToggle,
  onQualityChange,
  className = ""
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const volumeRef = useRef(null);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVolumeClick = (e) => {
    if (!volumeRef.current || !onVolumeChange) return;
    
    const rect = volumeRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const percentage = 1 - (clickY / rect.height);
    const newVolume = Math.max(0, Math.min(1, percentage));
    
    onVolumeChange(newVolume);
  };

  const handleSkipBackward = () => {
    onSeek && onSeek(Math.max(0, currentTime - 10));
  };

  const handleSkipForward = () => {
    onSeek && onSeek(Math.min(duration, currentTime + 10));
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return "VolumeX";
    if (volume < 0.3) return "Volume";
    if (volume < 0.7) return "Volume1";
    return "Volume2";
  };

  return (
    <div className={`flex items-center justify-between text-white ${className}`}>
      {/* Left controls */}
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPlayPause}
          className="text-white hover:bg-white/20 transition-colors"
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSkipBackward}
          className="text-white hover:bg-white/20 transition-colors"
          title="Skip backward 10s"
        >
          <Icon name="RotateCcw" size={18} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSkipForward}
          className="text-white hover:bg-white/20 transition-colors"
          title="Skip forward 10s"
        >
          <Icon name="RotateCw" size={18} />
        </Button>

        {/* Volume Control */}
        <div 
          className="relative flex items-center"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onMuteToggle}
            className="text-white hover:bg-white/20 transition-colors"
          >
            <Icon name={getVolumeIcon()} size={18} />
          </Button>
          
          {showVolumeSlider && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-black/80 rounded">
              <div
                ref={volumeRef}
                className="w-1 h-20 bg-white/30 rounded-full cursor-pointer relative"
                onClick={handleVolumeClick}
              >
                <div
                  className="absolute bottom-0 left-0 w-full bg-primary rounded-full transition-all duration-150"
                  style={{ height: `${volume * 100}%` }}
                />
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full transition-all duration-150"
                  style={{ bottom: `${volume * 100}%`, marginBottom: '-6px' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Time display */}
        <span className="text-sm font-mono text-white/90 min-w-max">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSubtitlesToggle}
          className={`transition-colors ${
            subtitlesEnabled 
              ? 'text-primary hover:bg-primary/20' :'text-white hover:bg-white/20'
          }`}
          title="Toggle subtitles"
        >
          <Icon name="Subtitles" size={18} />
        </Button>

        {/* Quality selector */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowQualityMenu(!showQualityMenu)}
            className="text-white hover:bg-white/20 transition-colors text-xs px-2"
          >
            {currentQuality}
          </Button>
          
          {showQualityMenu && (
            <div className="absolute bottom-full right-0 mb-2 bg-black/90 border border-white/20 rounded-lg py-2 min-w-24 z-50">
              {qualityOptions.map((quality) => (
                <button
                  key={quality}
                  onClick={() => {
                    onQualityChange && onQualityChange(quality);
                    setShowQualityMenu(false);
                  }}
                  className={`w-full px-3 py-1 text-xs text-left transition-colors ${
                    quality === currentQuality
                      ? 'text-primary bg-primary/20' :'text-white hover:bg-white/20'
                  }`}
                >
                  {quality}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            // Picture-in-picture functionality placeholder
            if (document.pictureInPictureEnabled) {
              // PiP logic would go here
            }
          }}
          className="text-white hover:bg-white/20 transition-colors"
          title="Picture in Picture"
        >
          <Icon name="PictureInPicture2" size={18} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onFullscreenToggle}
          className="text-white hover:bg-white/20 transition-colors"
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={18} />
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayerControls;