// Marketplace.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ItemCard from '@/components/ItemCard';
import SearchTabs from '@/components/SearchTabs';
import { useApp } from '@/context/AppContext';

const Marketplace = () => {
  const router = useRouter();
  const { listings } = useApp();
  const [activeFilter, setActiveFilter] = useState('bus');
  const [subCategoryFilter, setSubCategoryFilter] = useState('All');
  const [bookedTicket, setBookedTicket] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [availableSeatsFilter, setAvailableSeatsFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Category definitions
  const categories = [
    { id: 'bus', name: 'Bus', icon: 'fa-bus', subs: ['One Way', 'Round Trip'] },
    { id: 'living', name: 'Living', icon: 'fa-building', subs: ['Hotels', 'Apartments', 'Hostels'] }
  ];

  // Price ranges
  const priceRanges = [
    { label: 'All Prices', min: 0, max: 100000 },
    { label: 'Under PKR 5,000', min: 0, max: 5000 },
    { label: 'PKR 5,000 - 15,000', min: 5000, max: 15000 },
    { label: 'PKR 15,000 - 50,000', min: 15000, max: 50000 },
    { label: 'Over PKR 50,000', min: 50000, max: 100000 }
  ];

  // Rating options
  const ratingOptions = [
    { label: 'All Ratings', value: 'all' },
    { label: '4.5+ Excellent', value: '4.5' },
    { label: '4.0+ Very Good', value: '4.0' },
    { label: '3.5+ Good', value: '3.5' }
  ];

  // Sort options
  const sortOptions = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Highest Rated', value: 'rating_desc' },
    { label: 'Most Available', value: 'seats_desc' }
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

  // Reset filters
  const handleResetFilters = () => {
    setSubCategoryFilter('All');
    setPriceRange({ min: 0, max: 100000 });
    setAvailableSeatsFilter('all');
    setRatingFilter('all');
    setSortBy('recommended');
    setIsSearchActive(false);
    setSearchResults([]);
    setIsFilterDrawerOpen(false);
  };

  // Filter content component
  const FilterContent = () => (
    <div className="space-y-4 w-100">
      {/* Price Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3 text-sm">Price Range</h3>
        <div className="space-y-1">
          {priceRanges.map(range => (
            <button
              key={range.label}
              onClick={() => setPriceRange({ min: range.min, max: range.max })}
              className={`w-full text-left p-2 rounded-lg transition-all text-sm ${
                priceRange.min === range.min && priceRange.max === range.max
                  ? 'bg-[#003d2b] text-white' 
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>PKR {priceRange.min.toLocaleString()}</span>
            <span>PKR {priceRange.max.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={priceRange.max}
            onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Availability Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3 text-sm">Availability</h3>
        <div className="space-y-1">
          {[
            { label: 'All', value: 'all' },
            { label: 'Limited (<10)', value: 'limited' },
            { label: 'Available (10-50)', value: 'available' },
            { label: 'Plenty (>50)', value: 'plenty' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setAvailableSeatsFilter(option.value)}
              className={`w-full text-left p-2 rounded-lg transition-all text-sm ${
                availableSeatsFilter === option.value
                  ? 'bg-[#003d2b] text-white' 
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3 text-sm">Rating</h3>
        <div className="space-y-1">
          {ratingOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setRatingFilter(option.value)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-all text-sm ${
                ratingFilter === option.value
                  ? 'bg-[#003d2b] text-white' 
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span>{option.label}</span>
              {option.value !== 'all' && (
                <i className="fas fa-star text-yellow-400 text-xs"></i>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3 text-sm">Sort By</h3>
        <div className="space-y-1">
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`w-full text-left p-2 rounded-lg transition-all text-sm ${
                sortBy === option.value
                  ? 'bg-[#003d2b] text-white' 
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={handleResetFilters}
        className="w-full bg-white border border-red-300 text-red-600 font-medium text-sm py-2 rounded-xl hover:bg-red-50 transition-all"
      >
        <i className="fas fa-redo mr-2 text-xs"></i>
        Reset All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Tabs */}
      <div className="bg-white">
        <div className="max-w-8xl mx-auto px-4 md:px-6">
          <SearchTabs 
            onSearchResults={handleSearchResults}
            availableTickets={listings}
            context="marketplace"
          />
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 md:px-6 py-4 md:py-8">
        <div className="flex flex-col gap-6">
          {/* Header with Filter Button */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                {isSearchActive ? 'Search Results' : `${categories.find(c => c.id === activeFilter)?.name} Listings`}
              </h2>
              <p className="text-xs md:text-sm text-gray-600">
                {filteredTickets.length} listings found
              </p>
            </div>
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-all"
            >
              <i className="fas fa-sliders-h text-[#003d2b]"></i>
              <span className="text-sm font-medium">Filters & Sort</span>
              {(subCategoryFilter !== 'All' || availableSeatsFilter !== 'all' || ratingFilter !== 'all' || sortBy !== 'recommended' || priceRange.min > 0 || priceRange.max < 100000) && (
                <span className="w-2 h-2 bg-[#003d2b] rounded-full"></span>
              )}
            </button>
          </div>

          {/* Active Filters Chips */}
          <div className="flex flex-wrap gap-2">
            {subCategoryFilter !== 'All' && (
              <span className="inline-flex items-center bg-[#003d2b]/10 text-[#003d2b] px-3 py-1.5 rounded-full text-xs font-medium">
                {subCategoryFilter}
                <button 
                  onClick={() => setSubCategoryFilter('All')}
                  className="ml-2 text-[#003d2b] hover:text-[#002d1f]"
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            )}
            {priceRange.min > 0 || priceRange.max < 100000 ? (
              <span className="inline-flex items-center bg-[#003d2b]/10 text-[#003d2b] px-3 py-1.5 rounded-full text-xs font-medium">
                PKR {priceRange.min.toLocaleString()} - {priceRange.max.toLocaleString()}
                <button 
                  onClick={() => setPriceRange({ min: 0, max: 100000 })}
                  className="ml-2 text-[#003d2b] hover:text-[#002d1f]"
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            ) : null}
            {availableSeatsFilter !== 'all' && (
              <span className="inline-flex items-center bg-[#003d2b]/10 text-[#003d2b] px-3 py-1.5 rounded-full text-xs font-medium">
                {availableSeatsFilter === 'limited' ? 'Limited (<10)' : 
                 availableSeatsFilter === 'available' ? 'Available (10-50)' : 'Plenty (>50)'}
                <button 
                  onClick={() => setAvailableSeatsFilter('all')}
                  className="ml-2 text-[#003d2b] hover:text-[#002d1f]"
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            )}
            {ratingFilter !== 'all' && (
              <span className="inline-flex items-center bg-[#003d2b]/10 text-[#003d2b] px-3 py-1.5 rounded-full text-xs font-medium">
                {ratingFilter}+ Stars
                <button 
                  onClick={() => setRatingFilter('all')}
                  className="ml-2 text-[#003d2b] hover:text-[#002d1f]"
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            )}
            {sortBy !== 'recommended' && (
              <span className="inline-flex items-center bg-[#003d2b]/10 text-[#003d2b] px-3 py-1.5 rounded-full text-xs font-medium">
                {sortOptions.find(s => s.value === sortBy)?.label}
                <button 
                  onClick={() => setSortBy('recommended')}
                  className="ml-2 text-[#003d2b] hover:text-[#002d1f]"
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            )}
          </div>

          {/* Items Grid */}
          {filteredTickets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {filteredTickets.map(ticket => (
                <div key={ticket.id} className="h-full">
                  <ItemCard item={ticket} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 md:p-8 text-center border border-gray-100 shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 text-2xl">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                No listings found
              </h3>
              <p className="text-gray-500 text-xs md:text-sm max-w-md mx-auto mb-4">
                Try adjusting your filters or search for different criteria
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-[#003d2b] text-white font-medium text-xs md:text-sm px-5 py-2.5 rounded-lg hover:bg-[#002d1f] transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>



{isFilterDrawerOpen && (
  <div className="fixed inset-0 z-50">
    {/* Backdrop */}
    <div 
      className="absolute inset-0 bg-black/50"
      onClick={() => setIsFilterDrawerOpen(false)}
    ></div>
    
    {/* Drawer - Left Side - Fixed width with inline style */}
    <div 
      className="absolute left-0 top-0 h-full bg-white shadow-2xl overflow-y-auto"
      style={{ width: '260px' }}
    >
      <div className="sticky top-0 bg-white border-b border-gray-100 p-3 flex items-center justify-between">
        <h3 className="font-black text-gray-900 text-sm">Filters & Sort</h3>
        <button
          onClick={() => setIsFilterDrawerOpen(false)}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all"
        >
          <i className="fas fa-times text-gray-500 text-sm"></i>
        </button>
      </div>
      
      <div className="p-3">
        <FilterContent />
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Marketplace;