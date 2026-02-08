"use client";

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { user } = useApp();
  const [selected, setSelected] = useState(null);
  const [wallet, setWallet] = useState([]);
  const [activeTab, setActiveTab] = useState('tickets'); // 'overview', 'tickets', 'payments', 'transactions', 'profile'
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [walletBalance, setWalletBalance] = useState(1500);
  const router = useRouter();

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    type: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    phoneNumber: '',
    isDefault: false
  });
const tabs = [
  { id: 'tickets', label: 'My Tickets', icon: 'fas fa-ticket-alt' },
  { id: 'payments', label: 'Payments', icon: 'fas fa-credit-card' },
  { id: 'transactions', label: 'Transactions', icon: 'fas fa-history' },
  { id: 'profile', label: 'Profile', icon: 'fas fa-user' },
];
  // Deposit form state
  const [depositForm, setDepositForm] = useState({
    amount: '',
    paymentMethod: '',
    otp: ''
  });

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

  // Mock payment methods
  const mockPaymentMethods = [
    {
      id: 1,
      type: 'credit_card',
      lastFour: '4242',
      brand: 'visa',
      name: 'Visa Credit Card',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'credit_card',
      lastFour: '8888',
      brand: 'mastercard',
      name: 'Mastercard',
      expiryDate: '08/24',
      isDefault: false
    },
    {
      id: 3,
      type: 'wallet',
      brand: 'jazzcash',
      name: 'JazzCash Wallet',
      phoneNumber: '0300****123',
      isDefault: false
    },
    {
      id: 4,
      type: 'bank',
      brand: 'habib',
      name: 'Habib Bank Limited',
      accountNumber: '****5678',
      isDefault: false
    }
  ];

  // Mock transaction history
  const mockTransactions = [
    {
      id: 'TXN-2024-001',
      type: 'PURCHASE',
      description: 'International Music Festival - 2 Tickets',
      amount: -138,
      date: '2024-01-15T14:30:00',
      status: 'COMPLETED',
      ticketId: 'TIX-2024-MUSIC-001',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: 'TXN-2024-002',
      type: 'PURCHASE',
      description: 'Tech Summit 2024 - VIP Ticket',
      amount: -99,
      date: '2024-01-20T10:15:00',
      status: 'COMPLETED',
      ticketId: 'TIX-2024-TECH-002',
      paymentMethod: 'Mastercard •••• 8888'
    },
    {
      id: 'TXN-2024-003',
      type: 'DEPOSIT',
      description: 'Wallet Top-up',
      amount: 1000,
      date: '2024-01-10T09:45:00',
      status: 'COMPLETED',
      paymentMethod: 'JazzCash'
    },
    {
      id: 'TXN-2024-004',
      type: 'PURCHASE',
      description: 'Food & Wine Festival - 3 Tickets',
      amount: -225,
      date: '2024-02-01T16:20:00',
      status: 'COMPLETED',
      ticketId: 'TIX-2024-FOOD-003',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: 'TXN-2024-005',
      type: 'REFUND',
      description: 'Cancellation - Sports Event',
      amount: 75,
      date: '2024-01-25T11:10:00',
      status: 'COMPLETED',
      paymentMethod: 'Original Payment'
    },
    {
      id: 'TXN-2024-006',
      type: 'DEPOSIT',
      description: 'Wallet Top-up',
      amount: 500,
      date: '2024-01-05T11:10:00',
      status: 'COMPLETED',
      paymentMethod: 'Bank Transfer'
    }
  ];

  // Mock booked tickets data
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

  // Calculate total deposits
  const totalDeposits = mockTransactions
    .filter(t => t.type === 'DEPOSIT')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate total spent
  const totalSpent = Math.abs(mockTransactions
    .filter(t => t.type === 'PURCHASE')
    .reduce((sum, t) => sum + t.amount, 0));

  // Load tickets from localStorage or API
  useEffect(() => {
    const savedTickets = localStorage.getItem('bookedTickets');
    if (savedTickets) {
      setWallet(JSON.parse(savedTickets));
    } else {
      setWallet(mockBookedTickets);
      localStorage.setItem('bookedTickets', JSON.stringify(mockBookedTickets));
    }
    
    if (mockBookedTickets.length > 0 && !selected) {
      setSelected(mockBookedTickets[0]);
    }
  }, []);

  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [transactions, setTransactions] = useState(mockTransactions);

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

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type) => {
    switch(type) {
      case 'PURCHASE': return 'fas fa-ticket-alt';
      case 'DEPOSIT': return 'fas fa-plus-circle';
      case 'REFUND': return 'fas fa-undo';
      default: return 'fas fa-exchange-alt';
    }
  };

  const getPaymentIcon = (brand) => {
    switch(brand) {
      case 'visa': return 'fab fa-cc-visa';
      case 'mastercard': return 'fab fa-cc-mastercard';
      case 'jazzcash': return 'fas fa-wallet';
      case 'habib': return 'fas fa-university';
      default: return 'fas fa-credit-card';
    }
  };

  const resetPaymentForm = () => {
    setPaymentForm({
      type: 'credit_card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolder: '',
      bankName: '',
      accountNumber: '',
      accountHolder: '',
      phoneNumber: '',
      isDefault: false
    });
  };

  const handleAddPayment = () => {
    if (!paymentForm.cardNumber && paymentForm.type === 'credit_card') {
      alert('Please enter card details');
      return;
    }

    const newId = Math.max(...paymentMethods.map(p => p.id)) + 1;
    let newPayment;
    
    if (paymentForm.type === 'credit_card') {
      const brand = paymentForm.cardNumber.startsWith('4') ? 'visa' : 'mastercard';
      newPayment = {
        id: newId,
        type: 'credit_card',
        lastFour: paymentForm.cardNumber.slice(-4),
        brand: brand,
        name: brand === 'visa' ? 'Visa Credit Card' : 'Mastercard',
        expiryDate: paymentForm.expiryDate,
        isDefault: paymentForm.isDefault
      };
    } else if (paymentForm.type === 'bank') {
      newPayment = {
        id: newId,
        type: 'bank',
        brand: 'habib',
        name: paymentForm.bankName || 'Bank Account',
        accountNumber: paymentForm.accountNumber ? '****' + paymentForm.accountNumber.slice(-4) : '****5678',
        isDefault: paymentForm.isDefault
      };
    } else {
      newPayment = {
        id: newId,
        type: 'wallet',
        brand: 'jazzcash',
        name: 'JazzCash Wallet',
        phoneNumber: paymentForm.phoneNumber ? paymentForm.phoneNumber.slice(0, 4) + '****' + paymentForm.phoneNumber.slice(-3) : '0300****123',
        isDefault: paymentForm.isDefault
      };
    }

    // If setting as default, unset all other defaults
    if (paymentForm.isDefault) {
      setPaymentMethods(methods => 
        [newPayment, ...methods.map(m => ({ ...m, isDefault: false }))]
      );
    } else {
      setPaymentMethods(methods => [newPayment, ...methods]);
    }

    resetPaymentForm();
    setShowPaymentModal(false);
    alert('Payment method added successfully!');
  };

  const setDefaultPayment = (id) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const removePaymentMethod = (id) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositForm.amount);
    if (!depositForm.paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    if (amount && amount >= 100) {
      const newTransaction = {
        id: `TXN-${Date.now()}`,
        type: 'DEPOSIT',
        description: `Wallet Top-up via ${depositForm.paymentMethod}`,
        amount: amount,
        date: new Date().toISOString(),
        status: 'COMPLETED',
        paymentMethod: depositForm.paymentMethod
      };

      setTransactions(prev => [newTransaction, ...prev]);
      setWalletBalance(prev => prev + amount);
      setDepositForm({ amount: '', paymentMethod: '', otp: '' });
      setShowDepositModal(false);
      alert(`Successfully deposited Rs ${amount} to your wallet!`);
    } else if (amount < 100) {
      alert('Minimum deposit amount is Rs 100');
    } else {
      alert('Please enter a valid amount');
    }
  };

  const sendOTP = () => {
    alert('OTP sent to your registered mobile number');
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
            Welcome back, {user.name}! Manage your tickets, payments, and profile
          </p>
        </div>
      
      </div>

      {/* Tabs Navigation */}

    <div className="space-y-4">
      {/* Mobile Dropdown (hidden on md and above) */}
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

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute z-50 w-full max-w-[calc(100%-2rem)] mt-2 bg-white rounded-[1.5rem] border border-gray-100 shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
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

      {/* Desktop Tabs Navigation (hidden on mobile) */}
      <div className="hidden md:block bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-2">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
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

      {/* Wallet Balance Card - Show on overview and payments tabs */}
      {( activeTab === 'payments') && (
        <div className="bg-gradient-to-r from-[#003d2b] to-green-900 p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-80">Wallet Balance</p>
              <h2 className="text-3xl md:text-4xl font-black mt-2">Rs {walletBalance.toLocaleString()}</h2>
              <p className="text-sm opacity-90 mt-1">Available for ticket purchases</p>
            </div>
            <button
              onClick={() => setShowDepositModal(true)}
              className="bg-white text-[#003d2b] font-black px-6 md:px-8 py-3 md:py-4 rounded-2xl hover:bg-gray-100 transition-all uppercase tracking-widest text-[10px] md:text-xs flex items-center"
            >
              <i className="fas fa-plus mr-2"></i>
              Deposit Funds
            </button>
          </div>
        </div>
      )}

      { activeTab === 'tickets' ? (
        wallet.length === 0 ? (
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
        )
      ) : activeTab === 'payments' ? (
        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 italic">Payment Methods</h2>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="bg-[#003d2b] text-white font-black px-6 md:px-8 py-3 md:py-4 rounded-2xl hover:bg-black transition-all uppercase tracking-widest text-[10px] md:text-xs flex items-center"
              >
                <i className="fas fa-plus mr-2"></i>
                Add New
              </button>
            </div>

            <div className="space-y-4 md:space-y-6">
              {paymentMethods.map((method) => (
                <div key={method.id} className="p-1 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-300 hover:shadow-xl hover:border-[#003d2b]/20 bg-white border border-gray-100">
                  <div className="bg-white rounded-[1.8rem] md:rounded-[2.2rem] p-5 md:p-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg ${
                        method.brand === 'visa' ? 'bg-blue-500' :
                        method.brand === 'mastercard' ? 'bg-red-500' :
                        method.brand === 'jazzcash' ? 'bg-purple-500' : 'bg-gray-500'
                      }`}>
                        <i className={`${getPaymentIcon(method.brand)} text-2xl md:text-3xl text-white`}></i>
                      </div>
                      
                      <div>
                        <h3 className="font-black text-lg md:text-xl text-gray-900 leading-tight flex items-center gap-2">
                          {method.name}
                          {method.isDefault && (
                            <span className="bg-green-100 text-green-700 text-[8px] font-black px-2 py-1 rounded-full uppercase">
                              DEFAULT
                            </span>
                          )}
                        </h3>
                        <div className="flex flex-wrap gap-2 md:gap-4 mt-1 md:mt-2">
                          {method.lastFour && (
                            <p className="text-[10px] md:text-xs text-gray-600 font-bold tracking-widest">
                              •••• {method.lastFour}
                            </p>
                          )}
                          {method.expiryDate && (
                            <p className="text-[10px] md:text-xs text-gray-600 font-bold tracking-widest">
                              Expires {method.expiryDate}
                            </p>
                          )}
                          {method.phoneNumber && (
                            <p className="text-[10px] md:text-xs text-gray-600 font-bold tracking-widest">
                              {method.phoneNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 md:gap-4">
                      {!method.isDefault && (
                        <button
                          onClick={() => setDefaultPayment(method.id)}
                          className="text-[#003d2b] hover:text-black text-[10px] font-black uppercase tracking-widest"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => removePaymentMethod(method.id)}
                        className="text-red-500 hover:text-red-700 text-[10px] font-black uppercase tracking-widest"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-12 p-6 md:p-8 bg-gradient-to-r from-gray-50 to-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100">
              <h3 className="font-black text-gray-900 text-lg md:text-xl mb-4">Security Note</h3>
              <p className="text-gray-600 text-sm md:text-base">
                <i className="fas fa-shield-alt text-green-500 mr-2"></i>
                Your payment details are securely encrypted and processed by certified payment gateways. 
                We never store your full card details on our servers.
              </p>
            </div>
          </div>
        </div>
      ) : activeTab === 'transactions' ? (
        // Transaction History Tab
        <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 italic">Transaction History</h2>
            <div className="text-right">
              <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">Current Balance</p>
              <p className="text-2xl md:text-3xl font-black text-[#003d2b]">
                Rs {walletBalance.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-1 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-300 hover:shadow-xl hover:border-[#003d2b]/20 bg-white border border-gray-100">
                <div className="bg-white rounded-[1.8rem] md:rounded-[2.2rem] p-5 md:p-8 flex items-center justify-between">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg ${
                      transaction.type === 'DEPOSIT' ? 'bg-green-100' :
                      transaction.type === 'REFUND' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <i className={`${getTransactionIcon(transaction.type)} text-2xl md:text-3xl ${
                        transaction.type === 'DEPOSIT' ? 'text-green-600' :
                        transaction.type === 'REFUND' ? 'text-blue-600' : 'text-gray-600'
                      }`}></i>
                    </div>
                    
                    <div>
                      <h3 className="font-black text-lg md:text-xl text-gray-900 leading-tight">
                        {transaction.description}
                      </h3>
                      <div className="flex flex-wrap gap-2 md:gap-4 mt-1 md:mt-2">
                        <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${
                          transaction.type === 'DEPOSIT' ? 'bg-green-50 text-green-600' :
                          transaction.type === 'REFUND' ? 'bg-blue-50 text-blue-600' :
                          'bg-gray-50 text-gray-600'
                        }`}>
                          {transaction.type}
                        </span>
                        <p className="text-[10px] md:text-xs text-gray-600 font-bold tracking-wider">
                          <i className="far fa-clock mr-1"></i>
                          {formatDateTime(transaction.date)}
                        </p>
                        {transaction.ticketId && (
                          <p className="text-[10px] md:text-xs text-gray-600 font-bold tracking-wider">
                            <i className="fas fa-ticket-alt mr-1"></i>
                            {transaction.ticketId}
                          </p>
                        )}
                      </div>
                      <p className="text-[10px] md:text-xs text-gray-500 mt-2">
                        <i className="fas fa-credit-card mr-1"></i>
                        {transaction.paymentMethod}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg md:text-xl font-black ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}Rs {Math.abs(transaction.amount)}
                    </div>
                    <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${
                      transaction.status === 'COMPLETED' ? 'bg-green-50 text-green-600' :
                      'bg-yellow-50 text-yellow-600'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-gradient-to-r from-gray-50 to-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100">
              <h3 className="font-black text-gray-900 text-lg md:text-xl mb-4">Transaction Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Purchases:</span>
                  <span className="font-black text-gray-900">
                    Rs {totalSpent.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Deposits:</span>
                  <span className="font-black text-green-600">
                    Rs {totalDeposits.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Refunds:</span>
                  <span className="font-black text-blue-600">
                    Rs {transactions.filter(t => t.type === 'REFUND').reduce((sum, t) => sum + t.amount, 0)}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between">
                  <span className="text-gray-900 font-bold">Net Balance:</span>
                  <span className="font-black text-[#003d2b]">
                    Rs {walletBalance.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
           
          </div>
        </div>
      ) : activeTab === 'profile' ? (
        // User Profile Tab
        <div className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 italic">Personal Information</h2>
           
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
                  <div>
               <button
                onClick={() => setShowEditProfileModal(true)}
                className="text-[#003d2b] hover:text-black text-[10px] font-black uppercase tracking-widest"
              >
                Edit Profile
              </button>
          </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-sm p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 italic mb-6">Security</h2>
            
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

      {/* Payment Method Modal - No scrollbar */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] w-full max-w-lg">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-900">Add Payment Method</h3>
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    resetPaymentForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              {/* Payment Type Selector */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() => setPaymentForm({...paymentForm, type: 'credit_card'})}
                  className={`p-4 rounded-2xl border-2 ${paymentForm.type === 'credit_card' ? 'border-[#003d2b] bg-green-50' : 'border-gray-200'}`}
                >
                  <i className="fas fa-credit-card text-2xl mb-2"></i>
                  <p className="text-xs font-black">Credit Card</p>
                </button>
                <button
                  onClick={() => setPaymentForm({...paymentForm, type: 'bank'})}
                  className={`p-4 rounded-2xl border-2 ${paymentForm.type === 'bank' ? 'border-[#003d2b] bg-green-50' : 'border-gray-200'}`}
                >
                  <i className="fas fa-university text-2xl mb-2"></i>
                  <p className="text-xs font-black">Bank Account</p>
                </button>
                <button
                  onClick={() => setPaymentForm({...paymentForm, type: 'wallet'})}
                  className={`p-4 rounded-2xl border-2 ${paymentForm.type === 'wallet' ? 'border-[#003d2b] bg-green-50' : 'border-gray-200'}`}
                >
                  <i className="fas fa-wallet text-2xl mb-2"></i>
                  <p className="text-xs font-black">Mobile Wallet</p>
                </button>
              </div>

              {/* Credit Card Form */}
              {paymentForm.type === 'credit_card' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Card Number</label>
                    <input
                      type="text"
                      value={paymentForm.cardNumber}
                      onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Cardholder Name</label>
                    <input
                      type="text"
                      value={paymentForm.cardHolder}
                      onChange={(e) => setPaymentForm({...paymentForm, cardHolder: e.target.value})}
                      placeholder="John Doe"
                      className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Expiry Date</label>
                      <input
                        type="text"
                        value={paymentForm.expiryDate}
                        onChange={(e) => setPaymentForm({...paymentForm, expiryDate: e.target.value})}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">CVV</label>
                      <input
                        type="text"
                        value={paymentForm.cvv}
                        onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value})}
                        placeholder="123"
                        maxLength="3"
                        className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Account Form */}
              {paymentForm.type === 'bank' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Bank Name</label>
                    <input
                      type="text"
                      value={paymentForm.bankName}
                      onChange={(e) => setPaymentForm({...paymentForm, bankName: e.target.value})}
                      placeholder="Habib Bank Limited"
                      className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Account Holder Name</label>
                    <input
                      type="text"
                      value={paymentForm.accountHolder}
                      onChange={(e) => setPaymentForm({...paymentForm, accountHolder: e.target.value})}
                      placeholder="John Doe"
                      className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Account Number</label>
                    <input
                      type="text"
                      value={paymentForm.accountNumber}
                      onChange={(e) => setPaymentForm({...paymentForm, accountNumber: e.target.value})}
                      placeholder="1234567890"
                      className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Mobile Wallet Form */}
              {paymentForm.type === 'wallet' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Phone Number</label>
                    <input
                      type="text"
                      value={paymentForm.phoneNumber}
                      onChange={(e) => setPaymentForm({...paymentForm, phoneNumber: e.target.value})}
                      placeholder="03001234567"
                      className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Wallet Type</label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setPaymentForm({...paymentForm, phoneNumber: ''})}
                        className="flex-1 p-4 rounded-2xl border-2 border-purple-500 bg-purple-50 text-center"
                      >
                        <i className="fas fa-wallet text-2xl mb-2 text-purple-500"></i>
                        <p className="text-xs font-black">JazzCash</p>
                      </button>
                      <button
                        onClick={() => setPaymentForm({...paymentForm, phoneNumber: ''})}
                        className="flex-1 p-4 rounded-2xl border-2 border-gray-200 text-center"
                      >
                        <i className="fas fa-mobile-alt text-2xl mb-2 text-gray-500"></i>
                        <p className="text-xs font-black">EasyPaisa</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mt-6">
                <input
                  type="checkbox"
                  id="defaultPayment"
                  checked={paymentForm.isDefault}
                  onChange={(e) => setPaymentForm({...paymentForm, isDefault: e.target.checked})}
                  className="w-5 h-5 rounded"
                />
                <label htmlFor="defaultPayment" className="text-sm font-medium text-gray-700">
                  Set as default payment method
                </label>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleAddPayment}
                  className="flex-1 bg-[#003d2b] text-white font-black py-4 rounded-2xl hover:bg-black transition-all uppercase tracking-widest"
                >
                  Add Payment Method
                </button>
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    resetPaymentForm();
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 font-black py-4 rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>

              <p className="text-center text-xs text-gray-500 mt-6">
                <i className="fas fa-lock mr-2"></i>
                Your payment details are securely encrypted
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal - Show existing payment methods */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] w-full max-w-md">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-900">Deposit Funds</h3>
                <button
                  onClick={() => setShowDepositModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Amount (Rs)</label>
                  <input
                    type="number"
                    value={depositForm.amount}
                    onChange={(e) => setDepositForm({...depositForm, amount: e.target.value})}
                    placeholder="Enter amount"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">Minimum deposit: Rs 100</p>
                </div>
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">Select Payment Method</label>
                  <select
                    value={depositForm.paymentMethod}
                    onChange={(e) => setDepositForm({...depositForm, paymentMethod: e.target.value})}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                  >
                    <option value="">Choose payment method</option>
                    {paymentMethods.map(method => (
                      <option key={method.id} value={method.name}>
                        {method.name} {method.isDefault && '(Default)'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2 block">OTP Verification</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={depositForm.otp}
                      onChange={(e) => setDepositForm({...depositForm, otp: e.target.value})}
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      className="flex-1 p-4 rounded-2xl border-2 border-gray-200 focus:border-[#003d2b] focus:outline-none"
                    />
                    <button
                      onClick={sendOTP}
                      className="bg-gray-100 text-gray-700 font-black px-6 rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs"
                    >
                      Send OTP
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mt-6">
                <p className="text-sm text-green-700">
                  <i className="fas fa-info-circle mr-2"></i>
                  Deposits are processed instantly. Your funds will be available immediately.
                </p>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleDeposit}
                  className="flex-1 bg-[#003d2b] text-white font-black py-4 rounded-2xl hover:bg-black transition-all uppercase tracking-widest"
                >
                  Deposit Now
                </button>
                <button
                  onClick={() => setShowDepositModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 font-black py-4 rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>
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

      {/* Security Modals */}

      {/* Change Email Modal */}
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