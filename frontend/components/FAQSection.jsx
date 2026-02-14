"use client";

import React, { useState } from 'react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is GoBo?",
      answer: "GoBo (Go and Book) is a digital booking & ticket management platform that allows users to book tickets for events, travel, entertainment, and more. All tickets are delivered digitally and validated using QR-based scanning."
    },
    {
      question: "How does GoBo work?",
      answer: "Users can browse available tickets, book online, and receive a digital QR ticket in their account. At the venue or entry point, the QR code is scanned to verify the ticket and allow entry."
    },
    {
      question: "Do I need to create an account to book tickets?",
      answer: "Yes. Creating an account is required to manage bookings, access tickets, and ensure secure usage of digital tickets."
    },
    {
      question: "Why is ID no. needed during booking?",
      answer: "We verify ID during booking confirmation to match the ticket purchaser with the actual user. This prevents fraud, ticket scalping, and unauthorized resales. It ensures that only the legitimate ticket holder can use the booking, making the platform more secure for everyone."
    },
    {
      question: "How do QR-based tickets work?",
      answer: "Each booking generates a unique QR code. The QR code can be scanned only once. Duplicate or reused tickets are automatically rejected. This helps prevent ticket fraud and unauthorized access."
    },
    {
      question: "Can I transfer my ticket to someone else?",
      answer: "Ticket transfer depends on the event or vendor's policy. Some tickets may allow transfer, while others are strictly non-transferable. Details are shown on the ticket page."
    },
    {
      question: "What payment methods are supported?",
      answer: "GoBo supports secure online payments through integrated payment gateways. Available payment options may vary depending on the service and location."
    },
    {
      question: "Where can I find my booked tickets?",
      answer: "All your tickets are available in My Wallet within your account. You can view ticket details, QR codes, and booking history anytime."
    },
    {
      question: "Can I cancel or refund my ticket?",
      answer: "Cancellation and refund policies depend on the vendor or event organizer. If refunds are allowed, the terms will be clearly mentioned before booking."
    },
    {
      question: "Are vendors on GoBo verified?",
      answer: "Yes. All vendors go through an approval process before listing tickets on GoBo to ensure reliability and authenticity."
    },
    {
      question: "What happens if my QR code doesn't work at entry?",
      answer: "If a QR code cannot be validated, venue staff can recheck the ticket status through the system. Tickets that are already used, cancelled, or invalid will not be accepted."
    },
    {
      question: "Is GoBo available on mobile?",
      answer: "GoBo is accessible through web browsers and is designed to work smoothly on both desktop and mobile devices. A dedicated mobile app may be introduced in future versions."
    },
    {
      question: "How can I contact GoBo support?",
      answer: "You can reach us through the Contact Us page or email our support team for any booking-related assistance."
    }
  ];

  return (
    <div className="bg-gray-50 overflow-hidden w-full py-6 md:py-4">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-2 md:space-y-4">
          <span className="text-[10px] sm:text-[12px] font-black text-green-600 uppercase tracking-[0.4em] sm:tracking-[0.5em]">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-black tracking-tighter px-2">
            Clear Answers, Smooth Experience
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto mt-1 md:mt-2 font-medium px-4">
            Get quick answers about booking, payments, and more.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 md:space-y-4 max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-gray-100 rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'shadow-md md:shadow-lg' : 'shadow-sm hover:shadow-md'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 flex items-center justify-between transition-colors duration-200 gap-2 sm:gap-3 ${
                  openIndex === index ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start sm:items-center gap-2 sm:gap-3 md:gap-4 flex-1">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#003d2b] flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0 mt-0.5 sm:mt-0">
                    {index + 1}
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 text-left leading-tight">
                    {faq.question}
                  </h3>
                </div>
                <div className={`transform transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <i className={`fas fa-chevron-down text-[#003d2b] text-xs sm:text-sm md:text-base lg:text-lg`}></i>
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 sm:px-5 md:px-6 pb-3 sm:pb-4 md:pb-5 pt-1 sm:pt-2">
                  <div className="pl-0 sm:pl-2 md:pl-8 lg:pl-12">
                    <div className="border-l-2 border-green-300 pl-3 sm:pl-4">
                      <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FAQSection;