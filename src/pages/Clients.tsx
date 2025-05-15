
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import AOS from 'aos';

const Clients = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
    });
    AOS.refresh();
  }, []);

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
    },
    {
      id: 4,
      name: "Dewi Lestari",
      company: "Fresh Food Distribution",
      image: "/assets/client-4.jpg",
      testimonial: "Dengan IoT Antlia, kami dapat memantau kondisi penyimpanan produk secara real-time, mengurangi kerusakan produk hingga 75%."
    }
  ];

  // Sample case studies
  const caseStudies = [
    {
      id: 1,
      company: "PT Logistik Utama",
      industry: "Jasa Logistik",
      solution: "Warehouse Management System",
      results: [
        "Peningkatan akurasi inventaris hingga 99%",
        "Pengurangan waktu pengambilan barang sebesar 35%",
        "Optimalisasi penggunaan ruang gudang hingga 25%"
      ],
      logo: "/assets/client-logo-1.png"
    },
    {
      id: 2,
      company: "Global Transport Indonesia",
      industry: "Transportasi & Logistik",
      solution: "Transport Management System",
      results: [
        "Pengurangan biaya transportasi hingga 28%",
        "Peningkatan efisiensi armada hingga 40%",
        "Penurunan waktu pengiriman rata-rata 22%"
      ],
      logo: "/assets/client-logo-2.png"
    },
    {
      id: 3,
      company: "Manufaktur Makmur",
      industry: "Manufaktur",
      solution: "Enterprise Resource Planning",
      results: [
        "Integrasi seluruh operasi bisnis",
        "Peningkatan produktivitas hingga 40%",
        "Pengurangan kesalahan input data sebesar 60%"
      ],
      logo: "/assets/client-logo-3.png"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div 
          className="relative h-[40vh] md:h-[50vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/clients-hero.jpg')" }}
        >
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl" data-aos="fade-up">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Klien Kami
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-6">
                  Bekerja sama dengan berbagai industri untuk meningkatkan efisiensi dan produktivitas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Dipercaya oleh</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Perusahaan terkemuka dari berbagai industri telah mempercayakan transformasi digital mereka kepada Antlia
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            <img src="/assets/client-logo-1.png" alt="Client" className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="/assets/client-logo-2.png" alt="Client" className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="/assets/client-logo-3.png" alt="Client" className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="/assets/client-logo-4.png" alt="Client" className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="/assets/client-logo-5.png" alt="Client" className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="/assets/client-logo-6.png" alt="Client" className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-antlia-light" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Testimoni Klien</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pendapat para klien tentang pengalaman mereka menggunakan solusi Antlia
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Studi Kasus</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kisah sukses implementasi solusi Antlia di berbagai industri
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <div key={study.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100" data-aos="fade-up">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{study.company}</h3>
                  <img src={study.logo} alt={study.company} className="h-8 w-auto" />
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Industri: {study.industry}</p>
                  <p className="text-sm text-gray-500">Solusi: {study.solution}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm">Hasil:</h4>
                  <ul className="space-y-1">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-start">
                        <span className="h-1.5 w-1.5 bg-antlia-blue rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="#" className="text-antlia-blue text-sm font-medium hover:underline">
                  Baca selengkapnya
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-antlia-light" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-md">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Bergabunglah dengan Perusahaan Sukses Lainnya
              </h2>
              <p className="text-gray-600 mb-8">
                Temukan bagaimana Antlia dapat membantu bisnis Anda meningkatkan efisiensi dan produktivitas.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/kontak"
                  className="px-6 py-3 rounded-md bg-antlia-blue text-white font-medium hover:bg-opacity-90 transition-colors"
                >
                  Hubungi Kami
                </Link>
                <Link 
                  to="/kontak"
                  className="px-6 py-3 rounded-md bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-colors"
                >
                  Jadwalkan Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Clients;
