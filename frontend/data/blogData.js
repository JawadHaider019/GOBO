// data/blogData.js

export const categories = [
  { id: 'all', name: 'All Posts', count: 18 },
  { id: 'product', name: 'Product Updates', count: 6 },
  { id: 'engineering', name: 'Engineering', count: 4 },
  { id: 'community', name: 'Community', count: 3 },
  { id: 'security', name: 'Security', count: 3 },
  { id: 'events', name: 'Events & Concerts', count: 2 }
];

export const categoryMap = {
  'product': 'Product Updates',
  'engineering': 'Engineering',
  'community': 'Community',
  'security': 'Security',
  'events': 'Events & Concerts'
};

export const featuredPosts = [
  {
    id: 1,
    slug: "one-platform-everyday-bookings",
    title: "One Platform for Everyday Bookings: The GoBo Vision",
    excerpt: "How we're building Pakistan's most trusted digital marketplace for tickets and reservations, where people can discover, book, and manage experiences with confidence.",
    fullContent: `
      <p class="lead">At GoBo, we believe that booking tickets and reservations should be as simple as sending a message. That's why we're building a unified platform that brings together events, travel, and everyday bookings into one seamless experience.</p>
      
      <h2>The Vision</h2>
      <p>To become Pakistan's most trusted digital marketplace for tickets and reservations, where people can discover, book, and manage experiences with confidence.</p>
      
      <h3>Why One Platform?</h3>
      <p>Pakistanis book tickets for events, buses, hotels, and more across multiple platforms — each with different accounts, payment methods, and verification processes. This fragmented experience creates friction and security gaps.</p>
      
      <p>GoBo solves this by providing:</p>
      <ul>
        <li><strong>Single Account:</strong> One identity for all your bookings</li>
        <li><strong>Unified Wallet:</strong> All tickets in one place</li>
        <li><strong>Consistent Experience:</strong> Same simple process whether booking a concert or a bus ticket</li>
        <li><strong>Verified Identity:</strong> CNIC-linked bookings for enhanced security</li>
      </ul>
      
      <h3>The Impact</h3>
      <p>With a unified platform, users no longer need to juggle multiple apps or remember different login credentials. Vendors benefit from a single integration point to reach customers across categories. And the entire ecosystem becomes more secure through consistent identity verification.</p>
      
      <p>This is just the beginning. As we grow, we'll add more categories, smarter discovery features, and enhanced tools for both users and vendors — all while maintaining the simplicity and reliability that defines GoBo.</p>
    `,
    date: "Feb 12, 2024",
    author: {
      name: "GoBo Team",
      role: "Product",
      avatar: "https://ui-avatars.com/api/?name=GoBo+Team&background=003d2b&color=fff",
      bio: "The product team behind GoBo's vision for seamless bookings."
    },
    category: "product",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    trending: true,
    tags: ["#vision", "#product", "#platform"],
    relatedPosts: [2, 4]
  },
  {
    id: 2,
    slug: "making-booking-simple-reliable",
    title: "Making Booking Simple & Reliable: Our Mission",
    excerpt: "Simplifying how people book tickets and stays, helping vendors manage bookings digitally, reducing manual errors, and promoting paperless QR-based verification.",
    fullContent: `
      <p class="lead">Every day, thousands of Pakistanis book tickets for events, buses, and accommodations. Yet the process is often complicated, insecure, and paper-heavy. Our mission is to change that.</p>
      
      <h2>Simple for Users</h2>
      <p>We've stripped away unnecessary complexity. Whether you're booking a concert ticket or a hotel room, the process is the same:</p>
      <ul>
        <li>Search for what you need</li>
        <li>Choose your preferred option</li>
        <li>Complete payment with your preferred method</li>
        <li>Receive a digital QR ticket instantly</li>
      </ul>
      
      <h3>Reliable for Everyone</h3>
      <p>Reliability means different things to different stakeholders:</p>
      
      <p><strong>For Users:</strong> Tickets that work, refunds when promised, and support when needed.</p>
      <p><strong>For Vendors:</strong> Accurate booking data, reduced no-shows, and protected revenue.</p>
      <p><strong>For GoBo:</strong> A platform that scales, secures, and delivers every time.</p>
      
      <h3>Digital-First, Paperless</h3>
      <p>Paper tickets are obsolete. They can be lost, forged, or duplicated. Our QR-based system ensures:</p>
      <ul>
        <li>Each ticket is uniquely generated</li>
        <li>QR codes can only be scanned once</li>
        <li>Duplicate attempts are automatically rejected</li>
        <li>Entry is faster and more secure</li>
      </ul>
      
      <p>This isn't just about convenience — it's about creating a trusted ecosystem where every booking is verified, every transaction is secure, and every experience is seamless.</p>
    `,
    date: "Feb 10, 2024",
    author: {
      name: "Operations Team",
      role: "Mission",
      avatar: "https://ui-avatars.com/api/?name=Operations&background=003d2b&color=fff",
      bio: "The team ensuring every booking happens smoothly."
    },
    category: "engineering",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=1200",
    trending: true,
    tags: ["#simplicity", "#reliability", "#QRcodes"],
    relatedPosts: [1, 6]
  },
  {
    id: 3,
    slug: "built-on-trust-simplicity",
    title: "Built on Trust & Simplicity: Our Core Values",
    excerpt: "Simplicity, reliability, accessibility, growth, and digital-first approach — the principles guiding everything we build.",
    fullContent: `
      <p class="lead">Every decision at GoBo is guided by our core values. They're not just words on a wall — they're the principles that shape our product, our culture, and our relationships with users and vendors.</p>
      
      <h2>Simplicity</h2>
      <p>Booking should be easy for everyone. We remove unnecessary steps, clarify confusing options, and design interfaces that anyone can use — regardless of technical expertise.</p>
      
      <h3>Reliability</h3>
      <p>When you book with GoBo, you should be able to book with confidence. Our platform is built to handle millions of transactions without failure, and our verification systems ensure that tickets work when they need to.</p>
      
      <h3>Accessibility</h3>
      <p>Available anywhere, on any device. Whether you're on a smartphone in a remote area or on a desktop in a city center, GoBo works. We're building for all of Pakistan, not just major urban centers.</p>
      
      <h3>Growth</h3>
      <p>Built to scale. As we add more categories, more vendors, and more users, our platform grows with you. We're not just building for today — we're building for the future of digital bookings in Pakistan.</p>
      
      <h3>Digital First</h3>
      <p>Moving bookings online isn't just about convenience — it's about creating new possibilities. Digital tickets enable analytics, insights, and personalization that paper never could. They're more secure, more flexible, and more powerful.</p>
      
      <p>These values guide every feature we build, every partnership we form, and every interaction we have with our community.</p>
    `,
    date: "Feb 8, 2024",
    author: {
      name: "Leadership Team",
      role: "Values",
      avatar: "https://ui-avatars.com/api/?name=Leadership&background=003d2b&color=fff",
      bio: "The leaders shaping GoBo's culture and direction."
    },
    category: "community",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
    trending: true,
    tags: ["#values", "#culture", "#trust"],
    relatedPosts: [1, 2]
  }
];

