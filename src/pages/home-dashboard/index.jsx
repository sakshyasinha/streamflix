import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import HeroSection from './components/HeroSection';
import ContentCarousel from './components/ContentCarousel';
import TrendingSection from './components/TrendingSection';
import GenreSection from './components/GenreSection';
import LoadingSkeleton from './components/LoadingSkeleton';

const HomeDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [continueWatching, setContinueWatching] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [becauseYouWatched, setBecauseYouWatched] = useState([]);

  // Mock data for carousels
  const mockContinueWatching = [
    {
      id: 1,
      title: "Breaking Bad",
      thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
      type: "series",
      year: "2024",
      rating: "TV-MA",
      duration: 2880, // Total minutes
      progress: 1440, // Watched minutes
      imdbRating: 9.5,
      genres: ["Crime", "Drama", "Thriller"],
      isNew: false
    },
    {
      id: 2,
      title: "The Batman",
      thumbnail: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?w=400&h=600&fit=crop",
      type: "movie",
      year: "2024",
      rating: "PG-13",
      duration: 176,
      progress: 89,
      imdbRating: 8.2,
      genres: ["Action", "Crime", "Drama"],
      isNew: false
    },
    {
      id: 3,
      title: "House of the Dragon",
      thumbnail: "https://images.pixabay.com/photo/2019/11/07/20/47/castle-4609867_1280.jpg?w=400&h=600&fit=crop",
      type: "series",
      year: "2024",
      rating: "TV-MA",
      duration: 600,
      progress: 180,
      imdbRating: 8.5,
      genres: ["Action", "Adventure", "Drama"],
      isNew: false
    },
    {
      id: 4,
      title: "Dune",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      type: "movie",
      year: "2024",
      rating: "PG-13",
      duration: 155,
      progress: 45,
      imdbRating: 8.0,
      genres: ["Action", "Adventure", "Drama"],
      isNew: false
    },
    {
      id: 5,
      title: "The Witcher",
      thumbnail: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?w=400&h=600&fit=crop",
      type: "series",
      year: "2024",
      rating: "TV-MA",
      duration: 480,
      progress: 240,
      imdbRating: 8.2,
      genres: ["Action", "Adventure", "Drama"],
      isNew: false
    }
  ];

  const mockNewReleases = [
    {
      id: 11,
      title: "Avatar: The Way of Water",
      thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=600&fit=crop",
      type: "movie",
      year: "2024",
      rating: "PG-13",
      duration: 192,
      progress: 0,
      imdbRating: 8.8,
      genres: ["Action", "Adventure", "Family"],
      isNew: true
    },
    {
      id: 12,
      title: "Wednesday",
      thumbnail: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?w=400&h=600&fit=crop",
      type: "series",
      year: "2024",
      rating: "TV-14",
      duration: 480,
      progress: 0,
      imdbRating: 8.6,
      genres: ["Comedy", "Crime", "Family"],
      isNew: true
    },
    {
      id: 13,
      title: "Glass Onion: A Knives Out Mystery",
      thumbnail: "https://images.pixabay.com/photo/2019/11/07/20/47/castle-4609867_1280.jpg?w=400&h=600&fit=crop",
      type: "movie",
      year: "2024",
      rating: "PG-13",
      duration: 139,
      progress: 0,
      imdbRating: 7.2,
      genres: ["Comedy", "Crime", "Drama"],
      isNew: true
    },
    {
      id: 14,
      title: "The Crown Season 6",
      thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
      type: "series",
      year: "2024",
      rating: "TV-MA",
      duration: 600,
      progress: 0,
      imdbRating: 8.7,
      genres: ["Biography", "Drama", "History"],
      isNew: true
    },
    {
      id: 15,
      title: "Top Gun: Maverick",
      thumbnail: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?w=400&h=600&fit=crop",
      type: "movie",
      year: "2024",
      rating: "PG-13",
      duration: 130,
      progress: 0,
      imdbRating: 8.7,
      genres: ["Action", "Drama"],
      isNew: true
    },
    {
      id: 16,
      title: "Euphoria Season 3",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      type: "series",
      year: "2024",
      rating: "TV-MA",
      duration: 480,
      progress: 0,
      imdbRating: 8.4,
      genres: ["Drama"],
      isNew: true
    }
  ];

  const mockBecauseYouWatched = [
    {
      id: 21,
      title: "Better Call Saul",
      thumbnail: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?w=400&h=600&fit=crop",
      type: "series",
      year: "2024",
      rating: "TV-MA",
      duration: 3000,
      progress: 0,
      imdbRating: 9.0,
      genres: ["Crime", "Drama"],
      isNew: false
    },
    {
      id: 22,
      title: "Ozark",
      thumbnail: "https://images.pixabay.com/photo/2019/11/07/20/47/castle-4609867_1280.jpg?w=400&h=600&fit=crop",
      type: "series",
      year: "2024",
      rating: "TV-MA",
      duration: 2400,
      progress: 0,
      imdbRating: 8.4,
      genres: ["Crime", "Drama", "Thriller"],
      isNew: false
    },
    {
      id: 23,
      title: "Narcos",
      thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
      type: "series",
      year: "2024",
      rating: "TV-MA",
      duration: 1800,
      progress: 0,
      imdbRating: 8.8,
      genres: ["Biography", "Crime", "Drama"],
      isNew: false
    },
    {
      id: 24,
      title: "The Sopranos",
      thumbnail: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?w=400&h=600&fit=crop",
      type: "series",
      year: "2024",
      rating: "TV-MA",
      duration: 5160,
      progress: 0,
      imdbRating: 9.2,
      genres: ["Crime", "Drama"],
      isNew: false
    },
    {
      id: 25,
      title: "Fargo",
      thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=600&fit=crop",
      type: "series",
      year: "2024",
      rating: "TV-MA",
      duration: 2400,
      progress: 0,
      imdbRating: 9.0,
      genres: ["Crime", "Drama", "Thriller"],
      isNew: false
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setContinueWatching(mockContinueWatching);
      setNewReleases(mockNewReleases);
      setBecauseYouWatched(mockBecauseYouWatched);
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Loading... - StreamFlix</title>
        </Helmet>
        <GlobalHeader />
        <main className="pt-16">
          <LoadingSkeleton type="hero" />
          <LoadingSkeleton type="carousel" />
          <LoadingSkeleton type="trending" />
          <LoadingSkeleton type="carousel" />
          <LoadingSkeleton type="genre" />
          <LoadingSkeleton type="carousel" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Home - StreamFlix</title>
        <meta name="description" content="Discover and watch your favorite movies and TV shows on StreamFlix. Unlimited streaming with personalized recommendations." />
        <meta name="keywords" content="streaming, movies, TV shows, entertainment, watch online" />
      </Helmet>

      <GlobalHeader />
      
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Content Sections */}
        <div className="py-8 space-y-8">
          {/* Continue Watching */}
          {continueWatching.length > 0 && (
            <ContentCarousel
              title="Continue Watching"
              items={continueWatching}
              showProgress={true}
            />
          )}

          {/* Trending Section */}
          <TrendingSection />

          {/* New Releases */}
          <ContentCarousel
            title="New Releases"
            items={newReleases}
          />

          {/* Because You Watched */}
          {becauseYouWatched.length > 0 && (
            <ContentCarousel
              title="Because You Watched Breaking Bad"
              items={becauseYouWatched}
            />
          )}

          {/* Genre Section */}
          <GenreSection />
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="container mx-auto px-4 lg:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">StreamFlix</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Your ultimate destination for unlimited streaming entertainment.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-3">Navigation</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/home-dashboard" className="hover:text-foreground transition-colors">Home</a></li>
                  <li><a href="/content-browse-search" className="hover:text-foreground transition-colors">Browse</a></li>
                  <li><a href="/my-list" className="hover:text-foreground transition-colors">My List</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-3">Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-3">Account</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/profile-selection-management" className="hover:text-foreground transition-colors">Manage Profiles</a></li>
                  <li><a href="/settings" className="hover:text-foreground transition-colors">Settings</a></li>
                  <li><a href="/user-authentication-login-register" className="hover:text-foreground transition-colors">Sign Out</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} StreamFlix. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomeDashboard;