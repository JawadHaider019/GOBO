"use client";

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { user } = useApp();
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets', 'history', 'profile'
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedEventForReview, setSelectedEventForReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: ''
  });
  const router = useRouter();

  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: user?.name || 'John Doe',
    email: 'john.doe@example.com',
    phone: '+92 300 1234567',
    dob: '1990-01-01',
    gender: 'male',
    address: 'Islamabad, Pakistan',  
  });

  // Security modal states
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    { id: 'tickets', label: 'My Tickets', icon: 'fas fa-ticket-alt' },
    { id: 'history', label: 'Booking History', icon: 'fas fa-calendar-check' },
    { id: 'profile', label: 'Profile', icon: 'fas fa-user' },
  ];

  // Find current active tab
  const activeTabData = tabs.find(tab => tab.id === activeTab);

  // Security form states
  const [emailForm, setEmailForm] = useState({
    currentEmail: 'john.doe@example.com',
    newEmail: '',
    confirmEmail: '',
    password: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Mock booking history - filtered to only COMPLETED events
  const mockBookingHistory = [
    {
      id: 'TIX-2024-MUSIC-001',
      title: 'International Music Festival',
      date: 'Mar 15, 2024',
      location: 'Jinnah Stadium, Islamabad',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop',
      category: 'CONCERT',
      organizer: 'Live Events PK',
      bookingDate: '2024-01-15',
      totalAmount: 138,
      status: 'COMPLETED',
      ticketsBooked: 2,
      isReviewed: true,
      review: {
        rating: 5,
        title: 'Amazing experience!',
        comment: 'Great lineup, excellent organization. Will definitely attend again!',
        date: '2024-03-20'
      }
    },
    {
      id: 'TIX-2024-TECH-002',
      title: 'Tech Summit 2024',
      date: 'Apr 22, 2024',
      location: 'Expo Center, Karachi',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      category: 'CONFERENCE',
      organizer: 'Tech Connect',
      bookingDate: '2024-01-20',
      totalAmount: 99,
      status: 'COMPLETED',
      ticketsBooked: 1,
      isReviewed: false,
      review: null
    },
    {
      id: 'TIX-2024-FOOD-003',
      title: 'Food & Wine Festival',
      date: 'Feb 10, 2024',
      location: 'Convention Center, Lahore',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
      category: 'FESTIVAL',
      organizer: 'Culinary Arts PK',
      bookingDate: '2024-01-05',
      totalAmount: 225,
      status: 'COMPLETED',
      ticketsBooked: 3,
      isReviewed: false,
      review: null
    }
  ];

  // Mock booked tickets data (upcoming/active events)
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
    }
  ];

  // State for booking history (mutable)
  const [bookingHistory, setBookingHistory] = useState(mockBookingHistory);
  const [wallet] = useState(mockBookedTickets);

  
  // Load tickets from localStorage or API
  useEffect(() => {
    const savedTickets = localStorage.getItem('bookedTickets');
    if (savedTickets) {
      setSelected(JSON.parse(savedTickets)[0] || null);
    } else {
      localStorage.setItem('bookedTickets', JSON.stringify(mockBookedTickets));
      if (mockBookedTickets.length > 0 && !selected) {
        setSelected(mockBookedTickets[0]);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-20 md:py-32 px-6 md:px-10 text-center bg-white rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-2xl mt-8 md:mt-12">
        <i className="fas fa-lock text-4xl md:text-5xl text-gray-200 mb-6 md:mb-8"></i>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight italic">Access Restricted</h2>
        <p className="text-sm md:text-base text-gray-500 font-medium mb-8 md:mb-10 leading-relaxed max-w-sm mx-auto">Please sign in to access your personal dashboard and account management.</p>
        <button 
          onClick={() => router.push('/login')}
          className="bg-[#003d2b] text-white font-black px-10 md:px-12 py-4 md:py-5 rounded-2xl shadow-xl hover:bg-black transition-all uppercase tracking-widest text-[10px] md:text-xs"
        >
          Sign In to Dashboard
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
    setShowEditProfileModal(false);
  };

  // Security handler functions
  const handleChangeEmail = () => {
    if (emailForm.newEmail !== emailForm.confirmEmail) {
      alert('New email addresses do not match');
      return;
    }
    
    if (!emailForm.password) {
      alert('Please enter your password to confirm');
      return;
    }
    
    alert('Email change request sent. Please check your new email for verification.');
    setEmailForm({
      currentEmail: emailForm.newEmail,
      newEmail: '',
      confirmEmail: '',
      password: ''
    });
    setShowChangeEmailModal(false);
    
    // Update user profile email
    setUserProfile(prev => ({ ...prev, email: emailForm.newEmail }));
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    alert('Password changed successfully!');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowChangePasswordModal(false);
  };

  const sendVerificationEmail = () => {
    alert('Verification email sent to your new email address');
  };

  // Review handlers
  const openReviewModal = (event) => {
    setSelectedEventForReview(event);
    setReviewForm({
      rating: 0,
      comment: ''
    });
    setShowReviewModal(true);
  };

  const handleRatingClick = (rating) => {
    setReviewForm({ ...reviewForm, rating });
  };

  const handleSubmitReview = () => {
    if (reviewForm.rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (!reviewForm.comment.trim()) {
      alert('Please write a review comment');
      return;
    }

    // Create new review object
    const newReview = {
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    };

    // Update booking history with the new review
    setBookingHistory(prevHistory => 
      prevHistory.map(booking => 
        booking.id === selectedEventForReview.id 
          ? { ...booking, isReviewed: true, review: newReview }
          : booking
      )
    );

    // Close review modal and show success modal
    setShowReviewModal(false);
    setShowSuccessModal(true);
    setSelectedEventForReview(null);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <i
        key={index}
        className={`fas fa-star ${index < rating ? 'text-yellow-400' : 'text-gray-200'}`}
      ></i>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 md:space-y-12 mt-6 md:mt-10 px-4 md:px-0">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#003d2b] to-gray-900 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] text-white shadow-3xl flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 p-10 md:p-20 opacity-5 rotate-12">
          <i className="fas fa-user-circle text-[10rem] md:text-[15rem]"></i>
        </div>
        <div className="relative z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-2 italic">My Dashboard</h1>
          <p className="text-green-300 font-medium italic text-sm md:text-base">
            Welcome back, {user.name}! Manage your tickets and booking history
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="space-y-4">
        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between p-4 rounded-[2rem] bg-[#003d2b] text-white font-black text-xs uppercase tracking-widest"
            >
              <div className="flex items-center">
                <i className={`${activeTabData.icon} mr-3`}></i>
                {activeTabData.label}
              </div>
              <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'} text-sm transition-transform`}></i>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-50 w-full max-w-[calc(100%-2rem)] mt-2 bg-white rounded-[1.5rem] border border-gray-100 shadow-xl overflow-hidden">
                {tabs
                  .filter(tab => tab.id !== activeTab)
                  .map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center p-4 text-left font-black text-[10px] uppercase tracking-widest text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-all border-b border-gray-100 last:border-b-0"
                    >
                      <i className={`${tab.icon} mr-3 text-sm`}></i>
                      {tab.label}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:block bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-2">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-widest transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#003d2b] text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

{activeTab === 'tickets' ? (
  wallet.length === 0 ? (
    <div className="py-20 md:py-32 text-center bg-white rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-sm border-dashed animate-pulse">
      <i className="fas fa-ticket-alt text-3xl md:text-4xl text-gray-200 mb-4"></i>
      <h3 className="text-lg md:text-xl font-black text-gray-400 uppercase tracking-widest">No Active Bookings</h3>
      <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
        You haven't booked any upcoming events yet. Explore our premium experiences and secure your seats!
      </p>
      <button 
        onClick={() => router.push('/')} 
        className="bg-[#003d2b] text-white font-black px-8 py-3 rounded-2xl shadow-xl hover:bg-black transition-all uppercase tracking-widest text-[10px] md:text-xs mt-6"
      >
        Explore Events →
      </button>
    </div>
  ) : (
    <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        {/* Tickets List */}
        <div className="lg:col-span-7 space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 italic">My Tickets</h2>
            <span className="text-xs font-black text-gray-500 uppercase tracking-widest bg-gray-100 px-4 py-2 rounded-full self-start md:self-auto">
              {wallet.length} Active
            </span>
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
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 text-xs md:text-sm font-black">
                        Rs {ticket.totalAmount || ticket.price}
                      </div>
                      <div className="text-[8px] text-gray-400 font-bold uppercase">PAID</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 md:mt-4">
                    <div className="inline-block bg-gray-50 px-2 md:px-3 py-1 rounded-lg text-[8px] md:text-[9px] font-mono text-gray-600 tracking-widest">
                      {ticket.ticketId}
                    </div>
                    <span className="text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest text-green-600 bg-green-50">
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
            <div className="bg-gradient-to-b from-white to-gray-50 rounded-[2.5rem] md:rounded-[4rem] border border-gray-100 shadow-4xl p-6 md:p-10 sticky top-24 md:top-32">
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
                        Rs {selected.totalAmount || selected.price}
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
    </div>
  )
) : activeTab === 'history' ? (
  <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
      <h2 className="text-2xl md:text-3xl font-black text-gray-900 italic">Booking History</h2>
      <span className="text-xs font-black text-gray-500 uppercase tracking-widest bg-gray-100 px-4 py-2 rounded-full self-start md:self-auto">
        {bookingHistory.length} Completed Events
      </span>
    </div>

    {bookingHistory.length === 0 ? (
      <div className="py-16 text-center">
        <i className="fas fa-calendar-check text-4xl text-gray-200 mb-4"></i>
        <p className="text-gray-500 text-sm">No completed events yet</p>
      </div>
    ) : (
      <div className="space-y-6 md:space-y-8">
        {bookingHistory.map((booking) => (
          <div key={booking.id} className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Main Booking Card */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Event Image */}
                <div className="w-full md:w-48 h-48 md:h-32 rounded-2xl md:rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                  <img 
                    src={booking.image} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                    alt={booking.title} 
                  />
                </div>
                
                {/* Event Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Left Column - Event Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between md:justify-start md:gap-4 mb-3">
                        <h3 className="text-xl md:text-2xl font-black text-gray-900 leading-tight line-clamp-2">
                          {booking.title}
                        </h3>
                        <span className="md:hidden text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap ml-2 flex-shrink-0 bg-green-50 text-green-700">
                          {booking.status}
                        </span>
                      </div>
                      
                      {/* Category - Desktop */}
                      <div className="hidden md:flex flex-wrap gap-2 mb-4">
                        <span className="text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest bg-gray-100 text-gray-700">
                          {booking.category}
                        </span>
                        <span className="text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest bg-green-50 text-green-700">
                          {booking.status}
                        </span>
                      </div>
                      
                      {/* Event Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        <div className="flex items-center text-xs md:text-sm text-gray-600">
                          <i className="fas fa-calendar w-5 text-gray-400"></i>
                          <span className="truncate">{booking.date}</span>
                        </div>
                        <div className="flex items-center text-xs md:text-sm text-gray-600">
                          <i className="fas fa-ticket-alt w-5 text-gray-400"></i>
                          <span>{`${booking.ticketsBooked} ${booking.ticketsBooked > 1 ? 'tickets' : 'ticket'}`}</span>
                        </div>
                        <div className="flex items-center text-xs md:text-sm text-gray-600">
                          <i className="fas fa-rupee-sign w-5 text-gray-400"></i>
                          <span className="font-bold">Rs {booking.totalAmount}</span>
                        </div>
                        <div className="flex items-center text-xs md:text-sm text-gray-600">
                          <i className="fas fa-map-marker-alt w-5 text-gray-400"></i>
                          <span className="truncate">{booking.location.split(',')[0]}</span>
                        </div>
                      </div>
                      
                      {/* Booking ID - Mobile */}
                      <p className="text-[8px] md:text-[10px] text-gray-400 font-mono mt-3 md:hidden">
                        ID: {booking.id}
                      </p>
                    </div>
                    
                    {/* Right Column - Review Section */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-6 lg:min-w-[200px]">
                      {/* Booking ID - Desktop */}
                      <p className="hidden md:block text-[10px] text-gray-400 font-mono">
                        {booking.id}
                      </p>
                      
                      {/* Review Section */}
                      <div className="flex flex-col items-end">
                        {booking.isReviewed ? (
                          <div className="text-right w-full">
                            <span className="inline-flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap">
                              <i className="fas fa-check-circle"></i>
                              Reviewed
                            </span>
                            <div className="flex items-center gap-1 mt-2 justify-end">
                              {renderStars(booking.review.rating)}
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => openReviewModal(booking)}
                            className="bg-[#003d2b] text-white font-black px-6 py-3 rounded-xl hover:bg-black transition-all uppercase tracking-widest text-[10px] flex items-center gap-2 whitespace-nowrap"
                          >
                            <i className="fas fa-star"></i>
                            Write Review
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              {booking.isReviewed && booking.review && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex items-center gap-3 md:w-48 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <i className="fas fa-user text-sm text-gray-500"></i>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {booking.review.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(booking.review.rating)}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {booking.review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
) : activeTab === 'profile' ? (
  <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
    {/* Personal Information */}
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 italic">Personal Information</h2>
        <button
          onClick={() => setShowEditProfileModal(true)}
          className="text-[#003d2b] hover:text-black text-[10px] font-black uppercase tracking-widest bg-gray-100 px-4 py-2 rounded-full self-start md:self-auto"
        >
          Edit Profile
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</p>
            <p className="text-lg font-bold text-gray-900">{userProfile.name}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</p>
            <p className="text-lg font-bold text-gray-900">{userProfile.email}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Phone Number</p>
            <p className="text-lg font-bold text-gray-900">{userProfile.phone}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Date of Birth</p>
            <p className="text-lg font-bold text-gray-900">{userProfile.dob}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Gender</p>
            <p className="text-lg font-bold text-gray-900">{userProfile.gender}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Address</p>
            <p className="text-lg font-bold text-gray-900">{userProfile.address}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Member Since</p>
            <p className="font-bold text-gray-900">January 2024</p>
          </div>
        </div>
      </div>
    </div>

    {/* Security */}
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 italic">Security</h2>
      </div>
      
      <div className="space-y-4">
        <button 
          onClick={() => setShowChangeEmailModal(true)}
          className="w-full p-4 rounded-2xl border-2 border-gray-200 hover:border-[#003d2b] transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <i className="fas fa-envelope text-xl text-blue-600"></i>
              </div>
              <div>
                <p className="font-bold text-gray-900">Change Email Address</p>
                <p className="text-sm text-gray-600">Update your account email</p>
                <p className="text-xs text-gray-500 mt-1">Current: {userProfile.email}</p>
              </div>
            </div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </div>
        </button>

        <button 
          onClick={() => setShowChangePasswordModal(true)}
          className="w-full p-4 rounded-2xl border-2 border-gray-200 hover:border-[#003d2b] transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <i className="fas fa-key text-xl text-green-600"></i>
              </div>
              <div>
                <p className="font-bold text-gray-900">Change Password</p>
                <p className="text-sm text-gray-600">Update your account password</p>
              </div>
            </div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </div>
        </button>
      </div>
    </div>
  </div>
) : null}

      {/* Review Modal */}
      {showReviewModal && selectedEventForReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6 sticky top-0 bg-white pt-2">
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 italic">Write a Review</h3>
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    setSelectedEventForReview(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              {/* Event Info */}
              <div className="flex items-center gap-4 mb-2 pb-4 border-b border-gray-100 ">
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                  <img src={selectedEventForReview.image} className="w-full h-full object-cover" alt={selectedEventForReview.title} />
                </div>
                <div className="min-w-0">
                  <p className="font-black text-lg md:text-xl text-gray-900 line-clamp-1">{selectedEventForReview.title}</p>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">{selectedEventForReview.date}</p>
                  <p className="text-xs text-gray-500 mt-1">{selectedEventForReview.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-3 block">
                    Your Rating *
                  </label>
                  <div className="flex gap-2 md:gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        className="text-2xl md:text-4xl focus:outline-none transition-all hover:scale-110"
                      >
                        <i className={`fas fa-star ${
                          star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-200'
                        }`}></i>
                      </button>
                    ))}
                  </div>
                </div>

  

                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">
                    Your Review *
                  </label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                    placeholder="Tell us about your experience at this event..."
                    rows="5"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none resize-none text-sm md:text-base"
                  />
                </div>

            
              </div>

              <div className="flex flex-col md:flex-row gap-3 mt-2">
                <button
                  onClick={handleSubmitReview}
                  className="flex-1 bg-[#003d2b] text-white font-black py-4 rounded-2xl hover:bg-black transition-all uppercase tracking-widest text-xs md:text-sm"
                >
                  Submit Review
                </button>
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    setSelectedEventForReview(null);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 font-black py-4 rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs md:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] w-full max-w-md">
            <div className="p-8 md:p-10 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check-circle text-4xl text-green-600"></i>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 italic">
                Thank You!
              </h3>
              
              <p className="text-gray-600 text-sm md:text-base mb-6">
                Your review has been submitted successfully. It will help other event-goers make better choices.
              </p>
              
              <div className="flex items-center justify-center gap-1 mb-8">
                {renderStars(reviewForm.rating)}
              </div>
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-[#003d2b] text-white font-black py-4 rounded-2xl hover:bg-black transition-all uppercase tracking-widest text-xs md:text-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] w-full max-w-lg">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-900">Edit Profile</h3>
                <button
                  onClick={() => setShowEditProfileModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Full Name</label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Email Address</label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Phone Number</label>
                  <input
                    type="text"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Date of Birth</label>
                  <input
                    type="date"
                    value={userProfile.dob}
                    onChange={(e) => setUserProfile({...userProfile, dob: e.target.value})}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-[#003d2b] text-white font-black py-4 rounded-2xl hover:bg-black transition-all uppercase tracking-widest"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 font-black py-4 rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Modals - Change Email */}
      {showChangeEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] w-full max-w-lg">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-900">Change Email Address</h3>
                <button
                  onClick={() => {
                    setShowChangeEmailModal(false);
                    setEmailForm({
                      currentEmail: userProfile.email,
                      newEmail: '',
                      confirmEmail: '',
                      password: ''
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Current Email</label>
                  <input
                    type="email"
                    value={emailForm.currentEmail}
                    readOnly
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">New Email Address</label>
                  <input
                    type="email"
                    value={emailForm.newEmail}
                    onChange={(e) => setEmailForm({...emailForm, newEmail: e.target.value})}
                    placeholder="Enter new email address"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Confirm New Email</label>
                  <input
                    type="email"
                    value={emailForm.confirmEmail}
                    onChange={(e) => setEmailForm({...emailForm, confirmEmail: e.target.value})}
                    placeholder="Confirm new email address"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Current Password</label>
                  <input
                    type="password"
                    value={emailForm.password}
                    onChange={(e) => setEmailForm({...emailForm, password: e.target.value})}
                    placeholder="Enter your password to confirm"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 mt-6">
                <p className="text-sm text-yellow-700">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  You will receive a verification email at your new address. You must verify it before the change takes effect.
                </p>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleChangeEmail}
                  className="flex-1 bg-[#003d2b] text-white font-black py-4 rounded-2xl hover:bg-black transition-all uppercase tracking-widest"
                >
                  Change Email
                </button>
                <button
                  onClick={() => {
                    setShowChangeEmailModal(false);
                    setEmailForm({
                      currentEmail: userProfile.email,
                      newEmail: '',
                      confirmEmail: '',
                      password: ''
                    });
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 font-black py-4 rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>

              <button
                onClick={sendVerificationEmail}
                className="w-full text-center text-sm text-blue-600 font-medium mt-6"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Resend verification email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] w-full max-w-lg">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-900">Change Password</h3>
                <button
                  onClick={() => {
                    setShowChangePasswordModal(false);
                    setPasswordForm({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    placeholder="Enter current password"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    placeholder="Enter new password"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters long</p>
                </div>
                
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    placeholder="Confirm new password"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mt-6">
                <div className="flex items-start gap-3">
                  <i className="fas fa-lightbulb text-green-600 mt-1"></i>
                  <div>
                    <p className="font-medium text-green-800">Password Tips:</p>
                    <ul className="text-sm text-green-700 mt-1 space-y-1">
                      <li>• Use at least 8 characters</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Add numbers and special characters</li>
                      <li>• Avoid using personal information</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleChangePassword}
                  className="flex-1 bg-[#003d2b] text-white font-black py-4 rounded-2xl hover:bg-black transition-all uppercase tracking-widest"
                >
                  Update Password
                </button>
                <button
                  onClick={() => {
                    setShowChangePasswordModal(false);
                    setPasswordForm({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 font-black py-4 rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;