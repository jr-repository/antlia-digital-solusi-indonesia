import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import Layout from '@/components/Layout';
import ArticleCard from '@/components/ArticleCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useSupabase } from '@/context/SupabaseContext';

const Articles = () => {
  const { articles, loading } = useSupabase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Extract unique categories
  const categories = ['all', ...new Set(articles.map(article => article.category))];

  // Filter articles by search term and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Header Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-antlia-blue to-antlia-purple">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Artikel
            </h1>
            <p className="text-xl text-white/90">
              Temukan informasi terbaru dan wawasan tentang teknologi dan industri.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-antlia-light/80 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-antlia-blue">Beranda</Link>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <span className="text-gray-800">Artikel</span>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <section className="py-8 bg-antlia-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
              />
            </div>
            
            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
              >
                <option value="all">Semua Kategori</option>
                {categories.filter(cat => cat !== 'all').map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading.articles ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-antlia-blue border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-lg text-gray-600">Memuat artikel...</p>
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article as any} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Tidak ada artikel yang ditemukan</h3>
              <p className="text-gray-600">
                Coba dengan kata kunci atau kategori lain.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Artikel Pilihan</h2>
          
          {loading.articles ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-antlia-blue border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {articles.filter(article => article.featured).slice(0, 1).map(article => (
                <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img 
                        src={article.image || "/assets/featured-article.jpg"} 
                        alt={article.title} 
                        className="h-48 w-full object-cover md:h-full md:w-48"
                      />
                    </div>
                    <div className="p-8">
                      <div className="uppercase tracking-wide text-sm text-antlia-purple font-semibold">
                        {article.category}
                      </div>
                      <Link 
                        to={`/artikel/${article.id}`}
                        className="block mt-1 text-2xl font-bold text-gray-900 hover:text-antlia-blue transition-colors"
                      >
                        {article.title}
                      </Link>
                      <p className="mt-2 text-gray-600">
                        {article.summary}
                      </p>
                      <div className="mt-4">
                        <Link
                          to={`/artikel/${article.id}`}
                          className="text-antlia-blue hover:text-antlia-purple transition-colors font-medium"
                        >
                          Baca Selengkapnya
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {articles.filter(article => article.featured).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600">Belum ada artikel pilihan saat ini.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Dapatkan Artikel Terbaru</h2>
            <p className="text-lg text-gray-600 mb-8">
              Berlangganan newsletter kami untuk mendapatkan informasi terbaru dan wawasan industri.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Alamat Email Anda" 
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                required
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-antlia-blue text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                Berlangganan
              </button>
            </form>
            
            <p className="mt-4 text-sm text-gray-500">
              Kami tidak akan pernah membagikan email Anda dengan pihak lain.
            </p>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="6281573635143" message="Halo Antlia, saya ingin mengetahui lebih lanjut tentang konten artikel yang Anda miliki." />
    </Layout>
  );
};

export default Articles;
