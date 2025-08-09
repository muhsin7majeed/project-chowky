export interface ProductFormDefaultValues {
  id?: string;
  name: string;
  sku: string;
  description?: string;
  categoryId?: number | null;
  price: number;
  stock: number;
  isActive: boolean;
  images?: File[];
}
