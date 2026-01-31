import React from 'react';

const HowItWorks = () => {
  const steps = [
    { 
      icon: 'fa-id-card', 
      title: 'One Account', 
      desc: 'Create one account and access all bookings anytime.' 
    },
    { 
      icon: 'fa-magnifying-glass', 
      title: 'Search & Compare', 
      desc: 'Explore events, travel, and living options easily.' 
    },
    { 
      icon: 'fa-bolt', 
      title: 'Book Instantly', 
      desc: 'Secure your ticket or stay in just a few clicks.' 
    },
    { 
      icon: 'fa-qrcode', 
      title: 'Easy Check-In', 
      desc: 'Use QR codes for smooth entry and check-in.' 
    },
  ];

  return (
    <div className="py-16 bg-gray-50 border border-gray-100"> {/* Reduced py-20 to py-16 */}
      <div className="text-center mb-12 space-y-3"> {/* Reduced mb-16 to mb-12 */}
        <span className="text-[12px] font-black text-green-600 uppercase tracking-[0.5em]">
          How It Works
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter"> {/* Reduced text sizes */}
          Simple & Seamless
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto"> {/* Added subtitle */}
          From booking to check-in, we make everything effortless
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 md:px-12 text-center"> {/* Reduced gap-12 to gap-8, adjusted padding */}
        {steps.map((step, idx) => (
          <div key={idx} className="space-y-4 group"> {/* Reduced space-y-6 to space-y-4 */}
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-900 text-2xl mx-auto shadow-lg group-hover:bg-[#003d2b] group-hover:text-white transition-all duration-500"> {/* Reduced size from w-20/h-20 to w-16/h-16 */}
              <i className={`fas ${step.icon}`}></i>
            </div>
            <h4 className="text-lg font-black text-gray-900">{step.title}</h4> {/* Reduced from text-xl to text-lg */}
            <p className="text-xs text-gray-600 leading-relaxed font-medium px-4"> {/* Changed text color to gray-600 for better readability */}
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;