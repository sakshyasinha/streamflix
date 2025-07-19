import React from 'react';

const LoadingSkeleton = ({ type = 'carousel' }) => {
  if (type === 'hero') {
    return (
      <div className="relative h-screen w-full bg-muted animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-2xl space-y-4">
              <div className="h-4 bg-muted-foreground/20 rounded w-24"></div>
              <div className="h-16 bg-muted-foreground/20 rounded w-3/4"></div>
              <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
              <div className="h-6 bg-muted-foreground/20 rounded w-full"></div>
              <div className="h-6 bg-muted-foreground/20 rounded w-4/5"></div>
              <div className="flex space-x-4 mt-8">
                <div className="h-12 bg-muted-foreground/20 rounded w-32"></div>
                <div className="h-12 bg-muted-foreground/20 rounded w-32"></div>
                <div className="h-12 bg-muted-foreground/20 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'carousel') {
    return (
      <div className="mb-8">
        {/* Section Header Skeleton */}
        <div className="flex items-center justify-between mb-4 px-4 lg:px-6">
          <div className="h-8 bg-muted animate-pulse rounded w-48"></div>
          <div className="h-6 bg-muted animate-pulse rounded w-20"></div>
        </div>

        {/* Carousel Skeleton */}
        <div className="px-4 lg:px-6">
          <div className="flex space-x-2 overflow-hidden">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-48 lg:w-64">
                <div className="bg-muted animate-pulse rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted-foreground/20"></div>
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-muted-foreground/20 rounded w-12"></div>
                      <div className="h-3 bg-muted-foreground/20 rounded w-12"></div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="h-5 bg-muted-foreground/20 rounded w-16"></div>
                      <div className="h-5 bg-muted-foreground/20 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'trending') {
    return (
      <div className="mb-8">
        {/* Section Header Skeleton */}
        <div className="flex items-center justify-between mb-6 px-4 lg:px-6">
          <div className="h-8 bg-muted animate-pulse rounded w-48"></div>
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-8 bg-muted-foreground/20 rounded w-20"></div>
            ))}
          </div>
        </div>

        {/* Trending Grid Skeleton */}
        <div className="px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-muted animate-pulse rounded-lg overflow-hidden">
                <div className="aspect-[3/4] bg-muted-foreground/20"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-muted-foreground/20 rounded w-12"></div>
                    <div className="h-3 bg-muted-foreground/20 rounded w-12"></div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-5 bg-muted-foreground/20 rounded w-16"></div>
                    <div className="h-5 bg-muted-foreground/20 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'genre') {
    return (
      <div className="mb-8">
        {/* Section Header Skeleton */}
        <div className="flex items-center justify-between mb-6 px-4 lg:px-6">
          <div className="h-8 bg-muted animate-pulse rounded w-48"></div>
          <div className="h-6 bg-muted animate-pulse rounded w-20"></div>
        </div>

        {/* Genre Selector Skeleton */}
        <div className="mb-6 px-4 lg:px-6">
          <div className="flex space-x-2 overflow-hidden">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-10 bg-muted animate-pulse rounded-full w-24 flex-shrink-0"></div>
            ))}
          </div>
        </div>

        {/* Genre Grid Skeleton */}
        <div className="px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-muted animate-pulse rounded-lg overflow-hidden">
                <div className="aspect-[3/4] bg-muted-foreground/20"></div>
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-muted-foreground/20 rounded w-12"></div>
                    <div className="h-3 bg-muted-foreground/20 rounded w-12"></div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-5 bg-muted-foreground/20 rounded w-16"></div>
                    <div className="h-5 bg-muted-foreground/20 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;