
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ChevronRight, Database, Boxes, Truck, Users, HeartHandshake, Wifi } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useData } from '@/context/DataContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Services = () => {
  const { services, pricing } = useData();

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
      <section className="relative py-12 md:py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/services-hero.jpg" 
            alt="Services Header" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl" data-aos="fade-right" data-aos-duration="800">
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
          <div className="max-w-3xl mx-auto text-center mb-12" data-aos="fade-up" data-aos-duration="600">
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
          className={`py-12 md:py-16 ${Number(service.id) % 2 === 0 ? 'bg-antlia-light' : 'bg-white'}`}
          data-aos={Number(service.id) % 2 === 0 ? 'fade-left' : 'fade-right'}
          data-aos-duration="800"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className={`${Number(service.id) % 2 === 0 ? 'lg:order-2' : ''}`}>
                <div className="mb-6">
                  {getIcon(service.icon, 40)}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{service.name}</h2>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                
                <h3 className="text-lg font-semibold mb-3">Fitur Utama</h3>
                <ul className="space-y-2 mb-6">
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
                  to={`#pricing-${service.name.toLowerCase()}`}
                  className="inline-block px-5 py-2.5 rounded-md bg-antlia-blue text-white font-medium hover:bg-opacity-90 transition-colors"
                >
                  Lihat Paket
                </Link>
              </div>
              
              <div className={`${Number(service.id) % 2 === 0 ? 'lg:order-1' : ''} relative`}>
                <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-md">
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={`/assets/service-${service.id}.jpg`} 
                      alt={service.name} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </AspectRatio>
                </div>
                
                <div 
                  className={`absolute ${Number(service.id) % 2 === 0 ? '-bottom-4 -left-4' : '-bottom-4 -right-4'} w-12 h-12 rounded-full ${
                    Number(service.id) % 2 === 0 ? 'bg-antlia-cyan' : 'bg-antlia-purple'
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-20 bg-antlia-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12" data-aos="fade-up" data-aos-duration="600">
            <h2 className="text-3xl font-bold mb-4">Pilih Paket yang Sesuai untuk Bisnis Anda</h2>
            <p className="text-lg text-gray-600">
              Kami menawarkan berbagai paket layanan dengan harga yang terjangkau untuk berbagai skala bisnis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
            {pricing.map((plan, index) => (
              <div 
                key={plan.id} 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                className={`bg-white rounded-lg shadow-sm p-6 border ${plan.popular ? 'border-antlia-blue' : 'border-gray-100'} relative`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-0 bg-antlia-blue text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-2xl font-bold">{plan.price}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <ChevronRight size={18} className="text-antlia-blue mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <Link
                    to={`/kontak?plan=${encodeURIComponent(plan.name)}`}
                    className="py-2 px-4 text-center rounded-md font-medium transition-colors bg-antlia-blue text-white hover:bg-opacity-90"
                  >
                    Pilih Paket
                  </Link>
                  
                  <button
                    className="py-2 px-4 text-center rounded-md font-medium transition-colors border border-antlia-blue text-antlia-blue hover:bg-antlia-blue/10"
                    onClick={() => window.open('https://wa.me/6281573635143?text=Halo,%20saya%20ingin%20demo%20untuk%20paket%20' + encodeURIComponent(plan.name), '_blank')}
                  >
                    Demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center" data-aos="zoom-in" data-aos-duration="800">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Siap Meningkatkan Bisnis Anda dengan Teknologi?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Hubungi tim kami hari ini untuk konsultasi gratis dan temukan solusi yang tepat untuk kebutuhan bisnis Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/kontak"
                className="px-6 py-3 rounded-md bg-antlia-blue text-white font-medium hover:bg-opacity-90 transition-colors"
              >
                Hubungi Kami
              </Link>
              <button
                onClick={() => window.open('https://wa.me/6281573635143?text=Halo,%20saya%20ingin%20demo%20teknologi%20Antlia', '_blank')}
                className="px-6 py-3 rounded-md bg-transparent border border-antlia-blue text-antlia-blue font-medium hover:bg-antlia-blue/10 transition-colors"
              >
                Demo Gratis
              </button>
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
