"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const CTA = () => {
  const router = useRouter();

  const handleStartBooking = () => {
    router.push('/marketplace');
  };

  return (
    <section className="relative overflow-hidden py-10 bg-gradient-to-b from-gray-50 via-white to-emerald-50/30 ">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-green-100/30 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8">
          {/* Badge */}
          <span className="text-[12px] font-black text-green-600 uppercase tracking-[0.5em]">
            Trusted Nationwide
          </span>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
              <span className="bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent">
                Built in Pakistan
              </span>
              <br />
              <span className="text-gray-900">
                For Everyday Life
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
            Join <span className="font-bold text-green-600">thousands of users</span> across 
            Pakistan who trust GoBo for their everyday booking needs. 
            Simple, reliable, and designed for you.
          </p>

          {/* CTA Button with enhanced interaction */}
          <div className="flex items-end">
            <button 
              onClick={handleStartBooking}
              className="px-14 py-5 bg-gradient-to-r from-[#003d2b] to-[#006644] text-white font-black py-4 rounded-2xl hover:shadow-xl hover:shadow-green-200/50 transition-all duration-300 uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <i className="fas fa-arrow mr-2"></i>
              Start Booking Now
            </button>
          </div>

          {/* Trust indicators */}
          {/* <div className="pt-12 border-t border-gray-100 mt-12">
            <p className="text-sm text-gray-500 mb-6">Trusted by businesses across Pakistan</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              <div className="w-24 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
              <div className="w-20 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
              <div className="w-28 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
              <div className="w-24 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default CTA;