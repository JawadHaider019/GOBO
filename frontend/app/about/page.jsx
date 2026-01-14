"use client";

import React from 'react';

const About = () => {
  const milestones = [
    { year: '2024', title: 'The Concept', desc: 'Identified the 40% fraud rate in physical ticket black marketing in Lahore & Karachi.' },
    { year: '2025', title: 'Beta Launch', desc: 'Secured 50,000+ bookings for the Pakistan Tech Summit with zero reported scalping.' },
    { year: '2026', title: 'Unified Protocol', desc: 'Integration of Bus, Air, and Apartment society nodes into one identity.' }
  ];

  const technologyStack = [
    { title: 'Identity Hashing', icon: 'fa-microchip', detail: 'Patented algorithm that creates a non-reversible cryptographic bond between a CNIC and a digital token.' },
    { title: 'Edge Verification', icon: 'fa-tower-broadcast', detail: 'Local nodes at stadium gates and bus terminals ensure verification works even during internet outages.' },
    { title: 'Biometric Bridge', icon: 'fa-fingerprint', detail: 'Optional facial and fingerprint secondary checks for high-security VIP zones and international flights.' }
  ];

  const processSteps = [
    { step: '01', title: 'Node Activation', desc: 'User binds their legal identity (CNIC) to the GO BOOKING secure vault.', icon: 'fa-user-shield' },
    { step: '02', title: 'Smart Minting', desc: 'Upon booking, a unique cryptographic hash is minted, exclusive to that user.', icon: 'fa-coins' },
    { step: '03', title: 'Dynamic Lock', desc: 'Tickets are locked to the holder\'s device, preventing unauthorized screenshots or duplicates.', icon: 'fa-lock' },
    { step: '04', title: 'Biometric Gate', desc: 'Entry is granted only after a real-time identity match at the physical venue.', icon: 'fa-sensor-on' }
  ];

  const teamMembers = [
    { name: 'Arsalan Khan', role: 'Chief Architect / CEO', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arsalan' },
    { name: 'Zainab Qazi', role: 'Head of Security Ops', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab' },
    { name: 'Hamza Malik', role: 'Lead Frontend Engineer', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hamza' },
    { name: 'Sana Ahmed', role: 'Regional Inclusion Lead', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sana' }
  ];

  const regions = [
    { name: 'Punjab Hub', city: 'Lahore', focus: 'Mass Transit & Concerts' },
    { name: 'Sindh Node', city: 'Karachi', focus: 'Corporate & Mega Events' },
    { name: 'KPK Network', city: 'Peshawar', focus: 'Tourism & Mountain Transit' },
    { name: 'Balochistan Portal', city: 'Quetta', focus: 'Inter-City Connectivity' }
  ];

  return (
    <div className="space-y-20 md:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[700px] w-full pk-gradient flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Crowd" />
        </div>
        <div className="relative z-10 text-center px-6 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom duration-1000">
           <span className="text-[#00ff88] text-[10px] md:text-xs font-black uppercase tracking-[0.6em] block">Establishing the Gold Standard</span>
           <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] italic">Identity is <br/>the Ticket.</h1>
           <p className="max-w-xl mx-auto text-gray-300 font-medium italic text-sm md:text-lg">"We didn't just build a booking app; we engineered a trust protocol for 240 million people."</p>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#003d2b] rounded-[3rem] p-12 md:p-16 text-white space-y-6 shadow-4xl relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 opacity-5 group-hover:rotate-12 transition-transform duration-700">
            <i className="fas fa-eye text-[12rem]"></i>
          </div>
          <span className="text-[#00ff88] text-[10px] font-black uppercase tracking-[0.4em]">Our Vision</span>
          <h2 className="text-4xl font-black italic tracking-tighter">A Nation Without <br/> Chaos.</h2>
          <p className="text-gray-300 italic font-medium leading-relaxed">
            "To build the world's most transparent and unified ticketing ecosystem, where every Pakistani citizen can access events, travel, and amenities with absolute digital dignity."
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-[3rem] p-12 md:p-16 text-gray-900 space-y-6 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 opacity-5 group-hover:rotate-12 transition-transform duration-700">
            <i className="fas fa-bullseye text-[12rem]"></i>
          </div>
          <span className="text-green-600 text-[10px] font-black uppercase tracking-[0.4em]">Our Mission</span>
          <h2 className="text-4xl font-black italic tracking-tighter">Securing the <br/> Transaction.</h2>
          <p className="text-gray-500 italic font-medium leading-relaxed">
            "To eradicate black marketing and scalping in Pakistan through cryptographic identity binding, ensuring fair pricing and seamless entry for every verified node holder."
          </p>
        </div>
      </section>

      {/* The Process Section */}
      <section className="bg-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">The Blueprint</span>
             <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter text-gray-900">How We Unify.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {processSteps.map((p, i) => (
              <div key={i} className="relative group">
                <div className="mb-8 relative">
                   <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-3xl text-[#003d2b] shadow-xl group-hover:bg-[#003d2b] group-hover:text-[#00ff88] transition-all duration-500">
                      <i className={`fas ${p.icon}`}></i>
                   </div>
                   <div className="absolute -top-4 -right-4 text-5xl font-black text-gray-100 italic select-none">
                     {p.step}
                   </div>
                </div>
                <h4 className="text-xl font-black italic text-gray-900 mb-2">{p.title}</h4>
                <p className="text-gray-400 text-sm font-medium italic leading-relaxed">{p.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[100%] w-full h-[2px] border-t-2 border-dashed border-gray-200 -z-10 translate-x-[-50%]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story & Milestones */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
         <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.4em]">The Journey</span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight italic">Solving the <br/>Chaos.</h2>
              <p className="text-gray-500 text-lg leading-relaxed font-medium italic">
                In 2024, booking a concert or a bus seat in Pakistan was a gamble. Duplicate tickets, "black" pricing, and lack of accountability were the norm.
              </p>
            </div>
            
            <div className="space-y-8">
               {milestones.map((m, i) => (
                 <div key={i} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                       <div className="w-12 h-12 rounded-full border-2 border-green-100 flex items-center justify-center font-black text-[#003d2b] group-hover:bg-[#003d2b] group-hover:text-white transition duration-500 italic">
                         {m.year}
                       </div>
                       {i < milestones.length - 1 && <div className="w-px h-full bg-green-100 my-2"></div>}
                    </div>
                    <div className="pb-8">
                       <h4 className="font-black text-xl text-gray-900 mb-1">{m.title}</h4>
                       <p className="text-gray-400 text-sm italic">{m.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
         <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-50 rounded-full blur-3xl opacity-50"></div>
            <div className="relative rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-4xl h-[500px] md:h-[750px] rotate-2">
               <img src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Data Visualization" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#003d2b] via-transparent to-transparent"></div>
               <div className="absolute bottom-12 left-12 right-12 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-green-400">Security Core v4.2</p>
                  <p className="text-2xl font-black italic">"Every hash is unique to the user's CNIC, making duplication mathematically impossible."</p>
               </div>
            </div>
         </div>
      </section>

      {/* Technology Stack Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-gray-50 rounded-[4rem] p-12 md:p-20 border border-gray-100 shadow-inner">
           <div className="text-center mb-16 space-y-4">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">The Infrastructure</span>
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-gray-900">The Digital Fortress</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {technologyStack.map((tech, i) => (
                <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-green-100/10 border border-gray-50 space-y-6 hover:-translate-y-2 transition duration-500">
                   <div className="w-14 h-14 bg-[#003d2b] rounded-2xl flex items-center justify-center text-[#00ff88] text-2xl shadow-lg">
                      <i className={`fas ${tech.icon}`}></i>
                   </div>
                   <h4 className="text-xl font-black italic text-gray-900">{tech.title}</h4>
                   <p className="text-gray-400 text-sm leading-relaxed italic">{tech.detail}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* The Architects (Team) Section */}
      <section className="max-w-7xl mx-auto px-6">
         <div className="text-center mb-24 space-y-4">
            <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.5em]">The Architects</span>
            <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter text-gray-900">Driven by Experts.</h2>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {teamMembers.map((member, i) => (
              <div key={i} className="text-center space-y-6 group">
                <div className="relative aspect-square rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-lg group-hover:shadow-2xl transition duration-500">
                   <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#003d2b]/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                </div>
                <div>
                  <h4 className="text-lg font-black text-gray-900 tracking-tight leading-tight">{member.name}</h4>
                  <p className="text-[9px] font-black text-green-600 uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
            ))}
         </div>
      </section>

      {/* Provincial Impact Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              {regions.map((region, i) => (
                <div key={i} className="bg-white border border-gray-100 p-8 rounded-[2.5rem] space-y-3 hover:border-green-300 transition-colors cursor-default shadow-sm">
                   <h5 className="text-[10px] font-black text-green-600 uppercase tracking-widest">{region.city}</h5>
                   <h4 className="text-xl font-black italic text-gray-900">{region.name}</h4>
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{region.focus}</p>
                </div>
              ))}
           </div>
           <div className="order-1 lg:order-2 space-y-8">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">National Reach</span>
              <h2 className="text-4xl md:text-7xl font-black italic text-gray-900 tracking-tighter leading-tight">Unity in <br/>Every Node.</h2>
              <p className="text-gray-500 text-lg leading-relaxed font-medium italic">
                From the bustling streets of Karachi to the peaks of Gilgit-Baltistan, GO BOOKING bridges the digital divide, offering every citizen a seat at the table of progress.
              </p>
           </div>
        </div>
      </section>

      {/* The Sustainability Section */}
      <section className="bg-emerald-950 py-32 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 p-20 opacity-10 rotate-45 pointer-events-none">
            <i className="fas fa-leaf text-[20rem]"></i>
         </div>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl space-y-10">
               <div className="space-y-4">
                  <span className="text-[#00ff88] text-[10px] font-black uppercase tracking-[0.4em]">Zero Waste Commitment</span>
                  <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter">Green Ticketing for a <br/>Greener Pakistan.</h2>
               </div>
               <p className="text-gray-300 text-lg md:text-xl font-medium italic leading-relaxed">
                 "By eliminating physical ticket printing for 2.4M+ bookings annually, we've saved 4,000+ trees and reduced urban waste across Pakistan's metropolitan hubs by 15%."
               </p>
               <div className="flex flex-wrap gap-8">
                  <div className="space-y-1">
                     <p className="text-3xl font-black text-[#00ff88]">4,200+</p>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trees Saved</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-3xl font-black text-[#00ff88]">12.5T</p>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CO2 Reduced</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-3xl font-black text-[#00ff88]">100%</p>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Paperless Ops</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Final Values Section */}
      <section className="max-w-7xl mx-auto px-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="bg-gray-50 p-12 md:p-16 rounded-[4rem] space-y-8 shadow-inner border border-gray-100">
               <h3 className="text-3xl font-black italic text-gray-900 tracking-tighter">The Leadership Philosophy</h3>
               <p className="text-gray-500 italic leading-relaxed">
                 "We believe that technology in Pakistan should serve to reduce friction, not increase complexity. GO BOOKING is built by Pakistanis, for Pakistanis, with a global standard of security."
               </p>
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gray-200 overflow-hidden shadow-xl">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Founder" alt="CEO" />
                  </div>
                  <div>
                    <p className="font-black text-gray-900">Arsalan Khan</p>
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Chief Architect</p>
                  </div>
               </div>
            </div>
            <div className="flex flex-col justify-center space-y-10">
               <div className="space-y-2">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Core Values</span>
                 <h2 className="text-4xl font-black text-gray-900 tracking-tighter italic">Built on Truth.</h2>
               </div>
               <div className="space-y-8">
                  {['Absolute Accountability', 'Data Minimalism', 'Inclusion for All Provinces'].map((val, i) => (
                    <div key={i} className="flex items-center gap-6 border-b border-gray-100 pb-4 group">
                       <span className="text-2xl font-black text-green-100 italic group-hover:text-green-500 transition duration-500">0{i+1}</span>
                       <span className="text-xl font-black text-gray-800 italic">{val}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slide-in-from-bottom {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-in {
          animation-duration: 1s;
          animation-timing-function: ease-out;
          animation-fill-mode: both;
        }
        
        .fade-in {
          animation-name: fade-in;
        }
        
        .slide-in-from-bottom {
          animation-name: slide-in-from-bottom;
        }
        
        .pk-gradient {
          background: linear-gradient(135deg, #003d2b 0%, #006644 100%);
        }
        
        .shadow-4xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default About;