"use client";

import React, { useEffect, useState, useRef } from 'react';
import { FaUsers, FaSearch, FaCreditCard, FaQrcode } from 'react-icons/fa';

const AnimatedNumber = ({ value, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 2000; // 2 seconds
          const increment = end / (duration / 16); // 60fps
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setDisplayValue(end);
              clearInterval(timer);
            } else {
              setDisplayValue(Math.floor(start));
            }
          }, 16);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
};

const Stats = () => {
  const stats = [
    {
      numericValue: 500,
      suffix: "K+",
      label: "Active Users",
      icon: FaUsers,
    },
    {
      numericValue: 50,
      suffix: "K+",
      label: "Daily Searches",
      icon: FaSearch,
    },
    {
      numericValue: 200,
      suffix: "K+",
      label: "Successful Bookings",
      icon: FaCreditCard,
    },
    {
      numericValue: 100,
      suffix: "%",
      label: "QR Check-ins",
      icon: FaQrcode,
    }
  ];

  return (
    <section className="py-16 px-6 relative overflow-hidden"> {/* Reduced padding to match other sections */}
      {/* Decorative background elements - subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-100 rounded-full blur-[100px] opacity-20"></div> {/* Reduced opacity */}
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-50 rounded-full blur-[100px] opacity-20"></div> {/* Reduced opacity */}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header section - matching HowItWorks style */}
        <div className="text-center mb-12 space-y-3"> {/* Reduced mb-20 to mb-12 */}
          <span className="text-[12px] font-black text-green-600 uppercase tracking-[0.5em]">
            Trusted Platform
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter"> {/* Removed italic, reduced size */}
            Numbers That Matter
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base"> {/* Removed italic, changed color */}
            Real-time metrics that showcase our platform's performance
          </p>
        </div>

        {/* Stats grid - adjusted for 4 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"> {/* Changed to 4 columns on desktop */}
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="group text-center"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  animation: `fadeInUp 0.8s ease-out ${index * 0.15}s forwards`
                }}
              >
                {/* Icon container - smaller like HowItWorks */}
                <div className="mb-6 mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-[#003d2b] transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl border border-gray-100"> {/* Reduced size */}
                  <IconComponent className="text-green-600 text-2xl group-hover:text-white transition-colors duration-500" /> {/* Reduced icon size */}
                </div>
                
                {/* Animated number - adjusted size */}
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tighter group-hover:text-[#003d2b] transition-colors duration-500"> {/* Reduced size */}
                  <AnimatedNumber value={stat.numericValue} suffix={stat.suffix} />
                </div>
                
                {/* Label - matching text style */}
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-600 max-w-[180px] mx-auto leading-relaxed group-hover:text-gray-900 transition-colors duration-500"> {/* Changed color */}
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;