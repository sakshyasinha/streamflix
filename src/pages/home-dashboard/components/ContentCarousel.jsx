import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContentCarousel = ({ title, items, showProgress = false }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setScrollPosition(scrollLeft);
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Width of approximately 1.5 cards
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleCardClick = (item) => {
    if (showProgress && item.progress > 0) {
      // Continue watching
      navigate(`/video-player?content=${item.id}&type=${item.type}&time=${item.progress}`);
    } else {
      // Go to detail page
      navigate(`/content-detail-page?id=${item.id}&type=${item.type}`);
    }
  };

  const handlePlayClick = (e, item) => {
    e.stopPropagation();
    navigate(`/video-player?content=${item.id}&type=${item.type}`);
  };

  const handleAddToList = (e, item) => {
    e.stopPropagation();
    const watchlist = JSON.parse(localStorage.getItem('streamflix-watchlist') || '[]');
    
    if (!watchlist.find(listItem => listItem.id === item.id)) {
      watchlist.push({
        id: item.id,
        title: item.title,
        type: item.type,
        addedAt: new Date().toISOString()
      });
      localStorage.setItem('streamflix-watchlist', JSON.stringify(watchlist));
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-4 lg:px-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-foreground">{title}</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/content-browse-search')}
          className="text-muted-foreground hover:text-foreground"
        >
          View All
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Button>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Left Arrow */}
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12"
          >
            <Icon name="ChevronLeft" size={24} />
          </Button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12"
          >
            <Icon name="ChevronRight" size={24} />
          </Button>
        )}

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide px-4 lg:px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 lg:w-64 cursor-pointer group/card"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleCardClick(item)}
            >
              {/* Card Container */}
              <div className="relative bg-card rounded-lg overflow-hidden transition-all duration-300 group-hover/card:scale-105 group-hover/card:shadow-elevation-2">
                {/* Thumbnail */}
                <div className="relative aspect-video">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Progress Bar for Continue Watching */}
                  {showProgress && item.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${(item.progress / item.duration) * 100}%` }}
                      />
                    </div>
                  )}

                  {/* Hover Overlay */}
                  {hoveredItem === item.id && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handlePlayClick(e, item)}
                        className="w-12 h-12 bg-white/20 text-white hover:bg-white/30 rounded-full"
                      >
                        <Icon name="Play" size={24} />
                      </Button>
                    </div>
                  )}

                  {/* New Badge */}
                  {item.isNew && (
                    <div className="absolute top-2 left-2 bg-primary px-2 py-1 rounded text-xs font-medium text-white">
                      NEW
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white">
                    {item.rating}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3">
                  <h3 className="font-medium text-foreground mb-1 truncate">{item.title}</h3>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>{item.year}</span>
                    <span>{formatDuration(item.duration)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-accent fill-current" />
                      <span className="text-sm text-muted-foreground">{item.imdbRating}</span>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center space-x-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleAddToList(e, item)}
                        className="w-8 h-8 text-muted-foreground hover:text-foreground"
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/content-detail-page?id=${item.id}&type=${item.type}`);
                        }}
                        className="w-8 h-8 text-muted-foreground hover:text-foreground"
                      >
                        <Icon name="Info" size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Genre Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.genres.slice(0, 2).map((genre, genreIndex) => (
                      <span
                        key={genreIndex}
                        className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCarousel;