
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import AOS from 'aos';

const Solutions = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
    });
    AOS.refresh();
  }, []);

  const solutions = [
    {
      id: 1,
      title: 'Solusi untuk Manufaktur',
      description: 'Otomatisasi proses produksi, manajemen inventaris, dan integrasi rantai pasok untuk industri manufaktur.',
      benefits: [
        'Peningkatan efisiensi produksi hingga 40%',
        'Pengurangan inventaris berlebih hingga 25%',
        'Peningkatan akurasi pengiriman hingga 99%',
        'Integrasi seluruh proses bisnis'
      ],
      image: '/assets/solution-manufacturing.jpg'
    },
    {
      id: 2,
      title: 'Solusi untuk Ritel & E-commerce',
      description: 'Integrasikan toko online dan offline Anda dengan manajemen inventaris dan pengiriman yang efisien.',
      benefits: [
        'Visibilitas stok real-time',
        'Manajemen fulfillment otomatis',
        'Integrasi dengan marketplace',
        'Analisis data pelanggan dan penjualan'
      ],
      image: '/assets/solution-retail.jpg'
    },
    {
      id: 3,
      title: 'Solusi untuk Logistik & Distribusi',
      description: 'Optimalkan rute pengiriman, lacak aset, dan kelola armada dengan efisien untuk meningkatkan layanan logistik.',
      benefits: [
        'Pengurangan biaya transportasi hingga 30%',
        'Peningkatan utilisasi aset hingga 25%',
        'Pelacakan pengiriman real-time',
        'Manajemen tenaga kerja yang efisien'
      ],
      image: '/assets/solution-logistics.jpg'
    },
    {
      id: 4,
      title: 'Solusi untuk FMCG',
      description: 'Kelola distribusi produk dengan cepat, pantau ketersediaan stok, dan optimalisasi rantai pasok untuk barang konsumsi.',
      benefits: [
        'Pengurangan out-of-stock hingga 45%',
        'Peningkatan ketepatan pengiriman',
        'Forecasting permintaan yang akurat',
        'Pengurangan biaya distribusi'
      ],
      image: '/assets/solution-fmcg.jpg'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div 
          className="relative h-[40vh] md:h-[50vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/solutions-hero.jpg')" }}
        >
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl" data-aos="fade-up">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Solusi Industri
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-6">
                  Kami menyediakan solusi teknologi yang disesuaikan dengan kebutuhan spesifik industri Anda
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {solutions.map((solution, index) => (
              <div 
                key={solution.id} 
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
                data-aos="fade-up"
              >
                <div className="w-full lg:w-1/2">
                  <img 
                    src={solution.image} 
                    alt={solution.title}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{solution.title}</h2>
                  <p className="text-gray-600 mb-6">{solution.description}</p>
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Manfaat:</h3>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, i) => (
                        <li key={i} className="flex">
                          <CheckCircle size={18} className="text-antlia-blue mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link 
                    to="/kontak"
                    className="inline-flex items-center text-antlia-blue hover:text-antlia-blue transition-colors"
                  >
                    Pelajari Lebih Lanjut
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden" data-aos="fade-up">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/cta-bg.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Temukan Solusi yang Tepat untuk Industri Anda
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Tim ahli kami siap membantu Anda memilih solusi terbaik yang sesuai dengan kebutuhan bisnis Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/kontak"
                className="px-6 py-3 rounded-md bg-antlia-blue text-white font-medium hover:bg-opacity-90 transition-colors"
              >
                Hubungi Kami
              </Link>
              <Link 
                to="/layanan"
                className="px-6 py-3 rounded-md bg-transparent border border-white text-white font-medium hover:bg-white/10 transition-colors"
              >
                Lihat Produk Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Solutions;
