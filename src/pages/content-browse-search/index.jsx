import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import SearchHeader from './components/SearchHeader';
import SearchFilters from './components/SearchFilters';
import ContentGrid from './components/ContentGrid';
import TrendingQueries from './components/TrendingQueries';
import VoiceSearch from './components/VoiceSearch';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ContentBrowseSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('relevance');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTrending, setShowTrending] = useState(false);
  const [filters, setFilters] = useState({
    genres: [],
    year: '',
    rating: '',
    language: '',
    duration: '',
    type: ''
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Update search query from URL params
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    // Show trending if no search query
    setShowTrending(!query);
  }, [searchParams]);

  useEffect(() => {
    // Update URL when search query changes
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
      setShowTrending(false);
    } else {
      setSearchParams({});
      setShowTrending(true);
    }
  }, [searchQuery, setSearchParams]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleToggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleTrendingQuerySelect = (query) => {
    setSearchQuery(query);
    navigate(`/content-browse-search?q=${encodeURIComponent(query)}`);
  };

  const handleVoiceSearchResult = (transcript) => {
    setSearchQuery(transcript);
    navigate(`/content-browse-search?q=${encodeURIComponent(transcript)}`);
  };

  const handleVoiceSearchError = (error) => {
    console.error('Voice search error:', error);
    // Could show a toast notification here
  };

  const handlePullToRefresh = () => {
    // Simulate refresh
    window.location.reload();
  };

  // Calculate result count (mock)
  const getResultCount = () => {
    // This would normally come from the API
    if (!searchQuery && Object.values(filters).every(v => !v || (Array.isArray(v) && v.length === 0))) {
      return 1247; // Total content count
    }
    return Math.floor(Math.random() * 500) + 50; // Mock filtered count
  };

  return (
    <>
      <Helmet>
        <title>{searchQuery ? `"${searchQuery}" - Search Results` : 'Browse Content'} | StreamFlix</title>
        <meta 
          name="description" 
          content={searchQuery 
            ? `Search results for "${searchQuery}" on StreamFlix. Discover movies and TV shows.`
            : 'Browse and search thousands of movies and TV shows on StreamFlix. Filter by genre, year, rating and more.'
          } 
        />
        <meta name="keywords" content="streaming, movies, tv shows, search, browse, entertainment, netflix alternative" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <GlobalHeader />
        
        <main className="pt-16">
          <div className="container mx-auto px-4 py-6">
            {/* Search Header */}
            <SearchHeader
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onToggleFilters={handleToggleFilters}
              resultCount={getResultCount()}
              className="mb-6"
            />

            <div className="flex gap-6">
              {/* Desktop Filters Sidebar */}
              {!isMobile && isFiltersOpen && (
                <SearchFilters
                  isOpen={isFiltersOpen}
                  onClose={() => setIsFiltersOpen(false)}
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  isMobile={false}
                  className="flex-shrink-0"
                />
              )}

              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
                {showTrending && !searchQuery ? (
                  <div className="space-y-6">
                    {/* Welcome Section */}
                    <div className="text-center py-8">
                      <h1 className="text-3xl font-bold text-foreground mb-4">
                        Discover Your Next Favorite
                      </h1>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                        Search through thousands of movies and TV shows, or explore trending content to find something new to watch.
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Trending Queries */}
                      <div className="lg:col-span-1">
                        <TrendingQueries
                          onQuerySelect={handleTrendingQuerySelect}
                        />
                      </div>

                      {/* Popular Content Preview */}
                      <div className="lg:col-span-2">
                        <div className="bg-card border border-border rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-foreground">Popular This Week</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSearchQuery('')}
                            >
                              View All
                            </Button>
                          </div>
                          <ContentGrid
                            searchQuery=""
                            filters={{ ...filters, type: '' }}
                            sortBy="rating"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ContentGrid
                    searchQuery={searchQuery}
                    filters={filters}
                    sortBy={sortBy}
                  />
                )}
              </div>
            </div>

            {/* Mobile Filters */}
            {isMobile && (
              <SearchFilters
                isOpen={isFiltersOpen}
                onClose={() => setIsFiltersOpen(false)}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isMobile={true}
              />
            )}
          </div>
        </main>

        {/* Pull to Refresh Indicator (Mobile) */}
        {isMobile && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 opacity-0 pointer-events-none">
            <div className="bg-card border border-border rounded-full p-2 shadow-elevation-2">
              <Icon name="RefreshCw" size={16} className="text-primary animate-spin" />
            </div>
          </div>
        )}

        {/* Voice Search Floating Button (Mobile) */}
        {isMobile && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
          <div className="fixed bottom-6 right-6 z-50">
            <VoiceSearch
              onResult={handleVoiceSearchResult}
              onError={handleVoiceSearchError}
              className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-elevation-3 hover:shadow-elevation-2 transition-all duration-200"
            />
          </div>
        )}

        {/* Scroll to Top Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 w-12 h-12 bg-card border border-border rounded-full shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200 z-50 opacity-0 pointer-events-none"
          style={{
            opacity: typeof window !== 'undefined' && window.scrollY > 500 ? 1 : 0,
            pointerEvents: typeof window !== 'undefined' && window.scrollY > 500 ? 'auto' : 'none'
          }}
        >
          <Icon name="ArrowUp" size={16} />
        </Button>
      </div>
    </>
  );
};

export default ContentBrowseSearch;