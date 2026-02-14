// LatestCollection.jsx
"use client";

import { useState } from 'react';
import ItemCard from '../components/ItemCard';
import { useApp } from "../context/AppContext";

const LatestCollection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { listings } = useApp();
  
  // Filter to get only bus and living items
  const busLivingItems = listings.filter(item => 
    item.category === 'BUS' || item.category === 'LIVING'
  );

  // Use all filtered items
  const items = busLivingItems;
  
  // Items per slide for desktop
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  // Get current cards to display for desktop slider
  const getCurrentCards = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return items.slice(startIndex, startIndex + itemsPerSlide);
  };

  // Handle next slide
  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  // Handle previous slide
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // If no items, don't render the section
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#003d2b] rounded-[3rem] my-4 px-8 py-8 md:px-16 text-white overflow-hidden relative shadow-3xl">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 p-10 md:p-20 opacity-10 rotate-12">
        <i className="fas fa-ticket-alt text-[15rem] md:text-[20rem]"></i>
      </div>
      <div className="absolute bottom-10 left-10 opacity-10 -rotate-12">
        <i className="fas fa-calendar-star text-[10rem] md:text-[15rem]"></i>
      </div>

      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-4">
        <div className="space-y-2 md:space-y-4">
          <span className="text-[12px] font-black text-[#00ff88] uppercase tracking-[0.4em]">
            Featured Collection
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">
            Travel & Stay
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl">
            Premium bus services and accommodations. {items.length} experiences available.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Slider Navigation Buttons - Only show if we have more than itemsPerSlide items */}
          {items.length > itemsPerSlide && (
            <div className="hidden md:flex gap-2">
              <button 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center border transition ${
                  currentSlide === 0 
                    ? 'bg-white/10 border-white/20 cursor-not-allowed' 
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
                className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center border transition ${
                  currentSlide === totalSlides - 1
                    ? 'bg-white/10 border-white/20 cursor-not-allowed' 
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Single Row of 3 Cards - Desktop */}
      <div className="relative z-10">
        {/* Desktop: Single row of 3 cards with slider */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-8">
            {getCurrentCards().map((item) => (
              <ItemCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
          
          {/* Slider Dots for Desktop */}
          {items.length > itemsPerSlide && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-8 h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-[#00ff88]' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile: ALL items in vertical list */}
        <div className="md:hidden space-y-6">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
            />
          ))}
          {items.length > 0 && (
            <p className="text-center text-gray-400 text-sm pt-4">
              Showing all {items.length} experiences
            </p>
          )}
        </div>
      </div>

      {/* View All Button */}
      <div className="relative z-10 mt-4 text-center">
        <button className="group bg-transparent text-white font-black px-8 py-4 rounded-2xl text-sm uppercase tracking-widest border-2 border-[#00ff88] hover:bg-[#00ff88] hover:text-gray-900 transition-all duration-300">
          <span className="flex items-center gap-3">
            Browse All
            <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default LatestCollection;