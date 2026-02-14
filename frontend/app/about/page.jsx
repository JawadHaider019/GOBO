"use client";

import React from 'react';
import HowItWorks from '../../components/HowItWorks';
import CTA from '../../components/CTA';
import HeroSection from '../../components/HeroSection';

const About = () => {
  const whatWeDo = [
    { 
      title: "Events & Concerts", 
      icon: "fa-ticket-alt",
      desc: "Book tickets for your favorite events and shows"
    },
    { 
      title: "Bus & Transport", 
      icon: "fa-bus",
      desc: "Secure seats for inter-city travel"
    },
    { 
      title: "Hotels & Living", 
      icon: "fa-building",
      desc: "Find hotels, hostels, and apartments"
    },
    { 
      title: "Cinema & Entertainment", 
      icon: "fa-film",
      desc: "Movie tickets and entertainment bookings"
    },
    { 
      title: "Tours & Activities", 
      icon: "fa-compass",
      desc: "Discover and book local experiences"
    },
    { 
      title: "Corporate Events", 
      icon: "fa-briefcase",
      desc: "Professional event management tools"
    }
  ];

  const values = [
    { title: "Simplicity", desc: "Easy for everyone", icon: "fa-thumbs-up" },
    { title: "Reliability", desc: "Book with confidence", icon: "fa-shield-alt" },
    { title: "Accessibility", desc: "Available anywhere", icon: "fa-mobile-alt" },
    { title: "Growth", desc: "Built to scale", icon: "fa-chart-line" },
    { title: "Digital First", desc: "Moving bookings online", icon: "fa-laptop" }
  ];

  const futureFeatures = [
    "Smarter vendor tools",
    "Better discovery features",
    "Enhanced user experience",
    "Wider category coverage",
    "Mobile app development",
    "Loyalty programs"
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* Hero Section */}
<HeroSection
  title="Simple Bookings. Smarter Access."
  description="GoBo is a digital booking and ticket management platform built to make everyday bookings easier across Pakistan."
  badge="About GoBo"
  imageOpacity={100}
  overlayOpacity={50}
  overlayGradientFrom="#003d2b"
  overlayGradientTo="#006644"
/>

      {/* What We Do Section - Updated Design */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <span className="text-[12px] font-black text-gray-400 uppercase tracking-[0.5em]">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">
            Your Booking Hub
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">
            Everything you need in one platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whatWeDo.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#003d2b]/10 to-[#006644]/10 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#003d2b] group-hover:to-[#006644] transition-all duration-300">
                  <i className={`fas ${item.icon} bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent group-hover:text-white text-lg`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <span className="bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent text-xs font-semibold inline-flex items-center gap-1">
                  Explore Category
                  <i className="fas fa-arrow-right text-xs"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-white to-[#003d2b]/5 rounded-2xl p-8 md:p-10 border border-[#003d2b]/20 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-[#003d2b]/10 to-[#006644]/10 rounded-2xl flex items-center justify-center">
                <i className="fas fa-eye bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent text-xl"></i>
              </div>
              <div>
                <span className="text-[12px] font-black bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent uppercase tracking-[0.3em]">Our Vision</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">
              One Platform for Everyday Bookings
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              To become Pakistan's most trusted digital marketplace for tickets and reservations, 
              where people can discover, book, and manage experiences with confidence.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-white to-[#006644]/5 rounded-2xl p-8 md:p-10 border border-[#006644]/20 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-[#003d2b]/10 to-[#006644]/10 rounded-2xl flex items-center justify-center">
                <i className="fas fa-bullseye bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent text-xl"></i>
              </div>
              <div>
                <span className="text-[12px] font-black bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent uppercase tracking-[0.3em]">Our Mission</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">
              Making Booking Simple & Reliable
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Simplify how people book tickets and stays, help vendors manage bookings digitally, 
              reduce manual errors, and promote paperless, QR-based verification.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Component */}
      <HowItWorks />

      {/* Why GoBo Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 space-y-4">
            <span className="text-[12px] font-black text-gray-400 uppercase tracking-[0.5em]">
              Why Choose GoBo
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">
              Built for Pakistan
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                "Designed for local booking needs",
                "Supports multiple cities and categories",
                "Easy-to-use interface",
                "Digital-first, paperless system",
                "Vendor-friendly tools",
                "24/7 customer support",
                "Secure payment processing",
                "Real-time availability"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-gradient-to-r from-[#003d2b]/20 to-[#006644]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-gradient-to-r group-hover:from-[#003d2b] group-hover:to-[#006644] transition-all duration-300">
                    <i className="fas fa-check bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent group-hover:text-white text-xs"></i>
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{item}</span>
                </div>
              ))}
              <p className="mt-6 text-gray-500 italic text-sm">
                No exaggerated claims. Just practical solutions.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#003d2b]/10 to-[#006644]/10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-shield-alt bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Our Commitment</h3>
              </div>
              <p className="text-gray-600 mb-6">
                We believe booking platforms should be transparent, reliable, and user-friendly.
              </p>
              <div className="space-y-4">
                {[
                  { text: "Clear pricing with no hidden charges", icon: "fa-tag" },
                  { text: "Secure data protection", icon: "fa-lock" },
                  { text: "Reliable at scale", icon: "fa-server" },
                  { text: "Fast booking process", icon: "fa-bolt" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#003d2b]/10 to-[#006644]/10 rounded-lg flex items-center justify-center">
                      <i className={`fas ${item.icon} bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent text-sm`}></i>
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 space-y-4">
            <span className="text-[12px] font-black text-gray-400 uppercase tracking-[0.5em]">
              Our Values
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">
              Built on Trust & Simplicity
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 px-4 md:px-12 text-center">
            {values.map((value, index) => (
              <div key={index} className="space-y-4 group cursor-pointer">
                <div className="relative mx-auto">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-gray-900 text-2xl mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-[#003d2b] group-hover:to-[#006644]">
                    <i className={`fas ${value.icon} bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent group-hover:text-white transition-all duration-500`}></i>
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#003d2b]/20 to-[#006644]/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10"></div>
                </div>
                <h3 className="text-lg font-black text-gray-900 group-hover:bg-gradient-to-r group-hover:from-[#003d2b] group-hover:to-[#006644] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {value.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-medium px-4">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="bg-gradient-to-r from-[#003d2b]/5 to-[#006644]/5 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#003d2b]/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="lg:w-2/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#003d2b]/10 to-[#006644]/10 rounded-2xl flex items-center justify-center">
                    <i className="fas fa-leaf bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent text-xl"></i>
                  </div>
                  <div>
                    <span className="text-[12px] font-black bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent uppercase tracking-[0.3em]">
                      Sustainability
                    </span>
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Paperless by Design
                </h2>
                <p className="text-gray-600 text-sm">
                  By using digital tickets and confirmations, GoBo helps reduce paper usage and supports eco-friendly booking practices across Pakistan.
                </p>
              </div>
              
              <div className="lg:w-3/5">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-b from-[#003d2b]/10 to-white p-6 rounded-2xl text-center border border-[#003d2b]/20 hover:border-[#003d2b] transition-all duration-300">
                    <p className="text-3xl font-bold bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent mb-2">100%</p>
                    <p className="text-sm text-gray-600 font-medium">Paperless Operations</p>
                  </div>
                  <div className="bg-gradient-to-b from-[#003d2b]/10 to-white p-6 rounded-2xl text-center border border-[#006644]/20 hover:border-[#006644] transition-all duration-300">
                    <p className="text-3xl font-bold bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent mb-2">24/7</p>
                    <p className="text-sm text-gray-600 font-medium">Digital Access</p>
                  </div>
                  <div className="bg-gradient-to-b from-[#003d2b]/10 to-white p-6 rounded-2xl text-center border border-[#003d2b]/20 hover:border-[#003d2b] transition-all duration-300">
                    <p className="text-3xl font-bold bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent mb-2">0</p>
                    <p className="text-sm text-gray-600 font-medium">Physical Waste</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Looking Ahead Section */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 space-y-4">
            <span className="text-[12px] font-black text-gray-400 uppercase tracking-[0.5em]">
              Looking Ahead
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">
              Continuously Evolving
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">
              As the platform grows, we aim to introduce new features and improvements.
            </p>
          </div>
          
          <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {futureFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-[#006644] hover:shadow-md transition-all duration-300 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#003d2b]/10 to-[#006644]/10 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#003d2b] group-hover:to-[#006644] transition-all duration-300">
                    <i className="fas fa-plus bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent group-hover:text-white text-sm"></i>
                  </div>
                  <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors duration-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <CTA/>
    </div>
  );
};

export default About;