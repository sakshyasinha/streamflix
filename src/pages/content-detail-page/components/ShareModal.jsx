import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShareModal = ({ isOpen, onClose, content }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  if (!isOpen) return null;

  const shareUrl = `https://streamflix.com/watch/${content.id}`;
  const defaultMessage = `Check out "${content.title}" on StreamFlix! ${content.type === 'movie' ? 'Great movie' : 'Amazing series'} with ${content.rating}/10 rating.`;

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(customMessage || defaultMessage)}`
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(customMessage || defaultMessage)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'bg-green-600 hover:bg-green-700',
      url: `https://wa.me/?text=${encodeURIComponent((customMessage || defaultMessage) + ' ' + shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Telegram',
      icon: 'Send',
      color: 'bg-blue-500 hover:bg-blue-600',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(customMessage || defaultMessage)}`
    },
    {
      name: 'Reddit',
      icon: 'MessageSquare',
      color: 'bg-orange-600 hover:bg-orange-700',
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(content.title)}`
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSocialShare = (platform) => {
    window.open(platform.url, '_blank', 'width=600,height=400');
  };

  const handleEmailShare = () => {
    const subject = `Check out "${content.title}" on StreamFlix`;
    const body = `${customMessage || defaultMessage}\n\nWatch here: ${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="fixed inset-0 z-modal bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-popover border border-border rounded-lg shadow-elevation-3 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-popover-foreground">
            Share "{content.title}"
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Custom Message */}
          <div>
            <Input
              label="Custom Message (Optional)"
              type="text"
              placeholder={defaultMessage}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              description="Personalize your share message"
            />
          </div>

          {/* Copy Link */}
          <div>
            <label className="block text-sm font-medium text-popover-foreground mb-2">
              Share Link
            </label>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button
                variant={copiedLink ? "success" : "outline"}
                onClick={handleCopyLink}
                iconName={copiedLink ? "Check" : "Copy"}
                className="flex-shrink-0"
              >
                {copiedLink ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Social Media Platforms */}
          <div>
            <h3 className="text-sm font-medium text-popover-foreground mb-4">
              Share on Social Media
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {socialPlatforms.map((platform, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleSocialShare(platform)}
                  className={`${platform.color} text-white border-transparent hover:border-transparent justify-start`}
                  iconName={platform.icon}
                  iconPosition="left"
                >
                  {platform.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Email Share */}
          <div>
            <h3 className="text-sm font-medium text-popover-foreground mb-4">
              Other Options
            </h3>
            <Button
              variant="outline"
              onClick={handleEmailShare}
              iconName="Mail"
              iconPosition="left"
              className="w-full justify-start"
            >
              Share via Email
            </Button>
          </div>

          {/* Content Preview */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-card-foreground mb-3">Preview</h4>
            <div className="flex items-start space-x-3">
              <img
                src={content.posterImage}
                alt={content.title}
                className="w-16 h-24 object-cover rounded flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-card-foreground mb-1 line-clamp-1">
                  {content.title}
                </h5>
                <p className="text-muted-foreground text-sm mb-2">
                  {content.year} • {content.type === 'movie' ? 'Movie' : 'Series'}
                </p>
                <div className="flex items-center space-x-1 mb-2">
                  <Icon name="Star" size={14} className="text-accent fill-current" />
                  <span className="text-sm text-muted-foreground">
                    {content.rating}/10
                  </span>
                </div>
                <p className="text-muted-foreground text-xs line-clamp-2">
                  {content.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleCopyLink}
            iconName="Share"
            iconPosition="left"
          >
            Share Link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;