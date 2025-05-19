
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout';
import PricingCard from '@/components/PricingCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useData } from '@/context/DataContext';

const Pricing = () => {
  const { pricing } = useData();

  return (
    <Layout>
      {/* Header Section with Image Background */}
      <section className="relative py-12 md:py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/pricing-hero.jpg" 
            alt="Pricing Header" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-left" data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Harga Layanan
            </h1>
            <p className="text-xl text-white/90">
              Solusi terjangkau untuk kebutuhan bisnis Anda.
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
            <span className="text-gray-800">Harga</span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-left mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Pilih Paket yang Sesuai untuk Bisnis Anda</h2>
            <p className="text-lg text-gray-600">
              Kami menawarkan berbagai paket layanan dengan harga yang terjangkau untuk berbagai skala bisnis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pricing.map((plan, index) => (
              <div key={plan.id} data-aos="fade-up" data-aos-delay={index * 100}>
                <PricingCard plan={plan} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="6281573635143" message="Halo Antlia, saya ingin mengetahui lebih lanjut tentang paket harga layanan Anda." />
    </Layout>
  );
};

export default Pricing;
