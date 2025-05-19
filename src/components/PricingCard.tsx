
import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PricingPlan } from '@/context/DataContext';
import { Button } from '@/components/ui/button';

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  return (
    <div className={`antlia-card p-6 flex flex-col h-full ${plan.popular ? 'border-antlia-blue shadow-lg relative' : ''}`}>
      {plan.popular && (
        <span className="absolute top-0 right-0 bg-antlia-blue text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          Popular
        </span>
      )}
      <h3 className="text-xl font-bold mb-2 text-left">{plan.name}</h3>
      <div className="mb-4 text-left">
        <span className="text-2xl font-bold">{plan.price}</span>
      </div>
      <p className="text-gray-600 mb-6 text-left">{plan.description}</p>
      
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start text-left">
            <Check size={18} className="text-antlia-blue mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-auto grid grid-cols-2 gap-3">
        <Link
          to={`/kontak?plan=${encodeURIComponent(plan.name)}`}
          className="py-2 px-4 text-center rounded-md font-medium transition-colors bg-antlia-blue text-white hover:bg-antlia-blue hover:opacity-90"
        >
          Pilih Paket
        </Link>
        
        <Button
          variant="outline"
          className="border-antlia-blue text-antlia-blue hover:bg-antlia-blue hover:text-white"
          onClick={() => window.open('https://wa.me/6281573635143?text=Halo,%20saya%20ingin%20demo%20untuk%20paket%20' + encodeURIComponent(plan.name), '_blank')}
        >
          Demo
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
