
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadComplete) onLoadComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="relative">
        <img 
          src="/assets/logo.png" 
          alt="Antlia Logo" 
          className="h-24 w-auto animate-bounce" 
        />
        <div className="mt-4 text-center">
          <div className="w-16 h-1 mx-auto bg-antlia-blue rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="mt-6 text-gray-600 animate-pulse">Memuat...</p>
    </div>
  );
};

export default LoadingScreen;
