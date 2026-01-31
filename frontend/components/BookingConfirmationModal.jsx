// components/BookingConfirmationModal.jsx
"use client";

import { useRouter } from 'next/navigation';

const BookingConfirmationModal = ({ 
  isOpen, 
  onClose, 
  bookedTicket,
  onViewWallet,
  onContinueExploring 
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleViewWallet = () => {
    onClose?.();
    if (onViewWallet) {
      onViewWallet();
    } else {
      router.push('/wallet');
    }
  };

  const handleContinueExploring = () => {
    onClose?.();
    if (onContinueExploring) {
      onContinueExploring();
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (amount === 0 || amount === '0') return 'FREE';
    return `$${amount}`;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-[2.5rem] md:rounded-[4rem] border border-white/10 shadow-4xl max-w-md w-full p-8 md:p-10 text-white animate-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition"
        >
          <i className="fas fa-times text-sm"></i>
        </button>

        <div className="text-center mb-8">
          {/* Success Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <i className="fas fa-check text-4xl"></i>
            </div>
            {/* Animated ring */}
            <div className="absolute inset-0 border-4 border-green-500/30 rounded-full animate-ping"></div>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-black mb-2 tracking-tighter">Booking Confirmed!</h3>
          <p className="text-gray-400 text-sm md:text-base">
            Your ticket has been secured and saved to your digital wallet.
          </p>
        </div>

        {/* Ticket Preview */}
        {bookedTicket && (
          <div className="bg-gradient-to-r from-white/5 to-white/2 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20">
                  <img 
                    src={bookedTicket.image} 
                    alt={bookedTicket.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
                  BOOKED
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-lg line-clamp-1">{bookedTicket.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-gray-400 text-xs">
                    <i className="fas fa-calendar text-green-400 mr-1"></i>
                    {bookedTicket.date}
                  </p>
                  <p className="text-gray-400 text-xs">
                    <i className="fas fa-location-dot text-green-400 mr-1"></i>
                    {bookedTicket.location}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Booking ID</p>
                <p className="font-black text-sm font-mono tracking-tight">{bookedTicket.ticketId.slice(0, 10)}...</p>
              </div>
              <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Amount</p>
                <p className="font-black text-sm">{formatCurrency(bookedTicket.totalAmount)}</p>
              </div>
            </div>
            
            {/* Seats Info */}
            {bookedTicket.seats && bookedTicket.seats.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Your Seats</p>
                <div className="flex flex-wrap gap-2">
                  {bookedTicket.seats.map((seat, index) => (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-300 px-3 py-1.5 rounded-full text-xs font-black border border-green-500/30"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* QR Code Preview */}
        {bookedTicket?.qrCode && (
          <div className="mb-8 text-center">
            <div className="inline-block bg-white p-2 rounded-2xl mb-3">
              <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center">
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <i className="fas fa-qrcode text-3xl text-gray-400"></i>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              QR CODE GENERATED
            </p>
            <p className="text-xs text-gray-500 mt-1">Scan at venue entrance</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleViewWallet}
            className="w-full group bg-gradient-to-r from-[#00ff88] to-emerald-500 text-gray-900 font-black py-4 rounded-2xl uppercase tracking-widest text-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-2">
              <i className="fas fa-wallet group-hover:animate-bounce"></i>
              View in Wallet
            </span>
          </button>
          
          <button
            onClick={handleContinueExploring}
            className="w-full bg-white/10 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-sm border border-white/20 hover:bg-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Continue Exploring
          </button>
          
         
        </div>

        {/* Confetti Animation (CSS based) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `confetti-fall ${1 + Math.random() * 2}s linear ${Math.random() * 1}s infinite`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>

        {/* Add confetti animation styles */}
        <style jsx>{`
          @keyframes confetti-fall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;