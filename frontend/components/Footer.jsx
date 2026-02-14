"use client";
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#003d2b] to-[#002219] text-white pt-20 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden relative rounded-t-[4rem]">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none rotate-12">
         <i className="fas fa-ticket-alt text-[20rem]"></i>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative">
        {/* Company Info */}
        <div className="space-y-2">
          <Link href="/" className="inline-block p-2">
            <div className="relative w-20 h-20">
              <img 
                src="/logowhite.png" 
                alt="GoBo Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-[#003d2b] to-[#006644] rounded-2xl flex items-center justify-center text-white">
                      <span class="font-bold text-lg">GoBo</span>
                    </div>
                  `;
                }}
              />
            </div>
          </Link>

          <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
            Pakistan's most trusted digital marketplace for tickets and reservations. Simple, secure, and verified.
          </p>
          <div className="flex gap-3 pt-2">
            {['facebook', 'instagram', 'twitter', 'linkedin'].map(soc => (
              <Link 
                href={`https://${soc}.com/gobo`}
                key={soc}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-300 hover:text-[#00ff88] hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label={`Follow us on ${soc}`}
              >
                <i className={`fab fa-${soc}`}></i>
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="space-y-6">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-green-400">Services</h4>
          <ul className="space-y-3">
            {[
              { name: 'Events & Concerts', path: '/services#events' },
              { name: 'Bus & Transport', path: '/services#transport' },
              { name: 'Hotels & Living', path: '/services#hotels' },
              { name: 'Cinema & Entertainment', path: '/services#cinema' },
              { name: 'Tours & Activities', path: '/services#tours' },
              { name: 'Corporate Events', path: '/services#corporate' }
            ].map(item => (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  className="text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 group hover:translate-x-1"
                >
                  <span className="group-hover:text-[#00ff88] transition-colors">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-6">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-green-400">Company</h4>
          <ul className="space-y-3">
            {[
              { name: 'About ', path: '/about' },
              { name: 'Explore', path: '/explore' },
              { name: 'Blog', path: '/blogs' },
              { name: 'Contact ', path: '/contact' },
            ].map(item => (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  className="text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 group hover:translate-x-1"
                >
                  <span className="group-hover:text-[#00ff88] transition-colors">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Support */}
        <div className="space-y-6">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-green-400">Legal & Support</h4>
          <ul className="space-y-3">
            {[
              { name: 'Terms of Service', path: '/terms' },
              { name: 'Privacy Policy', path: '/privacy' },
              { name: 'Cookie Policy', path: '/cookies' },
              { name: 'FAQ', path: '/faq' },
              { name: 'Support Center', path: '/support' }
            ].map(item => (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  className="text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 group hover:translate-x-1"
                >
                  <span className="group-hover:text-[#00ff88] transition-colors">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact Info */}
          <div className="pt-4 space-y-2">
            <p className="text-xs text-gray-400">Email: support@gobo.pk</p>
            <p className="text-xs text-gray-400">Phone: +92 300 111 4626</p>
            <p className="text-xs text-gray-400">Hours: 24/7 Support</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-4 relative">
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest text-center md:text-left">
          © {new Date().getFullYear()} GoBo • Pakistan's Trusted Booking Platform
        </p>
      </div>

    

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;