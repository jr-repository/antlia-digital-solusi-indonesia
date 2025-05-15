
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img className="h-8 w-auto" src="/assets/logo-white.png" alt="Antlia Logo" />
              <div className="ml-2">
                <span className="block text-xl font-bold">Antlia</span>
                <span className="block text-xs text-gray-400">by Techno King</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-4">
              Solusi teknologi inovatif untuk rantai pasok global, dengan fokus meningkatkan produktivitas, menekan biaya, dan mendukung keberlanjutan.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/antlia.id" className="text-gray-300 hover:text-antlia-blue">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com/company/antlia" className="text-gray-300 hover:text-antlia-blue">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-antlia-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-gray-300 hover:text-antlia-blue transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-gray-300 hover:text-antlia-blue transition-colors">
                  Produk & Layanan
                </Link>
              </li>
              <li>
                <Link to="/solusi" className="text-gray-300 hover:text-antlia-blue transition-colors">
                  Solusi
                </Link>
              </li>
              <li>
                <Link to="/klien" className="text-gray-300 hover:text-antlia-blue transition-colors">
                  Klien
                </Link>
              </li>
              <li>
                <Link to="/artikel" className="text-gray-300 hover:text-antlia-blue transition-colors">
                  Artikel
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Produk Kami</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/layanan" className="text-gray-300 hover:text-antlia-blue transition-colors">
                  Enterprise Resource Planning
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-gray-300 hover:text-antlia-blue transition-colors">
                  Warehouse Management
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-gray-300 hover:text-antlia-blue transition-colors">
                  Transport Management
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-gray-300 hover:text-antlia-blue transition-colors">
                  HRM System
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-gray-300 hover:text-antlia-blue transition-colors">
                  CRM System
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-gray-300 hover:text-antlia-blue transition-colors">
                  IoT Technologies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-antlia-blue" />
                <span className="text-gray-300">
                  BSD, Tangerang Selatan, Banten
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-antlia-blue" />
                <a href="tel:+6287762877273" className="text-gray-300 hover:text-antlia-blue transition-colors">
                  +62 877-6287-7273
                </a>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-2 mt-0.5 text-antlia-blue" />
                <div className="text-gray-300">
                  <p>Senin - Jumat: 8.00-17.00</p>
                  <p>Sabtu: 08.00-14.00</p>
                  <p>Customer Services: 24/7</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Antlia by Techno King. Seluruh Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
