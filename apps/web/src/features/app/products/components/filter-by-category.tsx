import { Check, ChevronDown, ChevronRight, Snail, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useCategories from "@/features/admin/categories/apis/use-categories";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/category";

interface Props {
  onSelect: (category: Category | null) => void;
  selectedId?: number | null;
}

const FilterByCategory: React.FC<Props> = ({ onSelect, selectedId }) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useCategories({ includeChildren: true });

  const categories = categoriesResponse?.rows || [];

  if (isCategoriesLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <Snail className="animate-bounce h-4 w-4" />
      </div>
    );
  }

  const selectedCategory = selectedId
    ? categories
        .flatMap(function getNames(cat: Category): string[] {
          const own = cat.id === selectedId ? [cat.name] : [];
          const children = cat.subCategories?.flatMap(getNames) || [];
          return [...own, ...children];
        })
        .find(Boolean)
    : null;

  return (
    <div className="relative">
      <div className="flex items-center border rounded-lg p-1 w-fit">
        <Button
          variant="ghost"
          type="button"
          aria-haspopup="true"
          onClick={() => {
            setOpenId((prev) => (prev === null ? -1 : null));
          }}
          aria-expanded={openId !== null}
          data-placeholder={!selectedCategory}
        >
          {selectedCategory ? <span>{selectedCategory}</span> : <span>Select category</span>}
        </Button>

        {selectedCategory && (
          <Button variant="ghost" size="icon" onClick={() => onSelect(null)}>
            <X className="h-4 w-4" />
          </Button>
        )}

        <Button variant="ghost" size="icon" onClick={() => setOpenId((prev) => (prev === null ? -1 : null))}>
          <ChevronDown
            className={cn("h-4 w-4 opacity-50 transition-transform duration-200", openId !== null && "rotate-180")}
          />
        </Button>
      </div>

      {openId !== null && (
        <div className="border rounded-lg p-1 w-fit absolute top-full left-0 z-1 bg-background">
          {categories.map((cat) => (
            <DropdownItem
              key={cat.id}
              category={cat}
              depth={0}
              onSelect={(category) => {
                onSelect(category);
                setOpenId(null);
              }}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface DropdownItemProps {
  category: Category;
  depth: number;
  onSelect: (category: Category) => void;
  selectedId?: number | null;
}

const DropdownItem = ({ category, depth, onSelect, selectedId }: DropdownItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <div className="flex items-center w-full">
        <button
          type="button"
          className={cn(
            "flex-1 text-left hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-md py-1 pr-4 cursor-pointer flex items-center gap-2",
            selectedId === category.id && "bg-accent text-accent-foreground",
          )}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => {
            onSelect(category);
          }}
        >
          {category.subCategories && category.subCategories.length > 0 && <ChevronRight className="h-4 w-4" />}

          <span>{category.name}</span>

          {selectedId === category.id && <Check className="h-4 w-4" />}
        </button>

        {category.subCategories && category.subCategories.length > 0 && (
          <Button variant="ghost" size="icon" onClick={() => setOpen((prev) => !prev)}>
            <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform duration-200", open && "rotate-180")} />
          </Button>
        )}
      </div>

      {open && category.subCategories && category.subCategories.length > 0 && (
        <div className="pl-2">
          {category.subCategories.map((sub) => (
            <DropdownItem key={sub.id} category={sub} depth={depth + 1} onSelect={onSelect} selectedId={selectedId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterByCategory;
