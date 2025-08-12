import { useForm } from "@tanstack/react-form";
import { PercentIcon, X } from "lucide-react";
import { useState } from "react";
import CategorySelect from "@/components/category-select";
import CustomSelect from "@/components/custom-select";
import FormGroup from "@/components/ui/form-group";
import { Input } from "@/components/ui/input";
import MoneyIcon from "@/components/ui/money-icon";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { DIMENSION_UNIT_OPTIONS, WEIGHT_UNIT_OPTIONS } from "@/constants/common";
import getProfitMargin from "@/features/admin/utils/get-profit-margin";
import type { DimensionUnit, WeightUnit } from "@/types/common";
import type { ProductFormDefaultValues } from "@/types/product";
import slugify from "@/utils/slugify";
import getProductFormValues from "../utils/get-product-form-values";
import getProductFormZSchema from "../utils/get-product-form-z-schema";

interface ProductFormProps {
  onSubmit: (data: ProductFormDefaultValues) => void;
  defaultValues?: ProductFormDefaultValues;
  isLoading?: boolean;
}

const ProductForm = ({ onSubmit, defaultValues, isLoading }: ProductFormProps) => {
  const [margin, setMargin] = useState("0.00");

  const form = useForm({
    defaultValues: defaultValues,
    onSubmit: ({ value }) => onSubmit(value),
    validators: {
      onChange: getProductFormZSchema(),
    },
  });

  const syncMargin = () => {
    const profitMargin = getProfitMargin(form.state.values.cost, form.state.values.price);

    setMargin(profitMargin.toFixed(2));
  };

  return (
    <form
      className="flex flex-col gap-4 overflow-y-auto max-h-[80vh] "
      id="product-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="border p-4 rounded-lg">
        <h2 className="text-lg font-medium mb-4">Product Details</h2>

        <div className="grid gap-4 md:grid-cols-2">
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

          <form.Field name="slug">
            {(field) => (
              <FormGroup label="Slug" inputId="slug" required errors={field.state.meta.errors}>
                <Input
                  id="slug"
                  placeholder="Slug"
                  isInvalid={!field.state.meta.isValid}
                  value={field.state.value}
                  onChange={(e) => {
                    const slug = slugify(e.target.value);

                    field.handleChange(slug);
                  }}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="category">
            {(field) => (
              <FormGroup label="Category" inputId="categoryId" required errors={field.state.meta.errors}>
                <CategorySelect
                  isInvalid={!field.state.meta.isValid}
                  value={field.state.value ?? undefined}
                  onChange={(val) => {
                    field.handleChange(val ?? null);
                  }}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <FormGroup label="Description" inputId="description" errors={field.state.meta.errors}>
                <Textarea
                  id="description"
                  placeholder="Description"
                  rows={4}
                  isInvalid={!field.state.meta.isValid}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FormGroup>
            )}
          </form.Field>
        </div>
      </div>

      <div className="border p-4 rounded-lg">
        <h2 className="text-lg font-medium mb-4">Product Pricing & Stock</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <form.Field name="cost">
            {(field) => (
              <FormGroup label="Cost" inputId="cost" required errors={field.state.meta.errors}>
                <Input
                  prefixIcon={<MoneyIcon />}
                  id="cost"
                  type="number"
                  placeholder="Cost"
                  isInvalid={!field.state.meta.isValid}
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(Number(e.target.value));
                    syncMargin();
                  }}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="price">
            {(field) => (
              <FormGroup label="Price" inputId="price" required errors={field.state.meta.errors}>
                <Input
                  prefixIcon={<MoneyIcon />}
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  isInvalid={!field.state.meta.isValid}
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(Number(e.target.value));
                    syncMargin();
                  }}
                />
              </FormGroup>
            )}
          </form.Field>

          <FormGroup label="Margin" inputId="margin" key={form.state.values.cost + form.state.values.price}>
            <Input
              prefixIcon={<PercentIcon />}
              disabled
              id="margin"
              type="text"
              value={margin}
              onChange={() => {
                alert("NICE TRY MR.ROBOT!");
              }}
            />
          </FormGroup>

          <form.Field name="stock">
            {(field) => (
              <FormGroup label="Stock" inputId="stock" required errors={field.state.meta.errors}>
                <Input
                  id="stock"
                  type="number"
                  placeholder="Stock"
                  isInvalid={!field.state.meta.isValid}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </FormGroup>
            )}
          </form.Field>
        </div>
      </div>

      <div className="border p-4 rounded-lg">
        <h2 className="text-lg font-medium mb-4">Product Status</h2>

        <div className="grid gap-4 md:grid-cols-3">
          <form.Field name="isActive">
            {(field) => (
              <FormGroup label="Mark as Active" inputId="isActive" errors={field.state.meta.errors}>
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

          <form.Field name="isFeatured">
            {(field) => (
              <FormGroup label="Mark as Featured" inputId="isFeatured" errors={field.state.meta.errors}>
                <Switch
                  id="isFeatured"
                  checked={field.state.value}
                  onCheckedChange={(checked) => {
                    field.handleChange(checked);
                  }}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="isNew">
            {(field) => (
              <FormGroup label="Mark as New" inputId="isNew" errors={field.state.meta.errors}>
                <Switch
                  id="isNew"
                  checked={field.state.value}
                  onCheckedChange={(checked) => {
                    field.handleChange(checked);
                  }}
                />
              </FormGroup>
            )}
          </form.Field>
        </div>
      </div>

      <div className="border p-4 rounded-lg">
        <h2 className="text-lg font-medium mb-4">Product Dimensions & Weight</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <form.Field name="weight.value">
            {(field) => (
              <FormGroup label="Weight" inputId="weight.value" required errors={field.state.meta.errors}>
                <Input
                  id="weight.value"
                  type="number"
                  placeholder="Weight"
                  isInvalid={!field.state.meta.isValid}
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="weight.unit">
            {(field) => (
              <FormGroup label="Weight Unit" inputId="weight.unit" required errors={field.state.meta.errors}>
                <CustomSelect
                  options={WEIGHT_UNIT_OPTIONS}
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value as WeightUnit)}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="height.value">
            {(field) => (
              <FormGroup label="Height" inputId="height.value" required errors={field.state.meta.errors}>
                <Input
                  id="height.value"
                  type="number"
                  placeholder="Height"
                  isInvalid={!field.state.meta.isValid}
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="height.unit">
            {(field) => (
              <FormGroup label="Height Unit" inputId="height.unit" required errors={field.state.meta.errors}>
                <CustomSelect
                  options={DIMENSION_UNIT_OPTIONS}
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value as DimensionUnit)}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="width.value">
            {(field) => (
              <FormGroup label="Width" inputId="width.value" required errors={field.state.meta.errors}>
                <Input
                  id="width.value"
                  type="number"
                  placeholder="Width"
                  isInvalid={!field.state.meta.isValid}
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="width.unit">
            {(field) => (
              <FormGroup label="Width Unit" inputId="width.unit" required errors={field.state.meta.errors}>
                <CustomSelect
                  options={DIMENSION_UNIT_OPTIONS}
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value as DimensionUnit)}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="length.value">
            {(field) => (
              <FormGroup label="Length" inputId="length.value" required errors={field.state.meta.errors}>
                <Input
                  id="length.value"
                  type="number"
                  placeholder="Length"
                  isInvalid={!field.state.meta.isValid}
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="length.unit">
            {(field) => (
              <FormGroup label="Length Unit" inputId="length.unit" required errors={field.state.meta.errors}>
                <CustomSelect
                  options={DIMENSION_UNIT_OPTIONS}
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value as DimensionUnit)}
                />
              </FormGroup>
            )}
          </form.Field>
        </div>
      </div>

      <div className="border p-4 rounded-lg">
        <h2 className="text-lg font-medium mb-4">Product Images</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <form.Field name="images">
              {(field) => (
                <>
                  <FormGroup label="Images" inputId="images" required errors={field.state.meta.errors}>
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
                  </FormGroup>

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
                            if (isLoading) return;

                            field.handleChange(field.state.value?.filter((_, i) => i !== index));
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </form.Field>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
