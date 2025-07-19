import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VideoPlayerHeader from './components/VideoPlayerHeader';
import VideoPlayerProgress from './components/VideoPlayerProgress';
import VideoPlayerControls from './components/VideoPlayerControls';
import VideoPlayerOverlay from './components/VideoPlayerOverlay';
import VideoPlayerSubtitles from './components/VideoPlayerSubtitles';

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedTime, setBufferedTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  // UI state
  const [controlsVisible, setControlsVisible] = useState(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [currentQuality, setCurrentQuality] = useState('Auto');

  // Mock content data
  const contentData = location.state || {
    id: 1,
    title: "Stranger Things",
    type: "series",
    season: 4,
    episode: 1,
    episodeTitle: "The Hellfire Club",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: 3120, // 52 minutes
    currentTime: 0,
    chapters: [
      { startTime: 0, title: "Opening" },
      { startTime: 300, title: "The Game Begins" },
      { startTime: 900, title: "Strange Occurrences" },
      { startTime: 1800, title: "The Investigation" },
      { startTime: 2400, title: "Revelations" }
    ]
  };

  const qualityOptions = ['Auto', '1080p', '720p', '480p', '360p'];
  
  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' }
  ];

  const mockSubtitles = [
    { startTime: 0, endTime: 3, text: "Welcome to Stranger Things" },
    { startTime: 3, endTime: 6, text: "The adventure continues..." },
    { startTime: 6, endTime: 10, text: "In the town of Hawkins" }
  ];

  // Auto-hide controls
  useEffect(() => {
    const resetHideTimeout = () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      
      setControlsVisible(true);
      
      if (isPlaying) {
        hideTimeoutRef.current = setTimeout(() => {
          setControlsVisible(false);
        }, 3000);
      }
    };

    resetHideTimeout();

    const handleMouseMove = () => resetHideTimeout();
    const handleKeyPress = () => resetHideTimeout();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleSeek(Math.max(0, currentTime - 10));
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleSeek(Math.min(duration, currentTime + 10));
          break;
        case 'ArrowUp':
          e.preventDefault();
          handleVolumeChange(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleVolumeChange(Math.max(0, volume - 0.1));
          break;
        case 'KeyM':
          e.preventDefault();
          handleMuteToggle();
          break;
        case 'KeyF':
          e.preventDefault();
          handleFullscreenToggle();
          break;
        case 'KeyC':
          e.preventDefault();
          setSubtitlesEnabled(!subtitlesEnabled);
          break;
        case 'Escape':
          if (isFullscreen) {
            handleFullscreenToggle();
          } else {
            handleBack();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentTime, duration, volume, isFullscreen, subtitlesEnabled]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
      // Resume from saved position
      if (contentData.currentTime > 0) {
        video.currentTime = contentData.currentTime;
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      // Save progress to localStorage
      localStorage.setItem(`streamflix-progress-${contentData.id}`, JSON.stringify({
        currentTime: video.currentTime,
        duration: video.duration,
        timestamp: Date.now()
      }));
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        setBufferedTime(video.buffered.end(video.buffered.length - 1));
      }
    };

    const handleWaiting = () => setIsBuffering(true);
    const handleCanPlay = () => setIsBuffering(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [contentData.id, contentData.currentTime]);

  // Fullscreen handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleSeek = (time) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (newVolume) => {
    const video = videoRef.current;
    if (!video) return;

    setVolume(newVolume);
    video.volume = newVolume;
    
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      video.muted = false;
    }
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);
    video.muted = newMuted;
  };

  const handleFullscreenToggle = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleDoubleTapSeek = (seconds) => {
    handleSeek(Math.max(0, Math.min(duration, currentTime + seconds)));
    
    // Show seek indicator
    const indicator = seconds > 0 ? 'seek-forward-indicator' : 'seek-backward-indicator';
    const element = document.getElementById(indicator);
    if (element) {
      element.style.opacity = '1';
      setTimeout(() => {
        element.style.opacity = '0';
      }, 1000);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getCurrentSubtitle = () => {
    if (!subtitlesEnabled) return null;
    return mockSubtitles.find(sub => 
      currentTime >= sub.startTime && currentTime <= sub.endTime
    );
  };

  const getEpisodeInfo = () => {
    if (contentData.type === 'series') {
      return `Season ${contentData.season} • Episode ${contentData.episode}${
        contentData.episodeTitle ? ` • ${contentData.episodeTitle}` : ''
      }`;
    }
    return null;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden cursor-none"
      style={{ cursor: controlsVisible ? 'default' : 'none' }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        src={contentData.videoUrl}
        preload="metadata"
        playsInline
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Header */}
      <VideoPlayerHeader
        title={contentData.title}
        episodeInfo={getEpisodeInfo()}
        isVisible={controlsVisible}
        onBack={handleBack}
      />

      {/* Center overlay */}
      <VideoPlayerOverlay
        isPlaying={isPlaying}
        isLoading={isLoading}
        isBuffering={isBuffering}
        onPlayPause={handlePlayPause}
        onDoubleTapSeek={handleDoubleTapSeek}
      />

      {/* Bottom controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 lg:p-6 transition-opacity duration-300 ${
        controlsVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Progress bar */}
        <VideoPlayerProgress
          currentTime={currentTime}
          duration={duration}
          bufferedTime={bufferedTime}
          chapters={contentData.chapters || []}
          onSeek={handleSeek}
          className="mb-4"
        />

        {/* Control bar */}
        <VideoPlayerControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          isMuted={isMuted}
          isFullscreen={isFullscreen}
          subtitlesEnabled={subtitlesEnabled}
          qualityOptions={qualityOptions}
          currentQuality={currentQuality}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onMuteToggle={handleMuteToggle}
          onFullscreenToggle={handleFullscreenToggle}
          onSubtitlesToggle={() => setSubtitlesEnabled(!subtitlesEnabled)}
          onQualityChange={setCurrentQuality}
        />
      </div>

      {/* Subtitles */}
      <VideoPlayerSubtitles
        isVisible={subtitlesEnabled}
        currentSubtitle={getCurrentSubtitle()}
        availableLanguages={availableLanguages}
        selectedLanguage="en"
        onToggle={() => setSubtitlesEnabled(!subtitlesEnabled)}
      />
    </div>
  );
};

export default VideoPlayer;