
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Linkedin } from 'lucide-react';
import { useData } from '@/context/DataContext';

const Footer = () => {
  const { footerInfo } = useData();
  const { companyInfo, quickLinks, products, contactInfo } = footerInfo;

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
              {companyInfo.description}
            </p>
            <div className="flex space-x-4">
              <a href={companyInfo.socialLinks.instagram} className="text-gray-300 hover:text-antlia-blue">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href={companyInfo.socialLinks.linkedin} className="text-gray-300 hover:text-antlia-blue">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link to={link.url} className="text-gray-300 hover:text-antlia-blue transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Produk Kami</h3>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product.id}>
                  <Link to={product.url} className="text-gray-300 hover:text-antlia-blue transition-colors">
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-antlia-blue" />
                <span className="text-gray-300">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-antlia-blue" />
                <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="text-gray-300 hover:text-antlia-blue transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-2 mt-0.5 text-antlia-blue" />
                <div className="text-gray-300">
                  <p>{contactInfo.officeHours.weekday}</p>
                  <p>{contactInfo.officeHours.saturday}</p>
                  <p>{contactInfo.officeHours.support}</p>
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
