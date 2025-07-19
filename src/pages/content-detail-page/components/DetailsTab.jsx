import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetailsTab = ({ content }) => {
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [showAllSubtitles, setShowAllSubtitles] = useState(false);

  const displayedLanguages = showAllLanguages ? content.availableLanguages : content.availableLanguages.slice(0, 5);
  const displayedSubtitles = showAllSubtitles ? content.subtitleLanguages : content.subtitleLanguages.slice(0, 5);

  const formatFileSize = (sizeInGB) => {
    return `${sizeInGB} GB`;
  };

  const getQualityBadgeColor = (quality) => {
    switch (quality) {
      case '4K': return 'bg-primary/20 text-primary';
      case 'HD': return 'bg-accent/20 text-accent';
      case 'SD': return 'bg-muted/20 text-muted-foreground';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Title</h4>
              <p className="text-muted-foreground">{content.title}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Original Title</h4>
              <p className="text-muted-foreground">{content.originalTitle}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Release Date</h4>
              <p className="text-muted-foreground">{content.releaseDate}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Country</h4>
              <p className="text-muted-foreground">{content.country}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Director</h4>
              <p className="text-muted-foreground">{content.director}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Producer</h4>
              <p className="text-muted-foreground">{content.producer}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Studio</h4>
              <p className="text-muted-foreground">{content.studio}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Budget</h4>
              <p className="text-muted-foreground">{content.budget}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Technical Specifications</h3>
        
        {/* Video Quality Options */}
        <div className="mb-6">
          <h4 className="font-medium text-foreground mb-4">Available Quality</h4>
          <div className="flex flex-wrap gap-3">
            {content.videoQualities.map((quality, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-lg border ${getQualityBadgeColor(quality.quality)}`}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{quality.quality}</span>
                  <span className="text-sm opacity-80">
                    {quality.resolution} • {formatFileSize(quality.fileSize)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audio & Video Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Video Codec</h4>
              <p className="text-muted-foreground">{content.videoCodec}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Audio Codec</h4>
              <p className="text-muted-foreground">{content.audioCodec}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Aspect Ratio</h4>
              <p className="text-muted-foreground">{content.aspectRatio}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Frame Rate</h4>
              <p className="text-muted-foreground">{content.frameRate}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Audio Channels</h4>
              <p className="text-muted-foreground">{content.audioChannels}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">HDR Support</h4>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={content.hdrSupport ? "Check" : "X"} 
                  size={16} 
                  className={content.hdrSupport ? "text-success" : "text-error"} 
                />
                <span className="text-muted-foreground">
                  {content.hdrSupport ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Languages & Subtitles */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Languages & Subtitles</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Audio Languages */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-foreground">Audio Languages</h4>
              {content.availableLanguages.length > 5 && (
                <Button
                  variant="ghost"
                  onClick={() => setShowAllLanguages(!showAllLanguages)}
                  className="text-primary hover:text-primary/80 text-sm"
                >
                  {showAllLanguages ? 'Show Less' : `Show All (${content.availableLanguages.length})`}
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {displayedLanguages.map((language, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                  <span className="text-foreground">{language.name}</span>
                  <div className="flex items-center space-x-2">
                    {language.isOriginal && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                        Original
                      </span>
                    )}
                    <span className="text-muted-foreground text-sm">{language.quality}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subtitle Languages */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-foreground">Subtitle Languages</h4>
              {content.subtitleLanguages.length > 5 && (
                <Button
                  variant="ghost"
                  onClick={() => setShowAllSubtitles(!showAllSubtitles)}
                  className="text-primary hover:text-primary/80 text-sm"
                >
                  {showAllSubtitles ? 'Show Less' : `Show All (${content.subtitleLanguages.length})`}
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {displayedSubtitles.map((subtitle, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                  <span className="text-foreground">{subtitle.name}</span>
                  <div className="flex items-center space-x-2">
                    {subtitle.isCC && (
                      <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                        CC
                      </span>
                    )}
                    <span className="text-muted-foreground text-sm">{subtitle.format}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Ratings */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Content Ratings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.contentRatings.map((rating, index) => (
            <div key={index} className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">{rating.country}</h4>
                <span className={`px-3 py-1 rounded font-medium text-sm ${
                  rating.rating === 'G' || rating.rating === 'PG' ? 'bg-success/20 text-success' :
                  rating.rating === 'PG-13'|| rating.rating === '12A' ? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
                }`}>
                  {rating.rating}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">{rating.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Content ID</h4>
              <p className="text-muted-foreground font-mono text-sm">{content.id}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Added to Platform</h4>
              <p className="text-muted-foreground">{content.addedDate}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Last Updated</h4>
              <p className="text-muted-foreground">{content.lastUpdated}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Content Type</h4>
              <p className="text-muted-foreground capitalize">{content.type}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Offline Download</h4>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={content.offlineAvailable ? "Download" : "X"} 
                  size={16} 
                  className={content.offlineAvailable ? "text-success" : "text-error"} 
                />
                <span className="text-muted-foreground">
                  {content.offlineAvailable ? 'Available' : 'Not Available'}
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Parental Controls</h4>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={content.parentalControlsEnabled ? "Shield" : "ShieldOff"} 
                  size={16} 
                  className={content.parentalControlsEnabled ? "text-success" : "text-muted-foreground"} 
                />
                <span className="text-muted-foreground">
                  {content.parentalControlsEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;