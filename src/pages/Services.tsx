
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ChevronRight, Database, Boxes, Truck, Users, HeartHandshake, Wifi } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useData } from '@/context/DataContext';

const Services = () => {
  const { services } = useData();

  const getIcon = (iconName: string, size = 24) => {
    switch (iconName) {
      case 'database':
        return <Database size={size} className="text-antlia-blue" />;
      case 'boxes':
        return <Boxes size={size} className="text-antlia-blue" />;
      case 'truck':
        return <Truck size={size} className="text-antlia-blue" />;
      case 'users':
        return <Users size={size} className="text-antlia-blue" />;
      case 'heart-handshake':
        return <HeartHandshake size={size} className="text-antlia-blue" />;
      case 'wifi':
        return <Wifi size={size} className="text-antlia-blue" />;
      default:
        return <Database size={size} className="text-antlia-blue" />;
    }
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-antlia-blue to-antlia-purple">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Layanan Kami
            </h1>
            <p className="text-xl text-white/90">
              Menyediakan berbagai solusi teknologi terdepan untuk kebutuhan bisnis modern.
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
            <span className="text-gray-800">Layanan</span>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Solusi Teknologi Digital Terbaik untuk Bisnis Anda</h2>
            <p className="text-lg text-gray-600">
              Kami menyediakan berbagai solusi teknologi yang dirancang untuk membantu bisnis Anda berkembang dan bersaing di era digital.
            </p>
          </div>
        </div>
      </section>

      {/* Individual Services Sections */}
      {services.map((service) => (
        <section 
          key={service.id} 
          id={service.name.toLowerCase()}
          className={`py-16 md:py-24 ${service.id % 2 === 0 ? 'bg-antlia-light' : 'bg-white'}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${service.id % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
              <div className={`${service.id % 2 === 0 ? 'lg:order-2' : ''}`}>
                <div className="mb-8">
                  {getIcon(service.icon, 48)}
                </div>
                <h2 className="text-3xl font-bold mb-6">{service.name}</h2>
                <p className="text-gray-600 mb-8">
                  {service.description}
                </p>
                
                <h3 className="text-xl font-semibold mb-4">Fitur Utama</h3>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-antlia-blue/10 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-antlia-blue"></div>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={`/harga#${service.name.toLowerCase()}`}
                  className="inline-block px-6 py-3 rounded-md bg-antlia-blue text-white font-medium hover:bg-opacity-90 transition-colors"
                >
                  Lihat Harga
                </Link>
              </div>
              
              <div className={`${service.id % 2 === 0 ? 'lg:order-1' : ''} relative`}>
                <img 
                  src={`/assets/service-${service.id}.jpg`} 
                  alt={service.name} 
                  className="w-full rounded-lg shadow-lg"
                />
                
                <div 
                  className={`absolute ${service.id % 2 === 0 ? '-bottom-4 -left-4' : '-bottom-4 -right-4'} w-16 h-16 rounded-full ${
                    String(service.id) % 2 === 0 ? 'bg-antlia-cyan' : 'bg-antlia-purple'
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-antlia-blue to-antlia-purple">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Siap Meningkatkan Bisnis Anda dengan Teknologi?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Hubungi tim kami hari ini untuk konsultasi gratis dan temukan solusi yang tepat untuk kebutuhan bisnis Anda.
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

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="6281573635143" message="Halo Antlia, saya ingin mengetahui lebih lanjut tentang layanan yang Anda tawarkan." />
    </Layout>
  );
};

export default Services;
