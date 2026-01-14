"use client";

import React, { useState } from 'react';
import ItemCard from '@/components/ItemCard';
import EventDetailsModal from '@/components/EventDetailsModal';
import BookingConfirmationModal from '@/components/BookingConfirmationModal';

const Marketplace = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [subCategoryFilter, setSubCategoryFilter] = useState('All');
  const [loadingItems, setLoadingItems] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookedTicket, setBookedTicket] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Mock user data
  const user = {
    name: 'John Doe',
    cnic: '42201-1234567-8',
    email: 'john@example.com'
  };

  const availableTickets = [
    // Bus Tickets
    { 
      id: 1, 
      title: 'Daewoo Express - Lahore to Islamabad', 
      description: 'Executive class with complimentary WiFi, meal, and extra legroom. Travel in comfort with our premium bus service featuring spacious seats, onboard entertainment, and refreshments.',
      price: 4500,
      discountPrice: 3800,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1600',
      location: 'Lahore Terminal', 
      date: 'Dec 20, 2024',
      time: '18:00',
      category: 'Bus',
      type: 'Executive Class',
      availableSeats: 12,
      totalSeats: 40,
      rating: 4.8,
      duration: '4h 30m',
      amenities: ['WiFi', 'Meal', 'AC', 'Charging Port', 'Extra Legroom'],
      isFree: false
    },
    { 
      id: 2, 
      title: 'Skyways - Karachi to Lahore', 
      description: 'Business class with reclining seats and onboard entertainment. Enjoy a luxurious journey with our state-of-the-art buses featuring personal screens, gourmet meals, and professional service.',
      price: 5500,
      discountPrice: 5000,
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1600',
      location: 'Karachi Terminal', 
      date: 'Dec 22, 2024',
      time: '22:00',
      category: 'Bus',
      type: 'Business Class',
      availableSeats: 5,
      totalSeats: 35,
      rating: 4.5,
      duration: '18h',
      amenities: ['TV', 'Reclining Seats', 'Blanket', 'Snacks', 'Hot Meals'],
      isFree: false
    },
    { 
      id: 3, 
      title: 'Faisal Movers - Islamabad to Peshawar', 
      description: 'Comfortable economy class journey through scenic routes. Experience the beauty of Pakistan\'s northern areas with our reliable and affordable bus service.',
      price: 2500,
      discountPrice: 2200,
      image: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&q=80&w=1600',
      location: 'Islamabad Terminal', 
      date: 'Dec 18, 2024',
      time: '14:30',
      category: 'Bus',
      type: 'Economy Class',
      availableSeats: 25,
      totalSeats: 45,
      rating: 4.2,
      duration: '3h',
      amenities: ['AC', 'Water', 'Magazine', 'Onboard Restroom'],
      isFree: false
    },
    
    // Apartments - Flats
    { 
      id: 4, 
      title: '2 Bedroom Flat - DHA Lahore', 
      description: 'Modern furnished apartment in secure gated community. This beautiful apartment features contemporary design, modern appliances, and access to community amenities.',
      price: 120000,
      discountPrice: 115000,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1600',
      location: 'DHA Phase 5, Lahore', 
      date: 'Jan 15, 2024',
      time: '14:00 Check-in',
      category: 'Apartment',
      type: 'Luxury Flat',
      subCategory: 'Flat',
      availableSeats: 1,
      totalSeats: 1,
      rating: 4.9,
      duration: 'Monthly',
      amenities: ['Furnished', '24/7 Security', 'Covered Parking', 'Gym', 'Swimming Pool'],
      isFree: false
    },
    { 
      id: 5, 
      title: 'Studio Apartment - Clifton Karachi', 
      description: 'Sea-view studio with modern amenities and furnished interior. Wake up to breathtaking views of the Arabian Sea in this beautifully designed studio apartment.',
      price: 80000,
      discountPrice: 78000,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1600',
      location: 'Clifton, Karachi', 
      date: 'Jan 10, 2024',
      time: '12:00 Check-in',
      category: 'Apartment',
      type: 'Studio',
      subCategory: 'Flat',
      availableSeats: 2,
      totalSeats: 2,
      rating: 4.7,
      duration: 'Monthly',
      amenities: ['Sea View', 'Fully Furnished', 'Private Balcony', 'Modern Kitchen', 'High-speed WiFi'],
      isFree: false
    },
    
    // Apartments - Hostel
    { 
      id: 6, 
      title: 'Single Seater Hostel - PU Lahore', 
      description: 'Private single seater room with attached bathroom. Perfect for students, featuring study-friendly environment and campus proximity.',
      price: 12000,
      discountPrice: 11500,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1600',
      location: 'PU Campus, Lahore', 
      date: 'Dec 30, 2024',
      time: '24/7 Access',
      category: 'Apartment',
      type: 'Student Hostel',
      subCategory: 'Hostel',
      availableSeats: 3,
      totalSeats: 20,
      rating: 4.3,
      duration: 'Monthly',
      amenities: ['High-speed WiFi', 'Laundry Service', 'Study Table', '24/7 Security', 'Common Kitchen'],
      isFree: false
    },
    { 
      id: 7, 
      title: 'Double Seater Hostel - NUST Islamabad', 
      description: 'AC room with shared bathroom facilities. Comfortable living space for students with modern facilities and campus access.',
      price: 8000,
      discountPrice: 7500,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1600',
      location: 'NUST Campus, Islamabad', 
      date: 'Jan 05, 2024',
      time: '24/7 Access',
      category: 'Apartment',
      type: 'Student Hostel',
      subCategory: 'Hostel',
      availableSeats: 8,
      totalSeats: 25,
      rating: 4.4,
      duration: 'Monthly',
      amenities: ['AC', 'Laundry', 'Common Kitchen', '24/7 Security', 'Study Lounge'],
      isFree: false
    },
    
    // More Apartments - Penthouse
    { 
      id: 8, 
      title: 'Penthouse - Emaar Islamabad', 
      description: 'Luxury penthouse with private pool and panoramic views. Experience ultimate luxury living with premium finishes and exclusive amenities.',
      price: 350000,
      discountPrice: 330000,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1600',
      location: 'Emaar, Islamabad', 
      date: 'Jan 25, 2024',
      time: '15:00 Check-in',
      category: 'Apartment',
      type: 'Luxury Penthouse',
      subCategory: 'Penthouse',
      availableSeats: 1,
      totalSeats: 1,
      rating: 4.9,
      duration: 'Monthly',
      amenities: ['Private Pool', 'Gym', 'Concierge', 'Valet Parking', 'Smart Home System'],
      isFree: false
    },
    
    // More Apartments - Portion
    { 
      id: 9, 
      title: 'Upper Portion - Gulberg Lahore', 
      description: 'Newly renovated upper portion with terrace access. Spacious living area with modern kitchen and beautiful terrace views.',
      price: 95000,
      discountPrice: 90000,
      image: 'https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa?auto=format&fit=crop&q=80&w=1600',
      location: 'Gulberg, Lahore', 
      date: 'Jan 12, 2024',
      time: '12:00 Check-in',
      category: 'Apartment',
      type: 'Residential Portion',
      subCategory: 'Portion',
      availableSeats: 1,
      totalSeats: 1,
      rating: 4.6,
      duration: 'Monthly',
      amenities: ['Terrace', 'Covered Parking', '24/7 Security', 'Garden', 'Modern Kitchen'],
      isFree: false
    },
  ];

  const categories = ['All', 'Bus', 'Apartment'];
  const apartmentSubCategories = ['All', 'Flat', 'Hostel', 'Penthouse', 'Portion'];
  
  const categoryStats = {
    'Bus': availableTickets.filter(t => t.category === 'Bus').length,
    'Apartment': availableTickets.filter(t => t.category === 'Apartment').length,
    'All': availableTickets.length
  };

  const filteredTickets = () => {
    let filtered = activeFilter === 'All' 
      ? availableTickets 
      : availableTickets.filter(t => t.category === activeFilter);
    
    if (activeFilter === 'Apartment' && subCategoryFilter !== 'All') {
      filtered = filtered.filter(t => t.subCategory === subCategoryFilter);
    }
    
    return filtered;
  };

  const handleBookNow = async (event) => {
    setLoadingItems(prev => [...prev, event.id]);
    
    // Simulate booking process
    setTimeout(() => {
      // Create a booked ticket object with additional booking details
      const bookedTicket = {
        ...event,
        ticketId: `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        bookingDate: new Date().toLocaleDateString(),
        seats: ['A12', 'A13'], // Mock seat selection
        qrCode: true,
        totalAmount: event.discountPrice || event.price
      };
      
      setBookedTicket(bookedTicket);
      setShowConfirmation(true);
      setLoadingItems(prev => prev.filter(id => id !== event.id));
    }, 1500);
  };

  const handleViewDetails = (itemId) => {
    const item = availableTickets.find(t => t.id === itemId);
    if (item) {
      setSelectedEvent(item);
      setShowBookingModal(true);
    }
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
    setShowBookingModal(false);
  };

  const handleConfirmBooking = (event) => {
    handleBookNow(event);
  };

  const handleContinueExploring = () => {
    setShowConfirmation(false);
  };

  const handleViewWallet = () => {
    setShowConfirmation(false);
    alert('Redirecting to wallet page...');
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Bus': return 'fa-bus';
      case 'Apartment': return 'fa-building';
      default: return 'fa-ticket-alt';
    }
  };

  const getSubCategoryIcon = (subCategory) => {
    switch(subCategory) {
      case 'Flat': return 'fa-home';
      case 'Hostel': return 'fa-bed';
      case 'Penthouse': return 'fa-building-columns';
      case 'Portion': return 'fa-house-user';
      default: return 'fa-building';
    }
  };

  return (
    <div className="space-y-10 pb-16 max-w-7xl mx-auto mt-6 md:mt-10 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
         <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 italic leading-tight">Our Marketplace.</h1>
            <p className="text-gray-500 font-medium text-base md:text-lg leading-relaxed italic">"Book tickets for buses and apartments with guaranteed security and identity protection."</p>
         </div>
         <div className="flex gap-4 w-full md:w-auto">
            <div className="bg-white border border-gray-100 shadow-xl rounded-2xl px-5 py-3 md:py-4 flex items-center gap-4 focus-within:border-green-300 transition w-full md:w-80">
              <i className="fas fa-search text-gray-300"></i>
              <input type="text" placeholder="Search tickets..." className="bg-transparent w-full outline-none font-bold text-gray-800 text-xs md:text-sm" />
            </div>
         </div>
      </div>

      {/* Category Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {categories.map(category => (
          <div key={category} className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-green-50 flex items-center justify-center text-[#003d2b] text-lg md:text-xl">
                <i className={`fas ${getCategoryIcon(category)}`}></i>
              </div>
              <span className="text-2xl md:text-3xl font-black text-gray-900">{categoryStats[category] || 0}</span>
            </div>
            <p className="text-[10px] md:text-xs font-black text-gray-900 uppercase tracking-widest">{category}</p>
            <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-tight mt-1">Available</p>
          </div>
        ))}
      </div>

      {/* Category Filters with Subcategory Dropdown */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:pb-0">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                if (cat !== 'Apartment') setSubCategoryFilter('All');
              }}
              className={`px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black tracking-widest uppercase transition-all border whitespace-nowrap flex items-center gap-2 ${
                activeFilter === cat 
                  ? 'bg-[#003d2b] text-white border-[#003d2b] shadow-2xl' 
                  : 'bg-white text-gray-400 border-gray-100 hover:border-green-300'
              }`}
            >
              <i className={`fas ${getCategoryIcon(cat)} text-xs`}></i>
              <span>{cat}</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-[8px] ${activeFilter === cat ? 'bg-white/20' : 'bg-gray-100'}`}>
                {categoryStats[cat] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Subcategory Dropdown (only for Apartment category) */}
        {activeFilter === 'Apartment' && (
          <div className="relative w-full md:w-auto">
            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
              <i className="fas fa-filter"></i>
              <span>Filter by Type</span>
            </div>
            <div className="relative">
              <select
                value={subCategoryFilter}
                onChange={(e) => setSubCategoryFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-100 rounded-2xl px-6 py-3 md:py-4 pr-12 text-[9px] md:text-[10px] font-black tracking-widest uppercase text-gray-900 focus:outline-none focus:border-green-300 focus:ring-2 focus:ring-green-100 w-full md:w-48 shadow-sm cursor-pointer"
              >
                {apartmentSubCategories.map(sub => (
                  <option key={sub} value={sub} className="font-black uppercase">
                    {sub}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {filteredTickets().map(ticket => (
          <ItemCard
            key={ticket.id}
            item={{
              id: ticket.id,
              title: ticket.title,
              description: ticket.description,
              price: ticket.price,
              discountPrice: ticket.discountPrice,
              image: ticket.image,
              location: ticket.location,
              date: ticket.date,
              time: ticket.time,
              category: ticket.category,
              availableSeats: ticket.availableSeats,
              totalSeats: ticket.totalSeats,
              rating: ticket.rating,
              isFree: ticket.isFree || ticket.price === 0
            }}
            onBookNow={() => handleViewDetails(ticket.id)}
            onViewDetails={() => handleViewDetails(ticket.id)}
            isLoading={loadingItems.includes(ticket.id)}
            isBooked={false}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredTickets().length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 text-4xl">
            <i className="fas fa-search"></i>
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-3">No tickets found</h3>
          <p className="text-gray-500 font-medium max-w-md mx-auto">
            {activeFilter === 'Apartment' && subCategoryFilter !== 'All'
              ? `No ${subCategoryFilter.toLowerCase()} listings available at the moment. Try another type or check back later.`
              : `No ${activeFilter.toLowerCase()} tickets available at the moment. Try another category or check back later.`
            }
          </p>
        </div>
      )}

      {/* Marketplace Stats Footer */}
      <div className="mt-16 pt-10 border-t border-gray-100">
        <div className="text-center space-y-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Marketplace Statistics</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl font-black text-[#003d2b]">{availableTickets.length}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Listings</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-[#003d2b]">100%</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verified Tickets</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-[#003d2b]">PKR {availableTickets.reduce((sum, t) => sum + t.price, 0).toLocaleString()}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Value</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-[#003d2b]">24/7</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {showBookingModal && selectedEvent && (
        <EventDetailsModal
          isOpen={showBookingModal}
          onClose={handleCloseDetails}
          event={selectedEvent}
          user={user}
          onBookNow={handleConfirmBooking}
          bookingLoading={loadingItems.includes(selectedEvent.id)}
        />
      )}

      {/* Booking Confirmation Modal */}
      <BookingConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        bookedTicket={bookedTicket}
        onViewWallet={handleViewWallet}
        onContinueExploring={handleContinueExploring}
      />

      <style jsx global>{`
        @keyframes zoom-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-in {
          animation-duration: 0.3s;
          animation-timing-function: ease-out;
          animation-fill-mode: both;
        }
        
        .zoom-in {
          animation-name: zoom-in;
        }
        
        .shadow-4xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .shadow-3xl {
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
        }

        select::-ms-expand {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Marketplace;