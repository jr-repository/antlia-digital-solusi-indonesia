
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  image: string;
  testimonial: string;
}

interface MultiTestimonialCarouselProps {
  testimonials: Testimonial[];
}

const MultiTestimonialCarousel: React.FC<MultiTestimonialCarouselProps> = ({ testimonials }) => {
  const [itemsPerView, setItemsPerView] = useState(3);

  // Responsive items per view based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-4">
        {testimonials.map((testimonial) => (
          <CarouselItem 
            key={testimonial.id} 
            className={`pl-4 md:basis-1/${itemsPerView}`}
            style={{ flex: `0 0 calc(100% / ${itemsPerView})` }}
          >
            <div className="h-full p-5 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-antlia-blue mr-3">
                  <AspectRatio ratio={1/1}>
                    <img 
                      src={testimonial.image || "/assets/placeholder-user.jpg"} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm flex-grow italic">"{testimonial.testimonial}"</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-2 mt-6">
        <CarouselPrevious className="relative static" />
        <CarouselNext className="relative static" />
      </div>
    </Carousel>
  );
};

export default MultiTestimonialCarousel;
