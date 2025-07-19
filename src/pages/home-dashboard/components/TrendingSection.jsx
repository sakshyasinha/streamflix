import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const navigate = useNavigate();

  const trendingPeriods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' }
  ];

  const trendingContent = {
    today: [
      {
        id: 101,
        title: "The Last of Us",
        rank: 1,
        thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
        type: "series",
        year: "2024",
        rating: "TV-MA",
        genres: ["Drama", "Horror", "Thriller"],
        imdbRating: 9.2,
        change: "up"
      },
      {
        id: 102,
        title: "Avatar: The Way of Water",
        rank: 2,
        thumbnail: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?w=400&h=600&fit=crop",
        type: "movie",
        year: "2024",
        rating: "PG-13",
        genres: ["Action", "Adventure", "Sci-Fi"],
        imdbRating: 8.8,
        change: "same"
      },
      {
        id: 103,
        title: "House of the Dragon",
        rank: 3,
        thumbnail: "https://images.pixabay.com/photo/2019/11/07/20/47/castle-4609867_1280.jpg?w=400&h=600&fit=crop",
        type: "series",
        year: "2024",
        rating: "TV-MA",
        genres: ["Fantasy", "Drama", "Action"],
        imdbRating: 8.5,
        change: "down"
      },
      {
        id: 104,
        title: "Top Gun: Maverick",
        rank: 4,
        thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=600&fit=crop",
        type: "movie",
        year: "2024",
        rating: "PG-13",
        genres: ["Action", "Drama"],
        imdbRating: 8.7,
        change: "up"
      },
      {
        id: 105,
        title: "Euphoria",
        rank: 5,
        thumbnail: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?w=400&h=600&fit=crop",
        type: "series",
        year: "2024",
        rating: "TV-MA",
        genres: ["Drama", "Romance"],
        imdbRating: 8.4,
        change: "up"
      }
    ],
    week: [
      {
        id: 106,
        title: "Wednesday",
        rank: 1,
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
        type: "series",
        year: "2024",
        rating: "TV-14",
        genres: ["Comedy", "Horror", "Mystery"],
        imdbRating: 8.6,
        change: "up"
      },
      {
        id: 107,
        title: "Black Panther: Wakanda Forever",
        rank: 2,
        thumbnail: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?w=400&h=600&fit=crop",
        type: "movie",
        year: "2024",
        rating: "PG-13",
        genres: ["Action", "Adventure", "Drama"],
        imdbRating: 8.3,
        change: "same"
      },
      {
        id: 108,
        title: "The Bear",
        rank: 3,
        thumbnail: "https://images.pixabay.com/photo/2019/11/07/20/47/castle-4609867_1280.jpg?w=400&h=600&fit=crop",
        type: "series",
        year: "2024",
        rating: "TV-MA",
        genres: ["Comedy", "Drama"],
        imdbRating: 8.9,
        change: "up"
      }
    ],
    month: [
      {
        id: 109,
        title: "Stranger Things",
        rank: 1,
        thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
        type: "series",
        year: "2024",
        rating: "TV-14",
        genres: ["Drama", "Fantasy", "Horror"],
        imdbRating: 8.7,
        change: "same"
      },
      {
        id: 110,
        title: "Dune: Part Two",
        rank: 2,
        thumbnail: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?w=400&h=600&fit=crop",
        type: "movie",
        year: "2024",
        rating: "PG-13",
        genres: ["Action", "Adventure", "Drama"],
        imdbRating: 9.1,
        change: "up"
      }
    ]
  };

  const handleItemClick = (item) => {
    navigate(`/content-detail-page?id=${item.id}&type=${item.type}`);
  };

  const getChangeIcon = (change) => {
    switch (change) {
      case 'up':
        return <Icon name="TrendingUp" size={16} className="text-success" />;
      case 'down':
        return <Icon name="TrendingDown" size={16} className="text-destructive" />;
      default:
        return <Icon name="Minus" size={16} className="text-muted-foreground" />;
    }
  };

  const getRankDisplay = (rank) => {
    return (
      <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white font-bold text-sm">
        {rank}
      </div>
    );
  };

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 px-4 lg:px-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-foreground">Trending Now</h2>
        
        {/* Period Selector */}
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {trendingPeriods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                selectedPeriod === period.id
                  ? 'bg-primary text-white' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trending List */}
      <div className="px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {trendingContent[selectedPeriod].map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="group cursor-pointer bg-card rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-300 hover:scale-105"
            >
              {/* Thumbnail with Rank */}
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Rank Badge */}
                <div className="absolute top-3 left-3">
                  {getRankDisplay(item.rank)}
                </div>

                {/* Change Indicator */}
                <div className="absolute top-3 right-3 bg-black/60 rounded-full p-1">
                  {getChangeIcon(item.change)}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 bg-white/20 text-white hover:bg-white/30 rounded-full"
                  >
                    <Icon name="Play" size={24} />
                  </Button>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs text-white">
                  {item.rating}
                </div>
              </div>

              {/* Content Info */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{item.year}</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-accent fill-current" />
                    <span className="text-sm text-muted-foreground">{item.imdbRating}</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-1">
                  {item.genres.slice(0, 2).map((genre, index) => (
                    <span
                      key={index}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Trending Stats */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="flex items-center space-x-1">
                    <Icon name="TrendingUp" size={14} className="text-primary" />
                    <span className="text-xs text-muted-foreground">#{item.rank} Trending</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {getChangeIcon(item.change)}
                    <span className="text-xs text-muted-foreground capitalize">{item.change}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => navigate('/content-browse-search?category=trending')}
            className="px-8"
          >
            View All Trending Content
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;