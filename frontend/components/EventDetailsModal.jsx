"use client";

import { useState } from 'react';

const EventDetailsModal = ({ 
  isOpen, 
  onClose, 
  event, 
  user, 
  onBookNow,
  bookingLoading = false
}) => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!isOpen || !event) return null;

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const confirmBooking = async () => {
    if (onBookNow) {
      await onBookNow(event);
    }
    setShowBookingModal(false);
    onClose();
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
  };

  return (
    <>
      {/* Main Detail Modal */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" 
          onClick={onClose}
        ></div>
        
        <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-4xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="h-64 md:h-auto relative">
              <img 
                src={event.image} 
                className="w-full h-full object-cover" 
                alt={event.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                <span className="bg-[#00ff88] text-[#003d2b] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4 inline-block">
                  {event.type || event.category}
                </span>
                <h2 className="text-2xl md:text-4xl font-black tracking-tighter leading-tight">
                  {event.title}
                </h2>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-12 space-y-6 md:space-y-8 flex flex-col">
              {/* Header with Info */}
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  {/* Date & Time */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#003d2b] shadow-inner">
                      <i className="fas fa-calendar"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Date & Time
                      </p>
                      <p className="font-black text-gray-900 text-sm md:text-base">
                        {event.date}, 2024 • {event.time || '8:00 PM'}
                      </p>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#003d2b] shadow-inner">
                      <i className="fas fa-location-dot"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Venue
                      </p>
                      <p className="font-black text-gray-900 text-sm md:text-base">
                        {event.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button 
                  onClick={onClose}
                  className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">
                  Event Description
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed italic">
                  {event.description || `Experience the ultimate ${event.title} featuring local and international talents. This is a unified Go Booking verified event ensuring 100% identity protection and secure entrance. Join thousands of fans in this one-of-a-kind experience.`}
                </p>
              </div>

              {/* Additional Info */}
              {(event.availableSeats || event.rating) && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  {event.availableSeats && (
                    <div className="text-center">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                        Available Seats
                      </p>
                      <p className="text-lg font-black text-gray-900">
                        {event.availableSeats}
                        <span className="text-xs text-gray-400">/{event.totalSeats || 200}</span>
                      </p>
                    </div>
                  )}
                  {event.rating && (
                    <div className="text-center">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                        Rating
                      </p>
                      <div className="flex items-center justify-center gap-1">
                        <i className="fas fa-star text-yellow-400"></i>
                        <span className="text-lg font-black text-gray-900">
                          {event.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer with Price and Book Button */}
              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                    Admission Pass
                  </span>
                  <span className="text-xl md:text-3xl font-black tracking-tighter text-gray-900">
                    {event.isFree ? 'FREE' : `PKR ${event.discountPrice || event.price}`}
                    {event.discountPrice && (
                      <span className="text-lg text-gray-400 line-through ml-2">
                        PKR {event.price}
                      </span>
                    )}
                  </span>
                </div>
                <button 
                  onClick={handleBookNow}
                  className="bg-[#003d2b] text-white font-black px-6 md:px-10 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl hover:scale-105 transition active:scale-95 uppercase tracking-widest text-[10px] md:text-xs"
                >
                  SECURE YOUR SEAT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 ">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" 
            onClick={handleCloseBookingModal}
          ></div>
          
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 text-center shadow-4xl animate-in zoom-in duration-300">
            {/* Ticket Icon */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-50 rounded-2xl md:rounded-3xl flex items-center justify-center text-[#003d2b] text-3xl md:text-4xl mx-auto mb-6 md:mb-8 shadow-inner">
              <i className="fas fa-ticket-alt"></i>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tighter">
              Confirm Booking
            </h3>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px] mb-6 md:mb-8">
              Secure Identity Verification Required
            </p>

            {/* Booking Details */}
            <div className="bg-gray-50 rounded-[2rem] p-6 md:p-8 mb-8 md:mb-10 text-left border border-gray-100 shadow-inner">
              {/* User Info */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Authenticated Holder
                  </p>
                  <p className="font-black text-gray-900 text-sm">
                    {user?.name || 'Guest User'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    CNIC BINDING
                  </p>
                  <p className="font-black text-gray-900 text-sm">
                    {user?.cnic || 'Required for booking'}
                  </p>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between">
                  <span className="text-[10px] md:text-xs font-bold text-gray-400">
                    Selected Event
                  </span>
                  <span className="text-[10px] md:text-xs font-black text-gray-900 text-right">
                    {event.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] md:text-xs font-bold text-gray-400">
                    Total Amount
                  </span>
                  <span className="text-[10px] md:text-xs font-black text-[#003d2b]">
                    {event.isFree ? 'FREE' : `PKR ${event.discountPrice || event.price}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleCloseBookingModal}
                className="flex-1 bg-gray-50 text-gray-400 font-black py-4 md:py-5 rounded-2xl uppercase tracking-widest text-[10px] border border-gray-100 hover:bg-gray-100 transition"
              >
                CANCEL
              </button>
              <button 
                onClick={confirmBooking}
                disabled={bookingLoading}
                className={`flex-[2] bg-[#003d2b] text-white font-black py-4 md:py-5 px-6 md:px-10 rounded-2xl shadow-xl uppercase tracking-widest text-[10px] hover:bg-black transition ${
                  bookingLoading ? 'opacity-70 cursor-wait' : ''
                }`}
              >
                {bookingLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-spinner fa-spin"></i>
                    PROCESSING...
                  </span>
                ) : (
                  'CONFIRM SECURE BOOKING'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetailsModal;