import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const ContentTabs = ({ content, activeTab, onTabChange, children }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    ...(content.type === 'series' ? [{ id: 'episodes', label: 'Episodes', icon: 'PlayCircle' }] : []),
    { id: 'more-like-this', label: 'More Like This', icon: 'Grid3X3' },
    { id: 'details', label: 'Details', icon: 'FileText' }
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="px-4 lg:px-6">
          <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 lg:px-6 py-8">
        {children}
      </div>
    </div>
  );
};

export default ContentTabs;