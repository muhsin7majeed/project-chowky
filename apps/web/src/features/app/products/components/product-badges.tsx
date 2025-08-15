import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductBadgesProps {
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
}

const ProductBadges = ({ isNew, isBestSeller, isFeatured }: ProductBadgesProps) => {
  return (
    <div className="absolute top-4 left-4 flex flex-col gap-1">
      {isNew && (
        <Badge variant="default" className="bg-blue-500 text-white">
          New
        </Badge>
      )}
      {isBestSeller && (
        <Badge variant="default" className="bg-orange-500 text-white">
          <Star className="h-3 w-3 mr-1" />
          Best Seller
        </Badge>
      )}
      {isFeatured && (
        <Badge variant="default" className="bg-purple-500 text-white">
          Featured
        </Badge>
      )}
    </div>
  );
};

export default ProductBadges;