export const recentPosts = [
  {
    id: 4,
    slug: "paperless-by-design",
    title: "Paperless by Design: Our Commitment to Sustainability",
    excerpt: "By using digital tickets and confirmations, GoBo helps reduce paper usage and supports eco-friendly booking practices across Pakistan.",
    fullContent: `
      <p class="lead">Every year, millions of paper tickets are printed for events, bus journeys, and hotel bookings in Pakistan. Most are used once and thrown away. We're changing that.</p>
      
      <h2>The Environmental Impact</h2>
      <p>Paper production contributes to deforestation, water consumption, and carbon emissions. By eliminating paper tickets, GoBo helps reduce this environmental footprint while creating a more efficient booking experience.</p>
      
      <h3>100% Paperless Operations</h3>
      <p>Every ticket on GoBo is digital. From booking confirmation to entry, no paper is required. Users receive QR codes in their accounts and via SMS — ready to scan at the venue.</p>
      
      <h3>24/7 Digital Access</h3>
      <p>Digital tickets never get lost. They're always available in your wallet, accessible anytime, anywhere. No more searching for printed tickets or worrying about forgetting them at home.</p>
      
      <h3>Zero Physical Waste</h3>
      <p>When an event ends or a journey completes, there's no paper to discard. Digital tickets leave no trace — just the memory of the experience.</p>
      
      <h3>Beyond Paper</h3>
      <p>Sustainability isn't just about paper. Digital systems enable:</p>
      <ul>
        <li>Reduced travel for ticket purchases</li>
        <li>Optimized event capacity (fewer empty seats = less waste)</li>
        <li>Data-driven insights for vendors to reduce overproduction</li>
      </ul>
      
      <p>By choosing digital, you're not just choosing convenience — you're choosing a more sustainable future for Pakistan.</p>
    `,
    date: "Feb 5, 2024",
    author: {
      name: "Sustainability Team",
      role: "Sustainability",
      avatar: "https://ui-avatars.com/api/?name=Sustainability&background=003d2b&color=fff",
      bio: "The team dedicated to making GoBo eco-friendly."
    },
    category: "product",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800",
    tags: ["#sustainability", "#paperless", "#eco-friendly"],
    relatedPosts: [1, 11]
  },
  {
    id: 5,
    slug: "events-concerts-ticketing",
    title: "Revolutionizing Events & Concerts Ticketing",
    excerpt: "Book tickets for your favorite events and shows with our secure, QR-based ticketing system that eliminates fraud and scalping.",
    fullContent: `
      <p class="lead">Pakistan's entertainment scene is booming. From concerts to comedy shows, cultural festivals to sporting events — there's more to experience than ever before. But ticketing has lagged behind.</p>
      
      <h2>The Problem with Event Ticketing</h2>
      <p>Traditional event ticketing suffers from:</p>
      <ul>
        <li>Ticket fraud and counterfeiting</li>
        <li>Scalping and black market resales</li>
        <li>Long queues at entry</li>
        <li>Lost or forgotten tickets</li>
      </ul>
      
      <h3>How GoBo Fixes This</h3>
      <p>Our QR-based ticketing system creates a secure, seamless experience:</p>
      <ul>
        <li><strong>Identity-Linked Tickets:</strong> Every ticket is tied to a verified CNIC, preventing scalping</li>
        <li><strong>Unique QR Codes:</strong> Each ticket has a one-time-use QR that can't be duplicated</li>
        <li><strong>Instant Delivery:</strong> Tickets appear in your wallet immediately after booking</li>
        <li><strong>Fast Entry:</strong> Scan and go — no paper, no waiting</li>
      </ul>
      
      <h3>For Event Organizers</h3>
      <p>We provide real-time sales data, attendance tracking, and fraud prevention — all through an easy-to-use dashboard.</p>
      
      <p>Whether it's a stadium concert or an intimate theater performance, GoBo makes event ticketing simple, secure, and stress-free.</p>
    `,
    date: "Feb 3, 2024",
    author: {
      name: "Events Team",
      role: "Events",
      avatar: "https://ui-avatars.com/api/?name=Events+Team&background=003d2b&color=fff",
      bio: "The team bringing you the best event experiences."
    },
    category: "events",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=800",
    tags: ["#events", "#concerts", "#ticketing"],
    relatedPosts: [8, 7]
  },
  {
    id: 6,
    slug: "bus-transport-secure-seats",
    title: "Bus & Transport: Secure Seats for Inter-City Travel",
    excerpt: "How identity-verified bus bookings are making inter-city travel safer and more reliable across Pakistan.",
    fullContent: `
      <p class="lead">Inter-city bus travel is the backbone of Pakistan's transportation network. Millions of Pakistanis rely on buses to connect with family, pursue education, and conduct business. Yet the booking experience has remained largely unchanged for decades.</p>
      
      <h2>The Challenges</h2>
      <ul>
        <li>Duplicate seat bookings</li>
        <li>Fake tickets and fraud</li>
        <li>No passenger verification</li>
        <li>Manual check-ins causing delays</li>
      </ul>
      
      <h3>CNIC-Linked Bus Tickets</h3>
      <p>With GoBo, every bus ticket is linked to a verified CNIC. This means:</p>
      <ul>
        <li>The person who books is the person who travels</li>
        <li>Tickets cannot be duplicated or resold on the black market</li>
        <li>Boarding is faster with QR-based verification</li>
      </ul>
      
      <h3>For Bus Operators</h3>
      <p>Our platform provides:</p>
      <ul>
        <li>Real-time seat inventory management</li>
        <li>Automated waitlist handling</li>
        <li>Accurate passenger manifests</li>
        <li>Reduced no-shows through verified bookings</li>
      </ul>
      
      <h3>Safer Travel for Everyone</h3>
      <p>Identity-verified travel isn't just about preventing fraud — it's about creating a safer transportation ecosystem. In emergencies, accurate passenger lists help responders. For families, knowing who is traveling provides peace of mind.</p>
      
      <p>We're starting with buses, but this is just the beginning. The same identity-verified approach will extend to trains, flights, and ride-sharing — creating a unified, trusted transportation network for Pakistan.</p>
    `,
    date: "Feb 1, 2024",
    author: {
      name: "Transit Team",
      role: "Transportation",
      avatar: "https://ui-avatars.com/api/?name=Transit+Team&background=003d2b&color=fff",
      bio: "The team making travel safer and more reliable."
    },
    category: "product",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    tags: ["#travel", "#buses", "#transport"],
    relatedPosts: [2, 1]
  },
  {
    id: 7,
    slug: "hotels-living-accommodations",
    title: "Hotels & Living: Find Stays That Feel Like Home",
    excerpt: "From luxury hotels to budget hostels and apartments, discover accommodations that match your needs and budget.",
    fullContent: `
      <p class="lead">Whether you're traveling for business, leisure, or relocating to a new city, finding the right accommodation is essential. GoBo makes it easy to discover and book stays that feel like home.</p>
      
      <h2>Accommodations for Every Need</h2>
      <p>Our platform features a wide range of options:</p>
      <ul>
        <li><strong>Luxury Hotels:</strong> 5-star experiences with premium amenities</li>
        <li><strong>Budget Hotels:</strong> Comfortable stays at affordable prices</li>
        <li><strong>Hostels:</strong> Social accommodations for backpackers and solo travelers</li>
        <li><strong>Apartments:</strong> Fully furnished homes for longer stays</li>
        <li><strong>Guest Houses:</strong> Family-run accommodations with local hospitality</li>
      </ul>
      
      <h3>Verified Listings, Real Reviews</h3>
      <p>Every property on GoBo is verified by our team. We ensure that photos are accurate, amenities are as described, and hosts are legitimate. Combined with genuine reviews from verified guests, you can book with confidence.</p>
      
      <h3>Seamless Booking Experience</h3>
      <p>From search to check-in, the process is designed to be effortless:</p>
      <ul>
        <li>Filter by price, location, amenities, and guest ratings</li>
        <li>View detailed descriptions and high-quality photos</li>
        <li>Book instantly with secure payment</li>
        <li>Receive digital confirmation with all details</li>
        <li>Check in with QR-based verification</li>
      </ul>
      
      <p>Whether you need a place for a night or a month, GoBo helps you find the perfect stay.</p>
    `,
    date: "Jan 28, 2024",
    author: {
      name: "Hospitality Team",
      role: "Accommodations",
      avatar: "https://ui-avatars.com/api/?name=Hospitality&background=003d2b&color=fff",
      bio: "The team finding you the perfect place to stay."
    },
    category: "community",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    tags: ["#hotels", "#accommodation", "#travel"],
    relatedPosts: [6, 9]
  },
  {
    id: 8,
    slug: "cinema-entertainment-bookings",
    title: "Cinema & Entertainment: Movie Tickets Made Easy",
    excerpt: "Skip the queues and book movie tickets instantly with our seamless digital platform.",
    fullContent: `
      <p class="lead">Friday night at the cinema shouldn't start with standing in line. With GoBo, you can book movie tickets in seconds and go straight to your seat.</p>
      
      <h2>The Cinema Experience Reimagined</h2>
      <p>We've partnered with major cinema chains across Pakistan to bring you:</p>
      <ul>
        <li>Real-time seat selection</li>
        <li>Showtimes at a glance</li>
        <li>Digital tickets that scan at entry</li>
        <li>Special offers and loyalty rewards</li>
      </ul>
      
      <h3>How It Works</h3>
      <ol>
        <li>Browse movies playing at cinemas near you</li>
        <li>Select your preferred showtime and seats</li>
        <li>Complete payment securely</li>
        <li>Receive QR tickets instantly</li>
        <li>Scan at the cinema and enjoy your movie</li>
      </ol>
      
      <h3>Perfect for Groups</h3>
      <p>Planning a movie night with friends or family? Book multiple seats together, and everyone gets their own QR ticket. No more collecting cash or coordinating payments — just share the tickets digitally.</p>
      
      <p>From blockbuster releases to indie films, GoBo makes cinema booking as entertaining as the movies themselves.</p>
    `,
    date: "Jan 25, 2024",
    author: {
      name: "Entertainment Desk",
      role: "Entertainment",
      avatar: "https://ui-avatars.com/api/?name=Entertainment&background=003d2b&color=fff",
      bio: "The team bringing entertainment to your fingertips."
    },
    category: "events",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800",
    tags: ["#cinema", "#movies", "#entertainment"],
    relatedPosts: [5, 7]
  },
  {
    id: 9,
    slug: "tours-activities-local-experiences",
    title: "Tours & Activities: Discover Local Experiences",
    excerpt: "Explore and book unique local experiences, guided tours, and cultural activities across Pakistan.",
    fullContent: `
      <p class="lead">Pakistan is a country of incredible diversity — from ancient heritage sites to breathtaking natural landscapes, from bustling food streets to serene mountain trails. The best way to experience it is with locals who know it best.</p>
      
      <h2>Experiences You'll Remember</h2>
      <p>Our platform connects you with vetted local guides and experience providers offering:</p>
      <ul>
        <li><strong>Heritage Tours:</strong> Explore historical sites with expert guides</li>
        <li><strong>Food Experiences:</strong> Taste authentic cuisine on guided food tours</li>
        <li><strong>Adventure Activities:</strong> Hiking, trekking, and outdoor adventures</li>
        <li><strong>Cultural Workshops:</strong> Learn traditional crafts, cooking, or music</li>
        <li><strong>City Tours:</strong> Discover hidden gems in Pakistan's urban centers</li>
      </ul>
      
      <h3>Why Book with GoBo</h3>
      <ul>
        <li><strong>Verified Providers:</strong> Every experience host is vetted</li>
        <li><strong>Secure Booking:</strong> Identity-verified for your safety</li>
        <li><strong>Instant Confirmation:</strong> Book now, experience later</li>
        <li><strong>Easy Cancellation:</strong> Flexible policies on most experiences</li>
      </ul>
      
      <h3>For Experience Providers</h3>
      <p>If you offer tours or activities, GoBo provides a platform to reach travelers from across Pakistan and beyond. Manage bookings, communicate with guests, and grow your business — all through a simple dashboard.</p>
      
      <p>Whether you're a traveler seeking authentic experiences or a local sharing your passion, GoBo brings you together.</p>
    `,
    date: "Jan 22, 2024",
    author: {
      name: "Experiences Team",
      role: "Experiences",
      avatar: "https://ui-avatars.com/api/?name=Experiences&background=003d2b&color=fff",
      bio: "The team connecting you with authentic local experiences."
    },
    category: "community",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800",
    tags: ["#tours", "#activities", "#experiences"],
    relatedPosts: [7, 5]
  },
  {
    id: 10,
    slug: "corporate-events-management",
    title: "Corporate Events: Professional Management Tools",
    excerpt: "Enterprise-grade event management tools for companies hosting conferences, seminars, and team gatherings.",
    fullContent: `
      <p class="lead">Planning a corporate event involves countless details: guest lists, registration, ticketing, and check-in. GoBo's enterprise tools streamline everything in one place.</p>
      
      <h2>Built for Business</h2>
      <p>Our corporate event platform includes:</p>
      <ul>
        <li><strong>Custom Registration Forms:</strong> Collect exactly the information you need</li>
        <li><strong>Bulk Invitations:</strong> Send invites to hundreds of guests at once</li>
        <li><strong>Ticket Types:</strong> Create different categories (VIP, early bird, regular)</li>
        <li><strong>Discount Codes:</strong> Offer special pricing to specific groups</li>
        <li><strong>Attendance Tracking:</strong> See who checked in, in real-time</li>
      </ul>
      
      <h3>Seamless Check-In</h3>
      <p>On the day of your event, attendees simply scan their QR tickets at the door. No printed lists, no manual checking — just fast, professional entry.</p>
      
      <h3>Data & Insights</h3>
      <p>After your event, get detailed reports on attendance, demographics, and engagement. Use these insights to improve future events and demonstrate ROI to stakeholders.</p>
      
      <h3>Security You Can Trust</h3>
      <p>For sensitive corporate events, our identity-verified system ensures that only invited guests gain entry. No unauthorized access, no gatecrashers.</p>
      
      <p>From small team off-sites to large industry conferences, GoBo provides the tools you need to execute professional, memorable events.</p>
    `,
    date: "Jan 20, 2024",
    author: {
      name: "Business Team",
      role: "Corporate",
      avatar: "https://ui-avatars.com/api/?name=Business+Team&background=003d2b&color=fff",
      bio: "The team helping businesses run better events."
    },
    category: "product",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
    tags: ["#corporate", "#events", "#business"],
    relatedPosts: [1, 5]
  },
  {
    id: 11,
    slug: "digital-first-paperless-system",
    title: "Digital First: Moving Bookings Online",
    excerpt: "Why we're committed to a digital-first, paperless system and how it benefits both users and vendors.",
    fullContent: `
      <p class="lead">The future of bookings is digital. We're not just building a platform — we're building a new standard for how Pakistan books tickets and reservations.</p>
      
      <h2>Why Digital First?</h2>
      <p>A digital-first approach offers benefits that paper simply can't match:</p>
      <ul>
        <li><strong>Instant Access:</strong> Tickets available immediately, anytime, anywhere</li>
        <li><strong>Enhanced Security:</strong> QR codes that can't be forged or duplicated</li>
        <li><strong>Data Insights:</strong> Understand trends, preferences, and behavior</li>
        <li><strong>Cost Savings:</strong> No printing, no distribution, no waste</li>
        <li><strong>Environmental Impact:</strong> Reduced paper consumption</li>
      </ul>
      
      <h3>For Users</h3>
      <p>Digital means convenience. No more printing tickets, no more担心 about losing them. All your bookings are in one place, accessible from any device. Need to transfer a ticket? Done in seconds. Want to check event details? They're always there.</p>
      
      <h3>For Vendors</h3>
      <p>Digital means efficiency. Real-time sales data, automated check-ins, reduced fraud, and deeper customer insights. Vendors can focus on delivering great experiences instead of managing paper.</p>
      
      <h3>The Technology</h3>
      <p>Our platform uses industry-standard encryption, unique QR generation, and secure cloud storage. Every ticket is traceable, verifiable, and protected.</p>
      
      <p>Digital-first isn't just a tagline — it's the foundation of everything we build.</p>
    `,
    date: "Jan 18, 2024",
    author: {
      name: "Technology Team",
      role: "Tech",
      avatar: "https://ui-avatars.com/api/?name=Technology&background=003d2b&color=fff",
      bio: "The engineers building Pakistan's most reliable booking platform."
    },
    category: "engineering",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    tags: ["#digital", "#technology", "#innovation"],
    relatedPosts: [4, 1]
  },
  {
    id: 12,
    slug: "vendor-friendly-tools",
    title: "Vendor-Friendly Tools: Empowering Partners",
    excerpt: "How our vendor dashboard helps partners manage bookings, track sales, and grow their business digitally.",
    fullContent: `
      <p class="lead">GoBo isn't just for users — it's for vendors too. We believe that when vendors succeed, users benefit from better experiences, more options, and higher quality service.</p>
      
      <h2>The Vendor Dashboard</h2>
      <p>Our vendor portal provides everything partners need to manage their business:</p>
      <ul>
        <li><strong>Inventory Management:</strong> Update availability in real-time</li>
        <li><strong>Sales Analytics:</strong> Track revenue, trends, and customer behavior</li>
        <li><strong>Booking Calendar:</strong> See all upcoming reservations at a glance</li>
        <li><strong>Customer Insights:</strong> Understand who's booking and why</li>
        <li><strong>Pricing Tools:</strong> Adjust prices, create promotions, manage discounts</li>
      </ul>
      
      <h3>Easy Onboarding</h3>
      <p>Getting started is simple. Our team guides vendors through verification, listing creation, and platform setup. Within days, they're ready to start accepting bookings.</p>
      
      <h3>Dedicated Support</h3>
      <p>Vendors get priority support from our team. Whether it's a technical question or help with a customer issue, we're here to help.</p>
      
      <h3>Growing Together</h3>
      <p>As GoBo grows, so do our vendors. We're constantly adding new features based on vendor feedback — because their success is our success.</p>
      
      <p>If you're a vendor interested in joining GoBo, reach out to our partnerships team. We'd love to work with you.</p>
    `,
    date: "Jan 15, 2024",
    author: {
      name: "Partnership Team",
      role: "Vendors",
      avatar: "https://ui-avatars.com/api/?name=Partnership&background=003d2b&color=fff",
      bio: "The team building strong relationships with vendors."
    },
    category: "product",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=800",
    tags: ["#vendors", "#partners", "#tools"],
    relatedPosts: [1, 10]
  },
  {
    id: 13,
    slug: "secure-payment-processing",
    title: "Secure Payment Processing: Your Transactions Are Safe",
    excerpt: "Behind the scenes of our payment security — encryption, fraud detection, and safe transactions.",
    fullContent: `
      <p class="lead">When you book with GoBo, you're not just trusting us with your ticket — you're trusting us with your payment information. We take that responsibility seriously.</p>
      
      <h2>Enterprise-Grade Security</h2>
      <p>Our payment infrastructure is built to the highest industry standards. We partner with leading payment gateways that are PCI-DSS compliant, ensuring that your financial data is handled according to strict security protocols.</p>
      
      <h3>Encryption at Every Step</h3>
      <p>From the moment you enter your payment details to the final transaction confirmation, your data is encrypted using TLS 1.3 protocol — the same security standard used by banks and financial institutions worldwide.</p>
      
      <h3>Fraud Detection Systems</h3>
      <p>Our AI-powered fraud detection analyzes every transaction in real-time, identifying and blocking suspicious activity before it can affect you. Unusual patterns, multiple failed attempts, or high-risk transactions are flagged and reviewed.</p>
      
      <h3>Multiple Secure Payment Options</h3>
      <p>We offer a variety of payment methods to suit your preference:</p>
      <ul>
        <li><strong>Credit/Debit Cards:</strong> All major cards accepted with 3D Secure authentication</li>
        <li><strong>JazzCash & EasyPaisa:</strong> Pakistan's leading mobile wallets, fully integrated</li>
        <li><strong>Bank Transfers:</strong> Direct bank transfers with verification</li>
      </ul>
      
      <h3>What We Don't Store</h3>
      <p>For your protection, GoBo never stores:</p>
      <ul>
        <li>Full credit card numbers</li>
        <li>CVV/CVC codes</li>
        <li>PIN numbers</li>
        <li>Bank account passwords</li>
      </ul>
      
      <h3>Your Security, Our Priority</h3>
      <p>We continuously monitor our systems for vulnerabilities, conduct regular security audits, and work with ethical hackers to identify and fix potential issues before they can be exploited.</p>
      
      <p>When you see the padlock icon in your browser and "https" in the address bar, you're connected to GoBo's secure servers. Your transaction is protected, your data is encrypted, and your peace of mind is guaranteed.</p>
    `,
    date: "Jan 12, 2024",
    author: {
      name: "Security Team",
      role: "Security",
      avatar: "https://ui-avatars.com/api/?name=Security+Team&background=003d2b&color=fff",
      bio: "The team dedicated to keeping your transactions and data safe."
    },
    category: "security",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800",
    tags: ["#security", "#payments", "#encryption"],
    relatedPosts: [2, 3]
  }
];

// Combine all posts for easy lookup
export const allPosts = [...featuredPosts, ...recentPosts];

// Helper function to get post by slug
export const getPostBySlug = (slug) => {
  return allPosts.find(post => post.slug === slug);
};

// Helper function to get related posts
export const getRelatedPosts = (postIds) => {
  return allPosts.filter(post => postIds.includes(post.id));
};