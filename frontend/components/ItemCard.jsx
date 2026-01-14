"use client";

const ItemCard = ({ 
  item,
  onBookNow,
  onViewDetails,
  isBooked = false,
  isLoading = false
}) => {
  const {
    id,
    title,
    description,
    price,
    discountPrice,
    image,
    location,
    date,
    time,
    category,
    availableSeats,
    totalSeats,
    rating,
    isFree = false
  } = item;

  const isDiscounted = discountPrice && discountPrice < price;
  const discountPercentage = isDiscounted 
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <div className="bg-black group relative h-[350px] md:h-[450px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-gray-900">
      
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
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end z-10">
        
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
        <h4 
          className="text-2xl md:text-3xl font-black leading-tight mb-2 tracking-tighter text-white cursor-pointer"
          onClick={() => onViewDetails && onViewDetails(id)}
        >
          {title}
        </h4>
        
        {/* Location & Date */}
        <p className="text-[10px] md:text-xs text-gray-300 font-bold mb-3 italic">
          <i className="fas fa-location-dot text-green-400 mr-2"></i>
          {location} • {date}
          {time && ` • ${time}`}
        </p>
        
        {/* Price */}
        <div className="mb-4">
          {isFree ? (
            <p className="font-black text-2xl tracking-tighter text-white">FREE</p>
          ) : isDiscounted ? (
            <div className="flex items-center gap-3">
              <span className="font-black text-2xl tracking-tighter text-white">
                ${discountPrice}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ${price}
              </span>
              <span className="bg-red-500/80 text-white px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase">
                {discountPercentage}% off
              </span>
            </div>
          ) : (
            <p className="font-black text-2xl tracking-tighter text-white">${price}</p>
          )}
          <p className="text-[10px] text-gray-400 mt-1 font-medium">per person</p>
        </div>
        
        {/* Seats & Rating */}
        <div className="flex items-center justify-between mb-6">
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
        
        {/* Action Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onBookNow && availableSeats > 0) {
              onBookNow(id);
            }
          }}
          disabled={isLoading || availableSeats === 0 || isBooked}
          className={`w-full backdrop-blur-md text-white font-black py-3 md:py-4 rounded-2xl text-[9px] md:text-[10px] uppercase tracking-widest border transition
            ${isBooked 
              ? 'bg-green-500/20 border-green-500/30 text-green-400 cursor-default'
              : availableSeats === 0
                ? 'bg-gray-800/50 border-gray-700/50 text-gray-500 cursor-not-allowed'
                : isLoading
                  ? 'bg-gray-700/50 border-gray-600/50'
                  : 'bg-white/10 border-white/20 hover:bg-white hover:text-black'
            }`}
        >
          {isBooked ? (
            <>
              <i className="fas fa-check-circle mr-2"></i>
              SECURED
            </>
          ) : isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              PROCESSING
            </>
          ) : availableSeats === 0 ? (
            'SOLD OUT'
          ) : (
            'BOOK NOW'
          )}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;