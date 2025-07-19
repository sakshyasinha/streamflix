import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProfileCard from './components/ProfileCard';
import AddProfileCard from './components/AddProfileCard';
import ProfileModal from './components/ProfileModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

const ProfileSelectionManagement = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingProfile, setEditingProfile] = useState(null);
  const [deletingProfile, setDeletingProfile] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Mock profiles data
  const mockProfiles = [
    {
      id: 1,
      name: 'John',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      maturityLevel: 'Adult',
      isMain: true,
      watchedCount: 127,
      lastActive: '2 hours ago',
      autoplay: true,
      language: 'English'
    },
    {
      id: 2,
      name: 'Sarah',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      maturityLevel: 'Adult',
      isMain: false,
      watchedCount: 89,
      lastActive: '1 day ago',
      autoplay: true,
      language: 'English'
    },
    {
      id: 3,
      name: 'Kids',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      maturityLevel: 'Kids',
      isMain: false,
      watchedCount: 45,
      lastActive: '3 days ago',
      autoplay: false,
      language: 'English'
    }
  ];

  useEffect(() => {
    // Load profiles from localStorage or use mock data
    const savedProfiles = localStorage.getItem('streamflix-profiles');
    if (savedProfiles) {
      const parsed = JSON.parse(savedProfiles);
      setProfiles(parsed);
      setSelectedProfile(parsed.find(p => p.isActive) || parsed[0]);
    } else {
      setProfiles(mockProfiles);
      setSelectedProfile(mockProfiles[0]);
      localStorage.setItem('streamflix-profiles', JSON.stringify(mockProfiles));
    }

    // Check if we should open add profile modal
    const action = searchParams.get('action');
    if (action === 'add') {
      handleAddProfile();
    }
  }, [searchParams]);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    
    // Update active profile in storage
    const updatedProfiles = profiles.map(p => ({
      ...p,
      isActive: p.id === profile.id
    }));
    
    setProfiles(updatedProfiles);
    localStorage.setItem('streamflix-profiles', JSON.stringify(updatedProfiles));
    
    // Navigate to home dashboard with smooth transition
    setTimeout(() => {
      navigate('/home-dashboard');
    }, 300);
  };

  const handleAddProfile = () => {
    if (profiles.length >= 5) {
      alert('Maximum 5 profiles allowed per account');
      return;
    }
    
    setModalMode('create');
    setEditingProfile(null);
    setShowProfileModal(true);
  };

  const handleEditProfile = (profile) => {
    setModalMode('edit');
    setEditingProfile(profile);
    setShowProfileModal(true);
  };

  const handleDeleteProfile = (profile) => {
    if (profile.isMain) {
      alert('Cannot delete the main profile');
      return;
    }
    
    setDeletingProfile(profile);
    setShowDeleteModal(true);
  };

  const handleSaveProfile = (profileData) => {
    let updatedProfiles;
    
    if (modalMode === 'create') {
      updatedProfiles = [...profiles, profileData];
    } else {
      updatedProfiles = profiles.map(p => 
        p.id === profileData.id ? profileData : p
      );
    }
    
    setProfiles(updatedProfiles);
    localStorage.setItem('streamflix-profiles', JSON.stringify(updatedProfiles));
    setShowProfileModal(false);
  };

  const handleConfirmDelete = (profile) => {
    const updatedProfiles = profiles.filter(p => p.id !== profile.id);
    setProfiles(updatedProfiles);
    localStorage.setItem('streamflix-profiles', JSON.stringify(updatedProfiles));
    
    // If deleted profile was selected, select the first remaining profile
    if (selectedProfile?.id === profile.id) {
      setSelectedProfile(updatedProfiles[0] || null);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('streamflix-profiles');
    localStorage.removeItem('streamflix-auth');
    navigate('/user-authentication-login-register');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(229, 9, 20, 0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
            <Icon name="Play" size={24} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">StreamFlix</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Settings" size={20} />
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="LogOut" size={16} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="w-full max-w-6xl">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Who's watching?
            </h2>
            <p className="text-lg text-muted-foreground">
              Select a profile to continue your streaming experience
            </p>
          </div>

          {/* Profiles Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onSelect={handleProfileSelect}
                onEdit={handleEditProfile}
                onDelete={handleDeleteProfile}
                isSelected={selectedProfile?.id === profile.id}
                className="w-full"
              />
            ))}
            
            {profiles.length < 5 && (
              <AddProfileCard
                onClick={handleAddProfile}
                className="w-full"
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowProfileModal(true)}
              iconName="Users"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Manage Profiles
            </Button>
            
            {selectedProfile && (
              <Button
                variant="default"
                onClick={() => handleProfileSelect(selectedProfile)}
                iconName="ArrowRight"
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Continue as {selectedProfile.name}
              </Button>
            )}
          </div>

          {/* Profile Limits Info */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              {profiles.length} of 5 profiles created
            </p>
          </div>
        </div>
      </main>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onSave={handleSaveProfile}
        profile={editingProfile}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        profile={deletingProfile}
      />
    </div>
  );
};

export default ProfileSelectionManagement;