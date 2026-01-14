"use client";

import React, { useState, useEffect } from 'react';

const BookingType = {
  TRAVEL: 'travel',
  APARTMENT: 'apartment'
};

const CATEGORIES = [
  {
    id: BookingType.TRAVEL,
    label: 'Travel',
    icon: 'fa-bus',
    subs: ['Buses', 'Tours'],
    searchFields: [
      {
        type: 'text',
        label: 'FROM',
        placeholder: 'Departure City',
        icon: 'fa-map-marker-alt',
        key: 'from'
      },
      {
        type: 'text',
        label: 'TO',
        placeholder: 'Destination City',
        icon: 'fa-location-dot',
        key: 'to'
      },
      {
        type: 'date',
        label: 'DEPARTURE',
        placeholder: 'Travel Date',
        icon: 'fa-calendar-day',
        key: 'date'
      },
     
    ]
  },
  {
    id: BookingType.APARTMENT,
    label: 'Apartments',
    icon: 'fa-building',
    // Main apartment types in Pakistan
    subs: ['Flats', 'Portion', 'Penthouse', 'Hostel'],
    searchFields: (selectedSub) => [
      {
        type: 'text',
        label: 'LOCATION',
        placeholder: 'City, Area...',
        icon: 'fa-map-marker-alt',
        key: 'location'
      },
      selectedSub === 'Hostel' 
        ? {
            type: 'select',
            label: 'SEAT TYPE',
            placeholder: 'Select Seat Type',
            icon: 'fa-user',
            key: 'seatType',
            options: [
              'Single Seater',
              'Double Seater', 
              'Triple Seater',
              'Four Seater',
              'Shared Room'
            ]
          }
        : {
            type: 'select',
            label: 'ROOMS',
            placeholder: 'Number of Rooms',
            icon: 'fa-door-open',
            key: 'rooms',
            options: ['1 Room', '2 Rooms', '3 Rooms', '4+ Rooms']
          },
      {
        type: 'select',
        label: 'PRICE RANGE',
        placeholder: 'Select Price Range',
        icon: 'fa-tag',
        key: 'priceRange',
        options: selectedSub === 'Hostel' 
          ? [
              'Under Rs 5,000',
              'Rs 5,000 - Rs 8,000', 
              'Rs 8,000 - Rs 12,000',
              'Rs 12,000 - Rs 15,000',
              'Rs 15,000+'
            ]
          : [
              'Under Rs 15,000',
              'Rs 15,000 - Rs 30,000', 
              'Rs 30,000 - Rs 50,000',
              'Rs 50,000 - Rs 75,000',
              'Rs 75,000 - Rs 1,00,000',
              'Rs 1,00,000+'
            ]
      }
    ]
  }
];

