
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import BannerCarousel from '@/components/BannerCarousel';
import { useData } from '@/context/DataContext';

const Index = () => {
  const { services, articles } = useData();

  // Sample banner data, in a real app this would come from your DataContext
  const banners = [
    {
      id: 1,
      image: "/assets/banner-1.jpg",
      title: "Solusi Digital Terbaik untuk Bisnis Anda",
      description: "Tingkatkan efisiensi dan produktivitas bisnis dengan teknologi terkini"
    },
    {
      id: 2,
      image: "/assets/banner-2.jpg",
      title: "Layanan Konsultasi IT Profesional",
      description: "Tim ahli kami siap membantu transformasi digital bisnis Anda"
    },
    {
      id: 3,
      image: "/assets/banner-3.jpg",
      title: "Sistem Terintegrasi & Teroptimasi",
      description: "Solusi terintegrasi untuk kebutuhan bisnis yang kompleks"
    }
  ];

  return (
    <Layout>
      {/* Hero Section with Image background */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="relative h-[70vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/hero-image-new.jpg')" }}
        >
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl" data-aos="fade-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Solusi Teknologi Digital untuk Bisnis Anda
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Antlia menyediakan berbagai solusi teknologi terdepan untuk membantu bisnis Anda berkembang di era digital.
                </p>
                <div className="flex flex-wrap gap-4" data-aos="fade-up" data-aos-delay="200">
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
      
      {/* Banner Carousel Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8" data-aos="fade-up">
            <h2 className="text-3xl font-bold">Informasi Terkini</h2>
            <p className="text-gray-600 mt-2">Dapatkan informasi terbaru dari Antlia</p>
          </div>
          
          <div data-aos="fade-up" data-aos-delay="100">
            <BannerCarousel banners={banners} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-antlia-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Mengapa Memilih Antlia?</h2>
            <p className="text-lg text-gray-600">
              Kami menyediakan solusi teknologi terbaik yang disesuaikan dengan kebutuhan bisnis Anda. 
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="100">
              <div className="h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-antlia-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Kualitas Terjamin</h3>
              <p className="text-gray-600">
                Produk kami dikembangkan dengan standar kualitas tertinggi dan teknologi terbaru.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <div className="h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-antlia-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Dukungan 24/7</h3>
              <p className="text-gray-600">
                Tim dukungan kami siap membantu Anda 24 jam sehari, 7 hari seminggu.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="300">
              <div className="h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-antlia-blue" />
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
          <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Layanan Kami</h2>
            <p className="text-lg text-gray-600">
              Antlia menyediakan berbagai solusi teknologi untuk memenuhi kebutuhan bisnis Anda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, index) => (
              <div key={service.id} data-aos="fade-up" data-aos-delay={index * 100}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12" data-aos="fade-up">
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

      {/* CTA Section with image background */}
      <section className="py-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/cta-bg.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-white mb-4">
              Siap untuk Transformasi Digital?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Hubungi kami hari ini untuk konsultasi gratis dan temukan solusi terbaik untuk bisnis Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="100">
              <Link 
                to="/kontak"
                className="px-6 py-3 rounded-md bg-antlia-blue text-white font-medium hover:bg-opacity-90 transition-colors"
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
          <div className="flex justify-between items-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold">Artikel Terbaru</h2>
            <Link 
              to="/artikel"
              className="text-antlia-blue hover:text-antlia-blue transition-colors inline-flex items-center"
            >
              Lihat Semua
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article, index) => (
              <div key={article.id} className="antlia-card overflow-hidden bg-white" data-aos="fade-up" data-aos-delay={index * 100}>
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
                    className="text-antlia-blue font-medium hover:text-antlia-blue transition-colors"
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
