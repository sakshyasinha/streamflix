import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  profile 
}) => {
  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black/80 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-elevation-3 w-full max-w-md">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
            <Image
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="w-12 h-12 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
            <Icon name="Trash2" size={24} className="text-destructive" />
          </div>
          
          <h2 className="text-xl font-bold text-card-foreground mb-2">
            Delete Profile?
          </h2>
          
          <p className="text-muted-foreground mb-4">
            Are you sure you want to delete <span className="font-semibold text-card-foreground">"{profile.name}"</span>? 
            This action cannot be undone and all viewing history and preferences will be lost.
          </p>
          
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-6">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-destructive mt-0.5" />
              <div className="text-sm text-destructive text-left">
                <p className="font-medium mb-1">This will permanently remove:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Viewing history and progress</li>
                  <li>• Watchlist and favorites</li>
                  <li>• Personal recommendations</li>
                  <li>• Profile settings and preferences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm(profile);
              onClose();
            }}
            className="flex-1"
          >
            Delete Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;