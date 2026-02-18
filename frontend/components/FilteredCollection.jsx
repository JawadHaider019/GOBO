// FilteredCollection.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ItemCard from './ItemCard';
import SearchTabs from './SearchTabs';
import { useApp } from '../context/AppContext';

const FilteredCollection = () => {
  const router = useRouter();
  const { listings } = useApp();
  const [activeFilter, setActiveFilter] = useState('bus');
  const [subCategoryFilter, setSubCategoryFilter] = useState('All');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [availableSeatsFilter, setAvailableSeatsFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Category definitions
  const categories = [
    { id: 'bus', name: 'Bus', icon: 'fa-bus', subs: ['One Way', 'Round Trip'] },
    { id: 'living', name: 'Living', icon: 'fa-building', subs: ['Hotels', 'Apartments', 'Hostels'] }
  ];

  // Handle search results from SearchTabs
  const handleSearchResults = (results, activeTab) => {
    setSearchResults(results);
    setIsSearchActive(true);
    if (activeTab === 'bus') {
      setActiveFilter('bus');
      setSubCategoryFilter('All');
    } else if (activeTab === 'living') {
      setActiveFilter('living');
      setSubCategoryFilter('All');
    }
    setCurrentSlide(0); // Reset to first slide
  };

  // Get all bus items
  const getBusItems = () => {
    return listings.filter(item => item.category === 'BUS');
  };

  // Get all living items
  const getLivingItems = () => {
    return listings.filter(item => item.category === 'LIVING');
  };

  // Get subcategory for item
  const getSubCategoryForItem = (item) => {
    if (item.category === 'BUS') {
      return item.isRoundTrip ? 'Round Trip' : 'One Way';
    } else if (item.category === 'LIVING') {
      if (item.type === 'HOTEL') return 'Hotels';
      if (item.type === 'APARTMENT') return 'Apartments';
      if (item.type === 'HOSTEL' || item.type === 'GUEST_HOUSE') return 'Hostels';
      return 'Hotels';
    }
    return 'Other';
  };

  // Apply filters to items
  const applyFilters = (items) => {
    let filtered = [...items];

    // Apply subcategory filter
    if (subCategoryFilter !== 'All') {
      filtered = filtered.filter(item => {
        const itemSubCategory = getSubCategoryForItem(item);
        return itemSubCategory === subCategoryFilter;
      });
    }

    // Apply price filter
    filtered = filtered.filter(item => {
      const price = item.discountPrice || item.price || 0;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Apply available seats filter
    if (availableSeatsFilter !== 'all') {
      if (availableSeatsFilter === 'limited') {
        filtered = filtered.filter(item => item.availableSeats < 10);
      } else if (availableSeatsFilter === 'available') {
        filtered = filtered.filter(item => item.availableSeats >= 10 && item.availableSeats <= 50);
      } else if (availableSeatsFilter === 'plenty') {
        filtered = filtered.filter(item => item.availableSeats > 50);
      }
    }

    // Apply rating filter
    if (ratingFilter !== 'all') {
      const minRating = parseFloat(ratingFilter);
      filtered = filtered.filter(item => item.rating >= minRating);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return (a.discountPrice || a.price) - (b.discountPrice || b.price);
        case 'price_desc':
          return (b.discountPrice || b.price) - (a.discountPrice || a.price);
        case 'rating_desc':
          return b.rating - a.rating;
        case 'seats_desc':
          return b.availableSeats - a.availableSeats;
        default:
          return 0;
      }
    });

    return filtered;
  };

  // Get filtered tickets
  const getFilteredTickets = () => {
    if (isSearchActive && searchResults.length > 0) {
      return applyFilters(searchResults);
    } else {
      const categoryItems = activeFilter === 'bus' ? getBusItems() : getLivingItems();
      return applyFilters(categoryItems);
    }
  };

  const filteredTickets = getFilteredTickets();

  // Items per slide for desktop
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(filteredTickets.length / itemsPerSlide);

  // Get current cards to display for desktop slider
  const getCurrentCards = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return filteredTickets.slice(startIndex, startIndex + itemsPerSlide);
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

  // Reset filters
  const handleResetFilters = () => {
    setSubCategoryFilter('All');
    setPriceRange({ min: 0, max: 100000 });
    setAvailableSeatsFilter('all');
    setRatingFilter('all');
    setSortBy('recommended');
    setIsSearchActive(false);
    setSearchResults([]);
    setCurrentSlide(0);
  };

  // Get dynamic heading based on active filter
  const getHeading = () => {
   
    switch(activeFilter) {
      case 'bus':
        return 'Bus Travel';
      case 'living':
        return 'Living Options';
      default:
        return 'Featured Collection';
    }
  };

  // Get dynamic subheading based on active filter
  const getSubheading = () => {
    switch(activeFilter) {
      case 'bus':
        return 'Discover comfortable journeys to your favorite destinations';
      case 'living':
        return 'Find your perfect home away from home';
      default:
        return 'Discover our newest events, travel options, and accommodations';
    }
  };

  // Get badge text based on active filter
  const getBadgeText = () => {
    
    switch(activeFilter) {
      case 'bus':
        return 'BUS COLLECTION';
      case 'living':
        return 'LIVING COLLECTION';
      default:
        return 'LATEST COLLECTION';
    }
  };



  return (
    <div className="min-h-screen bg-transparent">
      {/* Search Tabs */}
      <div className="bg-none">
        <div className="mx-auto px-4 md:px-6">
          <SearchTabs 
            onSearchResults={handleSearchResults}
            availableTickets={listings}
            context="FilteredCollection"
          />
        </div>
      </div>

{activeFilter === 'bus' && (
  <div className="mx-4 md:mx-6 my-12">
    
    <h2 className="text-4xl md:text-5xl  font-black tracking-tighter mb-10">
      Our Bus Partners
    </h2>
    
    {/* Auto Sliding Container */}
    <div className="relative overflow-hidden">
      {/* Gradient Overlays for fade effect */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
      
      {/* Sliding Track */}
      <div className="flex animate-slide whitespace-nowrap">
        {/* First set of images - exactly 7 items */}
        <div className="flex  gap-8 items-center">
          <img src="/bus/Skyways.jpg" alt="Skyways" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/daewoo-express.jpg" alt="Daewoo Express" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/mc.png" alt="Mian" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/Niazi-Express.jpg" alt="Niaziex" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/Rajpoot-Travels1.png" alt="Rajput Travels" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/rm.png" alt="Road Master" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/rt20.jpg" alt="RajaTravels" className="h-16  w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/Skyways.jpg" alt="Skyways" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/daewoo-express.jpg" alt="Daewoo Express" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/mc.png" alt="Mian" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/Niazi-Express.jpg" alt="Niaziex" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/Rajpoot-Travels1.png" alt="Rajput Travels" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/rm.png" alt="Road Master" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/rt20.jpg" alt="RajaTravels" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/Skyways.jpg" alt="Skyways" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/daewoo-express.jpg" alt="Daewoo Express" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/mc.png" alt="Mian" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/Niazi-Express.jpg" alt="Niaziex" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/Rajpoot-Travels1.png" alt="Rajput Travels" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/rm.png" alt="Road Master" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
          <img src="/bus/rt20.jpg" alt="RajaTravels" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110" />
        </div>
      </div>
    </div>
  </div>
)}

<style jsx>{`
  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  .animate-slide {
    animation: slide 15s linear infinite;
    will-change: transform;
  }
  
  .animate-slide:hover {
    animation-play-state: paused;
  }
`}</style>


      <div className="bg-[#003d2b] rounded-[3rem] mt-4 px-2  md:px-8 text-white overflow-hidden relative shadow-3xl">
        <div className="flex flex-col gap-6">
          {/* Cards Section with Green Background */}
          <div className="bg-[#003d2b] rounded-[3rem] p-6 md:p-8 text-white overflow-hidden relative shadow-3xl">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-10 md:p-20 opacity-10 rotate-25">
              <i className={`fas fa-ticket-alt text-[15rem] md:text-[30rem]`}></i>
            </div>
            {/* Header Section with Navigation */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-8">
              <div className="space-y-2 md:space-y-4">
                <span className="text-[12px] font-black text-[#00ff88] uppercase tracking-[0.4em]">
                  {getBadgeText()}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">
                  {getHeading()}
                </h2>
                <p className="text-gray-100 text-sm md:text-base max-w-2xl">
                  {getSubheading()}
                </p>
              </div>
              
              {/* Slider Navigation Buttons - Top Right */}
              {filteredTickets.length > itemsPerSlide && (
                <div className="hidden md:flex items-center gap-4">
               
                  <div className="flex gap-2">
                    <button 
                      onClick={prevSlide}
                      disabled={currentSlide === 0}
                      className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center border transition ${
                        currentSlide === 0 
                          ? 'bg-white/10 border-white/20 cursor-not-allowed opacity-50' 
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
                          ? 'bg-white/10 border-white/20 cursor-not-allowed opacity-50' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Items Display */}
            <div className="relative z-10">
              {filteredTickets.length > 0 ? (
                <>
                  {/* Desktop: Slider */}
                  <div className="hidden md:block">
                    <div className="grid grid-cols-3 gap-6 lg:gap-8">
                      {getCurrentCards().map((ticket) => (
                        <div key={ticket.id} className="transform transition-all duration-300 hover:scale-105">
                          <ItemCard item={ticket} />
                        </div>
                      ))}
                    </div>
                    
                    {/* Slider Dots */}
                    {filteredTickets.length > itemsPerSlide && (
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

                  {/* Mobile: Vertical List */}
                  <div className="md:hidden space-y-4">
                    {filteredTickets.map((ticket) => (
                      <div key={ticket.id} className="transform transition-all duration-300 hover:scale-[1.02]">
                        <ItemCard item={ticket} />
                      </div>
                    ))}
                    {filteredTickets.length > 0 && (
                      <p className="text-center text-gray-400 text-sm pt-4">
                        Showing all {filteredTickets.length} {activeFilter === 'bus' ? 'bus' : 'living'} options
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-8 md:p-12 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-search text-2xl md:text-3xl text-white/50"></i>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">No listings found</h3>
                  <p className="text-gray-300 text-sm md:text-base mb-6 max-w-md mx-auto">
                    Try adjusting your filters or search for different criteria
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="bg-[#00ff88] text-gray-900 font-bold px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-sm md:text-base hover:bg-[#00dd77] transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>

            {/* View All Button */}
            <div className="relative z-10 mt-8 text-center">
              <button 
                onClick={() => router.push('/marketplace')}
                className="group bg-transparent text-white font-black px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-sm uppercase tracking-widest border-2 border-[#00ff88] hover:bg-[#00ff88] hover:text-gray-900 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2 md:gap-3">
                  Browse All
                  <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredCollection;