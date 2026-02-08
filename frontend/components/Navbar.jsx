"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AuthModal from './AuthModal';
import { useApp } from '@/context/AppContext';

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
    { label: 'Marketplace', path: '/marketplace', icon: 'fa-store' },
    { label: 'Blogs', path: '/blogs', icon: 'fa-blog' },
  ];

  return (
    <>
      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/80 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
            
            <Link href="/" className="p-2 hover:opacity-80 transition-opacity">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 text-xs lg:text-[12px] font-bold tracking-[0.15em] uppercase transition-all duration-200 ${
                  pathname === item.path 
                    ? 'text-[#003d2b]' 
                    : 'text-gray-500 hover:text-gray-900 hover:scale-105'
                }`}
              >
              
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-3 lg:gap-4 bg-gray-50/80 px-3 lg:px-4 py-2 rounded-xl lg:rounded-2xl border border-gray-200/50 backdrop-blur-sm hover:bg-gray-100 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#003d2b] to-[#006644] flex items-center justify-center text-white text-sm font-bold">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="text-right">
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
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-slideDown">
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
                        <p className="text-xs text-gray-500 text-left mt-0.5">View Booking and Manage your account</p>
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
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-[#003d2b] to-[#006644] text-white font-medium text-xs lg:text-[11px] px-6 lg:px-8 py-3 lg:py-3.5 rounded-xl lg:rounded-2xl shadow-lg shadow-green-100/50 hover:scale-[1.02] transition-all duration-200 active:scale-95 uppercase tracking-[0.15em] lg:tracking-[0.2em] flex items-center gap-2"
                >
                Sign In / Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile User Action */}
          <div className="md:hidden flex items-center">
            {user ? (
              <button 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 p-2"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#003d2b] to-[#006644] flex items-center justify-center text-white text-sm font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <i className={`fas fa-chevron-down text-xs text-gray-400 ${isUserDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-[#003d2b] to-[#006644] text-white text-xs px-4 py-2.5 rounded-xl uppercase tracking-wide flex items-center gap-2"
                aria-label="Login"
              >
                <i className="fas fa-rocket text-xs"></i>
                Sign In / Sign Up
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-slideDown">
            <div className="px-4 py-6">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      pathname === item.path
                        ? 'bg-[#003d2b]/10 text-[#003d2b]'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <i className={`fas ${item.icon} w-5 text-center`}></i>
                    <span className="font-medium">{item.label}</span>
                    {pathname === item.path && (
                      <i className="fas fa-chevron-right ml-auto text-xs text-[#003d2b]"></i>
                    )}
                  </Link>
                ))}

                {/* Dashboard link for logged-in mobile users */}
                {user && (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      pathname === '/dashboard'
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <i className="fas fa-tachometer-alt w-5 text-center"></i>
                    <span className="font-medium">Dashboard</span>
                  </Link>
                )}

                {/* Mobile User Info */}
                {user && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between px-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.name || 'User'}
                        </p>
                        <p className="text-xs text-green-600 uppercase tracking-wide mt-1">
                          VERIFIED USER
                        </p>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 p-2"
                      >
                        <i className="fas fa-sign-out-alt"></i>
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile User Dropdown Menu */}
        {isUserDropdownOpen && (
          <div className="md:hidden absolute right-4 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-slideDown">
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
        <div className={`fixed top-24 right-4 md:right-8 z-50 animate-slideDown ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white px-6 py-3 rounded-xl shadow-lg max-w-sm`}>
          <div className="flex items-center gap-3">
            <i className={`fas ${
              toast.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'
            } text-lg`}></i>
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
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
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