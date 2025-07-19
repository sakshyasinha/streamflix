import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayerOverlay = ({
  isPlaying = false,
  isLoading = false,
  isBuffering = false,
  onPlayPause,
  onDoubleTapSeek,
  className = ""
}) => {
  const handleDoubleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const centerX = rect.width / 2;
    
    if (onDoubleTapSeek) {
      if (clickX < centerX) {
        // Double click on left side - seek backward
        onDoubleTapSeek(-10);
      } else {
        // Double click on right side - seek forward
        onDoubleTapSeek(10);
      }
    }
  };

  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      onDoubleClick={handleDoubleClick}
    >
      {/* Loading spinner */}
      {(isLoading || isBuffering) && (
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          <span className="text-white text-sm">
            {isLoading ? 'Loading...' : 'Buffering...'}
          </span>
        </div>
      )}

      {/* Play/Pause button */}
      {!isLoading && !isBuffering && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onPlayPause}
          className="w-20 h-20 text-white hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={40} />
        </Button>
      )}

      {/* Seek indicators */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <div className="flex items-center space-x-2 text-white opacity-0 transition-opacity duration-200" id="seek-backward-indicator">
          <Icon name="RotateCcw" size={24} />
          <span className="text-sm">10s</span>
        </div>
      </div>
      
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <div className="flex items-center space-x-2 text-white opacity-0 transition-opacity duration-200" id="seek-forward-indicator">
          <span className="text-sm">10s</span>
          <Icon name="RotateCw" size={24} />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerOverlay;