// ItemCard.jsx
"use client";

import { useRouter } from 'next/navigation';

const ItemCard = ({ 
  item
}) => {
  const router = useRouter();
  const {
    id,
    title,
    price,
    discountPrice,
    image,
    location,
    date,
    time,
    category,
    availableSeats,
    rating,
    isFree = false
  } = item;

  const isDiscounted = discountPrice && discountPrice < price;
  const discountPercentage = isDiscounted 
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  // Navigate to event detail page
  const handleCardClick = () => {
    router.push(`/event/${id}`);
  };

  return (
    <div 
      className="bg-black group relative h-[350px] md:h-[450px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-gray-900 cursor-pointer hover:border-white/30 transition-all duration-300"
      onClick={handleCardClick}
    >
      
      {/* Background Image */}
      <img 
        src={image || "/api/placeholder/400/300"}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-80"
        loading="lazy"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 py-8 px-5  flex flex-col justify-end z-10">
        
        {/* Category Badge */}
        <div className="flex gap-2 mb-3">
          {category && (
            <span className="bg-[#00ff88]/20 text-[#00ff88] px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase backdrop-blur-md border border-[#00ff88]/30">
              {category}
            </span>
          )}
          {isFree && (
            <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase backdrop-blur-md border border-white/30">
              FREE
            </span>
          )}
        </div>
        
        {/* Title */}
        <h4 className="text-2xl md:text-3xl font-black leading-tight mb-2 tracking-tighter text-white">
          {title}
        </h4>
        
        {/* Location & Date */}
        <p className="text-[10px] md:text-xs text-gray-300 font-bold mb-3 italic">
          <i className="fas fa-location-dot text-green-400 mr-2"></i>
          {location} • {date}
          {time && ` • ${time}`}
        </p>
        
        {/* Price - Updated to PKR */}
        <div className="mb-4">
          {isFree ? (
            <p className="font-black text-2xl tracking-tighter text-white">FREE</p>
          ) : isDiscounted ? (
            <div className="flex items-center gap-3">
              <span className="font-black text-2xl tracking-tighter text-white">
                PKR {discountPrice?.toLocaleString() || price?.toLocaleString()}
              </span>
              {discountPrice && discountPrice < price && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    PKR {price?.toLocaleString()}
                  </span>
                  <span className="bg-red-500/80 text-white px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase">
                    {discountPercentage}% off
                  </span>
                </>
              )}
            </div>
          ) : (
            <p className="font-black text-2xl tracking-tighter text-white">
              PKR {price?.toLocaleString()}
            </p>
          )}
          <p className="text-[10px] text-gray-400 mt-1 font-medium">per person</p>
        </div>
        
        {/* Seats & Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fas fa-users text-gray-400 text-xs"></i>
            <span className={`text-xs font-black ${availableSeats < 10 ? 'text-red-400' : 'text-green-400'}`}>
              {availableSeats} seats left
            </span>
          </div>
          {rating && (
            <div className="flex items-center gap-1">
              <i className="fas fa-star text-yellow-400 text-xs"></i>
              <span className="text-xs font-bold text-white">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;