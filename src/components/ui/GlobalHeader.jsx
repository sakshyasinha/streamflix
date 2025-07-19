import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const GlobalHeader = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isVideoPlayer = location.pathname === '/video-player';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileMenuOpen && !event.target.closest('.profile-menu')) {
        setIsProfileMenuOpen(false);
      }
      if (isSearchExpanded && !event.target.closest('.search-container')) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen, isSearchExpanded]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/content-browse-search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchExpanded(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const navigationItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Browse', path: '/content-browse-search', icon: 'Search' },
    { label: 'My List', path: '/my-list', icon: 'Bookmark' },
  ];

  const isActiveRoute = (path) => {
    if (path === '/home-dashboard') {
      return location.pathname === '/' || location.pathname === '/home-dashboard';
    }
    return location.pathname === path;
  };

  if (isVideoPlayer) {
    return (
      <header className="fixed top-0 left-0 right-0 z-player bg-gradient-to-b from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-between p-4">
          <Link to="/home-dashboard" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Icon name="Play" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-white">StreamFlix</span>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20"
          >
            <Icon name="X" size={24} />
          </Button>
        </div>
      </header>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-header transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-elevation-2' : 'bg-transparent'
    }`}>
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/home-dashboard" className="flex items-center space-x-2 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Icon name="Play" size={20} color="white" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">StreamFlix</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActiveRoute(item.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Search and Profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="search-container relative">
            {isSearchExpanded ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <Input
                  type="search"
                  placeholder="Search movies, shows..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-64 bg-card border-border"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchExpanded(false)}
                  className="ml-2"
                >
                  <Icon name="X" size={20} />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchExpanded(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="Search" size={20} />
              </Button>
            )}
          </div>

          {/* Profile Menu */}
          <div className="profile-menu relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="User" size={20} />
            </Button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 animate-slide-in">
                <Link
                  to="/profile-selection-management"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <Icon name="Users" size={16} />
                  <span>Manage Profiles</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <Icon name="Settings" size={16} />
                  <span>Settings</span>
                </Link>
                <div className="border-t border-border my-2"></div>
                <Link
                  to="/user-authentication-login-register"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <Icon name="LogOut" size={16} />
                  <span>Sign Out</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Menu" size={20} />
            </Button>

            {isProfileMenuOpen && (
              <div className="absolute right-4 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 animate-slide-in">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors ${
                      isActiveRoute(item.path)
                        ? 'text-primary bg-primary/10' :'text-popover-foreground hover:bg-muted/50'
                    }`}
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="border-t border-border my-2"></div>
                <Link
                  to="/profile-selection-management"
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted/50 transition-colors"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <Icon name="Users" size={16} />
                  <span>Manage Profiles</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted/50 transition-colors"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <Icon name="Settings" size={16} />
                  <span>Settings</span>
                </Link>
                <Link
                  to="/user-authentication-login-register"
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted/50 transition-colors"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <Icon name="LogOut" size={16} />
                  <span>Sign Out</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;