// BestSelling.jsx
"use client";

import { useState } from 'react';
import EventDetailsModal from '@/components/EventDetailsModal';
import ItemCard from '@/components/ItemCard';

const BestSelling = () => {
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

  // Best Selling items
  const items = [
    {
      id: 1,
      title: "Cricket World Cup Finals Viewing",
      description: "Watch the finals with fellow cricket enthusiasts on giant screens.",
      price: 45,
      discountPrice: 35,
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop",
      location: "Sports Arena, Lahore",
      date: "Nov 19, 2024",
      time: "6:00 PM",
      category: "SPORTS",
      availableSeats: 25,
      totalSeats: 300,
      rating: 4.9,
      isFree: false,
      organizer: "Sports Fanatics PK",
      duration: "6 hours",
      soldOut: true
    },
    {
      id: 2,
      title: "Eid Shopping Festival",
      description: "Biggest Eid sale with 500+ brands offering exclusive discounts.",
      price: 0,
      discountPrice: null,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      location: "Packages Mall, Lahore",
      date: "Apr 8-12, 2024",
      time: "10:00 AM - 11:00 PM",
      category: "SHOPPING",
      availableSeats: 1200,
      totalSeats: 5000,
      rating: 4.8,
      isFree: true,
      organizer: "Retail Group Pakistan",
      duration: "5 days"
    },
    {
      id: 3,
      title: "Pakistani Film Premiere Night",
      description: "Exclusive premiere of the year's most anticipated Pakistani film.",
      price: 120,
      discountPrice: 99,
      image: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=800&h=600&fit=crop",
      location: "Cinepax, Islamabad",
      date: "Sep 25, 2024",
      time: "8:00 PM",
      category: "MOVIE",
      availableSeats: 15,
      totalSeats: 200,
      rating: 4.7,
      isFree: false,
      organizer: "Pak Cinema",
      duration: "3 hours"
    },
    {
      id: 4,
      title: "Food Street Festival",
      description: "Taste dishes from 50+ restaurants and food trucks in one place.",
      price: 60,
      discountPrice: 40,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
      location: "Food Street, Karachi",
      date: "Oct 12-14, 2024",
      time: "5:00 PM - 12:00 AM",
      category: "FOOD",
      availableSeats: 420,
      totalSeats: 1000,
      rating: 4.9,
      isFree: false,
      organizer: "Foodie Events PK",
      duration: "3 days"
    },
    {
      id: 5,
      title: "Comedy Night Live",
      description: "Stand-up comedy with Pakistan's top comedians.",
      price: 85,
      discountPrice: 65,
      image: "https://images.unsplash.com/photo-1542561805-d2b0d2c5d6c9?w=800&h=600&fit=crop",
      location: "Alhamra Arts Council, Lahore",
      date: "Jul 20, 2024",
      time: "8:30 PM",
      category: "COMEDY",
      availableSeats: 8,
      totalSeats: 150,
      rating: 4.8,
      isFree: false,
      organizer: "Comedy Club PK",
      duration: "2 hours"
    },
    {
      id: 6,
      title: "Tech Gadget Expo",
      description: "Latest smartphones, laptops, and gadgets with launch offers.",
      price: 30,
      discountPrice: 20,
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop",
      location: "Expo Center, Karachi",
      date: "Jun 5-9, 2024",
      time: "11:00 AM - 9:00 PM",
      category: "TECH",
      availableSeats: 750,
      totalSeats: 2000,
      rating: 4.6,
      isFree: false,
      organizer: "Tech Expo Pakistan",
      duration: "5 days"
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
    setCurrentSlide(1);
  };

  const prevSlide = () => {
    setCurrentSlide(0);
  };

  // Get current 3 cards to display
  const getCurrentCards = () => {
    if (currentSlide === 0) {
      return items.slice(0, 3);
    } else {
      return items.slice(3, 6);
    }
  };

  return (
    <div className=" my-10  p-8 md:p-16 text-white overflow-hidden relative shadow-3xl">
    

      {/* Header Section - EXACT SAME LAYOUT, different text and color */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-10 md:mb-16">
        <div className="space-y-2 md:space-y-4">
          {/* Changed color from #00ff88 to #ff6b35 (orange) */}
          <span className="text-[9px] md:text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">
            Best Selling
          </span>
          <h2 className="text-gray-900 text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">
            Crowd Favorites
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl">
            Most popular events selling fast! Slide to explore more!
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Slider Navigation Buttons - Same as LatestCollection */}
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

      {/* Single Row of 3 Cards - Desktop - Same as LatestCollection */}
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
          
          {/* Slider Dots for Desktop - Changed dot color to #ff6b35 */}
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
        </div>

        {/* Mobile: Single column of cards - Same as LatestCollection */}
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

      {/* View All Button - Changed border and hover color to #ff6b35 */}
      <div className="relative z-10 mt-12 md:mt-16 text-center">
        <button className="group bg-transparent text-gray-900 font-black px-8 py-4 rounded-2xl text-sm uppercase tracking-widest border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300">
          <span className="flex items-center gap-3">
            View All 
            <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
          </span>
        </button>
      </div>

      {/* Event Details Modal - Same as LatestCollection */}
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

export default BestSelling;