
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useData } from '@/context/DataContext';

const Index = () => {
  const { services, articles } = useData();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/50 z-10"></div>
        <div 
          className="relative h-[60vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/hero-image.jpg')" }}
        >
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
                  Solusi Teknologi Digital untuk Bisnis Anda
                </h1>
                <p className="text-xl text-white/90 mb-8 animate-slide-in">
                  Antlia menyediakan berbagai solusi teknologi terdepan untuk membantu bisnis Anda berkembang di era digital.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/layanan"
                    className="px-6 py-3 rounded-md bg-antlia-blue text-white font-medium hover:bg-opacity-90 transition-colors"
                  >
                    Jelajahi Layanan
                  </Link>
                  <Link 
                    to="/kontak"
                    className="px-6 py-3 rounded-md bg-transparent border border-white text-white font-medium hover:bg-white/10 transition-colors"
                  >
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-antlia-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Mengapa Memilih Antlia?</h2>
            <p className="text-lg text-gray-600">
              Kami menyediakan solusi teknologi terbaik yang disesuaikan dengan kebutuhan bisnis Anda. 
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-antlia-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Kualitas Terjamin</h3>
              <p className="text-gray-600">
                Produk kami dikembangkan dengan standar kualitas tertinggi dan teknologi terbaru.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-antlia-purple/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-antlia-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Dukungan 24/7</h3>
              <p className="text-gray-600">
                Tim dukungan kami siap membantu Anda 24 jam sehari, 7 hari seminggu.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-antlia-cyan/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-antlia-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-2">Solusi Kustom</h3>
              <p className="text-gray-600">
                Setiap solusi kami dapat disesuaikan dengan kebutuhan spesifik bisnis Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Layanan Kami</h2>
            <p className="text-lg text-gray-600">
              Antlia menyediakan berbagai solusi teknologi untuk memenuhi kebutuhan bisnis Anda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/layanan"
              className="inline-flex items-center px-6 py-3 rounded-md bg-antlia-blue text-white font-medium hover:bg-opacity-90 transition-colors"
            >
              Lihat Semua Layanan
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-antlia-blue to-antlia-purple opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/assets/pattern-bg.png')] opacity-30"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Siap untuk Transformasi Digital?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Hubungi kami hari ini untuk konsultasi gratis dan temukan solusi terbaik untuk bisnis Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/kontak"
                className="px-6 py-3 rounded-md bg-white text-antlia-blue font-medium hover:bg-opacity-90 transition-colors"
              >
                Hubungi Kami
              </Link>
              <Link 
                to="/harga"
                className="px-6 py-3 rounded-md bg-transparent border border-white text-white font-medium hover:bg-white/10 transition-colors"
              >
                Lihat Harga
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 md:py-24 bg-antlia-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Artikel Terbaru</h2>
            <Link 
              to="/artikel"
              className="text-antlia-blue hover:text-antlia-purple transition-colors inline-flex items-center"
            >
              Lihat Semua
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article) => (
              <div key={article.id} className="antlia-card overflow-hidden bg-white">
                <Link to={`/artikel/${article.id}`}>
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-5">
                  <Link to={`/artikel/${article.id}`}>
                    <h3 className="text-lg font-bold mb-2 hover:text-antlia-blue transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-2">{article.summary}</p>
                  <Link 
                    to={`/artikel/${article.id}`}
                    className="text-antlia-blue font-medium hover:text-antlia-purple transition-colors"
                  >
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="6281573635143" message="Halo Antlia, saya ingin mengetahui lebih lanjut tentang solusi Anda." />
    </Layout>
  );
};

export default Index;
