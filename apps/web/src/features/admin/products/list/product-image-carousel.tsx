import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "@/components/ui/Image";

interface ProductImageCarouselProps {
  images: { path: string; alt: string }[];
}

const ProductImageCarousel = ({ images }: ProductImageCarouselProps) => {
  return (
    <Carousel>
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.path} className="flex items-center justify-center">
            <Image src={image.path} alt={image.alt} className="border rounded-md w-full h-full object-contain" />
          </CarouselItem>
        ))}
      </CarouselContent>

      {images.length > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

export default ProductImageCarousel;
