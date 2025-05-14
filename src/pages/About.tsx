
import React from 'react';
import { CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import WhatsAppButton from '@/components/WhatsAppButton';

const About = () => {
  return (
    <Layout>
      {/* Header Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-antlia-blue to-antlia-purple">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Tentang Antlia
            </h1>
            <p className="text-xl text-white/90">
              Menyediakan solusi teknologi digital terbaik untuk mendorong pertumbuhan bisnis Anda.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Siapa Kami</h2>
              <p className="text-gray-600 mb-4">
                Antlia adalah perusahaan teknologi digital yang berfokus pada pengembangan solusi perangkat lunak untuk berbagai sektor industri. Didirikan pada tahun 2020, kami telah membantu ratusan bisnis dalam transformasi digital mereka melalui berbagai produk teknologi seperti ERP, WMS, TMS, HRM, CRM, dan solusi IoT.
              </p>
              <p className="text-gray-600 mb-4">
                Dengan tim yang berpengalaman dan berdedikasi, kami berkomitmen untuk memberikan solusi terbaik yang disesuaikan dengan kebutuhan bisnis Anda. Kami percaya bahwa teknologi yang tepat dapat memberdayakan bisnis untuk mencapai potensi penuh mereka.
              </p>
              <p className="text-gray-600">
                Visi kami adalah menjadi mitra teknologi terpercaya bagi bisnis di Indonesia dan membantu mereka bersaing secara efektif di era digital.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/assets/about-image.jpg" 
                alt="Tim Antlia" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-5 -right-5 bg-antlia-cyan h-20 w-20 rounded-full"></div>
              <div className="absolute -top-5 -left-5 bg-antlia-purple h-20 w-20 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-antlia-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mb-6">
                <CheckCircle size={24} className="text-antlia-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Misi Kami</h3>
              <p className="text-gray-600 mb-4">
                Misi kami adalah menyediakan solusi teknologi terbaik yang membantu bisnis meningkatkan efisiensi, produktivitas, dan profitabilitas mereka.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-antlia-blue/10 flex-shrink-0 flex items-center justify-center mt-1 mr-3">
                    <CheckCircle size={12} className="text-antlia-blue" />
                  </div>
                  <span>Mengembangkan produk berkualitas tinggi dan inovatif</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-antlia-blue/10 flex-shrink-0 flex items-center justify-center mt-1 mr-3">
                    <CheckCircle size={12} className="text-antlia-blue" />
                  </div>
                  <span>Memberikan layanan pelanggan yang luar biasa</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-antlia-blue/10 flex-shrink-0 flex items-center justify-center mt-1 mr-3">
                    <CheckCircle size={12} className="text-antlia-blue" />
                  </div>
                  <span>Menjadi mitra yang dapat diandalkan dalam transformasi digital</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-antlia-purple/10 flex items-center justify-center mb-6">
                <CheckCircle size={24} className="text-antlia-purple" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Visi Kami</h3>
              <p className="text-gray-600 mb-4">
                Visi kami adalah menjadi pemimpin dalam penyediaan solusi teknologi digital di Indonesia dan membantu bisnis berkembang di era digital.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-antlia-purple/10 flex-shrink-0 flex items-center justify-center mt-1 mr-3">
                    <CheckCircle size={12} className="text-antlia-purple" />
                  </div>
                  <span>Mendorong inovasi teknologi di Indonesia</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-antlia-purple/10 flex-shrink-0 flex items-center justify-center mt-1 mr-3">
                    <CheckCircle size={12} className="text-antlia-purple" />
                  </div>
                  <span>Memberdayakan bisnis melalui teknologi</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-antlia-purple/10 flex-shrink-0 flex items-center justify-center mt-1 mr-3">
                    <CheckCircle size={12} className="text-antlia-purple" />
                  </div>
                  <span>Menciptakan dampak positif pada ekonomi digital</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Philosophy */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Filosofi Logo Kami</h2>
            <p className="text-lg text-gray-600">
              Logo Antlia dirancang dengan filosofi modern dan futuristik yang mencerminkan nilai-nilai kami.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-6 text-center">Elemen Visual</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
                  <div className="mx-auto mb-4 w-24 h-24 flex items-center justify-center">
                    <img src="/assets/logo-symbol-1.png" alt="Logo Symbol 1" className="w-full h-full" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Lingkaran Digital</h4>
                  <p className="text-gray-600">
                    Melambangkan kesatuan dan integrasi teknologi yang seamless dalam ekosistem bisnis.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
                  <div className="mx-auto mb-4 w-24 h-24 flex items-center justify-center">
                    <img src="/assets/logo-symbol-2.png" alt="Logo Symbol 2" className="w-full h-full" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Titik Koneksi</h4>
                  <p className="text-gray-600">
                    Mewakili konektivitas dan jaringan yang menghubungkan berbagai aspek teknologi.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-6 text-center">Palet Warna</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
                  <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-antlia-cyan"></div>
                  <h4 className="text-lg font-semibold mb-2">Cyan (#00ffff)</h4>
                  <p className="text-gray-600">
                    Melambangkan inovasi, kreativitas, dan kesegaran dalam pendekatan teknologi kami.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
                  <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-antlia-purple"></div>
                  <h4 className="text-lg font-semibold mb-2">Ungu (#cb5ff1)</h4>
                  <p className="text-gray-600">
                    Mewakili kreativitas, visi masa depan, dan keunggulan dalam solusi teknologi kami.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-antlia-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Nilai-nilai Kami</h2>
            <p className="text-lg text-gray-600">
              Kami berpedoman pada nilai-nilai inti yang membentuk budaya dan pendekatan kami.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="h-16 w-16 rounded-full bg-antlia-blue/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-antlia-blue" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Inovasi</h4>
              <p className="text-gray-600">
                Kami selalu mencari cara baru dan lebih baik untuk menyelesaikan masalah.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="h-16 w-16 rounded-full bg-antlia-purple/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-antlia-purple" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Kualitas</h4>
              <p className="text-gray-600">
                Kami berkomitmen untuk memberikan produk dan layanan berkualitas tinggi.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="h-16 w-16 rounded-full bg-antlia-cyan/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-antlia-cyan" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Integritas</h4>
              <p className="text-gray-600">
                Kami menjalankan bisnis dengan kejujuran dan transparansi.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="h-16 w-16 rounded-full bg-antlia-blue/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-antlia-blue" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Kolaborasi</h4>
              <p className="text-gray-600">
                Kami bermitra dengan klien untuk mencapai tujuan bersama.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Tim Kami</h2>
            <p className="text-lg text-gray-600">
              Antlia didukung oleh tim profesional berpengalaman yang berdedikasi untuk menyediakan solusi terbaik.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <img 
                src="/assets/team-1.jpg" 
                alt="CEO Antlia" 
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h4 className="text-lg font-semibold mb-1">Ahmad Farhan</h4>
                <p className="text-sm text-gray-500 mb-2">CEO & Founder</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <img 
                src="/assets/team-2.jpg" 
                alt="CTO Antlia" 
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h4 className="text-lg font-semibold mb-1">Dian Puspita</h4>
                <p className="text-sm text-gray-500 mb-2">CTO</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <img 
                src="/assets/team-3.jpg" 
                alt="CFO Antlia" 
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h4 className="text-lg font-semibold mb-1">Budi Santoso</h4>
                <p className="text-sm text-gray-500 mb-2">CFO</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <img 
                src="/assets/team-4.jpg" 
                alt="COO Antlia" 
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h4 className="text-lg font-semibold mb-1">Maya Wijaya</h4>
                <p className="text-sm text-gray-500 mb-2">COO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="6281573635143" message="Halo Antlia, saya ingin mengetahui lebih lanjut tentang perusahaan Anda." />
    </Layout>
  );
};

export default About;
