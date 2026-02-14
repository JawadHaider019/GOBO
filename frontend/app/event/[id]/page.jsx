"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApp } from '../../../context/AppContext';
import BookingConfirmationModal from '../../../components/BookingConfirmationModal';
import AuthModal from '../../../components/AuthModal'; // Import AuthModal

const EventDetail = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const { listings, user, balance, bookTicket } = useApp();
  const [item, setItem] = useState(null);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false); // New state for auth modal
  const [showBalanceError, setShowBalanceError] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookedTicketData, setBookedTicketData] = useState(null);

  useEffect(() => {
    const foundItem = listings.find((l) => l.id === id);
    if (!foundItem) {
      router.push('/');
    } else {
      setItem(foundItem);
    }
    window.scrollTo(0, 0);
  }, [id, listings, router]);

  const handleBookInitiate = () => {
    if (!user) {
      // Instead of redirecting, show the auth modal
      setShowAuthModal(true);
      return;
    }
    
    // Show confirmation modal for bus/living bookings
    setShowBookingConfirm(true);
  };

  const handleConfirmBooking = () => {
    if (!item) return;

    if (balance < (item.discountPrice || item.price)) {
      setShowBalanceError(true);
      setShowBookingConfirm(false); // Close confirmation modal if balance error
      return;
    }

    setIsBooking(true);
    setTimeout(() => {
      try {
        const result = bookTicket(item);
        setIsBooking(false);
        if (result) {
          // Store the booked ticket data for the confirmation modal
          setBookedTicketData({
            ...item,
            ticketId: `TKT${Date.now()}${Math.floor(Math.random() * 1000)}`,
            totalAmount: item.discountPrice || item.price,
            seats: isBus ? ['A12', 'A13'] : [], // Mock seat data for bus
            qrCode: true
          });
          
          setSuccess(true);
          setShowBookingConfirm(false); // Close the confirmation modal
        }
      } catch (error) {
        console.error('Booking error:', error);
        setIsBooking(false);
        setShowBookingConfirm(false); // Close modal on error
      }
    }, 1500);
  };

  const handleViewWallet = () => {
    setSuccess(false);
    router.push('/dashboard');
  };

  const handleContinueExploring = () => {
    setSuccess(false);
    router.push('/');
  };

  // Handle successful authentication
  const handleAuthSuccess = (userData) => {
    console.log('User authenticated:', userData);
    // AuthModal will automatically close on success
    // The user can now proceed with booking
  };

  if (!item) return (
    <div className="min-h-screen bg-[#fcfdfd] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#003d2b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading details...</p>
      </div>
    </div>
  );

  const isBus = item.category === 'BUS';
  const isLiving = item.category === 'LIVING';

  return (
    <div className="min-h-screen bg-[#fcfdfd] pb-32">
      {/* Auth Modal for Login/Signup */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Booking Confirmation Modal */}
      <BookingConfirmationModal
        isOpen={showBookingConfirm}
        onClose={() => setShowBookingConfirm(false)}
        bookedTicket={bookedTicketData}
        onViewWallet={handleViewWallet}
        onContinueExploring={handleContinueExploring}
      />

      {/* Balance Error Modal */}
      {showBalanceError && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-red-950/60 backdrop-blur-md" onClick={() => setShowBalanceError(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[3rem] p-10 text-center shadow-4xl animate-in zoom-in duration-300">
             <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 text-2xl mx-auto mb-6 shadow-inner">
               <i className="fas fa-exclamation-triangle"></i>
             </div>
             <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tighter">Insufficient Balance</h3>
             <p className="text-gray-500 font-medium mb-10 text-sm leading-relaxed italic">"Please recharge your wallet to book this {isBus ? 'bus ticket' : 'accommodation'}."</p>
             <div className="space-y-4">
               <button onClick={() => router.push('/wallet')} className="w-full bg-[#003d2b] text-white font-black py-4 rounded-xl shadow-xl uppercase tracking-widest text-[10px]">Recharge Now</button>
               <button onClick={() => setShowBalanceError(false)} className="w-full bg-gray-100 text-gray-700 font-black py-4 rounded-xl uppercase tracking-widest text-[10px]">Cancel</button>
             </div>
          </div>
        </div>
      )}

      {/* Success Modal - Keep as backup if needed */}
      {success && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#003d2b]/80 backdrop-blur-md"></div>
          <div className="relative bg-white w-full max-w-md rounded-[3rem] p-12 text-center shadow-4xl animate-in zoom-in duration-300">
             <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-[#00ff88] text-4xl mx-auto mb-8 shadow-inner relative">
                <i className="fas fa-check-circle"></i>
                <div className="absolute inset-0 rounded-full border-2 border-green-200 animate-ping opacity-20"></div>
             </div>
             <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">
               {isBus ? 'Ticket Booked!' : 'Booking Confirmed!'}
             </h3>
             <p className="text-sm text-gray-500 font-medium mb-10 italic">
               {isBus 
                 ? 'Your bus ticket has been secured and added to your wallet.' 
                 : 'Your accommodation has been booked and added to your wallet.'}
             </p>
             <button onClick={() => router.push('/dashboard')} className="w-full bg-[#003d2b] text-white font-black py-5 rounded-2xl shadow-xl uppercase tracking-widest text-[10px]">View Tikcet</button>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="h-[60vh] relative w-full overflow-hidden">
        <img 
          src={item.image} 
          className="w-full h-full max-h-[60vh] object-cover"
          alt={item.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfdfd] via-[#fcfdfd]/20 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 md:px-12 py-12 text-white">
          <div className="space-y-6">
            <button onClick={() => router.back()} className="bg-white/10 backdrop-blur-md border border-white/20 w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 transition mb-12">
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className="flex gap-3">
              <span className="bg-[#00ff88] text-[#003d2b] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {isBus ? 'BUS' : 'LIVING'}
              </span>
              {item.isFree && <span className="bg-yellow-400 text-gray-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">FREE</span>}
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85]">{item.title}</h1>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 mt-[-4rem] relative z-10">
        
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-16">
           <div className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-gray-100 shadow-xl space-y-12">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {isBus ? (
                   <>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Departure</p>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#003d2b] shadow-inner">
                             <i className="fas fa-map-marker-alt"></i>
                           </div>
                           <span className="font-black text-gray-900 italic">{item.location}</span>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Arrival</p>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#003d2b] shadow-inner">
                             <i className="fas fa-map-marker"></i>
                           </div>
                           <span className="font-black text-gray-900 italic">{item.destination}</span>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Schedule</p>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#003d2b] shadow-inner">
                             <i className="fas fa-calendar"></i>
                           </div>
                           <span className="font-black text-gray-900 italic">{item.date}</span>
                        </div>
                     </div>
                   </>
                 ) : (
                   <>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</p>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#003d2b] shadow-inner">
                             <i className="fas fa-map-marker-alt"></i>
                           </div>
                           <span className="font-black text-gray-900 italic">{item.location}</span>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Check-in</p>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#003d2b] shadow-inner">
                             <i className="fas fa-sign-in-alt"></i>
                           </div>
                           <span className="font-black text-gray-900 italic">{item.checkInTime}</span>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Check-out</p>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#003d2b] shadow-inner">
                             <i className="fas fa-sign-out-alt"></i>
                           </div>
                           <span className="font-black text-gray-900 italic">{item.checkOutTime}</span>
                        </div>
                     </div>
                   </>
                 )}
              </div>

              <div className="h-px bg-gray-50"></div>

              <div className="space-y-6">
                 <h3 className="text-2xl font-black italic text-gray-900 tracking-tighter">Description</h3>
                 <p className="text-gray-500 font-medium italic leading-relaxed text-lg">
                   {item.description}
                 </p>
              </div>

              {isBus && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-black italic text-gray-900 tracking-tighter">Bus Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Bus Type</p>
                      <p className="font-black text-gray-900">{item.busType}</p>
                    </div>
                    <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Duration</p>
                      <p className="font-black text-gray-900">{item.duration}</p>
                    </div>
                    <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Departure Point</p>
                      <p className="font-black text-gray-900">{item.departurePoint}</p>
                    </div>
                    <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Arrival Point</p>
                      <p className="font-black text-gray-900">{item.arrivalPoint}</p>
                    </div>
                  </div>
                </div>
              )}

              {isLiving && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-black italic text-gray-900 tracking-tighter">Accommodation Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Room Type</p>
                      <p className="font-black text-gray-900">{item.roomType}</p>
                    </div>
                    <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Duration</p>
                      <p className="font-black text-gray-900">{item.duration}</p>
                    </div>
                  </div>
                  {item.amenities && item.amenities.length > 0 && (
                    <div className="mt-6">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Amenities</p>
                      <div className="flex flex-wrap gap-3">
                        {item.amenities.map((amenity, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-xs font-medium">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-8 bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100 border-dashed">
                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Terms & Conditions</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {isBus ? (
                      <>
                        <div className="space-y-2">
                           <p className="text-xs font-black text-gray-800 italic">01. Ticket Transfer</p>
                           <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Tickets are non-transferable and bound to the booking identity.</p>
                        </div>
                        <div className="space-y-2">
                           <p className="text-xs font-black text-gray-800 italic">02. Boarding Requirements</p>
                           <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Valid ID and digital ticket required for boarding. Arrive 30 minutes before departure.</p>
                        </div>
                        <div className="space-y-2">
                           <p className="text-xs font-black text-gray-800 italic">03. Cancellation Policy</p>
                           <p className="text-[10px] text-gray-400 font-medium leading-relaxed">75% refund if cancelled 24 hours before departure. No refund after that.</p>
                        </div>
                        <div className="space-y-2">
                           <p className="text-xs font-black text-gray-800 italic">04. Luggage Allowance</p>
                           <p className="text-[10px] text-gray-400 font-medium leading-relaxed">15kg check-in + 5kg hand baggage included. Extra charges apply for excess.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                           <p className="text-xs font-black text-gray-800 italic">01. Identity Verification</p>
                           <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Valid ID required at check-in matching the booking details.</p>
                        </div>
                        <div className="space-y-2">
                           <p className="text-xs font-black text-gray-800 italic">02. Check-in/Check-out</p>
                           <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Strictly follow check-in and check-out timings. Late check-out charges apply.</p>
                        </div>
                        <div className="space-y-2">
                           <p className="text-xs font-black text-gray-800 italic">03. Cancellation Policy</p>
                           <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Free cancellation up to 48 hours before check-in. 50% charge within 48 hours.</p>
                        </div>
                        <div className="space-y-2">
                           <p className="text-xs font-black text-gray-800 italic">04. Property Rules</p>
                           <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Follow all property rules. Damages will be charged to the guest.</p>
                        </div>
                      </>
                    )}
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar Sticky Panel */}
        <div className="lg:col-span-4">
           <div className="bg-white rounded-[4rem] border border-gray-100 shadow-4xl p-12 sticky top-32 space-y-10">
              <div className="text-center space-y-1">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                   {isBus ? 'Ticket Price' : 'Booking Price'}
                 </p>
                 <p className="text-5xl font-black text-gray-900 tracking-tighter italic leading-none">
                   {item.isFree ? 'FREE' : `PKR ${(item.discountPrice || item.price).toLocaleString()}`}
                 </p>
                 {item.discountPrice && item.discountPrice < item.price && (
                   <p className="text-sm text-gray-400 line-through">
                     PKR {item.price.toLocaleString()}
                   </p>
                 )}
              </div>

              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex flex-col gap-4">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-gray-400">Available</span>
                    <span className={item.availableSeats < 5 ? 'text-red-600' : 'text-green-600'}>
                      {item.availableSeats} {isBus ? 'seats' : 'rooms'}
                    </span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-gray-400">Rating</span>
                    <span className="text-[#003d2b]">{item.rating}/5.0</span>
                 </div>
                 {isBus && (
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                     <span className="text-gray-400">Operator</span>
                     <span className="text-[#003d2b]">{item.organizer}</span>
                   </div>
                 )}
              </div>

              <button 
                onClick={handleBookInitiate}
                disabled={isBooking || item.availableSeats === 0}
                className={`w-full ${isBooking ? 'bg-gray-400' : 'bg-[#003d2b]'} text-white font-black py-6 rounded-3xl shadow-2xl hover:scale-105 transition active:scale-95 uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isBooking ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    PROCESSING...
                  </>
                ) : item.availableSeats === 0 ? (
                  'SOLD OUT'
                ) : (
                  `BOOK NOW - PKR ${(item.discountPrice || item.price).toLocaleString()}`
                )}
              </button>

              <div className="space-y-4 pt-4 border-t border-gray-50">
                <p className="text-center text-[9px] font-black text-gray-400 uppercase tracking-widest">Guaranteed by Go Booking</p>
                <div className="flex justify-center gap-4 opacity-20">
                   <i className="fas fa-shield-halved text-2xl"></i>
                   <i className="fas fa-lock text-2xl"></i>
                   <i className="fas fa-fingerprint text-2xl"></i>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;