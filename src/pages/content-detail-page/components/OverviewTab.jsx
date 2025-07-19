import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OverviewTab = ({ content }) => {
  const [showAllCast, setShowAllCast] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [showReviews, setShowReviews] = useState(false);

  const displayedCast = showAllCast ? content.cast : content.cast.slice(0, 6);

  const handleRatingClick = (rating) => {
    setUserRating(rating);
    // Save rating logic here
  };

  return (
    <div className="space-y-8">
      {/* Synopsis */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Synopsis</h3>
        <p className="text-muted-foreground leading-relaxed">
          {content.fullDescription || content.description}
        </p>
      </div>

      {/* Cast & Crew */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">Cast & Crew</h3>
          {content.cast.length > 6 && (
            <Button
              variant="ghost"
              onClick={() => setShowAllCast(!showAllCast)}
              className="text-primary hover:text-primary/80"
            >
              {showAllCast ? 'Show Less' : `View All (${content.cast.length})`}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayedCast.map((person, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-3">
                <Image
                  src={person.image}
                  alt={person.name}
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">
                {person.name}
              </h4>
              <p className="text-muted-foreground text-xs">
                {person.character}
              </p>
            </div>
          ))}
        </div>

        {/* Director & Producer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-foreground mb-2">Director</h4>
            <p className="text-muted-foreground">{content.director}</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Producer</h4>
            <p className="text-muted-foreground">{content.producer}</p>
          </div>
        </div>
      </div>

      {/* User Rating */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Rate This {content.type === 'movie' ? 'Movie' : 'Series'}</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                className="transition-colors hover:scale-110 transform"
              >
                <Icon
                  name="Star"
                  size={24}
                  className={star <= userRating ? 'text-accent fill-current' : 'text-muted-foreground'}
                />
              </button>
            ))}
          </div>
          {userRating > 0 && (
            <span className="text-muted-foreground">
              You rated this {userRating} star{userRating > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">
            Reviews ({content.reviews.length})
          </h3>
          <Button
            variant="ghost"
            onClick={() => setShowReviews(!showReviews)}
            iconName={showReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="text-primary hover:text-primary/80"
          >
            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
          </Button>
        </div>

        {showReviews && (
          <div className="space-y-6">
            {content.reviews.slice(0, 3).map((review, index) => (
              <div key={index} className="border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{review.author}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Icon
                              key={star}
                              name="Star"
                              size={14}
                              className={star <= review.rating ? 'text-accent fill-current' : 'text-muted-foreground'}
                            />
                          ))}
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {review.content}
                </p>
                <div className="flex items-center space-x-4 mt-4">
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="ThumbsUp" size={16} />
                    <span className="text-sm">{review.helpful}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="MessageCircle" size={16} />
                    <span className="text-sm">Reply</span>
                  </button>
                </div>
              </div>
            ))}
            
            {content.reviews.length > 3 && (
              <Button
                variant="outline"
                className="w-full"
              >
                View All {content.reviews.length} Reviews
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;