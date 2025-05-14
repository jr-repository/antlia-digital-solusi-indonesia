
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Check, ChevronDown } from 'lucide-react';
import Layout from '@/components/Layout';
import PricingCard from '@/components/PricingCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useData } from '@/context/DataContext';

interface PricingDetailProps {
  id: string;
  isOpen: boolean;
  toggleOpen: (id: string) => void;
}

const PricingDetail: React.FC<PricingDetailProps> = ({ id, isOpen, toggleOpen }) => {
  const { pricing } = useData();
  const plan = pricing.find((p) => p.id === id);

  if (!plan) return null;

  return (
    <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
      <div 
        className={`flex justify-between items-center p-4 cursor-pointer ${isOpen ? 'bg-antlia-blue text-white' : 'bg-white'}`}
        onClick={() => toggleOpen(id)}
      >
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <ChevronDown 
          size={20} 
          className={`transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </div>
      
      {isOpen && (
        <div className="p-6">
          <div className="mb-4">
            <span className="text-2xl font-bold">{plan.price}</span>
          </div>
          <p className="text-gray-600 mb-6">{plan.description}</p>
          
          <h4 className="text-lg font-semibold mb-4">Fitur yang Tersedia:</h4>
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex flex-wrap gap-4">
            <Link
              to={`/kontak?plan=${encodeURIComponent(plan.name)}`}
              className="px-6 py-3 rounded-md bg-antlia-blue text-white font-medium hover:bg-opacity-90 transition-colors"
            >
              Pilih Paket
            </Link>
            <button
              onClick={() => toggleOpen(id)}
              className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Pricing = () => {
  const { pricing } = useData();
  const [openDetailId, setOpenDetailId] = useState<string | null>(null);

  const toggleDetail = (id: string) => {
    setOpenDetailId(openDetailId === id ? null : id);
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-antlia-blue to-antlia-purple">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
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
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pilih Paket yang Sesuai untuk Bisnis Anda</h2>
            <p className="text-lg text-gray-600">
              Kami menawarkan berbagai paket layanan dengan harga yang terjangkau untuk berbagai skala bisnis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricing.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Details */}
      <section className="py-16 md:py-24 bg-antlia-light" id="pricing-details">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Detail Paket</h2>
              <p className="text-lg text-gray-600">
                Klik pada setiap paket untuk melihat detail lengkap fitur yang tersedia.
              </p>
            </div>
            
            {pricing.map((plan) => (
              <PricingDetail
                key={plan.id}
                id={plan.id}
                isOpen={openDetailId === plan.id}
                toggleOpen={toggleDetail}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pertanyaan Umum</h2>
              <p className="text-lg text-gray-600">
                Jawaban untuk pertanyaan yang sering diajukan tentang layanan kami.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-2">Apakah saya bisa mengganti paket?</h3>
                <p className="text-gray-600">
                  Ya, Anda dapat mengganti paket kapan saja sesuai dengan kebutuhan bisnis Anda. Perubahan akan berlaku pada periode penagihan berikutnya.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-2">Apakah ada biaya pengaturan awal?</h3>
                <p className="text-gray-600">
                  Untuk paket standar, tidak ada biaya pengaturan awal. Namun, untuk paket kustom atau implementasi yang kompleks, mungkin ada biaya tambahan.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-2">Berapa lama kontrak minimum?</h3>
                <p className="text-gray-600">
                  Kontrak minimum kami adalah 1 bulan. Anda dapat membatalkan layanan kapan saja dengan pemberitahuan 30 hari sebelumnya.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-2">Apakah ada versi uji coba?</h3>
                <p className="text-gray-600">
                  Ya, kami menawarkan uji coba gratis selama 14 hari untuk semua paket layanan kami. Anda dapat mencoba semua fitur tanpa biaya.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-2">Bagaimana dengan dukungan teknis?</h3>
                <p className="text-gray-600">
                  Semua paket mencakup dukungan teknis standar. Paket yang lebih tinggi mencakup dukungan prioritas dan manajer akun khusus.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-lg mb-4">
                Masih memiliki pertanyaan lain?
              </p>
              <Link 
                to="/kontak"
                className="px-6 py-3 rounded-md bg-antlia-blue text-white font-medium hover:bg-opacity-90 transition-colors"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="6281573635143" message="Halo Antlia, saya ingin mengetahui lebih lanjut tentang paket harga layanan Anda." />
    </Layout>
  );
};

export default Pricing;
