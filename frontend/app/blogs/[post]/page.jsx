// app/blogs/[post]/page.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CTA from '../../../components/CTA';
import { getPostBySlug, getRelatedPosts, categoryMap } from '../../../data/blogData';

export default function BlogPost({ params }) {
  // Unwrap params with React.use() since it's a Promise in Next.js 15
  const { post } = React.use(params);
  const postData = getPostBySlug(post);

  if (!postData) {
    notFound();
  }

  // Get related posts
  const relatedPosts = postData.relatedPosts ? getRelatedPosts(postData.relatedPosts) : [];

  // Helper function to get category display name
  const getCategoryName = (categoryId) => {
    return categoryMap[categoryId] || categoryId;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar - Reading Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#003d2b] to-[#006644] transition-all duration-300"
          id="reading-progress"
          style={{ width: '0%' }}
        />
      </div>

      {/* Hero Section with Blog Image */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src={postData.image} 
          alt={postData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
        
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-16 md:pb-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-xs mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>›</span>
            <Link href="/blogs" className="hover:text-white transition">Blogs</Link>
            <span>›</span>
            <span className="text-white">{getCategoryName(postData.category)}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#006644] text-white px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-lg">
              {getCategoryName(postData.category)}
            </span>
            <span className="text-white/80 text-sm flex items-center gap-1">
              <i className="far fa-clock text-xs"></i>
              {postData.readTime} read
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
            {postData.title}
          </h1>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={typeof postData.author === 'object' ? postData.author.avatar : `https://ui-avatars.com/api/?name=${postData.author}&background=003d2b&color=fff&size=100`}
                  alt={typeof postData.author === 'object' ? postData.author.name : postData.author}
                  className="w-14 h-14 rounded-full border-3 border-white shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <p className="text-white font-bold text-lg">
                  {typeof postData.author === 'object' ? postData.author.name : postData.author}
                </p>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  {typeof postData.author === 'object' && postData.author.role && (
                    <>
                      <span className="flex items-center gap-1">
                        <i className="fas fa-briefcase text-xs"></i>
                        {postData.author.role}
                      </span>
                      <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                    </>
                  )}
                  <span className="flex items-center gap-1">
                    <i className="far fa-calendar text-xs"></i>
                    {postData.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#1DA1F2] hover:border-[#1DA1F2] transition-all duration-300">
                <i className="fab fa-twitter"></i>
              </button>
              <button className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#0077B5] hover:border-[#0077B5] transition-all duration-300">
                <i className="fab fa-linkedin-in"></i>
              </button>
              <button className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#006644] hover:border-[#006644] transition-all duration-300">
                <i className="fas fa-link"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        {/* Excerpt */}
        <div className="relative mb-12">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#003d2b] to-[#006644] rounded-full"></div>
          <p className="text-xl md:text-2xl text-gray-700 font-medium italic leading-relaxed pl-6">
            "{postData.excerpt}"
          </p>
        </div>

        {/* Table of Contents - Optional */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-12 border border-gray-200">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <i className="fas fa-list-ul text-[#006644]"></i>
            Table of Contents
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {['Introduction', 'Key Insights', 'Impact', 'Conclusion'].map((item, i) => (
              <button key={i} className="text-left text-sm text-gray-600 hover:text-[#006644] transition flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#006644] rounded-full"></span>
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Full Content */}
        <div 
          className="prose prose-lg max-w-none
            prose-headings:font-black prose-headings:text-gray-900 
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-strong:text-[#003d2b]
            prose-ul:my-6 prose-li:my-2
            prose-img:rounded-2xl prose-img:shadow-xl
            prose-blockquote:border-l-4 prose-blockquote:border-[#006644] prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-a:text-[#006644] prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: postData.fullContent }}
        />

        {/* Tags */}
        {postData.tags && postData.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-4">
              Related Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {postData.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blogs/tag/${tag.replace('#', '')}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-[#003d2b] hover:text-white text-gray-700 rounded-full text-xs font-medium transition-all duration-300"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

    

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link 
            href="/blogs"
            className="group flex items-center gap-3 text-[#006644] hover:text-[#003d2b] transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-[#006644] group-hover:text-white flex items-center justify-center transition-all">
              <i className="fas fa-arrow-left text-sm"></i>
            </div>
            <span className="font-medium">Back to all posts</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Share this article:</span>
            <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#1DA1F2] hover:text-white transition flex items-center justify-center">
              <i className="fab fa-twitter"></i>
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#0077B5] hover:text-white transition flex items-center justify-center">
              <i className="fab fa-linkedin-in"></i>
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#006644] hover:text-white transition flex items-center justify-center">
              <i className="fas fa-link"></i>
            </button>
          </div>
        </div>

    
      </article>

      {/* Related Posts - Enhanced */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-[12px] font-black text-gray-400 uppercase tracking-[0.5em]">
                Keep Reading
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter mt-2">
                Related Articles
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blogs/${relatedPost.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-[#006644] hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-[#006644] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {getCategoryName(relatedPost.category)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#006644] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{relatedPost.date}</span>
                      <span className="text-[#006644] text-sm font-medium group-hover:translate-x-2 transition-transform">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reading Progress Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('reading-progress').style.width = scrolled + '%';
          });
        `
      }} />

      {/* CTA */}
      <CTA />
    </div>
  );
}