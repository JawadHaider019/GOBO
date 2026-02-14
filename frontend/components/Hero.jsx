"use client";

import { useState, useEffect, useCallback } from 'react';

const Hero = () => {
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [screenSize, setScreenSize] = useState('desktop');

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else {
        setScreenSize('desktop');
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Mobile and desktop optimized slides with navigation links
  const slides = [
   
    {
      id: 1,
      title: "Unified Transit Hub",
      link: "/services#transport",
      Image: "14AG.jpg",
      color: "bg-black/5"
    },
    {
      id: 2,
      title: "Community Amenities",
      link: "/services#housing",
      Image: "/Safari-Basant.jpg",
     color: "bg-black/5"
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

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
    <div className="relative w-full bg-gray-900" aria-label="Hero banners" role="region">
      <style>{`
        /* Desktop specific styles */
        @media (min-width: 768px) {
          .hero-container {
            height: 90vh;
          }
        }
      `}</style>
      
      <div className="relative w-full hero-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            style={{
              position: index === currentSlide ? 'relative' : 'absolute',
              height: screenSize === 'mobile' ? 'auto' : '100%'
            }}
          >
            {/* Background images with responsive sizes */}
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={slide.Image}
              />
              <img
                src={slide.Image}
                alt={slide.title}
                className={`w-full ${screenSize === 'mobile' ? 'h-[100px] object-fill' : 'h-full object-cover'}`}
                loading="eager"
                style={{
                  display: 'block',
                  width: '100%'
                }}
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
        
        {/* Navigation arrows - Hidden on mobile, shown on desktop */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full items-center justify-center hover:bg-black/50 transition-all duration-300 group border border-white/20"
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left text-white text-xl group-hover:scale-110 transition-transform"></i>
        </button>
        
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full items-center justify-center hover:bg-black/50 transition-all duration-300 group border border-white/20"
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right text-white text-xl group-hover:scale-110 transition-transform"></i>
        </button>
        
        {/* Slide dots */}
        <div className={`absolute z-30 flex ${screenSize === 'mobile' 
          ? 'bottom-4 left-1/2 transform -translate-x-1/2 flex-row gap-2' 
          : 'bottom-14 right-8 flex-row gap-2'}`}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 border border-white/30 ${
                screenSize === 'mobile' 
                  ? `w-2 h-2 ${index === currentSlide ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/60'}`
                  : `w-2.5 h-2.5 ${index === currentSlide ? 'bg-white w-5 shadow-lg' : 'bg-white/40 hover:bg-white/60'}`
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;