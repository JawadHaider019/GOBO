"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AuthModal from './AuthModal';
import { useApp } from "../context/AppContext";

const Navbar = () => {
  const { user, logout } = useApp();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const pathname = usePathname();
  const router = useRouter();

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 1000);
  };

  const handleAuthSuccess = (userData) => {
    setIsAuthModalOpen(false);
    const message = userData.role === 'admin' 
      ? 'Welcome Admin!' 
      : 'Welcome to Go Booking!';
    showToast(message, 'success');
  };

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    showToast('Logged out successfully', 'success');
    router.push('/');
  };

  const navItems = [
    { label: 'Home', path: '/', icon: 'fa-home' },
    { label: 'About', path: '/about', icon: 'fa-info-circle' },
    { label: 'Services', path: '/services', icon: 'fa-concierge-bell' },
    { label: 'Explore', path: '/explore', icon: 'fa-store' },
    { label: 'Blogs', path: '/blogs', icon: 'fa-blog' },
    { label: 'Contact', path: '/contact', icon: 'fa-phone' },
  ];

  return (
    <>
      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/80 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Mobile/Tablet Menu Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
            
            <Link href="/" className="p-2 hover:opacity-80 transition-opacity">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16">
                <img 
                  src="/logog.png" 
                  alt="Go Booking Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-[#003d2b] to-[#006644] rounded-2xl flex items-center justify-center text-white">
                        <span class="font-bold text-sm sm:text-base md:text-lg">GB</span>
                      </div>
                    `;
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on tablet, shown on large screens */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 text-xs xl:text-[12px] font-bold tracking-[0.15em] uppercase transition-all duration-200 ${
                  pathname === item.path 
                    ? 'text-[#003d2b]' 
                    : 'text-gray-500 hover:text-gray-900 hover:scale-105'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Actions - Desktop/Tablet */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 sm:gap-3 lg:gap-4 bg-gray-50/80 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-xl lg:rounded-2xl border border-gray-200/50 backdrop-blur-sm hover:bg-gray-100 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#003d2b] to-[#006644] flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="hidden sm:block text-right">
                      <p className="text-xs font-medium text-gray-900 leading-tight mb-0.5">
                        {user.name?.split(' ')[0] || 'User'}
                      </p>
                      <p className="text-[8px] font-medium text-green-600 uppercase tracking-[0.2em]">
                        VERIFIED USER
                      </p>
                    </div>
                  </div>
                  <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-slideDown">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors duration-200 w-full"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <i className="fas fa-tachometer-alt text-sm"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-left">Dashboard</p>
                        <p className="text-xs text-gray-500 text-left mt-0.5">View and manage your account</p>
                      </div>
                    </Link>
                    
                    <div className="border-t border-gray-200 my-1"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-start gap-3 w-full px-4 py-3 hover:bg-red-50 text-red-600 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-sign-out-alt text-sm"></i>
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium">Logout</p>
                        <p className="text-xs text-gray-500 mt-0.5">Sign out of your account</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Sign In button - responsive sizing */}
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-[#003d2b] to-[#006644] text-white font-medium text-[10px] sm:text-xs lg:text-[11px] px-3 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-2.5 lg:py-3 xl:py-3.5 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg shadow-green-100/50 hover:scale-[1.02] transition-all duration-200 active:scale-95 uppercase tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] flex items-center gap-1 sm:gap-2 whitespace-nowrap"
                >
                  <i className="fas fa-rocket text-[8px] sm:text-xs lg:hidden"></i>
                  <span className="hidden sm:inline">Sign In / Sign Up</span>
                  <span className="sm:hidden">Login</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile/Tablet Navigation Menu - Shows on lg:hidden */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-slideDown">
            <div className="px-4 sm:px-6 py-4 sm:py-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex flex-col items-center gap-1 p-3 sm:p-4 rounded-xl transition-colors ${
                      pathname === item.path
                        ? 'bg-[#003d2b]/10 text-[#003d2b]'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <i className={`fas ${item.icon} text-base sm:text-lg`}></i>
                    <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
                  </Link>
                ))}

                {/* Dashboard for logged-in users */}
                {user && (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex flex-col items-center gap-1 p-3 sm:p-4 rounded-xl transition-colors ${
                      pathname === '/dashboard'
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <i className="fas fa-tachometer-alt text-base sm:text-lg"></i>
                    <span className="text-[10px] sm:text-xs font-medium">Dashboard</span>
                  </Link>
                )}
              </div>

              {/* Mobile/Tablet User Info */}
              {user && (
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#003d2b] to-[#006644] flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">
                          {user.name || 'User'}
                        </p>
                        <p className="text-[8px] sm:text-[10px] text-green-600 uppercase tracking-wide">
                          VERIFIED USER
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-1 sm:gap-2 text-red-600 hover:text-red-700 p-1 sm:p-2"
                    >
                      <i className="fas fa-sign-out-alt text-xs sm:text-sm"></i>
                      <span className="text-xs sm:text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* User Dropdown for Mobile (kept separate) */}
        {isUserDropdownOpen && !isMobileMenuOpen && (
          <div className="lg:hidden absolute right-2 sm:right-4 top-full mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-slideDown">
            {/* Same dropdown content as before */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#003d2b] to-[#006644] flex items-center justify-center text-white text-base font-bold flex-shrink-0">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 text-left">{user.name || 'User'}</p>
                  <p className="text-xs text-green-600 uppercase tracking-wide mt-0.5 text-left">
                    VERIFIED USER
                  </p>
                </div>
              </div>
            </div>
            
            <Link
              href="/dashboard"
              onClick={() => setIsUserDropdownOpen(false)}
              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors duration-200 w-full"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                <i className="fas fa-tachometer-alt text-sm"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-left">Dashboard</p>
                <p className="text-xs text-gray-500 text-left mt-0.5">View and manage your account</p>
              </div>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-start gap-3 w-full px-4 py-3 hover:bg-red-50 text-red-600 transition-colors duration-200 border-t border-gray-100 text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-sign-out-alt text-sm"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-left">Logout</p>
                <p className="text-xs text-gray-500 text-left mt-0.5">Sign out of your account</p>
              </div>
            </button>
          </div>
        )}
      </header>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-20 sm:top-24 right-2 sm:right-4 md:right-8 z-50 animate-slideDown ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-lg max-w-xs sm:max-w-sm text-xs sm:text-sm`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <i className={`fas ${
              toast.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'
            } text-sm sm:text-lg`}></i>
            <p className="font-medium">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Close dropdown when clicking outside */}
      {(isUserDropdownOpen || isMobileMenuOpen) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsUserDropdownOpen(false);
            setIsMobileMenuOpen(false);
          }}
        ></div>
      )}

      {/* Add custom animation */}
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;