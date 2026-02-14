"use client";

import React, { useState, useRef, useEffect } from 'react';

const BookingType = {
  BUS: 'bus',
  LIVING: 'living'
};

const CATEGORIES = [
  {
    id: BookingType.BUS,
    label: 'Bus',
    icon: 'fa-bus',
    subs: ['One Way', 'Round Trip'],
    searchFields: (selectedSub) => {
      const baseFields = [
        {
          type: 'text',
          label: 'DEPARTURE',
          placeholder: 'Departure City',
          icon: 'fa-map-marker-alt',
          key: 'from'
        },
        {
          type: 'text',
          label: 'ARRIVAL',
          placeholder: 'Destination City',
          icon: 'fa-location-dot',
          key: 'to'
        }
      ];

      if (selectedSub === 'Round Trip') {
        return [
          ...baseFields,
          {
            type: 'combinedDate',
            label: 'DATES',
            placeholder: 'Select Dates',
            icon: 'fa-calendar-day',
            key: 'dates',
            startKey: 'startDate',
            endKey: 'endDate'
          }
        ];
      } else {
        return [
          ...baseFields,
          {
            type: 'singleDate',
            label: 'DEPARTURE DATE',
            placeholder: 'Select Date',
            icon: 'fa-calendar-day',
            key: 'date'
          }
        ];
      }
    }
  },
  {
    id: BookingType.LIVING,
    label: 'Living',
    icon: 'fa-building',
    subs: ['Hotels', 'Apartments', 'Hostels'],
    searchFields: (selectedSub) => {
      const fields = [
        {
          type: 'text',
          label: 'LOCATION',
          placeholder: 'Search city, area, or property',
          icon: 'fa-map-marker-alt',
          key: 'location',
          autoSuggest: true
        }
      ];

      // Smart date field based on living type
      if (selectedSub === 'Hotels') {
        fields.push({
          type: 'combinedDate',
          label: 'CHECK-IN – CHECK-OUT',
          placeholder: 'Select Dates',
          icon: 'fa-calendar-day',
          key: 'dates',
          startKey: 'checkIn',
          endKey: 'checkOut'
        });
      } else if (selectedSub === 'Apartments') {
        fields.push({
          type: 'durationPicker',
          label: 'DURATION',
          placeholder: 'Select Duration',
          icon: 'fa-calendar',
          key: 'duration',
          options: ['1 Month', '2 Months', '3 Months', '6 Months', '1 Year', 'Long Term']
        });
      } else {
        fields.push({
          type: 'singleDate',
          label: 'MOVE-IN DATE',
          placeholder: 'Select Date',
          icon: 'fa-calendar-day',
          key: 'moveInDate'
        });
      }

      // Unified rooms/seats selector - simplified for each type
      fields.push({
        type: 'roomsSeats',
        label: 'ROOMS / SEATS',
        placeholder: 'Add Room / Seat',
        icon: 'fa-plus',
        key: 'roomsSeats',
        livingType: selectedSub
      });

      return fields;
    }
  }
];

