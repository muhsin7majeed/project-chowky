import { useForm } from "@tanstack/react-form";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import CategorySelect from "@/components/category-select";
import FormGroup from "@/components/ui/form-group";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { ProductFormDefaultValues } from "@/types/product";

interface ProductFormProps {
  onSubmit: (data: ProductFormDefaultValues) => void;
  defaultValues?: ProductFormDefaultValues;
}

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().optional(),
  categoryId: z.number().optional().nullable(),
  price: z.number().min(0, "Price must be >= 0"),
  stock: z.number().int().min(0, "Stock must be >= 0"),
  isActive: z.boolean(),
});

const getDefaultValues = (defaults?: ProductFormDefaultValues): ProductFormDefaultValues => ({
  name: "",
  sku: "",
  description: "",
  categoryId: undefined,
  price: 0,
  stock: 0,
  isActive: true,
  images: [],
  ...defaults,
});

const ProductForm = ({ onSubmit, defaultValues }: ProductFormProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>(getDefaultValues(defaultValues).images || []);

  const form = useForm({
    defaultValues: getDefaultValues(defaultValues),
    onSubmit: (data) => onSubmit({ ...data.value, images: selectedImages }),
    validators: {
      onChange: productSchema,
    },
  });

  useEffect(() => {
    // Keep form value in sync if default images change
    form.setFieldValue("images" as never, selectedImages as never);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImages]);

  const imagePreviews = useMemo(
    () => selectedImages.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [selectedImages],
  );

  const handleImagesChange = (files: FileList | null) => {
    if (!files) return;
    const max = 5;
    const fileArray = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const next = [...selectedImages, ...fileArray].slice(0, max);
    setSelectedImages(next);
  };

  const removeImageAt = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <form
        id="product-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-2">
          <form.Field name="name">
            {(field) => (
              <FormGroup label="Name" inputId="name" required errors={field.state.meta.errors}>
                <Input
                  id="name"
                  placeholder="Name"
                  isInvalid={!field.state.meta.isValid}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="sku">
            {(field) => (
              <FormGroup label="SKU" inputId="sku" required errors={field.state.meta.errors}>
                <Input
                  id="sku"
                  placeholder="SKU"
                  isInvalid={!field.state.meta.isValid}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="price">
            {(field) => (
              <FormGroup label="Price" inputId="price" required errors={field.state.meta.errors}>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="Price"
                  isInvalid={!field.state.meta.isValid}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="stock">
            {(field) => (
              <FormGroup label="Stock" inputId="stock" required errors={field.state.meta.errors}>
                <Input
                  id="stock"
                  type="number"
                  min={0}
                  placeholder="Stock"
                  isInvalid={!field.state.meta.isValid}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="categoryId">
            {(field) => (
              <FormGroup label="Category" inputId="categoryId" errors={field.state.meta.errors}>
                <CategorySelect
                  value={(field.state.value ?? undefined) as never}
                  onChange={(val) => field.handleChange(val?.value ?? null)}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="isActive">
            {(field) => (
              <FormGroup label="Is Active" inputId="isActive" errors={field.state.meta.errors}>
                <Switch
                  id="isActive"
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked)}
                />
              </FormGroup>
            )}
          </form.Field>

          {/* Images */}
          <FormGroup label="Images" inputId="images" description="Upload up to 5 images">
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImagesChange(e.target.files)}
            />
            {selectedImages.length > 0 && (
              <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                {imagePreviews.map((img, idx) => (
                  <div
                    key={`${img.url}-${idx}`}
                    className="relative h-24 w-24 shrink-0 rounded-md border overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt="Preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImageAt(idx)}
                      className="absolute right-1 top-1 inline-flex items-center justify-center rounded-full bg-background/80 p-1 text-foreground shadow hover:bg-background"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </FormGroup>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
