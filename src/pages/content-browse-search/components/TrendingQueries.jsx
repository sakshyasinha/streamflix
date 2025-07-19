import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingQueries = ({ onQuerySelect, className = '' }) => {
  const trendingQueries = [
    { query: 'Stranger Things', trend: 'up', count: '2.3M' },
    { query: 'The Crown', trend: 'up', count: '1.8M' },
    { query: 'Breaking Bad', trend: 'stable', count: '1.5M' },
    { query: 'Money Heist', trend: 'up', count: '1.2M' },
    { query: 'Squid Game', trend: 'down', count: '980K' },
    { query: 'The Witcher', trend: 'up', count: '850K' },
    { query: 'Ozark', trend: 'stable', count: '720K' },
    { query: 'Friends', trend: 'stable', count: '650K' }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <Icon name="TrendingUp" size={12} className="text-success" />;
      case 'down':
        return <Icon name="TrendingDown" size={12} className="text-destructive" />;
      default:
        return <Icon name="Minus" size={12} className="text-muted-foreground" />;
    }
  };

  const handleQueryClick = (query) => {
    if (onQuerySelect) {
      onQuerySelect(query);
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="TrendingUp" size={16} className="text-primary" />
        <h3 className="font-semibold text-foreground">Trending Searches</h3>
      </div>

      <div className="space-y-2">
        {trendingQueries.map((item, index) => (
          <button
            key={item.query}
            onClick={() => handleQueryClick(item.query)}
            className="w-full flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors text-left group"
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-muted-foreground w-6">
                {index + 1}
              </span>
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {item.query}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">
                {item.count}
              </span>
              {getTrendIcon(item.trend)}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-muted-foreground hover:text-foreground"
        >
          <Icon name="RefreshCw" size={14} className="mr-2" />
          Refresh Trends
        </Button>
      </div>
    </div>
  );
};

export default TrendingQueries;