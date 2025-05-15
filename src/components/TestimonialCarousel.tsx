
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  image: string;
  testimonial: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  return (
    <div className="relative overflow-hidden">
      <Carousel className="w-full">
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id}>
              <div className="p-6 md:p-8 bg-gray-50 rounded-lg text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 rounded-full overflow-hidden border-2 border-antlia-blue">
                    <img 
                      src={testimonial.image || "/assets/placeholder-user.jpg"} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mb-6 text-gray-600 text-lg italic">"{testimonial.testimonial}"</p>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
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

export default TestimonialCarousel;
