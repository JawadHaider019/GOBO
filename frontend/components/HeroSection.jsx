"use client";

import React from 'react';

const HeroSection = ({
  title,
  description,
  badge = "About GoBo",
  backgroundImage = "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600",
  altText = "Hero background",
  imageOpacity=100,
  overlayOpacity=50,
  overlayGradientFrom = "#003d2b",
  overlayGradientTo = "#006644"
}) => {
  return (
    <section className="relative h-[500px] md:h-[600px] w-full bg-gray-50 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0" style={{ opacity: `${imageOpacity}%` }}>
        <img 
          src={backgroundImage} 
          className="w-full h-full object-cover" 
          alt={altText} 
        />
      </div>
      
      {/* Gradient Color Overlay */}
      <div 
        className="absolute inset-0"
        style={{ 
          opacity: `${overlayOpacity}%`,
          background: `linear-gradient(to right, ${overlayGradientFrom}, ${overlayGradientTo})`
        }}
      ></div>
      
      {/* Content */}
      <div className="max-w-4xl relative z-10 text-center px-6 space-y-4 md:space-y-6">
        <span className="text-green-400 text-[10px] md:text-xs font-black uppercase tracking-[0.6em] block">
          {badge}
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.9]">
          {title}
        </h1>
        <p className="max-w-xl mx-auto text-gray-200 font-medium text-base md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;