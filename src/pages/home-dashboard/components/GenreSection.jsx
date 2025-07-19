import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GenreSection = () => {
  const [selectedGenre, setSelectedGenre] = useState('action');
  const navigate = useNavigate();

  const genres = [
    { id: 'action', label: 'Action', icon: 'Zap' },
    { id: 'comedy', label: 'Comedy', icon: 'Smile' },
    { id: 'drama', label: 'Drama', icon: 'Heart' },
    { id: 'horror', label: 'Horror', icon: 'Ghost' },
    { id: 'sci-fi', label: 'Sci-Fi', icon: 'Rocket' },
    { id: 'romance', label: 'Romance', icon: 'Heart' },
    { id: 'thriller', label: 'Thriller', icon: 'Eye' },
    { id: 'documentary', label: 'Documentary', icon: 'Camera' }
  ];

  const genreContent = {
    action: [
      {
        id: 201,
        title: "John Wick: Chapter 4",
        thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=600&fit=crop",
        type: "movie",
        year: "2024",
        rating: "R",
        duration: 169,
        imdbRating: 8.2,
        genres: ["Action", "Crime", "Thriller"]
      },
      {
        id: 202,
        title: "Fast X",
        thumbnail: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?w=400&h=600&fit=crop",
        type: "movie",
        year: "2024",
        rating: "PG-13",
        duration: 141,
        imdbRating: 7.8,
        genres: ["Action", "Adventure", "Crime"]
      },
      {
        id: 203,
        title: "The Mandalorian",
        thumbnail: "https://images.pixabay.com/photo/2019/11/07/20/47/castle-4609867_1280.jpg?w=400&h=600&fit=crop",
        type: "series",
        year: "2024",
        rating: "TV-14",
        duration: 45,
        imdbRating: 8.7,
        genres: ["Action", "Adventure", "Sci-Fi"]
      },
      {
        id: 204,
        title: "Mission: Impossible 8",
        thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
        type: "movie",
        year: "2024",
        rating: "PG-13",
        duration: 155,
        imdbRating: 8.5,
        genres: ["Action", "Adventure", "Thriller"]
      }
    ],
    comedy: [
      {
        id: 205,
        title: "Ted Lasso",
        thumbnail: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?w=400&h=600&fit=crop",
        type: "series",
        year: "2024",
        rating: "TV-MA",
        duration: 30,
        imdbRating: 8.8,
        genres: ["Comedy", "Drama", "Sport"]
      },
      {
        id: 206,
        title: "The Grand Budapest Hotel",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
        type: "movie",
        year: "2024",
        rating: "R",
        duration: 99,
        imdbRating: 8.1,
        genres: ["Comedy", "Drama", "Adventure"]
      }
    ],
    drama: [
      {
        id: 207,
        title: "The Crown",
        thumbnail: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?w=400&h=600&fit=crop",
        type: "series",
        year: "2024",
        rating: "TV-MA",
        duration: 60,
        imdbRating: 8.6,
        genres: ["Biography", "Drama", "History"]
      },
      {
        id: 208,
        title: "Oppenheimer",
        thumbnail: "https://images.pixabay.com/photo/2019/11/07/20/47/castle-4609867_1280.jpg?w=400&h=600&fit=crop",
        type: "movie",
        year: "2024",
        rating: "R",
        duration: 180,
        imdbRating: 8.9,
        genres: ["Biography", "Drama", "History"]
      }
    ],
    horror: [
      {
        id: 209,
        title: "The Haunting of Hill House",
        thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
        type: "series",
        year: "2024",
        rating: "TV-MA",
        duration: 60,
        imdbRating: 8.6,
        genres: ["Drama", "Horror", "Mystery"]
      },
      {
        id: 210,
        title: "Scream VI",
        thumbnail: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?w=400&h=600&fit=crop",
        type: "movie",
        year: "2024",
        rating: "R",
        duration: 123,
        imdbRating: 7.4,
        genres: ["Horror", "Mystery", "Thriller"]
      }
    ],
    'sci-fi': [
      {
        id: 211,
        title: "Dune: Part Two",
        thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=600&fit=crop",
        type: "movie",
        year: "2024",
        rating: "PG-13",
        duration: 166,
        imdbRating: 9.1,
        genres: ["Action", "Adventure", "Drama"]
      },
      {
        id: 212,
        title: "Foundation",
        thumbnail: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?w=400&h=600&fit=crop",
        type: "series",
        year: "2024",
        rating: "TV-14",
        duration: 60,
        imdbRating: 8.2,
        genres: ["Drama", "Sci-Fi"]
      }
    ],
    romance: [
      {
        id: 213,
        title: "Bridgerton",
        thumbnail: "https://images.pixabay.com/photo/2019/11/07/20/47/castle-4609867_1280.jpg?w=400&h=600&fit=crop",
        type: "series",
        year: "2024",
        rating: "TV-MA",
        duration: 60,
        imdbRating: 7.3,
        genres: ["Drama", "Romance"]
      },
      {
        id: 214,
        title: "The Notebook",
        thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
        type: "movie",
        year: "2024",
        rating: "PG-13",
        duration: 123,
        imdbRating: 7.8,
        genres: ["Drama", "Romance"]
      }
    ],
    thriller: [
      {
        id: 215,
        title: "Mindhunter",
        thumbnail: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?w=400&h=600&fit=crop",
        type: "series",
        year: "2024",
        rating: "TV-MA",
        duration: 60,
        imdbRating: 8.6,
        genres: ["Crime", "Drama", "Thriller"]
      },
      {
        id: 216,
        title: "Gone Girl",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
        type: "movie",
        year: "2024",
        rating: "R",
        duration: 149,
        imdbRating: 8.1,
        genres: ["Drama", "Mystery", "Thriller"]
      }
    ],
    documentary: [
      {
        id: 217,
        title: "Our Planet",
        thumbnail: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?w=400&h=600&fit=crop",
        type: "series",
        year: "2024",
        rating: "TV-G",
        duration: 50,
        imdbRating: 9.3,
        genres: ["Documentary"]
      },
      {
        id: 218,
        title: "Free Solo",
        thumbnail: "https://images.pixabay.com/photo/2019/11/07/20/47/castle-4609867_1280.jpg?w=400&h=600&fit=crop",
        type: "movie",
        year: "2024",
        rating: "PG-13",
        duration: 100,
        imdbRating: 8.2,
        genres: ["Documentary", "Adventure"]
      }
    ]
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleContentClick = (item) => {
    navigate(`/content-detail-page?id=${item.id}&type=${item.type}`);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const currentGenre = genres.find(g => g.id === selectedGenre);
  const currentContent = genreContent[selectedGenre] || [];

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 px-4 lg:px-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-foreground">Browse by Genre</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/content-browse-search')}
          className="text-muted-foreground hover:text-foreground"
        >
          View All Genres
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Button>
      </div>

      {/* Genre Selector */}
      <div className="mb-6 px-4 lg:px-6">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-2">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreChange(genre.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                selectedGenre === genre.id
                  ? 'bg-primary text-white' :'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              <Icon name={genre.icon} size={16} />
              <span className="font-medium">{genre.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Genre Content Grid */}
      <div className="px-4 lg:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {currentContent.map((item) => (
            <div
              key={item.id}
              onClick={() => handleContentClick(item)}
              className="group cursor-pointer bg-card rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-300 hover:scale-105"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
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
                <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                  {item.rating}
                </div>

                {/* Type Badge */}
                <div className="absolute top-2 left-2 bg-primary px-2 py-1 rounded text-xs text-white font-medium">
                  {item.type.toUpperCase()}
                </div>
              </div>

              {/* Content Info */}
              <div className="p-3">
                <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>{item.year}</span>
                  <span>{formatDuration(item.duration)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-accent fill-current" />
                    <span className="text-sm text-muted-foreground">{item.imdbRating}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name={currentGenre?.icon} size={14} className="text-primary" />
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.genres.slice(0, 2).map((genre, index) => (
                    <span
                      key={index}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => navigate(`/content-browse-search?genre=${selectedGenre}`)}
            className="px-8"
          >
            View More {currentGenre?.label} Content
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenreSection;