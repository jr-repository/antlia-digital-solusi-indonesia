
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, Boxes, Truck, Users, HeartHandshake, Wifi,
  ArrowRight
} from 'lucide-react';
import { Service } from '@/context/DataContext';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const getIcon = () => {
    switch (service.icon) {
      case 'database':
        return <Database size={28} className="text-antlia-blue" />;
      case 'boxes':
        return <Boxes size={28} className="text-antlia-blue" />;
      case 'truck':
        return <Truck size={28} className="text-antlia-blue" />;
      case 'users':
        return <Users size={28} className="text-antlia-blue" />;
      case 'heart-handshake':
        return <HeartHandshake size={28} className="text-antlia-blue" />;
      case 'wifi':
        return <Wifi size={28} className="text-antlia-blue" />;
      default:
        return <Database size={28} className="text-antlia-blue" />;
    }
  };

  return (
    <div className="antlia-card bg-white p-5 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 rounded-md bg-antlia-blue/10 flex items-center justify-center mr-3">
          {getIcon()}
        </div>
        <h3 className="text-lg font-bold">{service.name}</h3>
      </div>
      
      <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
      
      <div className="mt-auto">
        <ul className="mb-4 space-y-1">
          {service.features.slice(0, 2).map((feature, index) => (
            <li key={index} className="flex items-center text-xs text-gray-600">
              <div className="h-1.5 w-1.5 rounded-full bg-antlia-cyan mr-2"></div>
              {feature}
            </li>
          ))}
        </ul>
        
        <Link 
          to={`/layanan#${service.name.toLowerCase()}`}
          className="inline-flex items-center text-sm text-antlia-blue hover:text-antlia-blue transition-colors"
        >
          Selengkapnya
          <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
