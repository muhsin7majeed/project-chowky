import { Grid3X3, List } from "lucide-react";
import { useState } from "react";
import FetchState from "@/components/fetch-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useProducts from "@/features/admin/products/apis/use-products";
import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import type { Product, UserProductFilters } from "@/types/product";
import FilterByCategory from "./components/filter-by-category";
import ProductCard from "./components/product-card";

const Products = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<UserProductFilters>({
    search: "",
    category: null,
  });

  const debouncedSearch = useDebounce<string>(filters.search, 300);

  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useProducts({
    search: debouncedSearch,
    categoryId: filters.category?.id,
  });

  console.log(products);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">Discover our curated collection of quality products</p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
            {/* Search */}
            <Input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => {
                setFilters({ ...filters, search: e.target.value });
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <FilterByCategory
          onSelect={(category) => setFilters({ ...filters, category })}
          selectedId={filters.category?.id}
        />
      </div>

      <FetchState isLoading={isProductsLoading} isError={productsError?.message} isEmpty={products?.rows?.length === 0}>
        {/* Products Grid */}
        <div
          className={cn(
            "grid gap-6",
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 max-w-4xl mx-auto",
          )}
        >
          {products?.rows?.map((product) => (
            <ProductCard key={product.id} product={product as Product} />
          ))}
        </div>
      </FetchState>
    </div>
  );
};

export default Products;
