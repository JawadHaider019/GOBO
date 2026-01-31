"use client";

import React, { useState } from 'react';

// Updated Mock data for blog posts with actual content
const BLOG_POSTS = [
  {
    id: 1,
    title: "Smart Community Living: How Digital Identity Is Transforming Apartment Societies in Pakistan",
    excerpt: "Urban living in Pakistan is evolving rapidly. As apartment complexes and gated communities grow in size, traditional paper-based systems for visitor management, facility booking, and maintenance billing are becoming inefficient and insecure.",
    fullContent: `Urban living in Pakistan is evolving rapidly. As apartment complexes and gated communities grow in size, traditional paper-based systems for visitor management, facility booking, and maintenance billing are becoming inefficient and insecure.

Smart community living introduces a new standard — **identity-linked access and management**.

With GO BOOKING's unified node system, societies can digitize daily operations while maintaining complete trust and transparency.

### The Problems with Traditional Community Management

Most housing societies still rely on:

* Manual visitor registers
* Verbal permissions at gates
* Paper booking slips for halls and gyms
* Cash-based maintenance payments

These systems create security gaps, disputes, and administrative overload.

### Identity-Verified Community Access

By linking CNIC-verified identities to community access:

* Visitors are verified before entry
* Residents approve guests digitally
* Entry logs are secure and auditable
* Unauthorized access is eliminated

Every entry becomes traceable, without invading privacy.

### Smarter Facility Scheduling

Residents can book:

* Community halls
* Gyms
* Sports courts
* Meeting rooms

All bookings are tied to verified identities, preventing double bookings and misuse.

### Transparent Maintenance & Billing

Maintenance invoices are:

* Digitally generated
* Linked to resident identity
* Trackable in one wallet
* Paid securely without cash handling

This reduces disputes and improves trust between residents and management.

### The Future of Community Living

Smart communities are no longer a luxury — they are a necessity.

As Pakistani cities grow denser, identity-based systems will define:

* Safer neighborhoods
* Fair access to amenities
* Efficient society governance

GO BOOKING enables communities to move forward — securely, transparently, and digitally.`,
    date: "Jan 8, 2024",
    author: "COMMUNITY HUB",
    category: "Community",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92fb1ab?auto=format&fit=crop&q=80&w=800",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Identity-Verified Bus Travel: Redefining Inter-City Transportation in Pakistan",
    excerpt: "Inter-city bus travel is the backbone of Pakistan's transportation system. Millions rely on buses daily for work, education, and family travel — yet ticket fraud, overbooking, and passenger verification remain major challenges.",
    fullContent: `Inter-city bus travel is the backbone of Pakistan's transportation system. Millions rely on buses daily for work, education, and family travel — yet ticket fraud, overbooking, and passenger verification remain major challenges.

Identity-verified transit introduces a smarter, safer way to travel.

### The Challenges in Today's Bus System

Passengers frequently face:

* Duplicate ticket sales
* Fake reservations
* No passenger verification
* Manual check-ins causing delays

Operators struggle with fleet tracking, waitlists, and dispute resolution.

### CNIC-Linked Bus Bookings

With GO BOOKING:

* Every ticket is tied to a verified CNIC
* Tickets cannot be duplicated or resold unfairly
* Passenger identity replaces paper boarding passes

This ensures that the person who books is the person who travels.

### Digital Boarding Tokens

Instead of printed tickets:

* Passengers receive digital boarding tokens
* QR-based identity verification at terminals
* Faster boarding and reduced congestion

Lost tickets become a thing of the past.

### Real-Time Fleet & Seat Management

Operators gain access to:

* Live bus tracking
* Automated seat allocation
* Waitlist handling
* Accurate passenger manifests

This improves punctuality and customer trust.

### Safer Travel for Everyone

Identity-verified travel enhances:

* Passenger safety
* Emergency response accuracy
* Accountability for operators
* Insurance integration per traveler

It creates a national standard for trusted mobility.

### The Road Ahead

As Pakistan modernizes its transit infrastructure, identity-linked bus travel will become essential — not optional.

GO BOOKING is building the foundation for a future where every journey is verified, secure, and seamless.`,
    date: "Jan 12, 2024",
    author: "TRANSIT LAB",
    category: "Transit",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "How Identity Binding is Revolutionizing Ticketing in Pakistan",
    excerpt: "A deep dive into how CNIC-linked tickets are eliminating black marketing and creating a more secure ecosystem for event-goers across major cities.",
    fullContent: "Full content about identity binding in ticketing...",
    date: "Jan 15, 2024",
    author: "SECURITY TEAM",
    category: "Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    readTime: "7 min read"
  },
  {
    id: 4,
    title: "Concert Security 2.0: Biometric Entry Systems",
    excerpt: "How major concert venues in Lahore and Karachi are implementing biometric verification to enhance safety and prevent fraud.",
    fullContent: "Full content about biometric entry systems...",
    date: "Jan 10, 2024",
    author: "EVENTS SQUAD",
    category: "Events",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    readTime: "4 min read"
  }
];

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Security', 'Transit', 'Events', 'Community'];
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = activeCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  const AdZone = ({ type = "sidebar" }) => (
    <div className={`relative bg-gray-900 rounded-[2.5rem] overflow-hidden group cursor-pointer ${type === 'banner' ? 'h-48 md:h-64 w-full my-12' : 'h-[500px] fixed top-32 hidden lg:block'}`}>
      <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-700" alt="Ad" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
        <span className="text-[8px] font-black text-[#00ff88] uppercase tracking-[0.4em] mb-2">Partner Spotlight</span>
        <h4 className="text-xl font-black text-white italic tracking-tighter mb-4">Fly Higher with <br/> PIA Premium.</h4>
        <button className="bg-white text-black font-black py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-[#00ff88] transition">Book Now</button>
      </div>
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-2 py-1 rounded-md border border-white/20">
        <span className="text-[7px] font-bold text-gray-300 uppercase tracking-widest">AD</span>
      </div>
    </div>
  );

  const BlogModal = ({ post, onClose }) => (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-4xl">
          {/* Header */}
          <div className="relative h-64 md:h-80">
            <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-[#00ff88] text-[#003d2b] px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase">
                  {post.category}
                </span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {post.date} • {post.readTime}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter italic">
                {post.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#003d2b] font-black">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">AUTHOR</p>
                  <p className="text-sm font-black text-gray-900">{post.author}</p>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              {post.fullContent.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-black text-gray-900 mb-4 mt-8 tracking-tighter italic">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('* ')) {
                  return (
                    <ul key={index} className="space-y-2 my-4">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-600 font-medium">{paragraph.replace('* ', '')}</span>
                      </li>
                    </ul>
                  );
                } else if (paragraph.trim() === '') {
                  return <div key={index} className="h-4"></div>;
                } else {
                  return (
                    <p key={index} className="text-gray-600 font-medium leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                }
              })}
            </div>

            {/* Share Section */}
            <div className="pt-8 border-t border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">SHARE THIS INSIGHT</p>
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'WhatsApp'].map((platform) => (
                  <button
                    key={platform}
                    className="bg-gray-50 hover:bg-[#003d2b] hover:text-white text-gray-700 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-32">
      {/* Blog Modal */}
      {selectedPost && <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />}

      {/* Hero Section */}
      <section className="bg-gray-50 pt-32 pb-20 px-6 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-200/20 blur-[120px] rounded-full pointer-events-none"></div>
        <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.8em] relative z-10">Knowledge Ecosystem</span>
        <h1 className="text-5xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.85] italic relative z-10">The Node <br/><span className="text-[#003d2b]">Chronicles.</span></h1>
        <p className="max-w-2xl mx-auto text-gray-400 font-medium italic text-lg relative z-10">
          Welcome to <strong>The Node Chronicles</strong>, GO BOOKING's official knowledge ecosystem. 
          Here we explore how identity-verified systems are reshaping events, transportation, 
          housing societies, and everyday bookings across Pakistan.
        </p>
        <p className="max-w-2xl mx-auto text-gray-500 text-sm font-medium relative z-10">
          From eliminating ticket scalping to enabling secure inter-city travel and smarter community living, 
          our insights connect technology, trust, and real-world impact.
        </p>
      </section>

      {/* Blog Feed */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Categories with descriptions */}
          <div className="space-y-6">
            <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all border whitespace-nowrap ${activeCategory === cat ? 'bg-[#003d2b] text-white border-[#003d2b] shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-green-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {activeCategory !== 'All' && (
              <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                <p className="text-sm text-gray-600 font-medium italic">
                  {activeCategory === 'Security' && "Deep dives into CNIC binding, biometric verification, and anti-fraud systems."}
                  {activeCategory === 'Transit' && "The future of buses, trains, and flights through unified identity booking."}
                  {activeCategory === 'Events' && "Smart ticketing, crowd control, and secure venue access."}
                  {activeCategory === 'Community' && "Digital living for apartments, societies, and gated communities."}
                </p>
              </div>
            )}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredPosts.map((post) => (
              <div 
                key={post.id} 
                className="group cursor-pointer bg-white rounded-[2.5rem] border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative h-64 rounded-t-[2.5rem] overflow-hidden">
                  <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={post.title} />
                  <div className="absolute top-6 left-6">
                    <span className="bg-[#00ff88] text-[#003d2b] px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase">{post.category}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <div className="flex items-center justify-between text-white">
                      <span className="text-[10px] font-black tracking-widest">{post.readTime}</span>
                      <span className="text-[10px] font-black tracking-widest">READ →</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                    <span>BY {post.author}</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 leading-tight tracking-tighter group-hover:text-[#003d2b] transition italic">{post.title}</h3>
                  <p className="text-gray-500 text-sm italic leading-relaxed line-clamp-3 font-medium">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Inline Ad */}
          <AdZone type="banner" />

          {/* Featured Insights */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] border-b border-gray-100 pb-4">Featured Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Security First",
                  description: "How CNIC binding eliminates ticket fraud",
                  icon: "fa-shield-halved"
                },
                {
                  title: "Transit Reimagined",
                  description: "Identity-based transport systems",
                  icon: "fa-bus"
                },
                {
                  title: "Community 2.0",
                  description: "Digital management for societies",
                  icon: "fa-building"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#00ff88] transition">
                  <div className="w-12 h-12 bg-[#003d2b] rounded-xl flex items-center justify-center text-white text-lg mb-4">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <h5 className="font-black text-gray-900 mb-2">{item.title}</h5>
                  <p className="text-xs text-gray-500 font-medium">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
          {/* Ad Space */}
          <AdZone />

          {/* Newsletter */}
          <div className="bg-[#003d2b] rounded-[3rem] p-10 text-white space-y-8 shadow-4xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-10">
              <i className="fas fa-rss text-[10rem]"></i>
            </div>
            <h4 className="text-xl font-black italic tracking-tighter relative z-10">Subscribe to the <br/>Identity Digest.</h4>
            <p className="text-gray-300 text-xs italic leading-relaxed relative z-10">
              Join 50,000+ citizens receiving weekly security updates and early booking access.
            </p>
            <div className="space-y-3 relative z-10">
              <input 
                type="email" 
                placeholder="Your Email Node" 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-xs focus:border-[#00ff88] outline-none transition font-bold placeholder-gray-400" 
              />
              <button className="w-full bg-[#00ff88] text-black font-black py-4 rounded-xl text-[10px] uppercase tracking-widest shadow-xl hover:shadow-2xl transition">
                Join Pulse
              </button>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-gray-50 rounded-[3rem] p-10 space-y-8">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">Trending Nodes</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { tag: '#CNICBinding', count: '42K' },
                { tag: '#SecurityOps', count: '28K' },
                { tag: '#LiveInLahore', count: '35K' },
                { tag: '#VerifiedTransit', count: '31K' },
                { tag: '#NoMoreScalping', count: '47K' },
                { tag: '#SmartLiving', count: '24K' },
                { tag: '#DigitalPakistan', count: '39K' }
              ].map((item) => (
                <div key={item.tag} className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-3 rounded-xl hover:bg-[#003d2b] hover:text-white hover:border-[#003d2b] transition duration-300 cursor-pointer group">
                  <span className="text-[9px] font-black uppercase tracking-tighter">{item.tag}</span>
                  <span className="text-[7px] font-black text-gray-400 group-hover:text-white/70">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 space-y-6 shadow-lg">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">Platform Pulse</h4>
            <div className="space-y-4">
              {[
                { label: 'Verified Users', value: '2.4M', icon: 'fa-user-check' },
                { label: 'Secure Bookings', value: '18.7M', icon: 'fa-ticket' },
                { label: 'Cities Covered', value: '47', icon: 'fa-city' },
                { label: 'Partner Operators', value: '12K', icon: 'fa-handshake' }
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#003d2b]/10 rounded-lg flex items-center justify-center text-[#003d2b]">
                      <i className={`fas ${stat.icon} text-xs`}></i>
                    </div>
                    <span className="text-xs font-black text-gray-600">{stat.label}</span>
                  </div>
                  <span className="text-lg font-black text-gray-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Blogs;