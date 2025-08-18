import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "@/components/ui/Image";
import { cn } from "@/lib/utils";

interface ProductImageCarouselProps {
  images: { path: string; alt: string }[];
  showArrows?: boolean;
  imageClassName?: string;
}

const ProductImageCarousel = ({ images, showArrows = true, imageClassName }: ProductImageCarouselProps) => {
  return (
    <Carousel>
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.path} className="flex items-center justify-center">
            <Image
              src={image.path}
              alt={image.alt}
              className={cn("border rounded-md w-full h-full object-contain", imageClassName)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {images.length > 1 && showArrows && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

export default ProductImageCarousel;
