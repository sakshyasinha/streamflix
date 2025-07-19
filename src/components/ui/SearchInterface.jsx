import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const SearchInterface = ({ isExpanded, onToggle, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Mock suggestions data
  const mockSuggestions = [
    'Stranger Things',
    'The Crown',
    'Breaking Bad',
    'The Office',
    'Friends',
    'Game of Thrones',
    'The Witcher',
    'Ozark',
    'Money Heist',
    'Squid Game'
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('streamflix-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (isExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          const filtered = mockSuggestions.filter(item =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSuggestions(filtered.slice(0, 5));
          setIsLoading(false);
          setShowSuggestions(true);
        }, 300);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim());
    }
  };

  const performSearch = (query) => {
    // Save to recent searches
    const updatedRecent = [query, ...recentSearches.filter(item => item !== query)].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem('streamflix-recent-searches', JSON.stringify(updatedRecent));

    // Navigate to search results
    navigate(`/content-browse-search?q=${encodeURIComponent(query)}`);
    
    // Reset state
    setSearchQuery('');
    setShowSuggestions(false);
    if (onToggle) onToggle(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    performSearch(suggestion);
  };

  const handleRecentSearchClick = (recent) => {
    setSearchQuery(recent);
    performSearch(recent);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('streamflix-recent-searches');
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (searchQuery.trim().length === 0 && recentSearches.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  if (!isExpanded) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onToggle && onToggle(true)}
        className={`text-muted-foreground hover:text-foreground ${className}`}
      >
        <Icon name="Search" size={20} />
      </Button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <div className="relative flex-1">
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="Search movies, shows, actors..."
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="w-full bg-card border-border pr-10 pl-10"
          />
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
            </div>
          )}
        </div>
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onToggle && onToggle(false)}
          className="ml-2 text-muted-foreground hover:text-foreground"
        >
          <Icon name="X" size={20} />
        </Button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 z-dropdown animate-slide-in">
          {searchQuery.trim().length > 0 ? (
            <>
              {suggestions.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Suggestions
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors text-left"
                    >
                      <Icon name="Search" size={14} className="text-muted-foreground" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </>
              )}
              {suggestions.length === 0 && !isLoading && (
                <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                  No suggestions found
                </div>
              )}
            </>
          ) : (
            recentSearches.length > 0 && (
              <>
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Recent Searches
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearRecentSearches}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </Button>
                </div>
                {recentSearches.map((recent, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(recent)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors text-left"
                  >
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span>{recent}</span>
                  </button>
                ))}
              </>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInterface;