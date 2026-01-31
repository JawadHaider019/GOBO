"use client";

import { useState, useEffect, useCallback } from 'react';

const Hero = () => {
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mobile and desktop optimized slides with navigation links
  const slides = [
    {
      id: 1,
      title: "Smart Events Access",
      link: "/services#events",
      mobileImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800&h=1200",
      desktopImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1920&h=1080",
      color: "bg-gradient-to-br from-green-900/30 to-emerald-700/20"
    },
    {
      id: 2,
      title: "Unified Transit Hub",
      link: "/services#transport",
      mobileImage: "14AGM.png ",
      desktopImage: "14AG.jpg",
      color: "bg-gradient-to-br from-blue-900/30 to-cyan-700/20"
    },
    {
      id: 3,
      title: "Community Amenities",
      link: "/services#housing",
      mobileImage: "https://images.unsplash.com/photo-1486406146926-c627a92fb1ab?auto=format&fit=crop&q=80&w=800&h=1200",
      desktopImage: "/Safari-Basant.jpg",
      color: "bg-gradient-to-br from-emerald-900/30 to-teal-700/20"
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  return (
    <section className="relative h-[75vh] md:h-[90vh] w-full overflow-hidden -mt-16 md:-mt-20">
      {/* Image Slider */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background images with responsive sizes */}
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={slide.desktopImage}
              />
              <img
                src={slide.mobileImage}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </picture>
            
            {/* Gradient overlay */}
            <div className={`absolute inset-0 ${slide.color}`}></div>
            
            {/* Navigation Link - Full screen clickable area */}
            <a
              href={slide.link}
              className="absolute inset-0 z-20 cursor-pointer"
              aria-label={`Navigate to ${slide.title}`}
            />
            
          </div>
        ))}
        
        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition-all duration-300 group border border-white/20"
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left text-white text-base md:text-xl group-hover:scale-110 transition-transform"></i>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition-all duration-300 group border border-white/20"
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right text-white text-base md:text-xl group-hover:scale-110 transition-transform"></i>
        </button>
        
        {/* Slide dots */}
        <div className="absolute  bottom-12 right-4 md:right-8 flex items-center gap-1.5 md:gap-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 border border-white/30 ${
                index === currentSlide 
                  ? 'bg-white w-5 md:w-6 shadow-lg' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;