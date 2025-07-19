import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const EpisodesTab = ({ content }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const navigate = useNavigate();

  if (content.type !== 'series') return null;

  const seasonOptions = Array.from({ length: content.seasons }, (_, i) => ({
    value: i + 1,
    label: `Season ${i + 1}`
  }));

  const currentSeasonEpisodes = content.episodes.filter(ep => ep.season === selectedSeason);

  const handleEpisodePlay = (episode) => {
    navigate('/video-player', {
      state: {
        contentId: content.id,
        episodeId: episode.id,
        title: `${content.title} - S${episode.season}E${episode.episode}`,
        type: 'episode'
      }
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Season Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">Episodes</h3>
        <div className="w-48">
          <Select
            options={seasonOptions}
            value={selectedSeason}
            onChange={setSelectedSeason}
            placeholder="Select Season"
          />
        </div>
      </div>

      {/* Season Info */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <Image
            src={content.seasonPosters[selectedSeason - 1]}
            alt={`Season ${selectedSeason}`}
            className="w-24 h-36 object-cover rounded-lg flex-shrink-0"
          />
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Season {selectedSeason}
            </h4>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {content.seasonDescriptions[selectedSeason - 1]}
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{currentSeasonEpisodes.length} Episodes</span>
              <span>Released {content.seasonReleaseYears[selectedSeason - 1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes List */}
      <div className="space-y-4">
        {currentSeasonEpisodes.map((episode, index) => (
          <div
            key={episode.id}
            className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start space-x-4">
              {/* Episode Thumbnail */}
              <div className="relative flex-shrink-0">
                <Image
                  src={episode.thumbnail}
                  alt={episode.title}
                  className="w-32 h-18 object-cover rounded-lg"
                />
                
                {/* Play Button Overlay */}
                <button
                  onClick={() => handleEpisodePlay(episode)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Play" size={20} color="white" />
                  </div>
                </button>

                {/* Episode Number */}
                <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {episode.episode}
                </div>

                {/* Progress Bar */}
                {episode.watchProgress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50 rounded-b-lg">
                    <div
                      className="h-full bg-primary rounded-b-lg transition-all duration-300"
                      style={{ width: `${episode.watchProgress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Episode Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-foreground text-lg leading-tight">
                    {episode.title}
                  </h4>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-muted-foreground text-sm">
                      {formatDuration(episode.duration)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEpisodePlay(episode)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Icon name="Play" size={16} />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {episode.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Air Date: {episode.airDate}</span>
                    {episode.rating && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-accent fill-current" />
                        <span>{episode.rating}/10</span>
                      </div>
                    )}
                  </div>

                  {episode.watchProgress > 0 && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{Math.round(episode.watchProgress)}% watched</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Season Navigation */}
      <div className="flex items-center justify-between pt-6">
        <Button
          variant="outline"
          disabled={selectedSeason === 1}
          onClick={() => setSelectedSeason(selectedSeason - 1)}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Previous Season
        </Button>
        
        <Button
          variant="outline"
          disabled={selectedSeason === content.seasons}
          onClick={() => setSelectedSeason(selectedSeason + 1)}
          iconName="ChevronRight"
          iconPosition="right"
        >
          Next Season
        </Button>
      </div>
    </div>
  );
};

export default EpisodesTab;