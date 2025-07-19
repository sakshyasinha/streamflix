import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

import Image from '../AppImage';

const ProfileSelector = ({ isOpen, onClose, className = '' }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const navigate = useNavigate();

  // Mock profiles data
  const mockProfiles = [
    {
      id: 1,
      name: 'John',
      avatar: '/assets/images/avatar-1.png',
      isKids: false,
      isActive: true
    },
    {
      id: 2,
      name: 'Sarah',
      avatar: '/assets/images/avatar-2.png',
      isKids: false,
      isActive: false
    },
    {
      id: 3,
      name: 'Kids',
      avatar: '/assets/images/avatar-kids.png',
      isKids: true,
      isActive: false
    }
  ];

  useEffect(() => {
    // Load profiles from localStorage or use mock data
    const savedProfiles = localStorage.getItem('streamflix-profiles');
    if (savedProfiles) {
      const parsed = JSON.parse(savedProfiles);
      setProfiles(parsed);
      setCurrentProfile(parsed.find(p => p.isActive) || parsed[0]);
    } else {
      setProfiles(mockProfiles);
      setCurrentProfile(mockProfiles[0]);
      localStorage.setItem('streamflix-profiles', JSON.stringify(mockProfiles));
    }
  }, []);

  const handleProfileSwitch = (profile) => {
    // Update active profile
    const updatedProfiles = profiles.map(p => ({
      ...p,
      isActive: p.id === profile.id
    }));
    
    setProfiles(updatedProfiles);
    setCurrentProfile(profile);
    localStorage.setItem('streamflix-profiles', JSON.stringify(updatedProfiles));
    
    // Close selector and refresh current page to reflect profile change
    if (onClose) onClose();
    window.location.reload();
  };

  const handleManageProfiles = () => {
    navigate('/profile-selection-management');
    if (onClose) onClose();
  };

  const handleAddProfile = () => {
    // Navigate to add profile flow
    navigate('/profile-selection-management?action=add');
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-2 py-4 z-dropdown animate-slide-in ${className}`}>
      {/* Current Profile Header */}
      {currentProfile && (
        <div className="px-4 pb-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={currentProfile.avatar}
                alt={currentProfile.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              {currentProfile.isKids && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Baby" size={12} color="var(--color-accent-foreground)" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-popover-foreground">{currentProfile.name}</h3>
              <p className="text-sm text-muted-foreground">
                {currentProfile.isKids ? 'Kids Profile' : 'Active Profile'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Profile List */}
      <div className="py-2">
        <div className="px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Switch Profile
          </span>
        </div>
        
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => handleProfileSwitch(profile)}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
              profile.isActive 
                ? 'bg-primary/10 text-primary' :'text-popover-foreground hover:bg-muted/50'
            }`}
          >
            <div className="relative">
              <Image
                src={profile.avatar}
                alt={profile.name}
                className="w-8 h-8 rounded object-cover"
              />
              {profile.isKids && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Baby" size={8} color="var(--color-accent-foreground)" />
                </div>
              )}
              {profile.isActive && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Check" size={8} color="white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium">{profile.name}</div>
              {profile.isKids && (
                <div className="text-xs text-muted-foreground">Kids Profile</div>
              )}
            </div>
            {profile.isActive && (
              <Icon name="Check" size={16} className="text-success" />
            )}
          </button>
        ))}

        {/* Add Profile */}
        {profiles.length < 5 && (
          <button
            onClick={handleAddProfile}
            className="w-full flex items-center space-x-3 px-4 py-3 text-popover-foreground hover:bg-muted/50 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded border-2 border-dashed border-muted-foreground flex items-center justify-center">
              <Icon name="Plus" size={16} className="text-muted-foreground" />
            </div>
            <span className="font-medium">Add Profile</span>
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-border pt-2 mt-2">
        <button
          onClick={handleManageProfiles}
          className="w-full flex items-center space-x-3 px-4 py-3 text-popover-foreground hover:bg-muted/50 transition-colors text-left"
        >
          <Icon name="Settings" size={16} className="text-muted-foreground" />
          <span>Manage Profiles</span>
        </button>
        
        <button
          onClick={() => navigate('/user-authentication-login-register')}
          className="w-full flex items-center space-x-3 px-4 py-3 text-popover-foreground hover:bg-muted/50 transition-colors text-left"
        >
          <Icon name="LogOut" size={16} className="text-muted-foreground" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSelector;