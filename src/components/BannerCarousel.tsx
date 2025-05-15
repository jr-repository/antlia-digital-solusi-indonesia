
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Banner {
  id: number;
  image: string;
  title: string;
  description: string;
  link?: string;
}

interface BannerCarouselProps {
  banners: Banner[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <Carousel className="w-full">
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative h-[300px] md:h-[400px]">
                <img 
                  src={banner.image} 
                  alt={banner.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{banner.title}</h3>
                  <p className="text-sm md:text-base text-white/90">{banner.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
