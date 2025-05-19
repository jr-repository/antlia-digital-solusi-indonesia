
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import WhatsAppButton from '@/components/WhatsAppButton';

const Contact = () => {
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    // Get the plan from URL query params if it exists
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    
    if (plan) {
      setSelectedPlan(plan);
      setFormData(prev => ({
        ...prev,
        subject: `Pertanyaan tentang paket ${plan}`,
        message: `Saya tertarik dengan paket ${plan} dan ingin mendapatkan informasi lebih lanjut.`
      }));
    }
  }, [location.search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the WhatsApp message
    const message = `
Nama: ${formData.name}
Email: ${formData.email}
Telepon: ${formData.phone}
Subjek: ${formData.subject}
Pesan: ${formData.message}
    `.trim();
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/6281573635143?text=${encodeURIComponent(message)}`, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-antlia-blue to-antlia-purple">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hubungi Kami
            </h1>
            <p className="text-xl text-white/90">
              Kami siap membantu Anda dengan solusi teknologi terbaik untuk bisnis Anda.
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
            <span className="text-gray-800">Kontak</span>
          </div>
        </div>
      </div>

      {/* Contact Info & Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-6">Kirim Pesan</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Nama Lengkap*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Nomor Telepon*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Subjek*</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Pesan*</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-antlia-blue text-white rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-6">Informasi Kontak</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mr-4">
                    <MapPin className="text-antlia-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Alamat</h3>
                    <p className="text-gray-600">
                      Jl. Teknologi Digital No. 123<br />
                      Jakarta Selatan, 12345<br />
                      Indonesia
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mr-4">
                    <Phone className="text-antlia-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Telepon</h3>
                    <p className="text-gray-600">
                      <a href="tel:+6281573635143" className="hover:text-antlia-blue transition-colors">
                        +62 815-7363-5143
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mr-4">
                    <Mail className="text-antlia-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@antlia.id" className="hover:text-antlia-blue transition-colors">
                        info@antlia.id
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-antlia-blue/10 flex items-center justify-center mr-4">
                    <Clock className="text-antlia-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Jam Operasional</h3>
                    <p className="text-gray-600">
                      Senin - Jumat: 08.00 - 17.00 WIB<br />
                      Sabtu: 09.00 - 13.00 WIB<br />
                      Minggu: Tutup
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-12 bg-gray-100 h-64 rounded-lg flex items-center justify-center border">
                <p className="text-gray-500">Peta akan ditampilkan di sini</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-antlia-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-left">
            <h2 className="text-3xl font-bold mb-4">Siap Memulai?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Tim kami siap membantu transformasi digital bisnis Anda dengan solusi teknologi terbaik.
            </p>
            <Link
              to="/layanan"
              className="px-6 py-3 bg-antlia-blue text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Jelajahi Layanan Kami
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="6281573635143" message="Halo Antlia, saya ingin menghubungi tim layanan pelanggan Anda." />
    </Layout>
  );
};

export default Contact;