const SearchTabs = () => {
  const [activeTab, setActiveTab] = useState(BookingType.TRAVEL);
  const [selectedSub, setSelectedSub] = useState('All');
  const [searchData, setSearchData] = useState({});
  const [showReturnDate, setShowReturnDate] = useState(false);

  const currentCategory = CATEGORIES.find(c => c.id === activeTab);
  const isTravel = activeTab === BookingType.TRAVEL;
  const isHostel = selectedSub === 'Hostel';

  useEffect(() => {
    const shouldShowReturnDate = 
      selectedSub === 'Tours' || 
      (selectedSub === 'All' && searchData.tripType === 'Round Trip');
    
    setShowReturnDate(shouldShowReturnDate);
  }, [selectedSub, searchData.tripType]);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setSelectedSub('All');
    setSearchData({});
    setShowReturnDate(false);
  };

  const handleSubCategoryChange = (sub) => {
    setSelectedSub(sub);
    
    if (sub === 'Tours') {
      setSearchData(prev => ({ ...prev, tripType: 'Round Trip' }));
    } else if (sub === 'Buses') {
      setSearchData(prev => ({ ...prev, tripType: 'One Way' }));
    }
    
    // Clear room/seat data when switching sub-category
    setSearchData(prev => ({ ...prev, rooms: '', seatType: '' }));
  };

  const handleInputChange = (key, value) => {
    setSearchData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearch = () => {
    console.log('Searching for:', {
      category: activeTab,
      subCategory: selectedSub,
      tripType: searchData.tripType,
      showReturnDate,
      ...searchData
    });
    
    let searchMessage = `Searching ${selectedSub === 'All' ? activeTab + 's' : selectedSub}`;
    
    if (isTravel) {
      if (selectedSub === 'Tours') {
        searchMessage += ' (Round Trip tours)';
      } else if (searchData.tripType === 'Round Trip') {
        searchMessage += ' (Round Trip)';
      } else {
        searchMessage += ' (One Way)';
      }
    }
    
    alert(searchMessage);
  };

  const renderSearchField = (field) => {
    if (!field) return null;
    
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={field.placeholder}
            value={searchData[field.key] || ''}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            className="bg-transparent w-full outline-none text-gray-800 font-bold placeholder-gray-400"
          />
        );
      
      case 'date':
        if (field.key === 'returnDate' && !showReturnDate) {
          return null;
        }
        return (
          <input
            type="date"
            placeholder={field.placeholder}
            value={searchData[field.key] || ''}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            className="bg-transparent w-full outline-none text-gray-800 font-bold placeholder-gray-400"
            min={field.key === 'returnDate' ? searchData.date : undefined}
          />
        );
      
      case 'select':
        return (
          <select
            value={searchData[field.key] || ''}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            className="bg-transparent w-full outline-none text-gray-800 font-bold"
          >
            <option value="" className="text-gray-400">{field.placeholder}</option>
            {field.options?.map(option => (
              <option key={option} value={option} className="text-gray-800">
                {option}
              </option>
            ))}
          </select>
        );
      
      default:
        return null;
    }
  };

  const getButtonText = () => {
    if (selectedSub === 'All') {
      return `FIND ${activeTab.toUpperCase()}S`;
    }
    
    let text = `FIND ${selectedSub.toUpperCase()}`;
    
    if (isTravel) {
      if (selectedSub === 'Tours') {
        text += ' (ROUND TRIP)';
      } else if (searchData.tripType) {
        text += ` (${searchData.tripType.toUpperCase()})`;
      }
    }
    
    return text;
  };

  // Get the current search fields based on selected sub-category
  const getCurrentSearchFields = () => {
    if (!currentCategory) return [];
    
    if (typeof currentCategory.searchFields === 'function') {
      return currentCategory.searchFields(selectedSub);
    }
    
    return currentCategory.searchFields;
  };

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-green-50 w-full shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]">
      {/* Main Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-300 hide-scrollbar bg-gray-50/30">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleTabChange(cat.id)}
            className={`flex items-center gap-3 px-8 py-5 whitespace-nowrap font-bold transition-all duration-300 relative min-w-[140px] ${
              activeTab === cat.id 
                ? 'text-[#003d2b]' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <i className={`fas ${cat.icon} text-lg`}></i>
            <span>{cat.label}</span>
            {activeTab === cat.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#003d2b] animate-slideIn"></div>
            )}
          </button>
        ))}
      </div>

      <div className="p-8">
        {/* Sub Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-6 hide-scrollbar mb-2">
          <button 
            onClick={() => handleSubCategoryChange('All')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border shrink-0 ${
              selectedSub === 'All' 
                ? 'bg-[#003d2b] text-white border-[#003d2b] shadow-md' 
                : 'bg-white text-gray-400 border-gray-100 hover:border-green-200 hover:text-gray-600'
            }`}
          >
            ALL
          </button>
          {currentCategory?.subs.map(sub => (
            <button 
              key={sub}
              onClick={() => handleSubCategoryChange(sub)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border whitespace-nowrap shrink-0 ${
                selectedSub === sub 
                  ? 'bg-[#003d2b] text-white border-[#003d2b] shadow-md' 
                  : 'bg-white text-gray-400 border-gray-100 hover:border-green-200 hover:text-gray-600'
              }`}
            >
              {sub.toUpperCase()}
            </button>
          ))}
        </div>
      
        {/* Search Form - Always 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {getCurrentSearchFields().map((field, index) => (
            <div key={field.key || index} className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 tracking-widest ml-1 uppercase">
                {field.label}
              </label>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus-within:border-green-300 focus-within:ring-2 focus-within:ring-green-100 transition-all duration-200">
                <i className={`fas ${field.icon} text-[#003d2b]`}></i>
                {renderSearchField(field)}
              </div>
            </div>
          ))}
          
          {/* Button */}
          <div className="flex items-end">
            <button 
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-[#003d2b] to-[#006644] text-white font-black py-4 rounded-2xl hover:shadow-xl hover:shadow-green-200/50 transition-all duration-300 uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <i className="fas fa-search mr-2"></i>
              {getButtonText()}
            </button>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SearchTabs;