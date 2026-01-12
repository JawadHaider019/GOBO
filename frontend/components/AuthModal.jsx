"use client";

import { useState, useEffect } from 'react';
import Auth from './Auth';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      resetModal();
    }
  }, [isOpen]);

  const resetModal = () => {
    setIsLoading(false);
    setError('');
    setUser(null);
    setShowSuccess(false);
  };

  const handleAuth = (authData) => {
    setIsLoading(true);
    setError('');
    setShowSuccess(false);

    // Validate form
    if (!authData.email || !authData.password) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }

    if (!authData.isLogin) {
      // Signup validation
      if (!authData.name || !authData.cnic || !authData.address) {
        setError('All fields are required for registration');
        setIsLoading(false);
        return;
      }

      if (authData.password !== authData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      // CNIC validation
      const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
      if (!cnicRegex.test(authData.cnic)) {
        setError('Please enter a valid CNIC (format: 12345-1234567-1)');
        setIsLoading(false);
        return;
      }
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Create user data
      const userData = authData.isLogin
        ? {
            email: authData.email,
            role: authData.email.includes('admin') ? 'admin' : 'user',
            name: authData.email.includes('admin') ? 'Admin User' : 'Demo User',
            cnic: '42101-1234567-8',
            address: 'Lahore, Pakistan'
          }
        : {
            email: authData.email,
            role: 'user',
            name: authData.name,
            cnic: authData.cnic,
            address: authData.address
          };

      // Set user for Auth component to show logged-in state
      setUser(userData);
      setShowSuccess(true);

      // Call success callback
      if (onAuthSuccess) {
        onAuthSuccess(userData);
      }

      // Auto-close after successful login
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
      }, 2000);
    }, 1500);
  };

  // Handle logout in modal
  const handleLogout = () => {
    setUser(null);
    setError('');
    setShowSuccess(false);
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <>
      {/* Enhanced Backdrop with gradient */}
      <div 
        className="fixed inset-0 z-[1000] bg-gradient-to-br from-black/70 via-[#003d2b]/30 to-black/70 backdrop-blur-xl transition-all duration-500"
        onClick={onClose}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-l from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>
      
      {/* Modal Container */}
      <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
        <div 
          className="relative w-full max-w-sm animate-in fade-in-0 zoom-in-95 duration-500"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button with glass effect */}
          <button
            onClick={onClose}
            className="absolute top-4 right-3 z-10 w-10 h-10  backdrop-blur-xl rounded-full flex items-center justify-center text-black  transition-all duration-300 shadow-2xl shadow-black/30 border border-white/10"
            aria-label="Close modal"
          >
            <i className="fas fa-times text-sm"></i>
          </button>

          {/* Glass Card with enhanced effects */}
          <div className=" bg-white  rounded-3xl shadow-2xl shadow-black/30  overflow-hidden py-4 ">
       
            {/* Success Overlay */}
            {showSuccess && (
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-3xl animate-pulse pointer-events-none"></div>
            )}

          
            
            {/* Card Body */}
            <div className=" px-6">
              {/* Auth Component inside card */}
              <div className={showSuccess ? 'opacity-50 pointer-events-none' : ''}>
                <Auth 
                  user={user}
                  onAuth={handleAuth}
                  isLoading={isLoading}
                  error={error}
                  onLogout={handleLogout}
                  showQR={false} 
                 
                />
              </div>
            </div>
            
          

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[2px] h-[2px] bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
    
         
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-10px) translateX(5px); opacity: 0.5; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.9; }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default AuthModal;