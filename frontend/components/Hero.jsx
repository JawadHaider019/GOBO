"use client";

import { useState, useCallback } from 'react';
import Auth from './Auth';
import { useApp } from '@/context/AppContext';

const Hero = () => {
  const { user, login, logout } = useApp();
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [tempUser, setTempUser] = useState(null);

  // Handle authentication
  const handleAuth = useCallback(async (authData) => {
    setIsAuthLoading(true);
    setAuthError('');
    setShowSuccess(false);
    setTempUser(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate form data
      if (!authData.email || !authData.password) {
        throw new Error('Email and password are required');
      }
      
      if (!authData.isLogin) {
        // Registration validation
        if (!authData.name || !authData.cnic || !authData.address) {
          throw new Error('All fields are required for registration');
        }
        
        if (authData.password !== authData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        if (authData.password.length < 8) {
          throw new Error('Password must be at least 8 characters');
        }
      }
      
      // Mock successful authentication
      const mockUser = {
        id: Date.now(),
        name: authData.isLogin ? "Demo User" : authData.name,
        email: authData.email,
        cnic: authData.isLogin ? "42101-1234567-1" : authData.cnic,
        role: authData.email.includes('admin') ? 'admin' : 'user',
        address: authData.isLogin ? "Lahore, Pakistan" : authData.address,
        joinedDate: new Date().toISOString(),
        walletBalance: 5000,
        bookingsCount: 12,
        isVerified: true
      };
      
      // Store temporary user
      setTempUser(mockUser);
      
      // Show success animation
      setShowSuccess(true);
      
      // Call success callback after delay
      setTimeout(() => {
        login(mockUser); // Use global login function from context
        setShowSuccess(false);
        setTempUser(null);
      }, 1500);
      
    } catch (error) {
      console.error('Authentication error:', error);
      setAuthError(error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsAuthLoading(false);
    }
  }, [login]);

  return (
    <section className="relative h-auto w-full rounded-b-[3rem] md:rounded-b-[5rem] overflow-hidden bg-gradient-to-b from-[#003d2b] to-[#002219] text-white">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-r from-green-500/20 to-emerald-400/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-l from-emerald-400/20 to-cyan-300/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none rotate-12">
        <i className="fas fa-ticket-alt text-[40rem]"></i>
      </div>
      
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 px-4 md:px-8 lg:px-12 py-8 md:py-12">
        {/* Left Content - Optimized */}
        <div className="flex flex-col justify-center space-y-6 md:space-y-8">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              One platform. All bookings.
            </span>
          </div>
          
          {/* Main headline */}
          <div className="space-y-3">
            <h1 className="text-7xl font-black leading-[0.9] tracking-tight">
              The<br/>
              Unified<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-200 to-cyan-200 animate-gradient">
                System.
              </span>
            </h1>
          </div>
          
          {/* Description */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-100 max-w-md leading-relaxed">
              "Eliminate ticket fraud with Pakistan's first CNIC-linked booking ecosystem."
            </p>
          </div>

         
        </div>

        {/* Right Content - Auth Card */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-sm">
            {/* Card glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500/10 to-emerald-400/10 rounded-[2rem] blur-xl opacity-30"></div>
            
            {/* Main card */}
            <div className="relative bg-white rounded-4xl shadow-2xl shadow-black/20 border border-white/20 overflow-hidden">
              {/* Card body */}
              <div className="px-6 py-12">
                {/* Success overlay - Only show when not logged in yet */}
                {showSuccess && !user && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20 animate-fadeIn">
                    <div className="text-center space-y-4 p-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto text-[#003d2b] text-2xl animate-bounce">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-[#003d2b] mb-1">
                          Success!
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Welcome to Go Booking
                        </p>
                      </div>
                      <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-300 rounded-full mx-auto overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full animate-loading-bar"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Auth Component - Pass the user to show QR */}
                <div className={showSuccess && !user ? 'opacity-30 pointer-events-none transition-opacity duration-300' : 'w-full'}>
                  <Auth 
                    user={user || tempUser}  
                    onAuth={handleAuth}
                    isLoading={isAuthLoading}
                    error={authError}
                    onLogout={logout}
                    showQR={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animations and styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;