// Duration Picker Component for Apartments - Responsive
const DurationPicker = ({ 
  value, 
  onChange,
  placeholder,
  options = ['1 Month', '2 Months', '3 Months', '6 Months', '1 Year', 'Long Term']
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const durationPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (durationPickerRef.current && !durationPickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDurationSelect = (duration) => {
    onChange(duration);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative" ref={durationPickerRef}>
      {/* Input Display - Enhanced with shadow */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus-within:border-green-300 focus-within:ring-4 focus-within:ring-green-100 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
      >
        <i className="fas fa-calendar text-[#003d2b]"></i>
        <span className={`flex-1 text-left ${value ? 'text-gray-800 font-bold' : 'text-gray-400'} text-sm`}>
          {value || placeholder}
        </span>
        <i className={`fas fa-chevron-down text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </div>

      {/* Duration Popup - Responsive */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 sm:p-4 z-[9999] w-[280px] sm:w-[320px]">
          {/* Header */}
          <div className="mb-3 sm:mb-4">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Select Duration</h3>
            <p className="text-[10px] sm:text-xs text-gray-500">Minimum stay: 1 month</p>
          </div>

          {/* Duration Options */}
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleDurationSelect(option)}
                className={`w-full p-2.5 sm:p-3 rounded-lg border text-left transition-all shadow-sm text-xs sm:text-sm ${
                  value === option 
                    ? 'border-[#003d2b] bg-[#003d2b] text-white shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {value === option && (
                    <i className="fas fa-check text-xs sm:text-sm"></i>
                  )}
                </div>
                {option === '1 Month' && (
                  <p className="text-[8px] sm:text-xs mt-1 opacity-80">Short term option</p>
                )}
                {option === 'Long Term' && (
                  <p className="text-[8px] sm:text-xs mt-1 opacity-80">More than 1 year</p>
                )}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-3 sm:mt-4">
            <button
              onClick={handleClear}
              className="flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors shadow-sm hover:shadow"
            >
              Clear
            </button>
           
          </div>
        </div>
      )}
    </div>
  );
};

// Rooms/Seats Selector Component - Responsive
const RoomsSeatsSelector = ({ 
  livingType, 
  value, 
  onChange,
  placeholder 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selections, setSelections] = useState(value || []);
  const selectorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update selections when value changes externally
  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(selections)) {
      setSelections(value || []);
    }
  }, [value]);

  const hostelSeaterTypes = [
    { id: '1-seater', label: '1 Seater', icon: 'fa-user', seats: 1 },
    { id: '2-seater', label: '2 Seater', icon: 'fa-user-friends', seats: 2 },
    { id: '3-seater', label: '3 Seater', icon: 'fa-users', seats: 3 },
    { id: '4-seater', label: '4 Seater', icon: 'fa-users', seats: 4 }
  ];

  const hotelRoomTypes = [
    { id: 'single-room', label: 'Single Room', icon: 'fa-bed', rooms: 1 },
    { id: 'double-room', label: 'Double Room', icon: 'fa-bed', rooms: 1 },
    { id: 'family-room', label: 'Family Room', icon: 'fa-bed', rooms: 1 }
  ];

  const apartmentTypes = [
    { id: 'studio', label: 'Studio', icon: 'fa-home', units: 1 },
    { id: '1-bed', label: '1 Bed', icon: 'fa-home', units: 1 },
    { id: '2-bed', label: '2 Bed', icon: 'fa-home', units: 1 },
    { id: '3-bed', label: '3 Bed', icon: 'fa-home', units: 1 }
  ];

  const addSelection = (type) => {
    let newSelection;
    
    if (livingType === 'Hostels') {
      newSelection = {
        type: 'hostel',
        seaterType: type.label,
        seats: type.seats,
        count: 1
      };
    } else if (livingType === 'Hotels') {
      newSelection = {
        type: 'hotel',
        roomType: type.label,
        rooms: type.rooms,
        count: 1
      };
    } else {
      newSelection = {
        type: 'apartment',
        apartmentType: type.label,
        units: type.units,
        count: 1
      };
    }
    
    const updatedSelections = [...selections, newSelection];
    setSelections(updatedSelections);
    onChange(updatedSelections);
  };

  const updateCount = (index, increment) => {
    const updatedSelections = [...selections];
    const newCount = Math.max(1, updatedSelections[index].count + increment);
    updatedSelections[index] = { 
      ...updatedSelections[index], 
      count: newCount 
    };
    setSelections(updatedSelections);
    onChange(updatedSelections);
  };

  const removeSelection = (index) => {
    const updatedSelections = selections.filter((_, i) => i !== index);
    setSelections(updatedSelections);
    onChange(updatedSelections);
  };

  const getDisplayText = () => {
    if (selections.length === 0) return placeholder;
    
    if (livingType === 'Hostels') {
      const totalSeats = selections.reduce((sum, item) => sum + (item.seats * item.count), 0);
      const totalRooms = selections.reduce((sum, item) => sum + item.count, 0);
      return `${totalSeats} Seat${totalSeats !== 1 ? 's' : ''} · ${totalRooms} Room${totalRooms !== 1 ? 's' : ''}`;
    } else if (livingType === 'Hotels') {
      const totalRooms = selections.reduce((sum, item) => sum + (item.rooms * item.count), 0);
      return `${totalRooms} Room${totalRooms !== 1 ? 's' : ''}`;
    } else {
      const totalUnits = selections.reduce((sum, item) => sum + (item.units * item.count), 0);
      return `${totalUnits} Apartment${totalUnits !== 1 ? 's' : ''}`;
    }
  };

  const renderHostelContent = () => (
    <div className="space-y-3 sm:space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] sm:text-xs font-bold text-gray-600">Seater Type</label>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {hostelSeaterTypes.map(type => (
            <button
              key={type.id}
              onClick={() => addSelection(type)}
              className="p-2 sm:p-3 rounded-lg border border-gray-200 hover:border-[#003d2b] hover:bg-[#003d2b] hover:text-white flex flex-col items-center gap-1 sm:gap-2 transition-all shadow-sm"
            >
              <i className={`fas ${type.icon} text-gray-600 group-hover:text-white text-xs sm:text-sm`}></i>
              <span className="text-[10px] sm:text-xs font-bold">{type.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Selected Items with Count Controls */}
      {selections.length > 0 && (
        <div className="space-y-2">
          <label className="text-[10px] sm:text-xs font-bold text-gray-600">Selected Items</label>
          {selections.map((selection, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-lg shadow-sm border border-gray-200 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#003d2b] rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <i className={`fas ${selection.type === 'hostel' ? 'fa-user' : selection.type === 'hotel' ? 'fa-bed' : 'fa-home'} text-[8px] sm:text-xs`}></i>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold text-gray-800 block truncate">
                    {selection.type === 'hostel' ? selection.seaterType : 
                     selection.type === 'hotel' ? selection.roomType : selection.apartmentType}
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-gray-500">
                    {selection.type === 'hostel' ? `${selection.seats} seat` : 
                     selection.type === 'hotel' ? `${selection.rooms} room` : `${selection.units} unit`} per item
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-2">
                <div className="flex items-center gap-1 sm:gap-2 bg-white rounded-lg border border-gray-200 p-0.5 sm:p-1">
                  <button
                    onClick={() => updateCount(index, -1)}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-md hover:bg-gray-100 flex items-center justify-center"
                  >
                    <i className="fas fa-minus text-[8px] sm:text-xs text-gray-600"></i>
                  </button>
                  <span className="text-xs sm:text-sm font-bold text-gray-800 min-w-[16px] sm:min-w-[20px] text-center">
                    {selection.count}
                  </span>
                  <button
                    onClick={() => updateCount(index, 1)}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-md hover:bg-gray-100 flex items-center justify-center"
                  >
                    <i className="fas fa-plus text-[8px] sm:text-xs text-gray-600"></i>
                  </button>
                </div>
                <button
                  onClick={() => removeSelection(index)}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full hover:bg-red-100 flex items-center justify-center text-red-500 flex-shrink-0"
                >
                  <i className="fas fa-times text-[8px] sm:text-xs"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderHotelContent = () => (
    <div className="space-y-3 sm:space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] sm:text-xs font-bold text-gray-600">Room Type</label>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {hotelRoomTypes.map(type => (
            <button
              key={type.id}
              onClick={() => addSelection(type)}
              className="p-2 sm:p-3 rounded-lg border border-gray-200 hover:border-[#003d2b] hover:bg-[#003d2b] hover:text-white flex flex-col items-center gap-1 sm:gap-2 transition-all shadow-sm"
            >
              <i className={`fas ${type.icon} text-gray-600 group-hover:text-white text-xs sm:text-sm`}></i>
              <span className="text-[8px] sm:text-xs font-bold text-center">{type.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Selected Items with Count Controls */}
      {selections.length > 0 && (
        <div className="space-y-2">
          <label className="text-[10px] sm:text-xs font-bold text-gray-600">Selected Items</label>
          {selections.map((selection, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-lg shadow-sm border border-gray-200 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#003d2b] rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <i className="fas fa-bed text-[8px] sm:text-xs"></i>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold text-gray-800 block truncate">{selection.roomType}</span>
                  <span className="text-[8px] sm:text-[10px] text-gray-500">{selection.rooms} room per item</span>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-2">
                <div className="flex items-center gap-1 sm:gap-2 bg-white rounded-lg border border-gray-200 p-0.5 sm:p-1">
                  <button
                    onClick={() => updateCount(index, -1)}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-md hover:bg-gray-100 flex items-center justify-center"
                  >
                    <i className="fas fa-minus text-[8px] sm:text-xs text-gray-600"></i>
                  </button>
                  <span className="text-xs sm:text-sm font-bold text-gray-800 min-w-[16px] sm:min-w-[20px] text-center">
                    {selection.count}
                  </span>
                  <button
                    onClick={() => updateCount(index, 1)}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-md hover:bg-gray-100 flex items-center justify-center"
                  >
                    <i className="fas fa-plus text-[8px] sm:text-xs text-gray-600"></i>
                  </button>
                </div>
                <button
                  onClick={() => removeSelection(index)}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full hover:bg-red-100 flex items-center justify-center text-red-500 flex-shrink-0"
                >
                  <i className="fas fa-times text-[8px] sm:text-xs"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderApartmentContent = () => (
    <div className="space-y-3 sm:space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] sm:text-xs font-bold text-gray-600">Apartment Type</label>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {apartmentTypes.map(type => (
            <button
              key={type.id}
              onClick={() => addSelection(type)}
              className="p-2 sm:p-3 rounded-lg border border-gray-200 hover:border-[#003d2b] hover:bg-[#003d2b] hover:text-white flex flex-col items-center gap-1 sm:gap-2 transition-all shadow-sm"
            >
              <i className={`fas ${type.icon} text-gray-600 group-hover:text-white text-xs sm:text-sm`}></i>
              <span className="text-[10px] sm:text-xs font-bold">{type.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Selected Items with Count Controls */}
      {selections.length > 0 && (
        <div className="space-y-2">
          <label className="text-[10px] sm:text-xs font-bold text-gray-600">Selected Items</label>
          {selections.map((selection, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-lg shadow-sm border border-gray-200 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#003d2b] rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <i className="fas fa-home text-[8px] sm:text-xs"></i>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold text-gray-800 block truncate">{selection.apartmentType}</span>
                  <span className="text-[8px] sm:text-[10px] text-gray-500">{selection.units} unit per item</span>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-2">
                <div className="flex items-center gap-1 sm:gap-2 bg-white rounded-lg border border-gray-200 p-0.5 sm:p-1">
                  <button
                    onClick={() => updateCount(index, -1)}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-md hover:bg-gray-100 flex items-center justify-center"
                  >
                    <i className="fas fa-minus text-[8px] sm:text-xs text-gray-600"></i>
                  </button>
                  <span className="text-xs sm:text-sm font-bold text-gray-800 min-w-[16px] sm:min-w-[20px] text-center">
                    {selection.count}
                  </span>
                  <button
                    onClick={() => updateCount(index, 1)}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-md hover:bg-gray-100 flex items-center justify-center"
                  >
                    <i className="fas fa-plus text-[8px] sm:text-xs text-gray-600"></i>
                  </button>
                </div>
                <button
                  onClick={() => removeSelection(index)}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full hover:bg-red-100 flex items-center justify-center text-red-500 flex-shrink-0"
                >
                  <i className="fas fa-times text-[8px] sm:text-xs"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (livingType) {
      case 'Hostels':
        return renderHostelContent();
      case 'Hotels':
        return renderHotelContent();
      case 'Apartments':
        return renderApartmentContent();
      default:
        return null;
    }
  };

  const getItemIcon = (selection) => {
    switch (selection.type) {
      case 'hostel': return 'fa-user';
      case 'hotel': return 'fa-bed';
      case 'apartment': return 'fa-home';
      default: return '';
    }
  };

  return (
    <div className="relative" ref={selectorRef}>
      {/* Input Display - Enhanced with shadow */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus-within:border-green-300 focus-within:ring-4 focus-within:ring-green-100 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
      >
        <i className="fas fa-plus text-[#003d2b]"></i>
        <span className={`flex-1 text-left ${selections.length > 0 ? 'text-gray-800 font-bold' : 'text-gray-400'} text-sm`}>
          {getDisplayText()}
        </span>
        <i className={`fas fa-chevron-down text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </div>

      {/* Dropdown Popup - Responsive */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 sm:p-4 z-[9999] w-[280px] sm:w-[320px] max-h-[80vh] overflow-y-auto">
          {/* Type Header */}
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center gap-2 mb-1">
              <i className={`fas ${
                livingType === 'Hostels' ? 'fa-user' : 
                livingType === 'Hotels' ? 'fa-bed' : 'fa-home'
              } text-[#003d2b] text-sm sm:text-base`}></i>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                {livingType === 'Hostels' ? 'Select Seats' : 
                 livingType === 'Hotels' ? 'Select Rooms' : 'Select Apartments'}
              </h3>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500">
              Click on a type to add it to your selection
            </p>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      )}
    </div>
  );
};
// Single Date Picker Component - with responsive popup
const SingleDatePicker = ({ 
  value, 
  onChange,
  minDate,
  placeholder 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState(value);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value !== tempDate) {
      setTempDate(value);
    }
  }, [value]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDisplay = () => {
    if (!value) return placeholder;
    return formatDate(value);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Previous month days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push({
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
        isDisabled: true
      });
    }
    
    // Current month days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isDisabled = date < (minDate || today);
      const isSelected = tempDate && date.toDateString() === new Date(tempDate).toDateString();
      const isToday = date.toDateString() === today.toDateString();
      
      days.push({
        date,
        isCurrentMonth: true,
        isDisabled,
        isSelected,
        isToday
      });
    }
    
    // Next month days to complete grid
    const totalCells = 42; // 6 weeks * 7 days
    const nextMonthDays = totalCells - days.length;
    for (let day = 1; day <= nextMonthDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isDisabled: true
      });
    }
    
    return days;
  };

  const handleDayClick = (day) => {
    if (day.isDisabled || !day.isCurrentMonth) return;
    
    const dateString = day.date.toISOString().split('T')[0];
    setTempDate(dateString);
    onChange(dateString);
    setIsOpen(false);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const resetDate = () => {
    setTempDate('');
    onChange('');
  };

  const calendarDays = generateCalendar();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="relative" ref={datePickerRef}>
      {/* Input Display - Enhanced with shadow */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus-within:border-green-300 focus-within:ring-4 focus-within:ring-green-100 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
      >
        <i className="fas fa-calendar-day text-[#003d2b]"></i>
        <span className={`flex-1 text-left ${value ? 'text-gray-800 font-bold' : 'text-gray-400'} text-sm`}>
          {formatDisplay()}
        </span>
        <i className={`fas fa-chevron-down text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </div>

      {/* Calendar Popup - Responsive */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 sm:p-4 z-[9999] w-[280px] sm:w-[320px]">
          {/* Header */}
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <button 
              onClick={prevMonth}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm hover:shadow"
            >
              <i className="fas fa-chevron-left text-gray-600 text-xs sm:text-sm"></i>
            </button>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button 
              onClick={nextMonth}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm hover:shadow"
            >
              <i className="fas fa-chevron-right text-gray-600 text-xs sm:text-sm"></i>
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-[10px] sm:text-xs font-bold text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayClick(day)}
                disabled={day.isDisabled}
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-200
                  ${day.isDisabled ? 'text-gray-300 cursor-not-allowed' : ''}
                  ${!day.isCurrentMonth && !day.isDisabled ? 'text-gray-400' : ''}
                  ${day.isCurrentMonth && !day.isDisabled ? 'text-gray-800 hover:bg-gray-100 hover:shadow' : ''}
                  ${day.isSelected ? 'bg-[#003d2b] text-white hover:bg-[#002a1d] shadow-md scale-105' : ''}
                  ${day.isToday && !day.isSelected ? 'border-2 border-green-500 shadow-sm' : ''}
                `}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>

          {/* Selection Info */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#003d2b] shadow-sm"></div>
                <span className="text-[10px] sm:text-xs text-gray-600">Selected Date</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-bold text-gray-900">
                {tempDate ? formatDate(tempDate) : 'No date selected'}
              </span>
            </div>

            <div className="flex gap-2 mt-3 sm:mt-4">
              <button
                onClick={resetDate}
                className="flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors shadow-sm hover:shadow"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-white bg-[#003d2b] rounded-lg hover:bg-[#002a1d] transition-colors shadow-md hover:shadow-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CombinedDatePicker = ({ 
  startValue, 
  endValue, 
  onChange,
  minDate,
  placeholder 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startValue);
  const [tempEndDate, setTempEndDate] = useState(endValue);
  const [selecting, setSelecting] = useState('start');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatDisplay = () => {
    if (!startValue && !endValue) return placeholder;
    if (startValue && !endValue) return `${formatDate(startValue)} → Select check-out`;
    if (startValue && endValue) return `${formatDate(startValue)} → ${formatDate(endValue)}`;
    return placeholder;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Previous month days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push({
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
        isDisabled: true
      });
    }
    
    // Current month days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isDisabled = date < (selecting === 'end' && tempStartDate ? new Date(tempStartDate) : minDate || today);
      const isStart = tempStartDate && date.toDateString() === new Date(tempStartDate).toDateString();
      const isEnd = tempEndDate && date.toDateString() === new Date(tempEndDate).toDateString();
      const isInRange = tempStartDate && tempEndDate && 
                       date > new Date(tempStartDate) && 
                       date < new Date(tempEndDate);
      
      days.push({
        date,
        isCurrentMonth: true,
        isDisabled,
        isStart,
        isEnd,
        isInRange
      });
    }
    
    // Next month days to complete grid
    const totalCells = 42; // 6 weeks * 7 days
    const nextMonthDays = totalCells - days.length;
    for (let day = 1; day <= nextMonthDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isDisabled: true
      });
    }
    
    return days;
  };

  const handleDayClick = (day) => {
    if (day.isDisabled || !day.isCurrentMonth) return;
    
    const dateString = day.date.toISOString().split('T')[0];
    
    if (selecting === 'start') {
      setTempStartDate(dateString);
      setSelecting('end');
    } else {
      if (new Date(dateString) < new Date(tempStartDate)) {
        setTempStartDate(dateString);
        setTempEndDate(null);
      } else {
        setTempEndDate(dateString);
        onChange(tempStartDate, dateString);
        setIsOpen(false);
      }
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const resetDates = () => {
    setTempStartDate('');
    setTempEndDate('');
    setSelecting('start');
    onChange('', '');
  };

  const calendarDays = generateCalendar();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="relative" ref={datePickerRef}>
      {/* Input Display - Enhanced with shadow */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus-within:border-green-300 focus-within:ring-4 focus-within:ring-green-100 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
      >
        <i className="fas fa-calendar-day text-[#003d2b]"></i>
        <span className={`flex-1 text-left ${startValue || endValue ? 'text-gray-800 font-bold' : 'text-gray-400'} text-sm`}>
          {formatDisplay()}
        </span>
        <i className={`fas fa-chevron-down text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </div>

      {/* Calendar Popup - Responsive */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 sm:p-4 z-[9999] w-[280px] sm:w-[320px]">
          {/* Header */}
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <button 
              onClick={prevMonth}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm hover:shadow"
            >
              <i className="fas fa-chevron-left text-gray-600 text-xs sm:text-sm"></i>
            </button>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button 
              onClick={nextMonth}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm hover:shadow"
            >
              <i className="fas fa-chevron-right text-gray-600 text-xs sm:text-sm"></i>
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-[10px] sm:text-xs font-bold text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
         <div className="grid grid-cols-7 gap-1">
  {calendarDays.map((day, index) => (
    <button
      key={index}
      onClick={() => handleDayClick(day)}
      disabled={day.isDisabled}
      className={`
        w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-200
        ${day.isDisabled ? 'text-gray-300 cursor-not-allowed' : ''}
        ${!day.isCurrentMonth && !day.isDisabled ? 'text-gray-400' : ''}
        ${day.isCurrentMonth && !day.isDisabled ? 'text-gray-800 hover:bg-gray-100 hover:shadow' : ''}
        ${day.isStart ? 'bg-[#003d2b] text-white hover:bg-[#002a1d] shadow-md scale-105' : ''}
        ${day.isEnd ? 'bg-green-500 text-white hover:bg-green-600 shadow-md scale-105' : ''}
        ${day.isInRange ? 'bg-green-50' : ''}
        ${selecting === 'end' && day.date.toDateString() === new Date().toDateString() ? 'border-2 border-green-500 shadow-sm' : ''}
      `}
    >
      {day.date.getDate()}
    </button>
  ))}
</div>

          {/* Selection Info */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#003d2b] shadow-sm"></div>
                <span className="text-[10px] sm:text-xs text-gray-600">Check-in</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 shadow-sm"></div>
                <span className="text-[10px] sm:text-xs text-gray-600">Check-out</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-bold text-gray-900">
                {tempStartDate ? formatDate(tempStartDate) : 'Select check-in'}
              </span>
              <i className="fas fa-arrow-right text-gray-400 mx-2 text-xs sm:text-sm"></i>
              <span className="font-bold text-gray-900">
                {tempEndDate ? formatDate(tempEndDate) : 'Select check-out'}
              </span>
            </div>

            <div className="flex gap-2 mt-3 sm:mt-4">
              <button
                onClick={resetDates}
                className="flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors shadow-sm hover:shadow"
              >
                Clear
              </button>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SearchTabs = ({ onSearchResults, availableTickets = [], context = 'marketplace' }) => {
  const [activeTab, setActiveTab] = useState(BookingType.BUS);
  const [selectedSub, setSelectedSub] = useState('Round Trip');
  const [searchData, setSearchData] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  const currentCategory = CATEGORIES.find(c => c.id === activeTab);
  const isBus = activeTab === BookingType.BUS;
  const isLiving = activeTab === BookingType.LIVING;

  const handleTabChange = (id) => {
    setActiveTab(id);
    // Set default subcategory based on active tab
    if (id === BookingType.BUS) {
      setSelectedSub('Round Trip');
    } else {
      setSelectedSub('Hotels');
    }
    setSearchData({});
    
    // When tab changes, show all items of that category
    handleTabSearch(id);
  };

  const handleTabSearch = (tabId) => {
    let filteredResults = [];
    
    if (tabId === BookingType.BUS) {
      // Show all Bus items
      filteredResults = availableTickets.filter(item => item.category === 'Bus');
    } else if (tabId === BookingType.LIVING) {
      // Show all Apartment items
      filteredResults = availableTickets.filter(item => item.category === 'Apartment');
    }
    
    if (onSearchResults) {
      onSearchResults(filteredResults, tabId);
    }
  };

  const handleSubCategoryChange = (sub) => {
    setSelectedSub(sub);
    
    // Clear search data when switching sub-category
    if (isBus) {
      setSearchData(prev => ({ 
        ...prev, 
        date: '', 
        startDate: '',
        endDate: '',
        from: prev.from || '',
        to: prev.to || ''
      }));
    } else {
      // Clear living data
      setSearchData(prev => ({ 
        ...prev, 
        location: prev.location || '',
        moveInDate: '',
        checkIn: '',
        checkOut: '',
        duration: '',
        roomsSeats: []
      }));
    }
  };

  const handleInputChange = (key, value) => {
    setSearchData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCombinedDateChange = (startDate, endDate) => {
    setSearchData(prev => ({
      ...prev,
      checkIn: startDate,
      checkOut: endDate
    }));
  };

  const handleSingleDateChange = (date) => {
    setSearchData(prev => ({
      ...prev,
      moveInDate: date
    }));
  };

  const handleDurationChange = (duration) => {
    setSearchData(prev => ({
      ...prev,
      duration
    }));
  };

  const handleRoomsSeatsChange = (roomsSeats) => {
    setSearchData(prev => ({
      ...prev,
      roomsSeats
    }));
  };

  const handleSearch = () => {
    setIsSearching(true);
    
    // Start with all available tickets
    let filteredResults = availableTickets;
    
    // Filter by active tab category
    if (activeTab === BookingType.BUS) {
      filteredResults = filteredResults.filter(item => item.category === 'Bus');
    } else if (activeTab === BookingType.LIVING) {
      filteredResults = filteredResults.filter(item => item.category === 'Apartment');
    }
    
    // Filter by search query in relevant fields
    const searchQuery = searchData.from || searchData.to || searchData.location;
    if (searchQuery) {
      filteredResults = filteredResults.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query))
        );
      });
    }
    
    // Filter by date if provided
    if (searchData.date) {
      filteredResults = filteredResults.filter(item => {
        const itemDate = new Date(item.date);
        const searchDate = new Date(searchData.date);
        return itemDate.toDateString() === searchDate.toDateString();
      });
    }
    
    // Filter by date range if provided
    if (searchData.checkIn && searchData.checkOut) {
      filteredResults = filteredResults.filter(item => {
        const itemDate = new Date(item.date);
        const checkIn = new Date(searchData.checkIn);
        const checkOut = new Date(searchData.checkOut);
        return itemDate >= checkIn && itemDate <= checkOut;
      });
    }
    
    // Filter by move-in date if provided
    if (searchData.moveInDate) {
      filteredResults = filteredResults.filter(item => {
        const itemDate = new Date(item.date);
        const moveInDate = new Date(searchData.moveInDate);
        return itemDate >= moveInDate;
      });
    }
    
    // Filter by capacity if rooms/seats are selected
    if (searchData.roomsSeats && searchData.roomsSeats.length > 0) {
      const totalSeats = searchData.roomsSeats.reduce((sum, item) => sum + (item.seats * item.count), 0);
      filteredResults = filteredResults.filter(item => 
        item.availableSeats >= totalSeats
      );
    }
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      if (onSearchResults) {
        onSearchResults(filteredResults, activeTab);
      }
      
      // Show search summary
      console.log('Search Results:', {
        category: activeTab,
        subCategory: selectedSub,
        resultsCount: filteredResults.length,
        ...searchData
      });
      
      // For Home page, show alert
      if (context === 'home' && filteredResults.length > 0) {
        alert(`Found ${filteredResults.length} matching ${activeTab === BookingType.BUS ? 'bus' : 'living'} options!`);
      }
    }, 500);
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
            className="bg-transparent w-full outline-none text-gray-800 font-bold placeholder-gray-400 text-sm"
          />
        );
      
      case 'singleDate':
        return (
          <SingleDatePicker
            value={selectedSub === 'Hotels' ? searchData.checkIn : searchData.moveInDate}
            onChange={(date) => handleSingleDateChange(date)}
            placeholder={field.placeholder}
          />
        );
      
      case 'combinedDate':
        return (
          <CombinedDatePicker
            startValue={searchData.checkIn}
            endValue={searchData.checkOut}
            onChange={handleCombinedDateChange}
            placeholder={field.placeholder}
          />
        );
      
      case 'durationPicker':
        return (
          <DurationPicker
            value={searchData.duration}
            onChange={handleDurationChange}
            placeholder={field.placeholder}
          />
        );
      
      case 'roomsSeats':
        return (
          <RoomsSeatsSelector
            livingType={selectedSub}
            value={searchData.roomsSeats}
            onChange={handleRoomsSeatsChange}
            placeholder={field.placeholder}
          />
        );
      
      default:
        return null;
    }
  };

  const getButtonText = () => {
    if (isBus) {
      return `SEARCH ${selectedSub.toUpperCase()}`;
    }
    
    if (isLiving) {
      return `SEARCH ${selectedSub.toUpperCase()}`;
    }
    
    return `SEARCH`;
  };

  const getCurrentSearchFields = () => {
    if (!currentCategory) return [];
    
    if (typeof currentCategory.searchFields === 'function') {
      return currentCategory.searchFields(selectedSub);
    }
    
    return currentCategory.searchFields;
  };

  // Initialize selectedSub when component mounts or activeTab changes
  useEffect(() => {
    if (activeTab === BookingType.BUS) {
      setSelectedSub('Round Trip');
    } else {
      setSelectedSub('Hotels');
    }
    
    // Initial load: show all Bus items by default
    handleTabSearch(BookingType.BUS);
  }, []);

  return (
    <div className="bg-white rounded-[2.5rem] w-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* Main Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200 hide-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleTabChange(cat.id)}
            className={`flex items-center gap-3 px-8 py-5 whitespace-nowrap font-bold transition-all duration-300 relative min-w-[140px] ${
              activeTab === cat.id 
                ? 'text-[#003d2b]  shadow-sm' 
                : 'text-gray-400 hover:text-gray-600 '
            }`}
          >
            <i className={`fas ${cat.icon} text-lg`}></i>
            <span>{cat.label}</span>
            {activeTab === cat.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#003d2b] to-[#006644] animate-slideIn shadow-sm"></div>
            )}
          </button>
        ))}
      </div>

      <div className="p-4">
        {/* Sub Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-6 hide-scrollbar mb-2 pl-1 pt-1 ">
          {currentCategory?.subs.map(sub => (
            <button 
              key={sub}
              onClick={() => handleSubCategoryChange(sub)}
              className={`px-6 py-3 rounded-full text-xs font-bold transition-all duration-200 border whitespace-nowrap shrink-0 shadow-sm ${
                selectedSub === sub 
                  ? 'bg-gradient-to-r from-[#003d2b] to-[#006644] text-white border-transparent shadow-lg scale-105' 
                  : 'bg-white text-gray-400 border-gray-200 hover:border-green-300 hover:text-gray-600 hover:shadow'
              }`}
            >
              {sub.toUpperCase()}
            </button>
          ))}
        </div>
      
        {/* Search Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {getCurrentSearchFields().map((field, index) => (
            <div key={field.key || index} className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 tracking-widest ml-1 uppercase">
                {field.label}
              </label>
              <div className={`${['combinedDate', 'singleDate', 'roomsSeats', 'durationPicker'].includes(field.type) ? '' : 'flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 focus-within:border-green-300 focus-within:ring-4 focus-within:ring-green-100 transition-all duration-200 shadow-sm hover:shadow-md'}`}>
                {!['combinedDate', 'singleDate', 'roomsSeats', 'durationPicker'].includes(field.type) && (
                  <i className={`fas ${field.icon} text-[#003d2b]`}></i>
                )}
                {renderSearchField(field)}
              </div>
            </div>
          ))}
          
          {/* Search Button */}
          <div className="flex items-end">
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className={`w-full bg-gradient-to-r from-[#003d2b] to-[#006644] text-white font-black py-4 rounded-2xl hover:shadow-2xl hover:shadow-green-300/50 transition-all duration-300 uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg ${
                isSearching ? 'opacity-80 cursor-not-allowed' : ''
              }`}
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-search mr-2"></i>
                  {getButtonText()}
                </>
              )}
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