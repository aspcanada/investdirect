import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ImageIcon } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  if (!images.length) {
    return (
      <Card>
        <CardContent className="flex h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageIcon className="h-12 w-12" />
            <p>No images available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Carousel>
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image}>
            <div className="relative h-[400px]">
              <Image
                src={image}
                alt="Property image"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
