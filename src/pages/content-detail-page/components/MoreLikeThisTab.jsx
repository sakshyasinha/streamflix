import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MoreLikeThisTab = ({ content }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  const handleContentClick = (item) => {
    navigate('/content-detail-page', {
      state: { contentId: item.id }
    });
  };

  const handlePlayClick = (item, e) => {
    e.stopPropagation();
    navigate('/video-player', {
      state: {
        contentId: item.id,
        title: item.title,
        type: item.type
      }
    });
  };

  const handleAddToList = (item, e) => {
    e.stopPropagation();
    // Add to list logic here
    console.log('Added to list:', item.title);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">More Like This</h3>
        <span className="text-muted-foreground text-sm">
          {content.recommendations.length} recommendations
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {content.recommendations.map((item, index) => (
          <div
            key={item.id}
            className="group cursor-pointer"
            onClick={() => handleContentClick(item)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 hover:scale-105 hover:shadow-elevation-2">
              {/* Poster Image */}
              <div className="relative aspect-[2/3]">
                <Image
                  src={item.posterImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                  hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handlePlayClick(item, e)}
                      className="w-16 h-16 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full"
                    >
                      <Icon name="Play" size={24} />
                    </Button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleAddToList(item, e)}
                      className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full"
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-accent fill-current" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Type Badge */}
                <div className="absolute bottom-3 left-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.type === 'movie' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
                  }`}>
                    {item.type === 'movie' ? 'Movie' : 'Series'}
                  </span>
                </div>

                {/* Progress Bar */}
                {item.watchProgress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${item.watchProgress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Content Info */}
              <div className="p-4">
                <h4 className="font-semibold text-foreground mb-2 line-clamp-2 leading-tight">
                  {item.title}
                </h4>
                
                <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
                  <span>{item.year}</span>
                  {item.type === 'movie' ? (
                    <span>{formatDuration(item.duration)}</span>
                  ) : (
                    <span>{item.seasons} Season{item.seasons > 1 ? 's' : ''}</span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-accent fill-current" />
                    <span className={`text-sm font-medium ${getRatingColor(item.rating)}`}>
                      {item.rating}/10
                    </span>
                  </div>
                  
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.maturityRating === 'PG' ? 'bg-success/20 text-success' :
                    item.maturityRating === 'PG-13'? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
                  }`}>
                    {item.maturityRating}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Genres */}
                <div className="flex flex-wrap gap-1">
                  {item.genres.slice(0, 3).map((genre, genreIndex) => (
                    <span
                      key={genreIndex}
                      className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded"
                    >
                      {genre}
                    </span>
                  ))}
                  {item.genres.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{item.genres.length - 3} more
                    </span>
                  )}
                </div>

                {/* Match Percentage */}
                <div className="mt-4 pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Match</span>
                    <span className="text-sm font-medium text-success">
                      {item.matchPercentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-6">
        <Button
          variant="outline"
          className="px-8"
        >
          Load More Recommendations
        </Button>
      </div>
    </div>
  );
};

export default MoreLikeThisTab;