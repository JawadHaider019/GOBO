"use client";
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#003d2b] to-[#002219] text-white pt-20 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden relative rounded-t-[4rem]">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none rotate-12">
         <i className="fas fa-ticket-alt text-[20rem]"></i>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative ">
        {/* Company Info */}
        <div className="space-y-2">
          <Link href="/" className="inline-block p-2 ">
            <div className="relative w-20 h-20">
              {/* Fallback if image doesn't load */}
              <img 
                src="/logowhite.png" 
                alt="Go Booking Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-[#003d2b] to-[#006644] rounded-2xl flex items-center justify-center text-white">
                      <span class="font-bold text-lg">GB</span>
                    </div>
                  `;
                }}
              />
            </div>
          </Link>

          <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
          Pakistan’s digital booking and ticket management platform for everyday experiences.
          </p>
          <div className="flex gap-3 pt-2">
            {['facebook', 'instagram', 'twitter', 'linkedin'].map(soc => (
              <button 
                key={soc}
                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-300 hover:text-[#00ff88] hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label={`Follow us on ${soc}`}
              >
                <i className={`fab fa-${soc}`}></i>
              </button>
            ))}
          </div>
        </div>

        {/* Ecosystem Links */}
        <div className="space-y-6">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-green-400">Ecosystem</h4>
          <ul className="space-y-3">
            {['Events & Concerts', 'Bus & Transport', 'Apartment Amenities', 'Marketplace Resale', 'Smart Combos'].map(item => (
              <li key={item}>
                <button className="text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 group hover:translate-x-1">
                          <span className="group-hover:text-[#00ff88] transition-colors">{item}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust & Safety Links */}
        <div className="space-y-6">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-green-400">Trust & Safety</h4>
          <ul className="space-y-3">
            {['Identity Verification', 'CNIC Binding Guide', 'Anti-Fraud Policy', 'Privacy Protocol', 'Seller Approval'].map(item => (
              <li key={item}>
                <button className="text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 group hover:translate-x-1">
                                    <span className="group-hover:text-[#00ff88] transition-colors">{item}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-green-400">Stay Updated</h4>
          <div className="space-y-4">
            <p className="text-gray-300 text-sm">Join our network for exclusive event drops.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:border-green-400 outline-none transition-all duration-200 font-medium text-white placeholder-gray-500 focus:ring-2 focus:ring-green-400/30"
              />
              <button className="bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-[#003d2b] font-semibold text-[11px] py-3.5 rounded-xl uppercase tracking-widest shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative ">
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest text-center md:text-left">
          © {new Date().getFullYear()} GO BOOKING PAKISTAN • UNIFIED TICKETING SYSTEM
        </p>
        <div className="flex gap-6">
           <button className="text-[10px] font-medium text-gray-400 hover:text-white hover:scale-105 uppercase tracking-widest transition-all duration-200">
             Terms
           </button>
           <button className="text-[10px] font-medium text-gray-400 hover:text-white hover:scale-105 uppercase tracking-widest transition-all duration-200">
             Privacy
           </button>
           <button className="text-[10px] font-medium text-gray-400 hover:text-white hover:scale-105 uppercase tracking-widest transition-all duration-200">
             Cookies
           </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;