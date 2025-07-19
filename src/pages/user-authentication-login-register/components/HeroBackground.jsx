import React from 'react';
import Image from '../../../components/AppImage';

const HeroBackground = () => {
  const heroImages = [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?w=1920&h=1080&fit=crop',
    'https://images.pixabay.com/photo/2019/04/24/11/27/flowers-4151900_1280.jpg?w=1920&h=1080&fit=crop'
  ];

  const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];

  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={randomImage}
        alt="StreamFlix Hero Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50"></div>
    </div>
  );
};

export default HeroBackground;