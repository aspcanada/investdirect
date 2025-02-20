import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ImageIcon } from 'lucide-react';

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
    <Card>
      <CardContent className="p-0">
        <div className="relative h-[400px] w-full">
          <Image
            src={images[0]}
            alt="Property image"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}
