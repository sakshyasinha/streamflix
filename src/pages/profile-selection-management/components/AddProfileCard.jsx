import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AddProfileCard = ({ onClick, disabled = false, className = '' }) => {
  return (
    <div className={`${className}`}>
      <Button
        variant="outline"
        onClick={onClick}
        disabled={disabled}
        className="w-full h-full min-h-[200px] border-2 border-dashed border-muted-foreground/50 hover:border-primary/50 bg-transparent hover:bg-muted/20 transition-all duration-300 rounded-xl"
      >
        <div className="flex flex-col items-center space-y-4 text-muted-foreground">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-current flex items-center justify-center">
            <Icon name="Plus" size={24} />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-1">Add Profile</h3>
            <p className="text-sm">Create a new profile</p>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default AddProfileCard;