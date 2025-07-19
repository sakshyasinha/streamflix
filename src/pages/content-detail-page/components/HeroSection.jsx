import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = ({ content, onPlayClick, onAddToList, onShare }) => {
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-play trailer after 3 seconds
    const timer = setTimeout(() => {
      setIsTrailerPlaying(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handlePlayClick = () => {
    if (onPlayClick) {
      onPlayClick();
    } else {
      navigate('/video-player', { 
        state: { 
          contentId: content.id,
          title: content.title,
          type: content.type 
        } 
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-success';
    if (rating >= 6) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="relative w-full h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        {isTrailerPlaying && content.trailerUrl ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            loop
            playsInline
          >
            <source src={content.trailerUrl} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={content.backdropImage}
            alt={content.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent lg:from-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="w-full px-4 lg:px-6 pb-8 lg:pb-16">
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              {content.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm lg:text-base">
              <span className="text-foreground font-medium">{content.year}</span>
              
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} className="text-accent fill-current" />
                <span className={`font-medium ${getRatingColor(content.rating)}`}>
                  {content.rating}/10
                </span>
              </div>

              {content.type === 'movie' && (
                <span className="text-muted-foreground">
                  {formatDuration(content.duration)}
                </span>
              )}

              {content.type === 'series' && (
                <span className="text-muted-foreground">
                  {content.seasons} Season{content.seasons > 1 ? 's' : ''}
                </span>
              )}

              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  content.maturityRating === 'PG' ? 'bg-success/20 text-success' :
                  content.maturityRating === 'PG-13'? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
                }`}>
                  {content.maturityRating}
                </span>
                
                {content.isHD && (
                  <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-medium">
                    HD
                  </span>
                )}
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {content.genres.map((genre, index) => (
                <span
                  key={index}
                  className="text-muted-foreground text-sm"
                >
                  {genre}{index < content.genres.length - 1 && ' • '}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                {showFullDescription ? content.description : `${content.description.slice(0, 200)}...`}
              </p>
              {content.description.length > 200 && (
                <Button
                  variant="link"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="p-0 h-auto text-primary hover:text-primary/80 mt-2"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </Button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={handlePlayClick}
                iconName="Play"
                iconPosition="left"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                {content.watchProgress > 0 ? 'Continue Watching' : 'Play'}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onAddToList}
                iconName="Plus"
                iconPosition="left"
                className="border-muted-foreground/30 hover:border-foreground"
              >
                My List
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={onShare}
                iconName="Share"
                iconPosition="left"
                className="text-muted-foreground hover:text-foreground"
              >
                Share
              </Button>
            </div>

            {/* Continue Watching Progress */}
            {content.watchProgress > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {Math.round(content.watchProgress)}% watched
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatDuration(content.remainingTime)} left
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-1">
                  <div
                    className="bg-primary h-1 rounded-full transition-all duration-300"
                    style={{ width: `${content.watchProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Controls */}
      {isTrailerPlaying && content.trailerUrl && (
        <div className="absolute top-4 right-4 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
          >
            <Icon name={isMuted ? "VolumeX" : "Volume2"} size={20} />
          </Button>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="absolute top-4 left-4 lg:left-6 z-20">
        <nav className="flex items-center space-x-2 text-sm">
          <button
            onClick={() => navigate('/content-browse-search')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse
          </button>
          <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          <button
            onClick={() => navigate(`/content-browse-search?genre=${content.genres[0]}`)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {content.genres[0]}
          </button>
          <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          <span className="text-foreground">{content.title}</span>
        </nav>
      </div>
    </div>
  );
};

export default HeroSection;