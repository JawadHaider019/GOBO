"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for Bus and Living accommodations
  const mockListings = [
    // BUS LISTINGS
    {
      id: 'bus-1',
      title: 'Lahore to Islamabad Express',
      description: 'Premium AC coach service from Lahore to Islamabad. Comfortable seating, onboard WiFi, and refreshments included. Perfect for business travelers and tourists.',
      price: 2500,
      discountPrice: 2000,
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      location: 'Lahore',
      destination: 'Islamabad',
      date: 'Daily Departures',
      time: '08:00 AM, 02:00 PM, 08:00 PM',
      type: 'BUS',
      category: 'BUS',
      organizer: 'Daewoo Express',
      availableSeats: 12,
      totalSeats: 40,
      rating: 4.5,
      isFree: false,
      duration: '4 hours',
      amenities: ['AC', 'WiFi', 'Refreshments', 'TV', 'Restroom'],
      busType: 'Executive',
      departurePoint: 'Lahore Terminal',
      arrivalPoint: 'Islamabad Terminal'
    },
    {
      id: 'bus-2',
      title: 'Karachi to Lahore Luxury Coach',
      description: 'Overnight luxury bus service with sleeper seats, personal entertainment screens, and complimentary meals. Travel in ultimate comfort.',
      price: 5000,
      discountPrice: 4500,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      location: 'Karachi',
      destination: 'Lahore',
      date: 'Daily Departures',
      time: '10:00 PM',
      type: 'BUS',
      category: 'BUS',
      organizer: 'Faisal Movers',
      availableSeats: 8,
      totalSeats: 35,
      rating: 4.7,
      isFree: false,
      duration: '16 hours',
      amenities: ['Sleeper Seats', 'Meals', 'Entertainment', 'AC', 'Charging Ports'],
      busType: 'Luxury Sleeper',
      departurePoint: 'Karaci Terminal',
      arrivalPoint: 'Lahore Terminal'
    },
    {
      id: 'bus-3',
      title: 'Islamabad to Murree Shuttle',
      description: 'Regular shuttle service to the beautiful hill station of Murree. Perfect for weekend getaways and family trips.',
      price: 800,
      image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      location: 'Islamabad',
      destination: 'Murree',
      date: 'Daily Departures',
      time: '07:00 AM, 12:00 PM, 03:00 PM',
      type: 'BUS',
      category: 'BUS',
      organizer: 'NATCO',
      availableSeats: 25,
      totalSeats: 50,
      rating: 4.3,
      isFree: false,
      duration: '2 hours',
      amenities: ['AC', 'Comfortable Seating'],
      busType: 'Standard',
      departurePoint: 'Islamabad Bus Stand',
      arrivalPoint: 'Murree Mall Road'
    },

    // LIVING ACCOMMODATIONS
    {
      id: 'living-1',
      title: 'Pearl Continental Hotel Lahore',
      description: '5-star luxury hotel in the heart of Lahore. Spacious rooms with city views, multiple dining options, swimming pool, and spa facilities.',
      price: 18000,
      discountPrice: 15000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      location: 'Lahore',
      date: 'Available Year-round',
      time: 'Check-in: 2:00 PM',
      type: 'HOTEL',
      category: 'LIVING',
      organizer: 'Pearl Continental Hotels',
      availableSeats: 15,
      totalSeats: 200,
      rating: 4.8,
      isFree: false,
      duration: 'Per Night',
      amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Gym', 'WiFi', 'Parking'],
      roomType: 'Deluxe Room',
      checkInTime: '2:00 PM',
      checkOutTime: '12:00 PM'
    },
    {
      id: 'living-2',
      title: 'Beach View Apartment Karachi',
      description: 'Modern apartment with stunning beach views. Fully furnished with kitchen, living area, and balcony overlooking the Arabian Sea.',
      price: 8000,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80',
      location: 'Karachi',
      date: 'Available Year-round',
      time: 'Check-in: 3:00 PM',
      type: 'APARTMENT',
      category: 'LIVING',
      organizer: 'Sea View Residences',
      availableSeats: 3,
      totalSeats: 10,
      rating: 4.6,
      isFree: false,
      duration: 'Per Night',
      amenities: ['Kitchen', 'Sea View', 'WiFi', 'AC', 'TV', 'Washing Machine'],
      roomType: '2-Bedroom Apartment',
      checkInTime: '3:00 PM',
      checkOutTime: '11:00 AM'
    },
    {
      id: 'living-3',
      title: 'Margalla Hills Guest House',
      description: 'Cozy guest house nestled in the Margalla Hills. Perfect for nature lovers and peaceful retreats with hiking trails nearby.',
      price: 4000,
      discountPrice: 3500,
      image: 'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      location: 'Islamabad',
      date: 'Available Year-round',
      time: 'Check-in: 1:00 PM',
      type: 'GUEST_HOUSE',
      category: 'LIVING',
      organizer: 'Hilltop Retreats',
      availableSeats: 6,
      totalSeats: 12,
      rating: 4.4,
      isFree: false,
      duration: 'Per Night',
      amenities: ['Garden', 'Mountain View', 'Free Breakfast', 'WiFi', 'Parking'],
      roomType: 'Standard Room',
      checkInTime: '1:00 PM',
      checkOutTime: '12:00 PM'
    },
    {
      id: 'living-4',
      title: 'Traditional Haveli Stay Multan',
      description: 'Experience traditional Pakistani hospitality in a restored historic haveli. Authentic cuisine and cultural activities included.',
      price: 6000,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      location: 'Multan',
      date: 'Available Year-round',
      time: 'Check-in: 12:00 PM',
      type: 'HERITAGE',
      category: 'LIVING',
      organizer: 'Multan Heritage Stays',
      availableSeats: 4,
      totalSeats: 8,
      rating: 4.9,
      isFree: false,
      duration: 'Per Night',
      amenities: ['Traditional Food', 'Cultural Shows', 'Courtyard', 'WiFi', 'AC'],
      roomType: 'Heritage Room',
      checkInTime: '12:00 PM',
      checkOutTime: '11:00 AM'
    },
    {
      id: 'living-5',
      title: 'Budget Hostel Rawalpindi',
      description: 'Affordable dormitory-style accommodation for backpackers and solo travelers. Social atmosphere with common areas.',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      location: 'Rawalpindi',
      date: 'Available Year-round',
      time: 'Check-in: 2:00 PM',
      type: 'HOSTEL',
      category: 'LIVING',
      organizer: 'Backpackers Pakistan',
      availableSeats: 20,
      totalSeats: 30,
      rating: 4.2,
      isFree: false,
      duration: 'Per Night',
      amenities: ['Shared Kitchen', 'Common Room', 'Lockers', 'WiFi', 'Laundry'],
      roomType: 'Dorm Bed',
      checkInTime: '2:00 PM',
      checkOutTime: '11:00 AM'
    }
  ];

  // Load user and wallet from localStorage on initial load
  useEffect(() => {
    // Load user
    const savedUser = localStorage.getItem('goBookingUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('goBookingUser');
      }
    }

    // Load wallet (booked tickets)
    const savedWallet = localStorage.getItem('goBookingWallet');
    if (savedWallet) {
      try {
        setWallet(JSON.parse(savedWallet));
      } catch (error) {
        console.error('Error parsing saved wallet:', error);
        localStorage.removeItem('goBookingWallet');
      }
    }
    
    // Set listings data
    setListings(mockListings);
    
    setLoading(false);
  }, []);

  // Save user and wallet to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem('goBookingUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('goBookingUser');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('goBookingWallet', JSON.stringify(wallet));
  }, [wallet]);

  // Calculate user balance based on wallet
  const getBalance = () => {
    // Simulate balance - you can replace with actual user balance logic
    return user ? 10000 : 0; // Default balance of PKR 10,000 for logged in users
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setWallet([]);
    localStorage.removeItem('goBookingUser');
    localStorage.removeItem('goBookingWallet');
  };

  // Function to book a ticket
  const bookTicket = (item) => {
    if (!user) {
      throw new Error('User must be logged in to book tickets');
    }

    const newTicket = {
      ticketId: `TIX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: item.title,
      description: item.description,
      date: item.date + (item.time ? ` • ${item.time}` : ''),
      location: item.location,
      destination: item.destination,
      image: item.image,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TIX-${Date.now()}-${item.id}-${user.cnic}`,
      type: item.type,
      price: item.price,
      discountPrice: item.discountPrice,
      category: item.category,
      organizer: item.organizer,
      duration: item.duration,
      bookingDate: new Date().toISOString().split('T')[0],
      seats: generateRandomSeats(item.availableSeats),
      totalAmount: item.discountPrice || item.price || 0,
      bookingStatus: "CONFIRMED",
      availableSeats: item.availableSeats,
      totalSeats: item.totalSeats,
      rating: item.rating,
      amenities: item.amenities || [],
      busType: item.busType,
      roomType: item.roomType,
      departurePoint: item.departurePoint,
      arrivalPoint: item.arrivalPoint,
      checkInTime: item.checkInTime,
      checkOutTime: item.checkOutTime
    };

    const updatedWallet = [...wallet, newTicket];
    setWallet(updatedWallet);
    
    // Update available seats in listings
    setListings(prevListings => 
      prevListings.map(listing => 
        listing.id === item.id 
          ? { ...listing, availableSeats: listing.availableSeats - 1 }
          : listing
      )
    );
    
    return newTicket;
  };

  // Helper function to generate random seats
  const generateRandomSeats = (availableSeats) => {
    if (availableSeats <= 0) return [];
    
    const numSeats = Math.min(availableSeats, 4); // Max 4 seats per booking
    
    if (Math.random() < 0.5) {
      // For living accommodations
      return [`Room ${Math.floor(Math.random() * 100) + 1}`];
    } else {
      // For bus seats
      const sections = ['A', 'B', 'C', 'D'];
      const seats = [];
      for (let i = 0; i < numSeats; i++) {
        const section = sections[Math.floor(Math.random() * sections.length)];
        const seatNumber = Math.floor(Math.random() * 50) + 1;
        seats.push(`${section}-${seatNumber}`);
      }
      return seats;
    }
  };

  // Remove a ticket from wallet
  const removeTicket = (ticketId) => {
    const updatedWallet = wallet.filter(ticket => ticket.ticketId !== ticketId);
    setWallet(updatedWallet);
  };

  // Clear all tickets
  const clearWallet = () => {
    setWallet([]);
  };

  // Check if an event is already booked
  const isEventBooked = (itemId) => {
    return wallet.some(ticket => 
      ticket.type === 'bus' ? ticket.destination : ticket.title
    );
  };

  // Get ticket by ID
  const getTicketById = (ticketId) => {
    return wallet.find(ticket => ticket.ticketId === ticketId);
  };

  // Get listing by ID
  const getListingById = (id) => {
    return listings.find(listing => listing.id === id);
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      wallet,
      listings,
      balance: getBalance(),
      login, 
      logout,
      bookTicket,
      removeTicket,
      clearWallet,
      isEventBooked,
      getTicketById,
      getListingById,
      loading 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}