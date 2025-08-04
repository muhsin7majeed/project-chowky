import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/category";

interface CategoryItemProps {
  category: Category;
  isSubCategory?: boolean;
  expanded?: boolean;
}

const CategoryItem = ({ category, expanded }: CategoryItemProps) => {
  const hasSubCategories = Boolean(category.subCategories?.length);

  return (
    <div className={cn("border p-3 rounded-lg")}>
      <div className="text-lg font-bold">{category.name}</div>
      <div className="text-sm text-muted-foreground">{category.description || "--No description--"}</div>

      {hasSubCategories && (
        <Accordion type="multiple" className="ml-4" value={expanded ? [category.id.toString()] : undefined}>
          <AccordionItem value={category.id.toString()}>
            <AccordionTrigger className="justify-start">
              Sub-categories: <span className="font-bold">{category.subCategories?.length}</span>
            </AccordionTrigger>

            <AccordionContent>
              {category.subCategories?.map((subCategory) => (
                <CategoryItem key={subCategory.id} category={subCategory} isSubCategory={true} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

interface CategoryListProps {
  categories: Category[];
  expanded: boolean;
}

const CategoryList = ({ categories, expanded }: CategoryListProps) => {
  return (
    <>
      {categories?.map((category) => (
        <CategoryItem key={category.id} category={category} expanded={expanded} />
      ))}
    </>
  );
};

export default CategoryList;
