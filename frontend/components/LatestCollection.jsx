"use client";

import { useState } from 'react';
import EventDetailsModal from '@/components/EventDetailsModal';
import ItemCard from '@/components/ItemCard';

const LatestCollection = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Sample user from your context
  const user = {
    name: "John Doe",
    cnic: "42101-1234567-1",
    email: "john@example.com",
    phone: "+92 300 1234567"
  };

  // 6 featured items
  const items = [
    {
      id: 1,
      title: "International Music Festival",
      description: "Experience an unforgettable night with international artists performing live.",
      price: 89,
      discountPrice: 69,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      location: "Jinnah Stadium, Islamabad",
      date: "Mar 15, 2024",
      time: "7:00 PM",
      category: "CONCERT",
      availableSeats: 45,
      totalSeats: 200,
      rating: 4.8,
      isFree: false,
      organizer: "Live Events PK",
      duration: "4 hours"
    },
    {
      id: 2,
      title: "Tech Summit 2024",
      description: "Annual technology conference with industry leaders and innovators.",
      price: 149,
      discountPrice: 99,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      location: "Expo Center, Karachi",
      date: "Apr 22, 2024",
      time: "9:00 AM",
      category: "CONFERENCE",
      availableSeats: 120,
      totalSeats: 500,
      rating: 4.6,
      isFree: false,
      organizer: "Tech Connect",
      duration: "2 days"
    },
    {
      id: 3,
      title: "Food & Wine Festival",
      description: "Culinary extravaganza featuring top chefs and premium wines.",
      price: 75,
      discountPrice: null,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      location: "F-9 Park, Islamabad",
      date: "May 5, 2024",
      time: "6:00 PM",
      category: "FOOD",
      availableSeats: 180,
      totalSeats: 300,
      rating: 4.9,
      isFree: false,
      organizer: "Foodie Network",
      duration: "5 hours"
    },
    {
      id: 4,
      title: "Art Exhibition: Modern Masters",
      description: "Contemporary art exhibition featuring works from emerging artists.",
      price: 25,
      discountPrice: 15,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
      location: "National Art Gallery, Lahore",
      date: "Jun 10-25, 2024",
      time: "10:00 AM - 8:00 PM",
      category: "ART",
      availableSeats: 90,
      totalSeats: 100,
      rating: 4.7,
      isFree: false,
      organizer: "Art Council Pakistan",
      duration: "Ongoing"
    },
    {
      id: 5,
      title: "Marathon for Charity",
      description: "5K/10K marathon raising funds for children's education.",
      price: 0,
      discountPrice: null,
      image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&h=600&fit=crop",
      location: "Sea View, Karachi",
      date: "Jul 15, 2024",
      time: "6:00 AM",
      category: "SPORTS",
      availableSeats: 500,
      totalSeats: 1000,
      rating: 4.5,
      isFree: true,
      organizer: "Charity Run Pakistan",
      duration: "3 hours"
    },
    {
      id: 6,
      title: "Startup Pitch Night",
      description: "Entrepreneurs pitch to investors for funding opportunities.",
      price: 45,
      discountPrice: 30,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
      location: "Tech Hub, Lahore",
      date: "Aug 8, 2024",
      time: "5:30 PM",
      category: "BUSINESS",
      availableSeats: 65,
      totalSeats: 150,
      rating: 4.4,
      isFree: false,
      organizer: "Startup Pakistan",
      duration: "3 hours"
    }
  ];

  const handleViewDetails = (itemId) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      setSelectedEvent(item);
      setShowModal(true);
    }
  };

  const handleBookNow = (itemId) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      setSelectedEvent(item);
      setShowModal(true);
    }
  };

  const handleModalBookNow = async (event) => {
    setBookingLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Booking event:', event);
      alert(`Successfully booked: ${event.title}\nCheck your email for confirmation.`);
      setShowModal(false);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  // Slider navigation
  const nextSlide = () => {
    setCurrentSlide(1); // Only 2 slides: 0 and 1
  };

  const prevSlide = () => {
    setCurrentSlide(0);
  };

  // Get current 3 cards to display
  const getCurrentCards = () => {
    if (currentSlide === 0) {
      return items.slice(0, 3); // First 3 cards
    } else {
      return items.slice(3, 6); // Last 3 cards
    }
  };

  return (
    <div className="bg-gray-900 my-10 rounded-[3rem] md:rounded-[5rem] p-8 md:p-16 text-white overflow-hidden relative shadow-3xl">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 p-10 md:p-20 opacity-10 rotate-12">
        <i className="fas fa-ticket-alt text-[15rem] md:text-[20rem]"></i>
      </div>
      <div className="absolute bottom-10 left-10 opacity-10 -rotate-12">
        <i className="fas fa-calendar-star text-[10rem] md:text-[15rem]"></i>
      </div>

      {/* Header Section */}
      <div className="relative   z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-10 md:mb-16">
        <div className="space-y-2 md:space-y-4">
          <span className="text-[9px] md:text-[10px] font-black text-[#00ff88] uppercase tracking-[0.4em]">
            Featured Collection
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">
            Top Experiences
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl">
            Premium events curated for you. Slide to explore more!
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Slider Navigation Buttons - Desktop Only */}
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
              disabled={currentSlide === 1}
              className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center border transition ${
                currentSlide === 1 
                  ? 'bg-white/10 border-white/20 cursor-not-allowed' 
                  : 'bg-white/10 border-white/20 hover:bg-white/20'
              }`}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        
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
                onBookNow={handleBookNow}
                onViewDetails={handleViewDetails}
                isBooked={false}
                isLoading={bookingLoading && selectedEvent?.id === item.id}
              />
            ))}
          </div>
          
          {/* Slider Dots for Desktop */}
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentSlide(0)}
              className={`w-8 h-2 rounded-full transition-all ${
                currentSlide === 0 ? 'bg-[#00ff88]' : 'bg-white/30'
              }`}
            />
            <button
              onClick={() => setCurrentSlide(1)}
              className={`w-8 h-2 rounded-full transition-all ${
                currentSlide === 1 ? 'bg-[#00ff88]' : 'bg-white/30'
              }`}
            />
          </div>
        </div>

        {/* Mobile: Single column of cards */}
        <div className="md:hidden space-y-6">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onBookNow={handleBookNow}
              onViewDetails={handleViewDetails}
              isBooked={false}
              isLoading={bookingLoading && selectedEvent?.id === item.id}
            />
          ))}
        </div>

       
      </div>

      {/* View All Button */}
      <div className="relative z-10 mt-12 md:mt-16 text-center">
        <button className="group bg-transparent text-white font-black px-8 py-4 rounded-2xl text-sm uppercase tracking-widest border-2 border-[#00ff88] hover:bg-[#00ff88] hover:text-gray-900 transition-all duration-300">
          <span className="flex items-center gap-3">
            View All 
            <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
          </span>
        </button>
      </div>

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
        user={user}
        onBookNow={handleModalBookNow}
        bookingLoading={bookingLoading}
      />
    </div>
  );
};

export default LatestCollection;