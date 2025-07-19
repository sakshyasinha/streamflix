import React, { useState, useRef } from 'react';

const VideoPlayerProgress = ({
  currentTime = 0,
  duration = 0,
  bufferedTime = 0,
  chapters = [],
  onSeek,
  onSeekStart,
  onSeekEnd,
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(0);
  const progressRef = useRef(null);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTimeFromPosition = (clientX) => {
    if (!progressRef.current) return 0;
    
    const rect = progressRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return percentage * duration;
  };

  const handleMouseMove = (e) => {
    if (!progressRef.current) return;
    
    const time = getTimeFromPosition(e.clientX);
    const rect = progressRef.current.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;
    
    setHoverTime(time);
    setHoverPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
  };

  const handleClick = (e) => {
    const time = getTimeFromPosition(e.clientX);
    onSeek && onSeek(time);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    onSeekStart && onSeekStart();
    
    const handleMouseMove = (e) => {
      const time = getTimeFromPosition(e.clientX);
      onSeek && onSeek(time);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      onSeekEnd && onSeekEnd();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    handleClick(e);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercentage = duration > 0 ? (bufferedTime / duration) * 100 : 0;

  return (
    <div className={`relative ${className}`}>
      {/* Hover time tooltip */}
      {hoverTime !== null && (
        <div 
          className="absolute bottom-full mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded pointer-events-none transform -translate-x-1/2"
          style={{ left: `${hoverPosition}%` }}
        >
          {formatTime(hoverTime)}
        </div>
      )}
      
      {/* Progress bar container */}
      <div
        ref={progressRef}
        className="relative h-2 bg-white/30 rounded-full cursor-pointer group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
      >
        {/* Buffered progress */}
        <div
          className="absolute top-0 left-0 h-full bg-white/50 rounded-full transition-all duration-150"
          style={{ width: `${bufferedPercentage}%` }}
        />
        
        {/* Current progress */}
        <div
          className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-150"
          style={{ width: `${progressPercentage}%` }}
        />
        
        {/* Chapter markers */}
        {chapters.map((chapter, index) => {
          const chapterPosition = duration > 0 ? (chapter.startTime / duration) * 100 : 0;
          return (
            <div
              key={index}
              className="absolute top-0 w-0.5 h-full bg-white/60"
              style={{ left: `${chapterPosition}%` }}
              title={chapter.title}
            />
          );
        })}
        
        {/* Scrubber handle */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full transition-all duration-150 ${
            isDragging ? 'scale-125 opacity-100' : 'scale-100 opacity-0 group-hover:opacity-100'
          }`}
          style={{ left: `${progressPercentage}%`, marginLeft: '-8px' }}
        />
        
        {/* Hover indicator */}
        {hoverTime !== null && !isDragging && (
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-60"
            style={{ left: `${hoverPosition}%`, marginLeft: '-6px' }}
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayerProgress;