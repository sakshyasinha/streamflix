import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileCard = ({ 
  profile, 
  onSelect, 
  onEdit, 
  onDelete, 
  isSelected = false,
  className = '' 
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(profile);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(profile);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(profile);
    }
  };

  const getMaturityColor = (level) => {
    switch (level) {
      case 'Kids':
        return 'bg-accent text-accent-foreground';
      case 'Teen':
        return 'bg-warning text-warning-foreground';
      case 'Adult':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}
      onClick={handleCardClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`bg-card border-2 rounded-xl p-6 text-center transition-all duration-300 ${
        isSelected 
          ? 'border-primary shadow-elevation-2' 
          : 'border-border hover:border-primary/50 hover:shadow-elevation-1'
      }`}>
        {/* Profile Avatar */}
        <div className="relative mb-4">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-muted">
            <Image
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Maturity Rating Badge */}
          <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium ${getMaturityColor(profile.maturityLevel)}`}>
            {profile.maturityLevel}
          </div>
          
          {/* Selected Indicator */}
          {isSelected && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={14} color="white" />
            </div>
          )}
        </div>

        {/* Profile Name */}
        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          {profile.name}
        </h3>

        {/* Profile Stats */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p>{profile.watchedCount} titles watched</p>
          <p>Last active: {profile.lastActive}</p>
        </div>

        {/* Quick Actions Overlay */}
        {showActions && (
          <div className="absolute inset-0 bg-black/80 rounded-xl flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              className="text-white hover:bg-white/20"
            >
              <Icon name="Edit" size={20} />
            </Button>
            
            {!profile.isMain && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="text-white hover:bg-white/20"
              >
                <Icon name="Trash2" size={20} />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;