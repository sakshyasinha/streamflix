import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProfileModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  profile = null, 
  mode = 'create' // 'create' or 'edit'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    maturityLevel: 'Adult',
    isKids: false,
    autoplay: true,
    language: 'English'
  });
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0);
  const [errors, setErrors] = useState({});

  // Avatar options
  const avatarOptions = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  ];

  useEffect(() => {
    if (profile && mode === 'edit') {
      setFormData({
        name: profile.name || '',
        avatar: profile.avatar || avatarOptions[0],
        maturityLevel: profile.maturityLevel || 'Adult',
        isKids: profile.maturityLevel === 'Kids',
        autoplay: profile.autoplay !== false,
        language: profile.language || 'English'
      });
      
      const avatarIndex = avatarOptions.findIndex(avatar => avatar === profile.avatar);
      setSelectedAvatarIndex(avatarIndex >= 0 ? avatarIndex : 0);
    } else {
      setFormData({
        name: '',
        avatar: avatarOptions[0],
        maturityLevel: 'Adult',
        isKids: false,
        autoplay: true,
        language: 'English'
      });
      setSelectedAvatarIndex(0);
    }
    setErrors({});
  }, [profile, mode, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAvatarSelect = (avatar, index) => {
    setSelectedAvatarIndex(index);
    handleInputChange('avatar', avatar);
  };

  const handleKidsToggle = (checked) => {
    handleInputChange('isKids', checked);
    handleInputChange('maturityLevel', checked ? 'Kids' : 'Adult');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Profile name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Profile name must be at least 2 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    const profileData = {
      ...formData,
      name: formData.name.trim(),
      id: profile?.id || Date.now(),
      isMain: profile?.isMain || false,
      watchedCount: profile?.watchedCount || 0,
      lastActive: profile?.lastActive || 'Just now'
    };
    
    onSave(profileData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black/80 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-card-foreground">
            {mode === 'edit' ? 'Edit Profile' : 'Add Profile'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-card-foreground"
          >
            <Icon name="X" size={24} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Avatar Selection */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-3">
              Choose Avatar
            </label>
            <div className="grid grid-cols-4 gap-3">
              {avatarOptions.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => handleAvatarSelect(avatar, index)}
                  className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                    selectedAvatarIndex === index
                      ? 'border-primary scale-110' :'border-border hover:border-primary/50'
                  }`}
                >
                  <Image
                    src={avatar}
                    alt={`Avatar option ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedAvatarIndex === index && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <Icon name="Check" size={16} color="white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Name */}
          <Input
            label="Profile Name"
            type="text"
            placeholder="Enter profile name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
            required
            maxLength={20}
          />

          {/* Kids Profile Toggle */}
          <div className="space-y-3">
            <Checkbox
              label="Kids Profile"
              description="Restrict content to age-appropriate titles"
              checked={formData.isKids}
              onChange={(e) => handleKidsToggle(e.target.checked)}
            />
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground">Settings</h3>
            
            <Checkbox
              label="Autoplay next episode"
              description="Automatically play the next episode in a series"
              checked={formData.autoplay}
              onChange={(e) => handleInputChange('autoplay', e.target.checked)}
            />

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Language Preference
              </label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Italian">Italian</option>
                <option value="Portuguese">Portuguese</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
          >
            {mode === 'edit' ? 'Save Changes' : 'Create Profile'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;