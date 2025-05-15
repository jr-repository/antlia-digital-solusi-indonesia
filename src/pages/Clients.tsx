
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useData } from '@/context/DataContext';
import WhatsAppButton from '@/components/WhatsAppButton';
import MultiTestimonialCarousel from '@/components/MultiTestimonialCarousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Clients = () => {
  const { clients, testimonials } = useData();

  return (
    <Layout>
      {/* Header Section */}
      <section className="relative py-12 md:py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/clients-hero.jpg" 
            alt="Clients Header" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl" data-aos="fade-right" data-aos-duration="800">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Klien Kami
            </h1>
            <p className="text-xl text-white/90">
              Kemitraan yang telah kami bangun dengan berbagai perusahaan terkemuka.
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
            <span className="text-gray-800">Klien</span>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12" data-aos="fade-up" data-aos-duration="600">
            <h2 className="text-3xl font-bold mb-4">Apa Kata Klien Kami</h2>
            <p className="text-lg text-gray-600">
              Dengarkan pengalaman langsung dari para klien yang telah menggunakan solusi teknologi Antlia.
            </p>
          </div>
          
          <div className="mt-8" data-aos="fade-up" data-aos-delay="100">
            <MultiTestimonialCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10" data-aos="fade-up" data-aos-duration="600">
            <h2 className="text-2xl font-bold mb-4">Perusahaan yang Mempercayai Kami</h2>
            <p className="text-gray-600">
              Kami telah membantu berbagai perusahaan dalam transformasi digital mereka.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6" data-aos="fade-up" data-aos-delay="200">
            {clients.map((client) => (
              <div 
                key={client.id} 
                className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-24"
                data-aos="fade-up"
                data-aos-delay={(Number(client.id) % 6) * 100}
              >
                <AspectRatio ratio={3/2} className="w-full max-w-[120px]">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12" data-aos="fade-up" data-aos-duration="600">
            <h2 className="text-3xl font-bold mb-4">Studi Kasus</h2>
            <p className="text-lg text-gray-600">
              Lihat bagaimana solusi kami membantu klien mencapai tujuan bisnis mereka.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.slice(0, 3).map((client) => (
              <div 
                key={client.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={(Number(client.id) % 3) * 100}
              >
                <div className="relative">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={`/assets/case-${client.id}.jpg`} 
                      alt={client.name} 
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                  <div className="absolute top-2 right-2 bg-white p-2 rounded-md">
                    <AspectRatio ratio={1/1} className="w-8 h-8">
                      <img 
                        src={client.logo} 
                        alt={client.name} 
                        className="w-full h-full object-contain"
                      />
                    </AspectRatio>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{client.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {client.industry} · {client.location}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {`Implementasi solusi ${client.implementation} yang meningkatkan efisiensi operasional sebesar ${20 + Number(client.id) * 5}%.`}
                  </p>
                  <Link 
                    to="#"
                    className="text-antlia-blue font-medium hover:underline"
                  >
                    Baca selengkapnya →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up" data-aos-duration="600">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Jadilah Bagian dari Success Story Kami
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Temukan bagaimana solusi teknologi Antlia dapat membantu transformasi digital bisnis Anda.
            </p>
            <Link 
              to="/kontak"
              className="inline-block px-6 py-3 rounded-md bg-antlia-blue text-white font-medium hover:bg-opacity-90 transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="6281573635143" message="Halo Antlia, saya ingin mengetahui lebih lanjut tentang klien dan studi kasus Anda." />
    </Layout>
  );
};

export default Clients;
