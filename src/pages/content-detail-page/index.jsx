import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import HeroSection from './components/HeroSection';
import ContentTabs from './components/ContentTabs';
import OverviewTab from './components/OverviewTab';
import EpisodesTab from './components/EpisodesTab';
import MoreLikeThisTab from './components/MoreLikeThisTab';
import DetailsTab from './components/DetailsTab';
import ShareModal from './components/ShareModal';

const ContentDetailPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isInMyList, setIsInMyList] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Mock content data
  const mockContent = {
    id: "content-001",
    title: "The Digital Frontier",
    originalTitle: "The Digital Frontier: Origins",
    type: "series",
    year: 2024,
    rating: 8.7,
    duration: 55,
    seasons: 3,
    maturityRating: "TV-MA",
    isHD: true,
    genres: ["Sci-Fi", "Thriller", "Drama"],
    description: "In a world where technology and humanity collide, a group of hackers discovers a conspiracy that threatens the very fabric of digital society. As they delve deeper into the mystery, they must navigate through virtual realities and face enemies both digital and human.",
    fullDescription: `In a world where technology and humanity collide, a group of hackers discovers a conspiracy that threatens the very fabric of digital society. As they delve deeper into the mystery, they must navigate through virtual realities and face enemies both digital and human.

The series follows Maya Chen, a brilliant cybersecurity expert who stumbles upon encrypted messages that lead to a shadowy organization manipulating global digital infrastructure. Alongside her team of skilled hackers, she must uncover the truth while staying one step ahead of both corporate assassins and government agents.

Set in the near future, the show explores themes of privacy, digital identity, and the price of technological advancement. Each episode blends high-tech action with deep character development, creating a narrative that's both thrilling and thought-provoking.`,
    backdropImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
    posterImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    trailerUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    watchProgress: 65,
    remainingTime: 28,
    director: "Sarah Mitchell",
    producer: "James Rodriguez",
    studio: "Digital Dreams Productions",
    budget: "$85 Million",
    releaseDate: "March 15, 2024",
    country: "United States",
    addedDate: "March 20, 2024",
    lastUpdated: "July 15, 2025",
    offlineAvailable: true,
    parentalControlsEnabled: true,
    cast: [
      {
        name: "Emma Stone",
        character: "Maya Chen",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop"
      },
      {
        name: "Oscar Isaac",
        character: "Alex Rivera",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
      },
      {
        name: "Lupita Nyong\'o",
        character: "Dr. Zara Okafor",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop"
      },
      {
        name: "John Boyega",
        character: "Marcus Thompson",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop"
      },
      {
        name: "Tilda Swinton",
        character: "Director Kane",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop"
      },
      {
        name: "Michael Shannon",
        character: "Agent Brooks",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop"
      }
    ],
    episodes: [
      {
        id: "ep-001",
        season: 1,
        episode: 1,
        title: "Digital Awakening",
        description: "Maya discovers encrypted messages that lead her into a world of corporate espionage and digital warfare.",
        duration: 58,
        airDate: "March 15, 2024",
        rating: 8.9,
        thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=225&fit=crop",
        watchProgress: 100
      },
      {
        id: "ep-002",
        season: 1,
        episode: 2,
        title: "The Network",
        description: "The team assembles as they uncover the first layer of the conspiracy threatening global digital infrastructure.",
        duration: 55,
        airDate: "March 22, 2024",
        rating: 8.7,
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop",
        watchProgress: 75
      },
      {
        id: "ep-003",
        season: 1,
        episode: 3,
        title: "Virtual Shadows",
        description: "Maya and Alex infiltrate a virtual reality system to gather intelligence on their mysterious adversaries.",
        duration: 52,
        airDate: "March 29, 2024",
        rating: 8.5,
        thumbnail: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=225&fit=crop",
        watchProgress: 0
      }
    ],
    seasonPosters: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=450&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop"
    ],
    seasonDescriptions: [
      "The beginning of Maya\'s journey as she discovers the digital conspiracy that will change everything.",
      "The team goes deeper underground as the stakes rise and new enemies emerge from the shadows.",
      "The final season brings explosive revelations and the ultimate battle for digital freedom."
    ],
    seasonReleaseYears: [2024, 2024, 2025],
    reviews: [
      {
        author: "TechReviewer2024",
        rating: 5,
        date: "July 10, 2025",
        content: "Absolutely brilliant series! The way it handles technology and human relationships is masterful. Emma Stone delivers a powerhouse performance as Maya.",
        helpful: 234
      },
      {
        author: "SciFiFan",
        rating: 4,
        date: "July 8, 2025",
        content: "Great concept and execution. Some episodes feel a bit slow, but the overall arc is compelling. The visual effects are top-notch.",
        helpful: 156
      },
      {
        author: "CyberWatcher",
        rating: 5,
        date: "July 5, 2025",
        content: "This show perfectly captures the anxieties of our digital age. The writing is sharp and the performances are excellent across the board.",
        helpful: 89
      }
    ],
    recommendations: [
      {
        id: "rec-001",
        title: "Neural Network",
        type: "movie",
        year: 2023,
        rating: 8.2,
        duration: 142,
        maturityRating: "R",
        genres: ["Sci-Fi", "Thriller"],
        description: "A neuroscientist discovers a way to upload consciousness to the cloud, but the technology falls into the wrong hands.",
        posterImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=600&fit=crop",
        watchProgress: 0,
        matchPercentage: 95
      },
      {
        id: "rec-002",
        title: "Code Breakers",
        type: "series",
        year: 2022,
        rating: 7.9,
        seasons: 2,
        maturityRating: "TV-14",
        genres: ["Drama", "Thriller", "Crime"],
        description: "A team of ethical hackers works with law enforcement to take down cybercriminals and protect digital infrastructure.",
        posterImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=600&fit=crop",
        watchProgress: 45,
        matchPercentage: 88
      },
      {
        id: "rec-003",
        title: "Virtual Reality",
        type: "movie",
        year: 2024,
        rating: 7.6,
        duration: 118,
        maturityRating: "PG-13",
        genres: ["Sci-Fi", "Adventure"],
        description: "When a VR game becomes indistinguishable from reality, players must find a way back to the real world.",
        posterImage: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=600&fit=crop",
        watchProgress: 0,
        matchPercentage: 82
      },
      {
        id: "rec-004",
        title: "Digital Detox",
        type: "series",
        year: 2023,
        rating: 8.1,
        seasons: 1,
        maturityRating: "TV-MA",
        genres: ["Drama", "Psychological"],
        description: "A group of tech addicts attempt to reconnect with reality in a world increasingly dominated by digital interfaces.",
        posterImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop",
        watchProgress: 0,
        matchPercentage: 79
      }
    ],
    videoQualities: [
      { quality: "4K", resolution: "3840x2160", fileSize: 8.5 },
      { quality: "HD", resolution: "1920x1080", fileSize: 4.2 },
      { quality: "SD", resolution: "1280x720", fileSize: 2.1 }
    ],
    videoCodec: "H.265 (HEVC)",
    audioCodec: "Dolby Atmos",
    aspectRatio: "16:9",
    frameRate: "24 fps",
    audioChannels: "5.1 Surround",
    hdrSupport: true,
    availableLanguages: [
      { name: "English", quality: "Original", isOriginal: true },
      { name: "Spanish", quality: "Dubbed", isOriginal: false },
      { name: "French", quality: "Dubbed", isOriginal: false },
      { name: "German", quality: "Dubbed", isOriginal: false },
      { name: "Japanese", quality: "Dubbed", isOriginal: false },
      { name: "Portuguese", quality: "Dubbed", isOriginal: false }
    ],
    subtitleLanguages: [
      { name: "English", format: "SRT", isCC: true },
      { name: "Spanish", format: "SRT", isCC: false },
      { name: "French", format: "SRT", isCC: false },
      { name: "German", format: "SRT", isCC: false },
      { name: "Japanese", format: "SRT", isCC: false },
      { name: "Portuguese", format: "SRT", isCC: false },
      { name: "Arabic", format: "SRT", isCC: false }
    ],
    contentRatings: [
      {
        country: "United States",
        rating: "TV-MA",
        description: "Mature audiences only. Contains strong language, violence, and adult themes."
      },
      {
        country: "United Kingdom",
        rating: "15",
        description: "Suitable for ages 15 and over. Contains strong language and moderate violence."
      },
      {
        country: "Canada",
        rating: "14+",
        description: "Suitable for viewers 14 years and older. May contain violence and coarse language."
      }
    ]
  };

  useEffect(() => {
    // Simulate loading content data
    const timer = setTimeout(() => {
      setContent(mockContent);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if content is in user's list
    const myList = JSON.parse(localStorage.getItem('streamflix-my-list') || '[]');
    setIsInMyList(myList.some(item => item.id === mockContent.id));
  }, []);

  const handlePlayClick = () => {
    navigate('/video-player', {
      state: {
        contentId: content.id,
        title: content.title,
        type: content.type,
        resumeTime: content.watchProgress > 0 ? (content.watchProgress / 100) * content.duration * 60 : 0
      }
    });
  };

  const handleAddToList = () => {
    const myList = JSON.parse(localStorage.getItem('streamflix-my-list') || '[]');
    
    if (isInMyList) {
      // Remove from list
      const updatedList = myList.filter(item => item.id !== content.id);
      localStorage.setItem('streamflix-my-list', JSON.stringify(updatedList));
      setIsInMyList(false);
    } else {
      // Add to list
      const listItem = {
        id: content.id,
        title: content.title,
        type: content.type,
        posterImage: content.posterImage,
        rating: content.rating,
        year: content.year,
        addedDate: new Date().toISOString()
      };
      myList.push(listItem);
      localStorage.setItem('streamflix-my-list', JSON.stringify(myList));
      setIsInMyList(true);
    }
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab content={content} />;
      case 'episodes':
        return <EpisodesTab content={content} />;
      case 'more-like-this':
        return <MoreLikeThisTab content={content} />;
      case 'details':
        return <DetailsTab content={content} />;
      default:
        return <OverviewTab content={content} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Content Not Found</h1>
            <p className="text-muted-foreground mb-6">The content you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/content-browse-search')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse Content
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection
          content={content}
          onPlayClick={handlePlayClick}
          onAddToList={handleAddToList}
          onShare={handleShare}
        />

        {/* Content Tabs */}
        <ContentTabs
          content={content}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          {renderTabContent()}
        </ContentTabs>
      </main>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        content={content}
      />
    </div>
  );
};

export default ContentDetailPage;