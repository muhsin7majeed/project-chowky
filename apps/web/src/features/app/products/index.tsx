import { Filter, Grid3X3, List, Search, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Product, ProductStatus } from "@/types/product";

// Dummy data based on the product types
const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    description: "High-quality wireless headphones with noise cancellation and superior sound quality.",
    imagePaths: [
      {
        isPrimary: true,
        sortOrder: 1,
        objectPath: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      },
    ],
    price: 299.99,
    cost: 150.0,
    stock: 45,
    sku: "WH-001",
    status: "active" as ProductStatus,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    weight: { value: 250, unit: "g" },
    length: { value: 20, unit: "cm" },
    width: { value: 18, unit: "cm" },
    height: { value: 8, unit: "cm" },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    category: { label: "Electronics", value: 1 },
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    slug: "organic-cotton-t-shirt",
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
    imagePaths: [
      {
        isPrimary: true,
        sortOrder: 1,
        objectPath: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      },
    ],
    price: 29.99,
    cost: 12.0,
    stock: 120,
    sku: "TS-002",
    status: "active" as ProductStatus,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    weight: { value: 180, unit: "g" },
    length: { value: 70, unit: "cm" },
    width: { value: 50, unit: "cm" },
    height: { value: 1, unit: "cm" },
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
    category: { label: "Clothing", value: 2 },
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    slug: "smart-fitness-watch",
    description: "Advanced fitness tracking with heart rate monitoring, GPS, and water resistance.",
    imagePaths: [
      {
        isPrimary: true,
        sortOrder: 1,
        objectPath: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      },
    ],
    price: 199.99,
    cost: 85.0,
    stock: 30,
    sku: "SW-003",
    status: "active" as ProductStatus,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    weight: { value: 45, unit: "g" },
    length: { value: 4, unit: "cm" },
    width: { value: 4, unit: "cm" },
    height: { value: 1.2, unit: "cm" },
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    category: { label: "Electronics", value: 1 },
  },
  {
    id: 4,
    name: "Artisan Coffee Beans",
    slug: "artisan-coffee-beans",
    description: "Freshly roasted single-origin coffee beans with rich flavor and aroma.",
    imagePaths: [
      {
        isPrimary: true,
        sortOrder: 1,
        objectPath: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
      },
    ],
    price: 24.99,
    cost: 8.0,
    stock: 75,
    sku: "CB-004",
    status: "active" as ProductStatus,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    weight: { value: 500, unit: "g" },
    length: { value: 15, unit: "cm" },
    width: { value: 10, unit: "cm" },
    height: { value: 5, unit: "cm" },
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z",
    category: { label: "Food & Beverages", value: 3 },
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    slug: "minimalist-desk-lamp",
    description: "Sleek and modern LED desk lamp with adjustable brightness and USB charging port.",
    imagePaths: [
      {
        isPrimary: true,
        sortOrder: 1,
        objectPath: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      },
    ],
    price: 89.99,
    cost: 35.0,
    stock: 25,
    sku: "DL-005",
    status: "active" as ProductStatus,
    isNew: false,
    isBestSeller: false,
    isFeatured: true,
    weight: { value: 800, unit: "g" },
    length: { value: 40, unit: "cm" },
    width: { value: 15, unit: "cm" },
    height: { value: 45, unit: "cm" },
    createdAt: "2024-01-12T10:00:00Z",
    updatedAt: "2024-01-12T10:00:00Z",
    category: { label: "Home & Garden", value: 4 },
  },
  {
    id: 6,
    name: "Leather Laptop Bag",
    slug: "leather-laptop-bag",
    description: "Handcrafted genuine leather laptop bag with multiple compartments and shoulder strap.",
    imagePaths: [
      {
        isPrimary: true,
        sortOrder: 1,
        objectPath: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      },
    ],
    price: 149.99,
    cost: 60.0,
    stock: 15,
    sku: "LB-006",
    status: "active" as ProductStatus,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    weight: { value: 1200, unit: "g" },
    length: { value: 40, unit: "cm" },
    width: { value: 30, unit: "cm" },
    height: { value: 8, unit: "cm" },
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-08T10:00:00Z",
    category: { label: "Accessories", value: 5 },
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  const primaryImage = product.imagePaths.find((img) => img.isPrimary)?.objectPath;

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={primaryImage || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <Badge variant="default" className="bg-blue-500 text-white">
              New
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge variant="default" className="bg-orange-500 text-white">
              <Star className="h-3 w-3 mr-1" />
              Best Seller
            </Badge>
          )}
          {product.isFeatured && (
            <Badge variant="default" className="bg-purple-500 text-white">
              Featured
            </Badge>
          )}
        </div>
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {product.category.label}
          </Badge>
        </div>
        <CardTitle className="text-lg font-semibold mb-2 overflow-hidden text-ellipsis line-clamp-2">
          {product.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-3 overflow-hidden text-ellipsis line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary">${product.price}</span>
            <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
          </div>
          <div className="text-right">
            <div className={cn("text-sm font-medium", product.stock > 10 ? "text-green-600" : "text-orange-600")}>
              {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Products = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...new Set(dummyProducts.map((p) => p.category.label))];

  const filteredProducts = dummyProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category.label === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
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

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {dummyProducts.length} products
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1 max-w-4xl mx-auto",
        )}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="mb-4">
            <Filter className="h-16 w-16 mx-auto text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Products;
