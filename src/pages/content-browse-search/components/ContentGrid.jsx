import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContentGrid = ({ 
  searchQuery = '', 
  filters = {}, 
  sortBy = 'relevance',
  className = '' 
}) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [watchlist, setWatchlist] = useState([]);
  const observerRef = useRef();
  const navigate = useNavigate();

  // Mock content data
  const mockContent = [
    {
      id: 1,
      title: "Stranger Things",
      type: "tv",
      year: 2016,
      rating: "TV-14",
      genre: ["sci-fi", "horror", "drama"],
      language: "en",
      duration: 51,
      imdbRating: 8.7,
      thumbnail: "https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=400&h=600&fit=crop",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl."
    },
    {
      id: 2,
      title: "The Crown",
      type: "tv",
      year: 2016,
      rating: "TV-MA",
      genre: ["drama", "history"],
      language: "en",
      duration: 58,
      imdbRating: 8.6,
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description: "Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century."
    },
    {
      id: 3,
      title: "Breaking Bad",
      type: "tv",
      year: 2008,
      rating: "TV-MA",
      genre: ["crime", "drama", "thriller"],
      language: "en",
      duration: 47,
      imdbRating: 9.5,
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine."
    },
    {
      id: 4,
      title: "The Witcher",
      type: "tv",
      year: 2019,
      rating: "TV-MA",
      genre: ["fantasy", "adventure", "drama"],
      language: "en",
      duration: 60,
      imdbRating: 8.2,
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts."
    },
    {
      id: 5,
      title: "Inception",
      type: "movie",
      year: 2010,
      rating: "PG-13",
      genre: ["sci-fi", "thriller", "action"],
      language: "en",
      duration: 148,
      imdbRating: 8.8,
      thumbnail: "https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=400&h=600&fit=crop",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea."
    },
    {
      id: 6,
      title: "Parasite",
      type: "movie",
      year: 2019,
      rating: "R",
      genre: ["thriller", "drama", "comedy"],
      language: "ko",
      duration: 132,
      imdbRating: 8.6,
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description: "A poor family schemes to become employed by a wealthy family and infiltrate their household by posing as unrelated, highly qualified individuals."
    },
    {
      id: 7,
      title: "Money Heist",
      type: "tv",
      year: 2017,
      rating: "TV-MA",
      genre: ["crime", "thriller", "drama"],
      language: "es",
      duration: 70,
      imdbRating: 8.3,
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain."
    },
    {
      id: 8,
      title: "Squid Game",
      type: "tv",
      year: 2021,
      rating: "TV-MA",
      genre: ["thriller", "drama", "mystery"],
      language: "ko",
      duration: 60,
      imdbRating: 8.0,
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      description: "Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games for a tempting prize."
    },
    {
      id: 9,
      title: "The Office",
      type: "tv",
      year: 2005,
      rating: "TV-14",
      genre: ["comedy"],
      language: "en",
      duration: 22,
      imdbRating: 8.9,
      thumbnail: "https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=400&h=600&fit=crop",
      description: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium."
    },
    {
      id: 10,
      title: "Friends",
      type: "tv",
      year: 1994,
      rating: "TV-14",
      genre: ["comedy", "romance"],
      language: "en",
      duration: 22,
      imdbRating: 8.9,
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description: "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan."
    },
    {
      id: 11,
      title: "Game of Thrones",
      type: "tv",
      year: 2011,
      rating: "TV-MA",
      genre: ["fantasy", "drama", "adventure"],
      language: "en",
      duration: 57,
      imdbRating: 9.3,
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia."
    },
    {
      id: 12,
      title: "Ozark",
      type: "tv",
      year: 2017,
      rating: "TV-MA",
      genre: ["crime", "drama", "thriller"],
      language: "en",
      duration: 60,
      imdbRating: 8.4,
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      description: "A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss."
    }
  ];

  useEffect(() => {
    // Load watchlist from localStorage
    const savedWatchlist = localStorage.getItem('streamflix-watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  useEffect(() => {
    setContent([]);
    setPage(1);
    setHasMore(true);
    loadContent(1, true);
  }, [searchQuery, filters, sortBy]);

  const loadContent = useCallback((pageNum, reset = false) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredContent = [...mockContent];

      // Apply search filter
      if (searchQuery) {
        filteredContent = filteredContent.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      // Apply filters
      if (filters.type) {
        filteredContent = filteredContent.filter(item => item.type === filters.type);
      }

      if (filters.genres && filters.genres.length > 0) {
        filteredContent = filteredContent.filter(item =>
          filters.genres.some(genre => item.genre.includes(genre))
        );
      }

      if (filters.year) {
        filteredContent = filteredContent.filter(item => item.year.toString() === filters.year);
      }

      if (filters.rating) {
        filteredContent = filteredContent.filter(item => item.rating.toLowerCase().includes(filters.rating));
      }

      if (filters.language) {
        filteredContent = filteredContent.filter(item => item.language === filters.language);
      }

      if (filters.duration) {
        filteredContent = filteredContent.filter(item => {
          if (filters.duration === 'short') return item.duration < 90;
          if (filters.duration === 'medium') return item.duration >= 90 && item.duration <= 150;
          if (filters.duration === 'long') return item.duration > 150;
          return true;
        });
      }

      // Apply sorting
      switch (sortBy) {
        case 'title':
          filteredContent.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'year':
          filteredContent.sort((a, b) => b.year - a.year);
          break;
        case 'rating':
          filteredContent.sort((a, b) => b.imdbRating - a.imdbRating);
          break;
        case 'recently-added':
          filteredContent.sort((a, b) => b.id - a.id);
          break;
        default:
          // Relevance - keep original order for search, or by rating for browse
          if (!searchQuery) {
            filteredContent.sort((a, b) => b.imdbRating - a.imdbRating);
          }
      }

      // Simulate pagination
      const itemsPerPage = 12;
      const startIndex = (pageNum - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageContent = filteredContent.slice(startIndex, endIndex);

      if (reset) {
        setContent(pageContent);
      } else {
        setContent(prev => [...prev, ...pageContent]);
      }

      setHasMore(endIndex < filteredContent.length);
      setLoading(false);
    }, 500);
  }, [searchQuery, filters, sortBy]);

  const lastContentElementRef = useCallback(node => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => {
          const nextPage = prevPage + 1;
          loadContent(nextPage);
          return nextPage;
        });
      }
    });
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore, loadContent]);

  const handleWatchlistToggle = (contentItem) => {
    const isInWatchlist = watchlist.some(item => item.id === contentItem.id);
    let updatedWatchlist;

    if (isInWatchlist) {
      updatedWatchlist = watchlist.filter(item => item.id !== contentItem.id);
    } else {
      updatedWatchlist = [...watchlist, contentItem];
    }

    setWatchlist(updatedWatchlist);
    localStorage.setItem('streamflix-watchlist', JSON.stringify(updatedWatchlist));
  };

  const handleContentClick = (contentItem) => {
    navigate(`/content-detail-page?id=${contentItem.id}`);
  };

  const isInWatchlist = (contentId) => {
    return watchlist.some(item => item.id === contentId);
  };

  const ContentCard = ({ item, isLast }) => (
    <div
      ref={isLast ? lastContentElementRef : null}
      className="group relative bg-card rounded-lg overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300 content-preview-hover cursor-pointer"
      onClick={() => handleContentClick(item)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 text-white hover:bg-white/20 rounded-full"
          >
            <Icon name="Play" size={24} />
          </Button>
        </div>

        {/* Watchlist button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleWatchlistToggle(item);
          }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full transition-all duration-200 ${
            isInWatchlist(item.id)
              ? 'bg-primary text-primary-foreground'
              : 'bg-black/50 text-white hover:bg-black/70'
          }`}
        >
          <Icon 
            name={isInWatchlist(item.id) ? "Check" : "Plus"} 
            size={16} 
          />
        </Button>

        {/* Content type badge */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
          {item.type === 'movie' ? 'Movie' : 'TV Show'}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{item.title}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>{item.year}</span>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} className="text-accent fill-current" />
            <span>{item.imdbRating}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {item.genre.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded capitalize"
            >
              {genre}
            </span>
          ))}
          {item.genre.length > 2 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
              +{item.genre.length - 2}
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );

  if (content.length === 0 && !loading) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          {searchQuery 
            ? `We couldn't find any content matching "${searchQuery}". Try adjusting your search or filters.`
            : "No content matches your current filters. Try adjusting your criteria."
          }
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Try searching for:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Stranger Things', 'Breaking Bad', 'The Crown', 'Inception'].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => navigate(`/content-browse-search?q=${encodeURIComponent(suggestion)}`)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {content.map((item, index) => (
          <ContentCard
            key={item.id}
            item={item}
            isLast={index === content.length - 1}
          />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
        </div>
      )}

      {!hasMore && content.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>You've reached the end of the results</p>
        </div>
      )}
    </div>
  );
};

export default ContentGrid;