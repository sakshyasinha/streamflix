import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentHero, setCurrentHero] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const heroContent = [
    {
      id: 1,
      title: "Stranger Things",
      synopsis: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
      genre: "Sci-Fi Drama",
      year: "2024",
      rating: "TV-14",
      duration: "4 Seasons",
      isNew: true
    },
    {
      id: 2,
      title: "The Crown",
      synopsis: "Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.",
      backdrop: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?w=1920&h=1080&fit=crop",
      genre: "Historical Drama",
      year: "2024",
      rating: "TV-MA",
      duration: "6 Seasons",
      isNew: false
    },
    {
      id: 3,
      title: "Wednesday",
      synopsis: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy.",
      backdrop: "https://images.pixabay.com/photo/2019/11/07/20/47/castle-4609867_1280.jpg?w=1920&h=1080&fit=crop",
      genre: "Dark Comedy",
      year: "2024",
      rating: "TV-14",
      duration: "2 Seasons",
      isNew: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroContent.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [heroContent.length]);

  const handlePlay = () => {
    setIsPlaying(true);
    navigate(`/video-player?content=${heroContent[currentHero].id}&type=series`);
  };

  const handleAddToList = () => {
    // Add to watchlist logic
    const watchlist = JSON.parse(localStorage.getItem('streamflix-watchlist') || '[]');
    const content = heroContent[currentHero];
    
    if (!watchlist.find(item => item.id === content.id)) {
      watchlist.push({
        id: content.id,
        title: content.title,
        type: 'series',
        addedAt: new Date().toISOString()
      });
      localStorage.setItem('streamflix-watchlist', JSON.stringify(watchlist));
    }
  };

  const handleMoreInfo = () => {
    navigate(`/content-detail-page?id=${heroContent[currentHero].id}&type=series`);
  };

  const current = heroContent[currentHero];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={current.backdrop}
          alt={current.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl">
            {/* New Badge */}
            {current.isNew && (
              <div className="inline-flex items-center space-x-2 bg-primary px-3 py-1 rounded-full mb-4">
                <Icon name="Sparkles" size={16} color="white" />
                <span className="text-white text-sm font-medium">New Episodes</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {current.title}
            </h1>

            {/* Metadata */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-accent font-semibold">{current.year}</span>
              <span className="text-white/80">{current.rating}</span>
              <span className="text-white/80">{current.duration}</span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} className="text-accent fill-current" />
                <span className="text-white/80">8.7</span>
              </div>
            </div>

            {/* Genre */}
            <p className="text-white/90 text-lg mb-6">{current.genre}</p>

            {/* Synopsis */}
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
              {current.synopsis}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={handlePlay}
                iconName="Play"
                iconPosition="left"
                className="bg-white text-black hover:bg-white/90 font-semibold px-8"
              >
                Play
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={handleAddToList}
                iconName="Plus"
                iconPosition="left"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 font-semibold px-8"
              >
                My List
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={handleMoreInfo}
                iconName="Info"
                iconPosition="left"
                className="text-white hover:bg-white/20 font-semibold px-8"
              >
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Indicators */}
      <div className="absolute bottom-8 right-8 flex space-x-2">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentHero(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentHero ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-white/60" />
      </div>
    </div>
  );
};

export default HeroSection;