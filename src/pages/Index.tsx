
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import BannerCarousel from '@/components/BannerCarousel';
import TestimonialCarousel from '@/components/TestimonialCarousel';
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

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      company: "PT Logistik Utama",
      image: "/assets/client-1.jpg",
      testimonial: "Implementasi WMS Antlia meningkatkan akurasi inventaris kami hingga 99% dan mengurangi waktu pengambilan barang sebesar 35%."
    },
    {
      id: 2,
      name: "Siti Rahayu",
      company: "Global Transport Indonesia",
      image: "/assets/client-2.jpg",
      testimonial: "TMS dari Antlia membantu kami mengoptimalkan rute pengiriman dan menghemat biaya transportasi hingga 28% dalam 6 bulan pertama."
    },
    {
      id: 3,
      name: "Hendra Wijaya",
      company: "Manufaktur Makmur",
      image: "/assets/client-3.jpg",
      testimonial: "Sistem ERP Antlia mengintegrasikan semua operasi bisnis kami, meningkatkan produktivitas 40% dan mengurangi kesalahan input data sebesar 60%."
    }
  ];

  return (
    <Layout>
      {/* Hero Section with Image background */}
      <section className="relative" data-aos="fade">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="relative h-[70vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/hero-image-new.jpg')" }}
        >
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl" data-aos="fade-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Optimalkan Rantai Pasok Anda dengan Teknologi Terdepan
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Solusi digital lengkap untuk meningkatkan efisiensi, transparansi, dan keberlanjutan rantai pasok Anda.
                </p>
                <div className="flex flex-wrap gap-4" data-aos="fade-up" data-aos-delay="200">
                  <Link 
                    to="/layanan"
                    className="px-6 py-3 rounded-md bg-antlia-blue text-white font-medium hover:bg-opacity-90 transition-colors"
                  >
                    Pelajari Lebih Lanjut
                  </Link>
                  <Link 
                    to="/kontak"
                    className="px-6 py-3 rounded-md bg-transparent border border-white text-white font-medium hover:bg-white/10 transition-colors"
                  >
                    Hubungi Tim Kami
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Banner Carousel Section */}
      <section className="py-12 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Informasi Terkini</h2>
            <p className="text-gray-600 mt-2">Dapatkan informasi terbaru dari Antlia</p>
          </div>
          
          <div data-aos="fade-up" data-aos-delay="100">
            <BannerCarousel banners={banners} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Produk dan Layanan Kami</h2>
            <p className="text-lg text-gray-600">
              Antlia menyediakan berbagai solusi teknologi untuk memenuhi kebutuhan bisnis Anda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <div key={service.id} data-aos="fade-up" data-aos-delay={index * 100}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-antlia-light" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Mengapa Memilih Antlia?</h2>
            <p className="text-lg text-gray-600">
              Keunggulan kami yang membuat Antlia menjadi pilihan terbaik untuk solusi teknologi Anda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="100">
              <div className="h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-antlia-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Teknologi Canggih</h3>
              <p className="text-gray-600">
                Solusi berbasis AI dan IoT terdepan untuk mengoptimalkan proses bisnis Anda.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <div className="h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-antlia-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Integrasi Mudah</h3>
              <p className="text-gray-600">
                Integrasi tanpa hambatan dengan sistem yang sudah Anda gunakan.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="300">
              <div className="h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-antlia-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Dukungan 24/7</h3>
              <p className="text-gray-600">
                Tim dukungan teknis siap membantu Anda kapan saja, 24 jam sehari, 7 hari seminggu.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="400">
              <div className="h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-antlia-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Keamanan Data</h3>
              <p className="text-gray-600">
                Keamanan data tingkat enterprise untuk melindungi informasi bisnis Anda.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="500">
              <div className="h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-antlia-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pengalaman Luas</h3>
              <p className="text-gray-600">
                Lebih dari 10 tahun pengalaman dalam industri teknologi rantai pasok.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="600">
              <div className="h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-antlia-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Solusi Kustom</h3>
              <p className="text-gray-600">
                Solusi yang disesuaikan dengan kebutuhan spesifik bisnis Anda.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Testimoni Klien</h2>
            <p className="text-lg text-gray-600">
              Apa kata klien kami tentang solusi yang kami berikan
            </p>
          </div>
          
          <div data-aos="fade-up" data-aos-delay="100">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
          
          {/* Client logos */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-center mb-8">Dipercaya oleh</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <img src="/assets/client-logo-1.png" alt="Client Logo" className="h-12 w-auto grayscale hover:grayscale-0 transition-all" />
              <img src="/assets/client-logo-2.png" alt="Client Logo" className="h-12 w-auto grayscale hover:grayscale-0 transition-all" />
              <img src="/assets/client-logo-3.png" alt="Client Logo" className="h-12 w-auto grayscale hover:grayscale-0 transition-all" />
              <img src="/assets/client-logo-4.png" alt="Client Logo" className="h-12 w-auto grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Success Stories */}
      <section className="py-16 md:py-24 bg-antlia-light" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Studi Kasus</h2>
            <p className="text-lg text-gray-600">
              Cerita sukses klien kami dengan hasil nyata
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-bold mb-2">PT Logistik Utama</h3>
              <p className="text-gray-600 mb-4">
                Peningkatan efisiensi gudang sebesar 45% dan akurasi inventaris hingga 99% setelah mengimplementasi WMS Antlia.
              </p>
              <Link 
                to="#"
                className="text-antlia-blue font-medium hover:text-antlia-blue transition-colors"
              >
                Baca Selengkapnya
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-bold mb-2">Global Transport Indonesia</h3>
              <p className="text-gray-600 mb-4">
                Pengurangan biaya transportasi hingga 30% dan optimalisasi rute pengiriman berkat TMS Antlia.
              </p>
              <Link 
                to="#"
                className="text-antlia-blue font-medium hover:text-antlia-blue transition-colors"
              >
                Baca Selengkapnya
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-xl font-bold mb-2">Manufaktur Makmur</h3>
              <p className="text-gray-600 mb-4">
                Integrasi seluruh operasi bisnis meningkatkan produktivitas 40% dan mengurangi biaya operasional 25%.
              </p>
              <Link 
                to="#"
                className="text-antlia-blue font-medium hover:text-antlia-blue transition-colors"
              >
                Baca Selengkapnya
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with image background */}
      <section className="py-16 relative overflow-hidden" data-aos="fade-up">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/cta-bg.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Siap Meningkatkan Efisiensi Rantai Pasok Anda?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Hubungi kami hari ini untuk konsultasi gratis dan temukan solusi terbaik untuk bisnis Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="100">
              <Link 
                to="/kontak"
                className="px-6 py-3 rounded-md bg-antlia-blue text-white font-medium hover:bg-opacity-90 transition-colors"
              >
                Hubungi Kami Sekarang
              </Link>
              <Link 
                to="/kontak"
                className="px-6 py-3 rounded-md bg-transparent border border-white text-white font-medium hover:bg-white/10 transition-colors"
              >
                Jadwalkan Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-gray-50 flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay="100">
              <MapPin size={32} className="text-antlia-blue mb-4" />
              <h3 className="text-lg font-bold mb-2">Alamat Kantor</h3>
              <p className="text-gray-600">
                BSD, Tangerang Selatan, Banten
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-gray-50 flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay="200">
              <Phone size={32} className="text-antlia-blue mb-4" />
              <h3 className="text-lg font-bold mb-2">Telepon</h3>
              <p className="text-gray-600">
                +62 877-6287-7273
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-gray-50 flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay="300">
              <Clock size={32} className="text-antlia-blue mb-4" />
              <h3 className="text-lg font-bold mb-2">Jam Operasional</h3>
              <p className="text-gray-600">
                Senin - Jumat: 8.00-17.00<br />
                Sabtu: 08.00-14.00<br />
                Customer Services: 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 md:py-24 bg-antlia-light" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
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
      <WhatsAppButton phoneNumber="6287762877273" message="Halo Antlia, saya ingin mengetahui lebih lanjut tentang solusi Anda." />
    </Layout>
  );
};

export default Index;
