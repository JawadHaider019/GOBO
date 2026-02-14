"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeroSection from '../../components/HeroSection';
import { 
  categories, 
  featuredPosts, 
  recentPosts, 
  categoryMap 
} from '../../data/blogData';

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = activeCategory === 'all' 
    ? recentPosts 
    : recentPosts.filter(post => post.category === activeCategory);

  // Helper function to get category display name
  const getCategoryName = (categoryId) => {
    return categoryMap[categoryId] || categoryId;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Matching Contact page style */}
      <HeroSection
        title="The Node Chronicles"
        description="Insights, updates, and deep dives from the team building Pakistan's most trusted booking platform."
        badge="Blog"
        imageOpacity={100}
        overlayOpacity={50}
        overlayGradientFrom="#003d2b"
        overlayGradientTo="#006644"
      />

      {/* Search Bar - Below Hero */}
      <div className="max-w-7xl mx-auto px-6 mt-10 mb-12">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-[#006644] focus:ring-2 focus:ring-[#006644]/20 outline-none transition text-lg shadow-lg"
          />
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
        </div>
      </div>

      {/* Featured Posts */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[12px] font-black text-gray-400 uppercase tracking-[0.5em]">
              Editor's Pick
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mt-2">
              Featured Stories
            </h2>
          </div>
          <Link href="/blogs/featured" className="text-[#006644] font-medium hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-[#006644] hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {post.trending && (
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-[#003d2b]">
                    <i className="fas fa-chart-line text-[#006644] text-xs"></i>
                    <span>Trending</span>
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block bg-[#006644] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {getCategoryName(post.category)}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{post.author.name}</p>
                    <p className="text-xs text-gray-500">{post.author.role}</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#006644] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{post.date} · {post.readTime} read</span>
                  <span className="text-[#006644] text-sm font-medium opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mb-4">
                  Categories
                </h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                        activeCategory === cat.id
                          ? 'bg-gradient-to-r from-[#003d2b] to-[#006644] text-white shadow-md'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="font-medium text-sm">{cat.name}</span>
                      <span className={`text-xs ${activeCategory === cat.id ? 'text-white/70' : 'text-gray-400'}`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-[#003d2b]/5 to-[#006644]/5 p-6 rounded-2xl border border-[#003d2b]/20">
                <div className="w-12 h-12 bg-gradient-to-r from-[#003d2b] to-[#006644] rounded-xl flex items-center justify-center text-white text-xl mb-4">
                  <i className="far fa-envelope"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Subscribe to updates</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Get the latest posts delivered straight to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-3 text-sm focus:border-[#006644] outline-none"
                />
                <button className="w-full bg-gradient-to-r from-[#003d2b] to-[#006644] text-white font-medium py-3 rounded-xl hover:shadow-lg transition">
                  Subscribe
                </button>
              </div>

              {/* Popular Tags */}
              <div>
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mb-4">
                  Popular Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['#security', '#product', '#engineering', '#community', '#events'].map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-[#003d2b] hover:text-white rounded-lg text-xs font-medium transition"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Recent Posts Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">
                  Latest Updates
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Recent posts</h2>
              </div>
              
              <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#006644] outline-none">
                <option>Most recent</option>
                <option>Most popular</option>
              </select>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {(searchQuery ? recentPosts.filter(p => 
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
              ) : filteredPosts).map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="group flex flex-col md:flex-row gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#006644] hover:shadow-lg transition-all duration-300"
                >
                  <div className="md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-medium text-[#006644] bg-[#006644]/10 px-2 py-0.5 rounded-full">
                        {getCategoryName(post.category)}
                      </span>
                      <span className="text-[10px] text-gray-400">{post.readTime} read</span>
                    </div>
                    
                    <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-[#006644] transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-xs mb-2 line-clamp-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-gray-900">
                          {typeof post.author === 'string' ? post.author : post.author.name}
                        </span>
                        <span className="text-[10px] text-gray-400">·</span>
                        <span className="text-[10px] text-gray-400">{post.date}</span>
                      </div>
                      
                      <span className="text-[#006644] text-xs font-medium opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="px-6 py-3 border-2 border-[#003d2b] text-[#003d2b] font-bold rounded-xl text-sm hover:bg-[#003d2b] hover:text-white transition-all duration-300">
                Load more articles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#003d2b] to-[#006644] py-16 mt-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-80 mb-3 block">
            Get Involved
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">
            Write for The Node Chronicles
          </h2>
          <p className="text-base text-white/80 mb-6 max-w-2xl mx-auto">
            Share your insights on digital identity, security, and the future of bookings in Pakistan.
          </p>
          <button className="bg-white text-[#003d2b] px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Submit a pitch
          </button>
        </div>
      </section>
    </div>
  );
};

export default Blogs;