import { useForm } from "@tanstack/react-form";
import { X } from "lucide-react";
import CategorySelect from "@/components/category-select";
import FormGroup from "@/components/ui/form-group";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { ProductFormDefaultValues } from "@/types/product";
import getProductFormValues from "../utils/get-product-form-values";
import getProductFormZSchema from "../utils/get-product-form-z-schema";

interface ProductFormProps {
  onSubmit: (data: ProductFormDefaultValues) => void;
  defaultValues?: ProductFormDefaultValues;
}

const ProductForm = ({ onSubmit, defaultValues }: ProductFormProps) => {
  const form = useForm({
    defaultValues: getProductFormValues(defaultValues),
    onSubmit: ({ value }) => onSubmit(value),
    validators: {
      onChange: getProductFormZSchema(),
    },
  });

  return (
    <form
      className="flex flex-col gap-2"
      id="product-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
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

      <form.Field name="category">
        {(field) => (
          <FormGroup label="Category" inputId="categoryId" errors={field.state.meta.errors}>
            <CategorySelect
              value={field.state.value ?? undefined}
              onChange={(val) => {
                field.handleChange(val ?? null);
              }}
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
              onCheckedChange={(checked) => {
                field.handleChange(checked);
              }}
            />
          </FormGroup>
        )}
      </form.Field>

      <form.Field name="images">
        {(field) => (
          <FormGroup label="Images" inputId="images" errors={field.state.meta.errors}>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              value={undefined}
              onChange={(e) => {
                const files = e.target.files;
                const filesArray = [...(field.state.value || []), ...Array.from(files || [])];

                field.handleChange(filesArray);
              }}
            />

            <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
              {field.state.value?.map((img, index) => (
                <div
                  key={`${img.name}-${index}`}
                  className="relative h-24 w-24 shrink-0 rounded-md border overflow-hidden"
                >
                  <img src={URL.createObjectURL(img)} alt="Preview" className="h-full w-full object-cover" />
                  <button
                    className="absolute right-1 top-1 inline-flex items-center justify-center rounded-full bg-background/80 p-1 text-foreground shadow hover:bg-background"
                    type="button"
                    onClick={() => {
                      field.handleChange(field.state.value?.filter((_, i) => i !== index));
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </FormGroup>
        )}
      </form.Field>
    </form>
  );
};

export default ProductForm;
