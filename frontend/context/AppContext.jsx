"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState([]);
  const [loading, setLoading] = useState(true);

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
      image: item.image,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TIX-${Date.now()}-${item.id}-${user.cnic}`,
      type: item.category,
      price: item.price,
      discountPrice: item.discountPrice,
      category: item.category,
      organizer: item.organizer || "Event Organizer",
      duration: item.duration || "3 hours",
      bookingDate: new Date().toISOString().split('T')[0],
      seats: generateRandomSeats(item.availableSeats),
      totalAmount: item.discountPrice || item.price || 0,
      bookingStatus: "CONFIRMED",
      availableSeats: item.availableSeats,
      totalSeats: item.totalSeats,
      rating: item.rating
    };

    const updatedWallet = [...wallet, newTicket];
    setWallet(updatedWallet);
    
    return newTicket;
  };

  // Helper function to generate random seats
  const generateRandomSeats = (availableSeats) => {
    const sections = ['A', 'B', 'C', 'D', 'VIP'];
    const seats = [];
    const numSeats = Math.min(availableSeats, 4); // Max 4 seats per booking
    
    for (let i = 0; i < numSeats; i++) {
      const section = sections[Math.floor(Math.random() * sections.length)];
      const seatNumber = Math.floor(Math.random() * 50) + 1;
      seats.push(`${section}-${seatNumber}`);
    }
    
    return seats;
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
  const isEventBooked = (eventTitle, eventDate) => {
    return wallet.some(ticket => 
      ticket.title === eventTitle && ticket.date.includes(eventDate)
    );
  };

  // Get ticket by ID
  const getTicketById = (ticketId) => {
    return wallet.find(ticket => ticket.ticketId === ticketId);
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      wallet,
      login, 
      logout,
      bookTicket,
      removeTicket,
      clearWallet,
      isEventBooked,
      getTicketById,
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