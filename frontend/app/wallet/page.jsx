"use client";

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

const Wallet = () => {
  const { user } = useApp();
  const [selected, setSelected] = useState(null);
  const [wallet, setWallet] = useState([]);
  const router = useRouter();

  // Mock booked tickets data - This would come from your backend/API
  const mockBookedTickets = [
    {
      ticketId: "TIX-2024-MUSIC-001",
      title: "International Music Festival",
      date: "Mar 15, 2024 • 7:00 PM",
      location: "Jinnah Stadium, Islamabad",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TIX-2024-MUSIC-001-42101-1234567-1",
      type: "CONCERT",
      price: 89,
      discountPrice: 69,
      category: "CONCERT",
      organizer: "Live Events PK",
      duration: "4 hours",
      bookingDate: "2024-01-15",
      seats: ["A-12", "A-13"],
      totalAmount: 138,
      bookingStatus: "CONFIRMED"
    },
    {
      ticketId: "TIX-2024-TECH-002",
      title: "Tech Summit 2024",
      date: "Apr 22, 2024 • 9:00 AM",
      location: "Expo Center, Karachi",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TIX-2024-TECH-002-42101-1234567-1",
      type: "CONFERENCE",
      price: 149,
      discountPrice: 99,
      category: "CONFERENCE",
      organizer: "Tech Connect",
      duration: "2 days",
      bookingDate: "2024-01-20",
      seats: ["VIP-05"],
      totalAmount: 99,
      bookingStatus: "CONFIRMED"
    },
    {
      ticketId: "TIX-2024-FOOD-003",
      title: "Food & Wine Festival",
      date: "May 5, 2024 • 6:00 PM",
      location: "F-9 Park, Islamabad",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TIX-2024-FOOD-003-42101-1234567-1",
      type: "FOOD",
      price: 75,
      category: "FOOD",
      organizer: "Foodie Network",
      duration: "5 hours",
      bookingDate: "2024-02-01",
      seats: ["B-08", "B-09", "B-10"],
      totalAmount: 225,
      bookingStatus: "CONFIRMED"
    }
  ];

  // Load tickets from localStorage or API
  useEffect(() => {
    // In a real app, you would fetch from your API
    // For now, we'll use mock data
    const savedTickets = localStorage.getItem('bookedTickets');
    if (savedTickets) {
      setWallet(JSON.parse(savedTickets));
    } else {
      setWallet(mockBookedTickets);
      localStorage.setItem('bookedTickets', JSON.stringify(mockBookedTickets));
    }
    
    // Auto-select first ticket if available
    if (mockBookedTickets.length > 0 && !selected) {
      setSelected(mockBookedTickets[0]);
    }
  }, []);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-20 md:py-32 px-6 md:px-10 text-center bg-white rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-2xl mt-8 md:mt-12">
        <i className="fas fa-lock text-4xl md:text-5xl text-gray-200 mb-6 md:mb-8"></i>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight italic">Vault Encrypted</h2>
        <p className="text-sm md:text-base text-gray-500 font-medium mb-8 md:mb-10 leading-relaxed max-w-sm mx-auto">"Please verify your identity via our secure gateway to access your unified digital tickets."</p>
        <button 
          onClick={() => router.push('/login')}
          className="bg-[#003d2b] text-white font-black px-10 md:px-12 py-4 md:py-5 rounded-2xl shadow-xl hover:bg-black transition-all uppercase tracking-widest text-[10px] md:text-xs"
        >
          Verify Identity
        </button>
      </div>
    );
  }

  // Format booking date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 md:space-y-12 mt-6 md:mt-10 px-4 md:px-0">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#003d2b] to-gray-900 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] text-white shadow-3xl flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 p-10 md:p-20 opacity-5 rotate-12">
          <i className="fas fa-ticket-alt text-[10rem] md:text-[15rem]"></i>
        </div>
        <div className="relative z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-2 italic">My Digital Vault</h1>
          <p className="text-green-300 font-medium italic text-sm md:text-base">
            {wallet.length} secure ticket{wallet.length !== 1 ? 's' : ''} verified for {user.name}
          </p>
        </div>
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-5 md:p-6 rounded-[2rem] md:rounded-3xl w-full md:w-auto text-center md:text-left">
           <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-1">Authenticated CNIC</p>
           <p className="text-lg md:text-xl font-black tracking-tight font-mono">{user.cnic}</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
          <div className="text-3xl md:text-4xl font-black text-[#003d2b] mb-2">{wallet.length}</div>
          <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">Active Tickets</p>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
          <div className="text-3xl md:text-4xl font-black text-[#003d2b] mb-2">
            ${wallet.reduce((sum, ticket) => sum + (ticket.totalAmount || 0), 0)}
          </div>
          <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">Total Value</p>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
          <div className="text-3xl md:text-4xl font-black text-[#003d2b] mb-2">
            {wallet.reduce((sum, ticket) => sum + (ticket.seats?.length || 1), 0)}
          </div>
          <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">Total Seats</p>
        </div>
      </div>

      {wallet.length === 0 ? (
        <div className="py-20 md:py-32 text-center bg-white rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-sm border-dashed animate-pulse">
          <i className="fas fa-ticket-alt text-3xl md:text-4xl text-gray-200 mb-4"></i>
          <h3 className="text-lg md:text-xl font-black text-gray-400 uppercase tracking-widest">No Active Bookings</h3>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            You haven't booked any events yet. Explore our premium experiences and secure your seats!
          </p>
          <button 
            onClick={() => router.push('/')} 
            className="bg-[#003d2b] text-white font-black px-8 py-3 rounded-2xl shadow-xl hover:bg-black transition-all uppercase tracking-widest text-[10px] md:text-xs mt-6"
          >
            Explore Events →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Tickets List */}
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 italic">My Tickets</h2>
              <button 
                onClick={() => {
                  // Clear all tickets
                  setWallet([]);
                  localStorage.removeItem('bookedTickets');
                  setSelected(null);
                }}
                className="text-red-500 hover:text-red-700 text-[10px] font-black uppercase tracking-widest"
              >
                Clear All
              </button>
            </div>
            
            {wallet.map((ticket) => (
              <div 
                key={ticket.ticketId}
                onClick={() => setSelected(ticket)}
                className={`p-1 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-300 cursor-pointer group ${
                  selected?.ticketId === ticket.ticketId 
                    ? 'bg-gradient-to-r from-[#003d2b] to-green-900 shadow-2xl scale-[1.02]' 
                    : 'bg-white border border-gray-100 hover:shadow-xl hover:border-[#003d2b]/20'
                }`}
              >
                <div className="bg-white rounded-[1.8rem] md:rounded-[2.2rem] p-5 md:p-8 flex items-center gap-4 md:gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden shadow-xl border border-gray-50 flex-shrink-0">
                      <img src={ticket.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt={ticket.title} />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-[#003d2b] text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
                      {ticket.category}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-black text-lg md:text-xl text-gray-900 leading-tight line-clamp-1">{ticket.title}</h3>
                        <div className="flex flex-wrap gap-2 md:gap-4 mt-1 md:mt-2">
                          <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wider whitespace-nowrap">
                            <i className="fas fa-calendar mr-1 md:mr-2 text-green-600"></i> {ticket.date}
                          </p>
                          <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wider whitespace-nowrap">
                            <i className="fas fa-location-dot mr-1 md:mr-2 text-green-600"></i> {ticket.location}
                          </p>
                          <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wider whitespace-nowrap">
                            <i className="fas fa-users mr-1 md:mr-2 text-green-600"></i> {ticket.seats?.length || 1} seat{ticket.seats?.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600 text-xs md:text-sm font-black">
                          ${ticket.totalAmount || ticket.price}
                        </div>
                        <div className="text-[8px] text-gray-400 font-bold uppercase">PAID</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 md:mt-4">
                      <div className="inline-block bg-gray-50 px-2 md:px-3 py-1 rounded-lg text-[8px] md:text-[9px] font-mono text-gray-600 tracking-widest">
                        {ticket.ticketId}
                      </div>
                      <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${
                        ticket.bookingStatus === 'CONFIRMED' 
                          ? 'text-green-600 bg-green-50' 
                          : 'text-yellow-600 bg-yellow-50'
                      }`}>
                        {ticket.bookingStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ticket Details */}
          <div className="lg:col-span-5">
            {selected ? (
              <div className="bg-gradient-to-b from-white to-gray-50 rounded-[2.5rem] md:rounded-[4rem] border border-gray-100 shadow-4xl p-6 md:p-10 sticky top-24 md:top-32 animate-in zoom-in duration-300">
                {/* QR Code Section */}
                <div className="text-center mb-6 md:mb-10">
                  <div className="w-48 h-48 md:w-56 md:h-56 bg-white rounded-[2.5rem] md:rounded-[3rem] mx-auto mb-6 md:mb-8 flex items-center justify-center border-2 border-gray-200 p-4 shadow-2xl relative">
                    <img src={selected.qrCode} className="w-full h-full rounded-2xl" alt="QR Code" />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#003d2b] text-white text-[8px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                      ENTRY PASS
                    </div>
                  </div>
                  <p className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] mb-1">SCAN AT ENTRANCE</p>
                  <p className="text-[10px] md:text-xs text-green-600 font-black uppercase tracking-widest">
                    IDENTIFIED • {user.name.toUpperCase()}
                  </p>
                </div>

                {/* Ticket Details */}
                <div className="space-y-6 md:space-y-8 pt-6 md:pt-8 border-t border-dashed border-gray-200">
                  <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter leading-none mb-2 italic">
                      {selected.title}
                    </h2>
                    <p className="text-[10px] md:text-sm text-gray-400 font-medium italic">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      {selected.location}
                    </p>
                    <p className="text-[10px] md:text-sm text-gray-400 font-medium italic mt-1">
                      <i className="fas fa-clock mr-2"></i>
                      {selected.date}
                    </p>
                  </div>

                  {/* Booking Info */}
                  <div className="bg-gray-50 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest">Booking ID</p>
                        <p className="text-[10px] md:text-xs font-black text-gray-800 tracking-tight font-mono">{selected.ticketId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest">Category</p>
                        <p className="text-[10px] md:text-xs font-black text-gray-800 tracking-tight">{selected.type}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest">Booked On</p>
                        <p className="text-[10px] md:text-xs font-black text-gray-800 tracking-tight">
                          {formatDate(selected.bookingDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest">Amount Paid</p>
                        <p className="text-[10px] md:text-xs font-black text-gray-800 tracking-tight">
                          ${selected.totalAmount || selected.price}
                        </p>
                      </div>
                    </div>
                    
                    {/* Seats Info */}
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Assigned Seats</p>
                      <div className="flex flex-wrap gap-2">
                        {selected.seats?.map((seat, index) => (
                          <span key={index} className="bg-white border border-green-200 text-green-700 px-3 py-1.5 rounded-full text-[10px] font-black">
                            {seat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button className="w-full bg-[#003d2b] text-white font-black py-4 md:py-5 rounded-2xl shadow-xl uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-black transition-all active:scale-95 group">
                      <i className="fas fa-download mr-2 group-hover:animate-bounce"></i>
                      Download Digital Pass
                    </button>
                    
                    <button className="w-full bg-white text-gray-900 border-2 border-gray-200 font-black py-4 md:py-5 rounded-2xl uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-gray-50 transition-all">
                      Share Ticket
                    </button>
                    
                    <p className="text-center text-[8px] md:text-[9px] font-black text-gray-300 uppercase tracking-widest pt-2">
                      <i className="fas fa-shield-alt mr-1"></i>
                      Anti-fraud protection enabled
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[400px] md:min-h-[500px] bg-gradient-to-b from-gray-50 to-white rounded-[2.5rem] md:rounded-[4rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 md:p-12 text-center">
                <i className="fas fa-ticket-alt text-5xl md:text-6xl mb-6 text-gray-300"></i>
                <h3 className="font-black text-gray-400 uppercase tracking-[0.4em] text-[10px] md:text-xs mb-2">
                  SELECT A TICKET
                </h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  Choose a ticket from your collection to view details and QR code
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;