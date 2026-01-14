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
  const pathname = usePathname();
  const router = useRouter();

  const handleAuthSuccess = (userData) => {
    setIsAuthModalOpen(false);
    const message = userData.role === 'admin' 
      ? 'Welcome Admin!' 
      : 'Welcome to Go Booking!';
    alert(message);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
    alert('Logged out successfully');
  };

  const navItems = [
    { label: 'Home', path: '/', icon: 'fa-compass' },
    {label:'About',path:'/about'},
    { label: 'Marketplace', path: '/marketplace', icon: 'fa-store' },
    { label: 'My Wallet', path: '/wallet', icon: 'fa-wallet' },
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
                className={`text-xs lg:text-[12px] font-bold tracking-[0.15em] uppercase transition-all duration-200 ${
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
              <div className="flex items-center gap-3 lg:gap-4 bg-gray-50/80 px-3 lg:px-4 py-2 rounded-xl lg:rounded-2xl border border-gray-200/50 backdrop-blur-sm">
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-900 leading-tight mb-0.5">
                    {user.name?.split(' ')[0] || 'User'}
                  </p>
                  <p className="text-[8px] font-medium text-green-600 uppercase tracking-[0.2em]">
                    {user.cnic ? `CNIC: ${user.cnic}` : 'VERIFIED USER'}
                  </p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600 transition-colors duration-200 p-2 hover:bg-red-50 rounded-full"
                  title="Logout"
                  aria-label="Logout"
                >
                  <i className="fas fa-sign-out-alt text-sm"></i>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-[#003d2b] to-[#006644] text-white font-medium text-xs lg:text-[11px] px-6 lg:px-8 py-3 lg:py-3.5 rounded-xl lg:rounded-2xl shadow-lg shadow-green-100/50 hover:scale-[1.02] transition-all duration-200 active:scale-95 uppercase tracking-[0.15em] lg:tracking-[0.2em]"
                >
                  Login
                </button>
              </div>
            )}
          </div>

          {/* Mobile User Action */}
          <div className="md:hidden flex items-center">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-medium text-gray-900">
                    {user.name?.split(' ')[0] || 'User'}
                  </p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600 p-2"
                  aria-label="Logout"
                >
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-[#003d2b] to-[#006644] text-white text-xs px-4 py-2.5 rounded-xl uppercase tracking-wide"
                aria-label="Login"
              >
                Login
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

                {/* Mobile User Info */}
                {user && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between px-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.name || 'User'}
                        </p>
                        <p className="text-xs text-green-600 uppercase tracking-wide mt-1">
                          {user.cnic ? `CNIC: ${user.cnic}` : 'VERIFIED'}
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
      </header>

      {/* Mobile Bottom Navigation (Alternative) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg">
        <div className="flex justify-around items-center px-2 py-3">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                pathname === item.path 
                  ? 'text-[#003d2b]' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              aria-label={item.label}
            >
              <i className={`fas ${item.icon} text-lg mb-1`}></i>
              <span className="text-[10px] font-medium uppercase tracking-wider">
                {item.label}
              </span>
            </Link>
          ))}
          <button 
            onClick={() => user ? handleLogout() : setIsAuthModalOpen(true)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
              user ? 'text-red-600' : 'text-gray-500 hover:text-gray-900'
            }`}
            aria-label={user ? 'Logout' : 'Login'}
          >
            <i className={`fas ${user ? 'fa-sign-out-alt' : 'fa-user'} text-lg mb-1`}></i>
            <span className="text-[10px] font-medium uppercase tracking-wider">
              {user ? 'Logout' : 'Account'}
            </span>
          </button>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

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

      {/* Spacer for mobile bottom nav */}
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default Navbar;