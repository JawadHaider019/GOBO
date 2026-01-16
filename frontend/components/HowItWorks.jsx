// HowItWorks.jsx
import React from 'react';

const HowItWorks = () => {
  const steps = [
    { 
      icon: 'fa-id-card', 
      title: 'One Identity', 
      desc: 'Secure CNIC binding for all ticketing operations.' 
    },
    { 
      icon: 'fa-magnifying-glass', 
      title: 'Smart Search', 
      desc: 'Find events, transit, and slots in one sweep.' 
    },
    { 
      icon: 'fa-bolt-lightning', 
      title: 'Instant Pass', 
      desc: 'Digital tokens issued to your vault instantly.' 
    },
    { 
      icon: 'fa-shield-halved', 
      title: 'Secure Entry', 
      desc: 'Verification at the gate with biometrics/QR.' 
    },
  ];

  return (
    <div className="py-20 rounded-[4rem] bg-gray-50 border border-gray-100">
      <div className="text-center mb-16 space-y-4">
        <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.5em]">
          The Unified Workflow
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">
          Seamlessly Smart
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 text-center">
        {steps.map((step, idx) => (
          <div key={idx} className="space-y-6 group">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-gray-900 text-3xl mx-auto shadow-xl group-hover:bg-[#003d2b] group-hover:text-white transition-all duration-500">
              <i className={`fas ${step.icon}`}></i>
            </div>
            <h4 className="text-xl font-black">{step.title}</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;