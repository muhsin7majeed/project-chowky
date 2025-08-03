import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import CategorySelect from "@/components/category-select";
import FormGroup from "@/components/ui/form-group";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { CategoryFormDefaultValues } from "@/types/category";

const categorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .max(100, { message: "Slug must be less than 100 characters" }),
  description: z.string().max(500, { message: "Description must be less than 500 characters" }).optional(),
  parentId: z
    .object({
      value: z.number(),
      label: z.string(),
    })
    .optional(),
  imageUrl: z.string().optional(),
  priority: z.number().optional(),
  isActive: z.boolean(),
});

interface CategoryFormProps {
  onSubmit: (data: CategoryFormDefaultValues) => void;
  defaultValues?: CategoryFormDefaultValues;
}

const CategoryForm = ({ onSubmit, defaultValues }: CategoryFormProps) => {
  const form = useForm({
    defaultValues,
    onSubmit: (data) => onSubmit(data.value),
    validators: {
      onChange: categorySchema,
    },
  });

  return (
    <div>
      <form
        id="category-form"
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
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <FormGroup label="Description" inputId="description" required errors={field.state.meta.errors}>
                <Textarea
                  id="description"
                  placeholder="Description"
                  isInvalid={!field.state.meta.isValid}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="priority">
            {(field) => (
              <FormGroup label="Priority" inputId="priority" errors={field.state.meta.errors}>
                <Input
                  id="priority"
                  type="number"
                  placeholder="Priority"
                  isInvalid={!field.state.meta.isValid}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </FormGroup>
            )}
          </form.Field>

          <form.Field name="parentId">
            {(field) => (
              <FormGroup label="Parent Category" inputId="parentId" errors={field.state.meta.errors}>
                <CategorySelect
                  value={field.state.value}
                  onChange={(value) => {
                    field.handleChange(value);
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
                  onCheckedChange={(checked) => field.handleChange(checked)}
                />
              </FormGroup>
            )}
          </form.Field>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
