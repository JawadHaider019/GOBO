// app/contact/page.jsx
"use client";

import React, { useState } from 'react';
import HeroSection from '../../components/HeroSection';
import CTA from '../../components/CTA';
import FAQSection from '../../components/FAQSection';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  });

  const contactMethods = [
    {
      title: "Customer Support",
      email: "support@gobo.pk",
      phone: "+92 300 123 4567",
      hours: "24/7 Available",
      icon: "fa-headset",
      response: "Avg response: 2 hours"
    },
    {
      title: "Business Inquiries",
      email: "partners@gobo.pk",
      phone: "+92 300 123 4567",
      hours: "Mon-Fri, 9AM-6PM",
      icon: "fa-briefcase",
      response: "Within 24 hours"
    },
    {
      title: "Vendor Support",
      email: "vendor@gobo.pk",
      phone: "+92 300 123 4567",
      hours: "Mon-Sat, 9AM-8PM",
      icon: "fa-store",
      response: "Priority support"
    }
  ];

  const offices = [
    {
      city: "Islamabad",
      address: "Office 5, Blue Area, Jinnah Avenue, Islamabad",
      phone: "+92 51 123 4567",
      email: "islamabad@gobo.pk",
      icon: "fa-building"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent! We\'ll get back to you soon.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-12 md:space-y-20 pb-12">
      {/* Hero Section */}
      <HeroSection
        title="Get in Touch"
        description="Have questions about bookings, partnerships, or our platform? We're here to help 24/7."
        badge="Contact Us"
        imageOpacity={100}
        overlayOpacity={50}
        overlayGradientFrom="#003d2b"
        overlayGradientTo="#006644"
      />

      {/* Contact Methods Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12 space-y-2 md:space-y-4">
          <span className="text-[10px] md:text-[12px] font-black text-gray-400 uppercase tracking-[0.5em]">
            How to Reach Us
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter">
            We're Here to Help
          </h2>
          <p className="text-gray-400 text-xs md:text-sm max-w-lg mx-auto px-4">
            Choose the best way to connect with our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="group bg-white p-6 md:p-8 rounded-xl md:rounded-2xl border border-gray-100 hover:border-green-200 shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-[#003d2b]/10 to-[#006644]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-sm md:shadow-md group-hover:shadow-lg md:group-hover:shadow-xl group-hover:bg-gradient-to-r group-hover:from-[#003d2b] group-hover:to-[#006644] transition-all duration-300">
                <i className={`fas ${method.icon} bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent group-hover:text-white text-xl md:text-2xl`}></i>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{method.title}</h3>
              <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-envelope text-xs text-gray-400 w-4"></i>
                  <a href={`mailto:${method.email}`} className="text-xs md:text-sm hover:text-[#006644] transition-colors break-all">
                    {method.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-phone text-xs text-gray-400 w-4"></i>
                  <a href={`tel:${method.phone}`} className="text-xs md:text-sm hover:text-[#006644] transition-colors">
                    {method.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-clock text-xs text-gray-400 w-4"></i>
                  <span className="text-xs md:text-sm">{method.hours}</span>
                </div>
              </div>
              <div className="pt-3 md:pt-4 border-t border-gray-50">
                <p className="text-[10px] md:text-xs text-gray-500 flex items-center gap-1">
                  <i className="fas fa-reply text-[8px] md:text-[10px]"></i>
                  {method.response}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-gray-100 shadow-md md:shadow-xl hover:shadow-lg md:hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-200 focus:border-[#006644] focus:ring-1 focus:ring-[#006644] outline-none transition-all duration-300 text-sm shadow-sm hover:shadow-md"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-200 focus:border-[#006644] focus:ring-1 focus:ring-[#006644] outline-none transition-all duration-300 text-sm shadow-sm hover:shadow-md"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-200 focus:border-[#006644] focus:ring-1 focus:ring-[#006644] outline-none transition-all duration-300 text-sm shadow-sm hover:shadow-md"
                      placeholder="+92 300 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Inquiry Type
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-200 focus:border-[#006644] focus:ring-1 focus:ring-[#006644] outline-none transition-all duration-300 text-sm shadow-sm hover:shadow-md"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="support">Customer Support</option>
                      <option value="business">Business Inquiry</option>
                      <option value="vendor">Vendor Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-200 focus:border-[#006644] focus:ring-1 focus:ring-[#006644] outline-none transition-all duration-300 text-sm shadow-sm hover:shadow-md resize-none"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#003d2b] to-[#006644] text-white py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-sm md:text-base shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl hover:shadow-green-300/50 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1"
                >
                  Send Message
                  <i className="fas fa-paper-plane ml-2 text-xs md:text-sm"></i>
                </button>
              </form>
            </div>
          </div>

          {/* Quick Info */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="bg-gradient-to-r from-[#003d2b]/5 to-[#006644]/5 p-5 md:p-8 rounded-xl md:rounded-2xl border border-[#003d2b]/20 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Support Hours</h3>
              <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-4">We're Always Here for You</h4>
              <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6">
               Our customer support team is available 24/7 to assist you with any questions.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center shadow-sm md:shadow-md">
                    <i className="fas fa-clock text-[#006644] text-sm md:text-base"></i>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-gray-500">Phone Support</p>
                    <p className="text-xs md:text-sm font-semibold text-gray-900">24/7</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center shadow-sm md:shadow-md">
                    <i className="fas fa-check-circle text-[#006644] text-sm md:text-base"></i>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-gray-500">Email Response</p>
                    <p className="text-xs md:text-sm font-semibold text-gray-900">2-4 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-gray-100 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Follow Us</h3>
              <div className="flex gap-3 md:gap-4">
                {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-lg md:rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-[#003d2b] hover:to-[#006644] group transition-all duration-300 shadow-sm md:shadow-md hover:shadow-lg md:hover:shadow-xl"
                  >
                    <i className={`fab fa-${social} text-gray-600 group-hover:text-white text-sm md:text-base transition-colors duration-300`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-12 space-y-2 md:space-y-4">
            <span className="text-[10px] md:text-[12px] font-black text-gray-400 uppercase tracking-[0.5em]">
              Our Offices
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter">
              Visit Us in Person
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {offices.map((office, index) => (
              <div
                key={index}
                className="bg-white p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 hover:border-[#006644]/30 shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 group max-w-2xl mx-auto w-full"
              >
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-[#003d2b]/10 to-[#006644]/10 rounded-lg md:rounded-xl flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#003d2b] group-hover:to-[#006644] transition-all duration-300 shadow-sm md:shadow-md">
                    <i className={`fas ${office.icon} bg-gradient-to-r from-[#003d2b] to-[#006644] bg-clip-text text-transparent group-hover:text-white text-base md:text-xl`}></i>
                  </div>
                  <span className="text-[10px] md:text-xs font-semibold text-[#006644] bg-[#006644]/10 px-2 md:px-3 py-1 rounded-full shadow-sm">
                    {office.city}
                  </span>
                </div>
                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">{office.address}</p>
                <div className="space-y-1 md:space-y-2">
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <i className="fas fa-phone text-[10px] md:text-xs text-gray-400 w-3 md:w-4"></i>
                    <a href={`tel:${office.phone}`} className="text-gray-600 hover:text-[#006644]">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <i className="fas fa-envelope text-[10px] md:text-xs text-gray-400 w-3 md:w-4"></i>
                    <a href={`mailto:${office.email}`} className="text-gray-600 hover:text-[#006644] break-all">
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection/>
      <CTA />
    </div>
  );
};

export default Contact;