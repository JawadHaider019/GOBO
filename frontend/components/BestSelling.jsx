// BestSelling.jsx
"use client";

import { useState } from 'react';
import ItemCard from '@/components/ItemCard';
import { useApp } from '@/context/AppContext';

const BestSelling = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { listings } = useApp();
  
  // Filter to get only bus and living items
  const busLivingItems = listings.filter(item => 
    item.category === 'BUS' || item.category === 'LIVING'
  );

  // Take first 6 items for display
  const items = busLivingItems.slice(0, 6);

  // Get current 3 cards to display for desktop slider
  const getCurrentCards = () => {
    if (currentSlide === 0) {
      return items.slice(0, 3);
    } else {
      return items.slice(3, 6);
    }
  };

  // If no items, don't render the section
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-100 my-4 rounded-[3rem] px-8 py-4 md:px-16 text-white overflow-hidden relative shadow-3xl">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 p-10 md:p-20 opacity-40 rotate-12">
        <i className="fas fa-ticket-alt text-[15rem] md:text-[20rem] text-gray-900/20"></i>
      </div>
      <div className="absolute bottom-10 left-10 opacity-40 -rotate-12">
        <i className="fas fa-calendar-star text-[10rem] md:text-[15rem] text-black/20"></i>
      </div>

      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-4">
        <div className="space-y-2 md:space-y-4">
          <span className="text-[12px] font-black text-red-500 uppercase tracking-[0.4em]">
            Best Selling
          </span>
          <h2 className="text-gray-900 text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">
            Crowd Favorites
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl">
            Most popular bus and accommodation services selling fast! Slide to explore more!
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Slider Navigation Buttons - Only show if we have more than 3 items */}
          {items.length > 3 && (
            <div className="hidden md:flex gap-2">
              <button 
                onClick={() => setCurrentSlide(0)}
                disabled={currentSlide === 0}
                className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center border transition ${
                  currentSlide === 0 
                    ? 'bg-gray-900 border-white/20 cursor-not-allowed' 
                    : 'bg-gray-900 border-white/20 hover:bg-black/90'
                }`}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                onClick={() => setCurrentSlide(1)}
                disabled={currentSlide === 1 || items.length <= 3}
                className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center border transition ${
                  currentSlide === 1 || items.length <= 3
                    ? 'bg-gray-900 border-white/20 cursor-not-allowed' 
                    : 'bg-gray-900 border-white/20 hover:bg-black/90'
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
                // No onViewDetails prop - ItemCard handles its own navigation
              />
            ))}
          </div>
          
          {/* Slider Dots for Desktop - Only show if we have more than 3 items */}
          {items.length > 3 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentSlide(0)}
                className={`w-8 h-2 rounded-full transition-all ${
                  currentSlide === 0 ? 'bg-gray-900' : 'bg-gray-200'
                }`}
              />
              <button
                onClick={() => setCurrentSlide(1)}
                className={`w-8 h-2 rounded-full transition-all ${
                  currentSlide === 1 ? 'bg-gray-900' : 'bg-gray-200'
                }`}
              />
            </div>
          )}
        </div>

        {/* Mobile: Single column of cards */}
        <div className="md:hidden space-y-6">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              // No onViewDetails prop - ItemCard handles its own navigation
            />
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="relative z-10 mt-4 text-center">
        <button className="group bg-transparent text-gray-900 font-black px-8 py-4 rounded-2xl text-sm uppercase tracking-widest border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300">
          <span className="flex items-center gap-3">
            View All 
            <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default BestSelling;