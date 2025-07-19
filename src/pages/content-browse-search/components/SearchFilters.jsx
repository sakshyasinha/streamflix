import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  isMobile = false,
  className = '' 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const genreOptions = [
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'animation', label: 'Animation' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'crime', label: 'Crime' },
    { value: 'documentary', label: 'Documentary' },
    { value: 'drama', label: 'Drama' },
    { value: 'family', label: 'Family' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'horror', label: 'Horror' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'romance', label: 'Romance' },
    { value: 'sci-fi', label: 'Science Fiction' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'war', label: 'War' },
    { value: 'western', label: 'Western' }
  ];

  const yearOptions = Array.from({ length: 30 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
  });

  const ratingOptions = [
    { value: 'g', label: 'G - General Audiences' },
    { value: 'pg', label: 'PG - Parental Guidance' },
    { value: 'pg13', label: 'PG-13 - Parents Strongly Cautioned' },
    { value: 'r', label: 'R - Restricted' },
    { value: 'nc17', label: 'NC-17 - Adults Only' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'zh', label: 'Chinese' },
    { value: 'hi', label: 'Hindi' }
  ];

  const durationOptions = [
    { value: 'short', label: 'Short (< 90 min)' },
    { value: 'medium', label: 'Medium (90-150 min)' },
    { value: 'long', label: 'Long (> 150 min)' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleGenreToggle = (genre) => {
    const currentGenres = localFilters.genres || [];
    const updatedGenres = currentGenres.includes(genre)
      ? currentGenres.filter(g => g !== genre)
      : [...currentGenres, genre];
    handleFilterChange('genres', updatedGenres);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    if (isMobile && onClose) {
      onClose();
    }
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
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.genres?.length > 0) count++;
    if (localFilters.year) count++;
    if (localFilters.rating) count++;
    if (localFilters.language) count++;
    if (localFilters.duration) count++;
    if (localFilters.type) count++;
    return count;
  };

  const FilterSection = ({ title, children, isCollapsible = true }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
      <div className="border-b border-border pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
        {isCollapsible ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <h3 className="font-medium text-foreground">{title}</h3>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-muted-foreground" 
            />
          </button>
        ) : (
          <h3 className="font-medium text-foreground mb-3">{title}</h3>
        )}
        {(!isCollapsible || isExpanded) && children}
      </div>
    );
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-modal" onClick={onClose} />
        )}
        
        {/* Mobile Filter Panel */}
        <div className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-lg z-modal transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } ${className}`}>
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              <div className="flex items-center space-x-2">
                {getActiveFilterCount() > 0 && (
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                    {getActiveFilterCount()}
                  </span>
                )}
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto p-4 space-y-4">
            {/* Content Type */}
            <FilterSection title="Content Type" isCollapsible={false}>
              <div className="flex space-x-2">
                <Button
                  variant={localFilters.type === '' ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('type', '')}
                  className="flex-1"
                >
                  All
                </Button>
                <Button
                  variant={localFilters.type === 'movie' ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('type', 'movie')}
                  className="flex-1"
                >
                  Movies
                </Button>
                <Button
                  variant={localFilters.type === 'tv' ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('type', 'tv')}
                  className="flex-1"
                >
                  TV Shows
                </Button>
              </div>
            </FilterSection>

            {/* Genres */}
            <FilterSection title="Genres">
              <div className="grid grid-cols-2 gap-2">
                {genreOptions.map((genre) => (
                  <Checkbox
                    key={genre.value}
                    label={genre.label}
                    checked={localFilters.genres?.includes(genre.value) || false}
                    onChange={() => handleGenreToggle(genre.value)}
                    size="sm"
                  />
                ))}
              </div>
            </FilterSection>

            {/* Release Year */}
            <FilterSection title="Release Year">
              <Select
                placeholder="Select year"
                options={yearOptions}
                value={localFilters.year || ''}
                onChange={(value) => handleFilterChange('year', value)}
                searchable
              />
            </FilterSection>

            {/* Rating */}
            <FilterSection title="Rating">
              <Select
                placeholder="Select rating"
                options={ratingOptions}
                value={localFilters.rating || ''}
                onChange={(value) => handleFilterChange('rating', value)}
              />
            </FilterSection>

            {/* Language */}
            <FilterSection title="Language">
              <Select
                placeholder="Select language"
                options={languageOptions}
                value={localFilters.language || ''}
                onChange={(value) => handleFilterChange('language', value)}
                searchable
              />
            </FilterSection>

            {/* Duration */}
            <FilterSection title="Duration">
              <Select
                placeholder="Select duration"
                options={durationOptions}
                value={localFilters.duration || ''}
                onChange={(value) => handleFilterChange('duration', value)}
              />
            </FilterSection>
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="flex-1"
              >
                Clear All
              </Button>
              <Button
                onClick={handleApplyFilters}
                className="flex-1"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop Filter Sidebar
  return (
    <div className={`w-80 bg-card border border-border rounded-lg p-6 h-fit sticky top-20 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        {getActiveFilterCount() > 0 && (
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {getActiveFilterCount()}
            </span>
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              Clear All
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Content Type */}
        <FilterSection title="Content Type" isCollapsible={false}>
          <div className="flex space-x-2">
            <Button
              variant={localFilters.type === '' ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange('type', '')}
              className="flex-1"
            >
              All
            </Button>
            <Button
              variant={localFilters.type === 'movie' ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange('type', 'movie')}
              className="flex-1"
            >
              Movies
            </Button>
            <Button
              variant={localFilters.type === 'tv' ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange('type', 'tv')}
              className="flex-1"
            >
              TV Shows
            </Button>
          </div>
        </FilterSection>

        {/* Genres */}
        <FilterSection title="Genres">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {genreOptions.map((genre) => (
              <Checkbox
                key={genre.value}
                label={genre.label}
                checked={localFilters.genres?.includes(genre.value) || false}
                onChange={() => handleGenreToggle(genre.value)}
                size="sm"
              />
            ))}
          </div>
        </FilterSection>

        {/* Release Year */}
        <FilterSection title="Release Year">
          <Select
            placeholder="Select year"
            options={yearOptions}
            value={localFilters.year || ''}
            onChange={(value) => handleFilterChange('year', value)}
            searchable
          />
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Rating">
          <Select
            placeholder="Select rating"
            options={ratingOptions}
            value={localFilters.rating || ''}
            onChange={(value) => handleFilterChange('rating', value)}
          />
        </FilterSection>

        {/* Language */}
        <FilterSection title="Language">
          <Select
            placeholder="Select language"
            options={languageOptions}
            value={localFilters.language || ''}
            onChange={(value) => handleFilterChange('language', value)}
            searchable
          />
        </FilterSection>

        {/* Duration */}
        <FilterSection title="Duration">
          <Select
            placeholder="Select duration"
            options={durationOptions}
            value={localFilters.duration || ''}
            onChange={(value) => handleFilterChange('duration', value)}
          />
        </FilterSection>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <Button
          onClick={handleApplyFilters}
          className="w-full"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;