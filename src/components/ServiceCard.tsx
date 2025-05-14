
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
        return <Database size={36} className="text-antlia-blue" />;
      case 'boxes':
        return <Boxes size={36} className="text-antlia-blue" />;
      case 'truck':
        return <Truck size={36} className="text-antlia-blue" />;
      case 'users':
        return <Users size={36} className="text-antlia-blue" />;
      case 'heart-handshake':
        return <HeartHandshake size={36} className="text-antlia-blue" />;
      case 'wifi':
        return <Wifi size={36} className="text-antlia-blue" />;
      default:
        return <Database size={36} className="text-antlia-blue" />;
    }
  };

  return (
    <div className="antlia-card bg-white p-6 h-full flex flex-col">
      <div className="mb-4">{getIcon()}</div>
      <h3 className="text-xl font-bold mb-2">{service.name}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      
      <div className="mt-auto">
        <ul className="mb-4 space-y-2">
          {service.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <div className="h-1.5 w-1.5 rounded-full bg-antlia-cyan mr-2"></div>
              {feature}
            </li>
          ))}
        </ul>
        
        <Link 
          to={`/layanan#${service.name.toLowerCase()}`}
          className="inline-flex items-center text-antlia-blue hover:text-antlia-purple transition-colors"
        >
          Pelajari Lebih Lanjut
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
