import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import SearchInterface from '../../../components/ui/SearchInterface';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  filters, 
  onFiltersChange,
  onToggleFilters,
  resultCount = 0,
  className = '' 
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Auto-expand search on mobile if there's a query
    if (isMobile && searchQuery) {
      setIsSearchExpanded(true);
    }
  }, [isMobile, searchQuery]);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'title', label: 'A-Z' },
    { value: 'year', label: 'Release Date' },
    { value: 'rating', label: 'Rating' },
    { value: 'recently-added', label: 'Recently Added' }
  ];

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.genres?.length > 0) count++;
    if (filters.year) count++;
    if (filters.rating) count++;
    if (filters.language) count++;
    if (filters.duration) count++;
    if (filters.type) count++;
    return count;
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      genres: [],
      year: '',
      rating: '',
      language: '',
      duration: '',
      type: ''
    };
    onFiltersChange(clearedFilters);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onSearchChange(transcript);
        navigate(`/content-browse-search?q=${encodeURIComponent(transcript)}`);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognition.start();
    }
  };

  const ActiveFilters = () => {
    const activeFilters = [];
    
    if (filters.type) {
      activeFilters.push({ key: 'type', label: filters.type === 'movie' ? 'Movies' : 'TV Shows', value: filters.type });
    }
    
    if (filters.genres?.length > 0) {
      filters.genres.forEach(genre => {
        activeFilters.push({ key: 'genre', label: genre.charAt(0).toUpperCase() + genre.slice(1), value: genre });
      });
    }
    
    if (filters.year) {
      activeFilters.push({ key: 'year', label: filters.year, value: filters.year });
    }
    
    if (filters.rating) {
      activeFilters.push({ key: 'rating', label: filters.rating.toUpperCase(), value: filters.rating });
    }
    
    if (filters.language) {
      const languageLabels = {
        'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German',
        'it': 'Italian', 'pt': 'Portuguese', 'ja': 'Japanese', 'ko': 'Korean',
        'zh': 'Chinese', 'hi': 'Hindi'
      };
      activeFilters.push({ key: 'language', label: languageLabels[filters.language] || filters.language, value: filters.language });
    }
    
    if (filters.duration) {
      const durationLabels = {
        'short': 'Short (< 90 min)',
        'medium': 'Medium (90-150 min)',
        'long': 'Long (> 150 min)'
      };
      activeFilters.push({ key: 'duration', label: durationLabels[filters.duration], value: filters.duration });
    }

    if (activeFilters.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {activeFilters.map((filter, index) => (
          <div
            key={`${filter.key}-${filter.value}-${index}`}
            className="flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
          >
            <span>{filter.label}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (filter.key === 'type') {
                  onFiltersChange({ ...filters, type: '' });
                } else if (filter.key === 'genre') {
                  const updatedGenres = filters.genres.filter(g => g !== filter.value);
                  onFiltersChange({ ...filters, genres: updatedGenres });
                } else {
                  onFiltersChange({ ...filters, [filter.key]: '' });
                }
              }}
              className="w-4 h-4 p-0 hover:bg-primary/20"
            >
              <Icon name="X" size={12} />
            </Button>
          </div>
        ))}
        {activeFilters.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        {isMobile ? (
          <SearchInterface
            isExpanded={isSearchExpanded}
            onToggle={setIsSearchExpanded}
            className="flex-1"
          />
        ) : (
          <div className="flex-1 relative">
            <Input
              type="search"
              placeholder="Search movies, shows, actors..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-card border-border pl-10 pr-12"
            />
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            {('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleVoiceSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 text-muted-foreground hover:text-foreground"
              >
                <Icon name="Mic" size={16} />
              </Button>
            )}
          </div>
        )}

        {/* Filter Toggle (Mobile) */}
        {isMobile && (
          <Button
            variant="outline"
            onClick={onToggleFilters}
            className="relative"
          >
            <Icon name="Filter" size={16} />
            {getActiveFilterCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            {searchQuery ? (
              <span>
                {resultCount.toLocaleString()} results for "<strong className="text-foreground">{searchQuery}</strong>"
              </span>
            ) : (
              <span>{resultCount.toLocaleString()} titles</span>
            )}
          </div>

          {/* Desktop Filter Toggle */}
          {!isMobile && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleFilters}
              className="relative"
            >
              <Icon name="Filter" size={14} className="mr-2" />
              Filters
              {getActiveFilterCount() > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </Button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            className="w-40"
          />
        </div>
      </div>

      {/* Active Filters */}
      <ActiveFilters />
    </div>
  );
};

export default SearchHeader;