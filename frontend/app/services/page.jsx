"use client";

import React from 'react';
import { 
  FaTicketAlt, 
  FaBus, 
  FaBuilding, 
  FaFilm,
  FaCompass,
  FaBriefcase,
  FaStore,
  FaWallet,
  FaQrcode,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaMobileAlt,
  FaCheckCircle
} from 'react-icons/fa';
import HeroSection from '@/components/HeroSection';

const Services = () => {
  const serviceCategories = [
    {
      id: 'events',
      title: 'Event Ticketing',
      tagline: 'Smart Event Booking',
      desc: 'Sell and manage event tickets digitally with QR-based validation. Our system helps organizers and users enjoy smoother bookings and faster entry.',
      features: [
        'Digital ticket generation',
        'QR-based entry validation', 
        'Seat & capacity management',
        'Real-time availability',
        'Organizer dashboard',
        'Discount & promo support'
      ],
      cta: 'Perfect for concerts, conferences, festivals & shows.',
      icon: FaTicketAlt,
      color: 'from-[#003d2b] to-[#006644]',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'transport',
      title: 'Transport Booking',
      tagline: 'Unified Transit Hub',
      desc: 'Book inter-city travel across Pakistan from one platform. Designed for bus operators and travelers alike.',
      features: [
        'Bus seat booking',
        'Route & schedule search',
        'Digital boarding confirmation',
        'Booking history & refunds',
        'Vendor & fleet management'
      ],
      cta: 'Explore transport options across cities',
      icon: FaBus,
      color: 'from-[#003d2b] to-[#006644]',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'living',
      title: 'Living & Stays',
      tagline: 'Hotels, Hostels & Apartments',
      desc: 'Manage and book short- or long-stay options under one system. Supports hotels, hostels, and apartments.',
      features: [
        'Date-based availability',
        'Room / bed selection',
        'Stay duration pricing',
        'Digital booking confirmation',
        'Property owner dashboard'
      ],
      cta: 'Find accommodation that fits your needs',
      icon: FaBuilding,
      color: 'from-[#003d2b] to-[#006644]',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'entertainment',
      title: 'Cinema & Entertainment',
      tagline: 'Digital Entertainment Access',
      desc: 'Book movie tickets and entertainment experiences with ease. Enjoy instant confirmation and digital access.',
      features: [
        'Show-time listings',
        'Seat selection',
        'Digital QR tickets',
        'Instant confirmation',
        'Multiple payment options'
      ],
      cta: 'Book your next movie night',
      icon: FaFilm,
      color: 'from-[#003d2b] to-[#006644]',
     image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=800' },
    {
      id: 'tours',
      title: 'Tours & Activities',
      tagline: 'Discover Local Experiences',
      desc: 'Enable users to explore and book tours, attractions, and activities across Pakistan.',
      features: [
        'Tour packages & schedules',
        'Group or individual booking',
        'Digital vouchers',
        'Guide/vendor management',
        'Local experience discovery'
      ],
      cta: 'Explore Pakistan like never before',
      icon: FaCompass,
      color: 'from-[#003d2b] to-[#006644]',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'corporate',
      title: 'Corporate & Private Events',
      tagline: 'Solutions for Businesses',
      desc: 'Tools designed for corporate events, private functions, and large group bookings.',
      features: [
        'Bulk ticket booking',
        'Guest list management',
        'QR check-in support',
        'Event reporting',
        'Corporate dashboard'
      ],
      cta: 'Streamline your corporate events',
      icon: FaBriefcase,
      color: 'from-[#003d2b] to-[#006644]',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const platformFeatures = [
    {
      title: 'Vendor & Partner Tools',
      desc: 'Built to Scale With You',
      features: [
        'Booking & inventory management',
        'Pricing & availability control',
        'Sales analytics & reports',
        'QR ticket validation tools',
        'Payout & settlement tracking'
      ],
      icon: FaStore,
      color: 'bg-gradient-to-r from-[#003d2b] to-[#006644]'
    },
    {
      title: 'Payment & Wallet System',
      desc: 'Secure Digital Payments',
      features: [
        'Multiple payment methods',
        'Booking wallet & history',
        'Refund & cancellation handling',
        'Transaction transparency',
        'Secure payment processing'
      ],
      icon: FaWallet,
      color: 'bg-gradient-to-r from-[#003d2b] to-[#006644]'
    }
  ];

  const futureFeatures = [
    {
      title: 'Marketplace & Resale',
      desc: 'Managed Resale Support',
      features: [
        'Verified seller profiles',
        'Organizer-defined resale rules',
        'Transparent pricing display',
        'Platform-managed payments'
      ],
      note: 'Subject to policy and event rules',
      icon: FaUsers
    }
  ];

  return (
    <div className="space-y-20 md:space-y-32 pb-20">

      <HeroSection
  title="Powering Everyday Bookings"
  subtitle="The Ecosystem Capabilities"
  description="From daily travel to major events and stays, GoBo provides a unified digital platform to manage bookings simply and efficiently."
  badge="Our Services"
  backgroundImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600"
  opacity={15}
/>

      {/* Main Services Grid */}
      <section className="max-w-7xl mx-auto px-6 space-y-32">
        {serviceCategories.map((service, idx) => (
          <div 
            key={service.id} 
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
              idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Content */}
            <div className={`space-y-8 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                  <service.icon />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-sm font-bold text-[#003d2b] uppercase tracking-wider">
                    {service.tagline}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed text-lg">
                {service.desc}
              </p>
              
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900">Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-[#006644]/20 hover:shadow-sm transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-[#003d2b]/10 to-[#006644]/10 rounded-lg flex items-center justify-center">
                        <FaQrcode className="text-[#006644] text-sm" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-gray-500 italic text-sm mb-6">
                  {service.cta}
                </p>
                <button className="bg-gradient-to-r from-[#003d2b] to-[#006644] text-white font-bold px-8 py-4 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm">
                  Explore {service.title.split(' ')[0]}
                </button>
              </div>
            </div>

            {/* Image */}
            <div className={`relative ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#003d2b] to-[#006644] rounded-3xl rotate-3 scale-105 opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
                <img 
                  src={service.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  alt={service.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Platform Features */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[12px] font-black text-gray-400 uppercase tracking-[0.5em] block">
              Platform Infrastructure
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mt-4">
              Built to Scale With You
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {platformFeatures.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 ${feature.color} text-white rounded-2xl flex items-center justify-center text-2xl`}>
                    <feature.icon />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-[#006644] font-semibold">{feature.desc}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {feature.features.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-[#003d2b]/10 to-[#006644]/10 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="text-[#006644] text-xs" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Future Features */}
          <div className="mt-16 bg-gradient-to-r from-[#003d2b]/5 to-[#006644]/5 rounded-3xl p-8 border border-[#003d2b]/10">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl text-[#003d2b] border border-[#003d2b]/20">
                <FaUsers />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{futureFeatures[0].title}</h3>
                  <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                    Future-Ready
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{futureFeatures[0].desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {futureFeatures[0].features.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FaCalendarAlt className="text-[#006644]" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-gray-500 italic">
                  {futureFeatures[0].note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;