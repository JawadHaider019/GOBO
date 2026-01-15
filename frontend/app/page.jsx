// app/page.jsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Hero from '../components/Hero';
import LatestCollection from '@/components/LatestCollection';
import SearchTabs from '@/components/SearchTabs';
import { toast } from 'react-hot-toast';

export default function Home() {
  const [user, setUser] = useState(null);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, setFormState] = useState({
    name: '',
    cnic: '',
    address: '',
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser && typeof parsedUser === 'object') {
            setUser(parsedUser);
          } else {
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Validate form function
  const validateForm = useCallback(() => {
    setFormError('');

    // Email validation
    if (!formState.email.trim()) {
      setFormError('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setFormError('Please enter a valid email address');
      return false;
    }

    // Password validation
    if (!formState.password.trim()) {
      setFormError('Password is required');
      return false;
    }
    
    if (formState.password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return false;
    }

    // For registration only
    if (!isLoginMode) {
      if (!formState.name.trim()) {
        setFormError('Full name is required');
        return false;
      }
      
      if (!formState.cnic.trim()) {
        setFormError('CNIC is required');
        return false;
      }
      
      // CNIC format validation (42101-1234567-1)
      const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
      if (!cnicRegex.test(formState.cnic)) {
        setFormError('Please enter CNIC in format: 42101-XXXXXXX-X');
        return false;
      }
    }

    return true;
  }, [formState, isLoginMode]);

  // Handle identity submission
  const handleIdentitySubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock user data - replace with actual API call
      const mockUser = {
        id: Date.now(),
        name: isLoginMode ? "Demo User" : formState.name.trim(),
        email: formState.email.trim(),
        cnic: isLoginMode ? "42101-1234567-1" : formState.cnic.trim(),
        role: formState.email.includes('admin') ? 'admin' : 'user',
        address: isLoginMode ? "Lahore, Pakistan" : formState.address.trim(),
        joinedDate: new Date().toISOString(),
        walletBalance: 5000,
        bookingsCount: 12,
        isVerified: true
      };

      // Save user to state and localStorage
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Show success message
      const successMessage = isLoginMode 
        ? 'Welcome back! Authentication successful.'
        : 'Account activated! Welcome to Go Booking.';
      
      toast.success(successMessage, {
        duration: 3000,
        position: 'top-right',
        icon: '🎉',
        style: {
          background: '#10b981',
          color: '#ffffff',
          fontWeight: 'bold',
        }
      });

      // Clear form
      setFormState({
        name: '',
        cnic: '',
        address: '',
        email: '',
        password: ''
      });

      // Redirect admin to dashboard
      if (mockUser.role === 'admin') {
        setTimeout(() => router.push('/dashboard'), 1500);
      }

    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(
        isLoginMode 
          ? 'Login failed. Please check your credentials.'
          : 'Registration failed. Please try again.',
        {
          duration: 4000,
          position: 'top-right',
          icon: '⚠️',
          style: {
            background: '#ef4444',
            color: '#ffffff',
            fontWeight: 'bold',
          }
        }
      );
    }
  }, [formState, isLoginMode, router, validateForm]);

  // Handle form state updates
  const handleFormStateUpdate = useCallback((field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    if (formError) setFormError('');
  }, [formError]);

  // Handle logout from Hero (if needed)
  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully', {
      duration: 2000,
      position: 'top-right',
      icon: '👋',
    });
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#003d2b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-gray-600 font-medium">Loading secure gateway...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero 
        user={user}
        isLoginMode={isLoginMode}
        setIsLoginMode={setIsLoginMode}
        handleIdentitySubmit={handleIdentitySubmit}
        formState={formState}
        setFormState={handleFormStateUpdate}
        formError={formError}
      />
       {/* Search Tabs Section */}
      <section className="relative z-20 -mt-10 px-10">
       <SearchTabs />
      </section>
  <LatestCollection />
    </main>
  );
}