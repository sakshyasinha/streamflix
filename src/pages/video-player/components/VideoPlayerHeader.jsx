import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayerHeader = ({ 
  title = "Unknown Title",
  episodeInfo = null,
  isVisible = true,
  onBack,
  className = ""
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    } ${className}`}>
      <div className="flex items-center justify-between p-4 lg:p-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-white hover:bg-white/20 transition-colors"
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
          
          <div className="text-white">
            <h1 className="text-lg lg:text-xl font-semibold truncate max-w-md lg:max-w-2xl">
              {title}
            </h1>
            {episodeInfo && (
              <p className="text-sm text-white/80 mt-1">
                {episodeInfo}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 transition-colors"
            onClick={() => {
              // Cast functionality placeholder
            }}
          >
            <Icon name="Cast" size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 transition-colors"
            onClick={() => {
              // Settings functionality placeholder
            }}
          >
            <Icon name="Settings" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerHeader;