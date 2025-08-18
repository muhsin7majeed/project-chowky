import { Check, ChevronDown, ChevronRight, Snail, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import useCategories from "@/features/admin/categories/apis/use-categories";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/category";

const findCategoryById = (categories: Category[], targetId: number): Category | null => {
  for (const category of categories) {
    if (category.id === targetId) return category;

    if (category.subCategories) {
      const found = findCategoryById(category.subCategories, targetId);
      if (found) return found;
    }
  }
  return null;
};

const findCategoryPath = (categories: Category[], targetId: number, path: number[] = []): number[] | null => {
  for (const category of categories) {
    const newPath = [...path, category.id];

    if (category.id === targetId) return newPath;

    if (category.subCategories) {
      const found = findCategoryPath(category.subCategories, targetId, newPath);
      if (found) return found;
    }
  }
  return null;
};

interface Props {
  onSelect: (category: Category | null) => void;
  selectedId?: number | null;
}

const FilterByCategory: React.FC<Props> = ({ onSelect, selectedId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useCategories({ includeChildren: true });

  const categories = data?.rows || [];

  const selectedCategory = useMemo(
    () => (selectedId ? findCategoryById(categories, selectedId) : null),
    [categories, selectedId],
  );

  const expandedPath = useMemo(() => {
    if (!selectedId) return [];
    return findCategoryPath(categories, selectedId)?.slice(0, -1) || [];
  }, [categories, selectedId]);

  const expandedSet = useMemo(() => new Set(expandedPath), [expandedPath]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full">
        <Snail className="animate-bounce h-4 w-4" />
      </div>
    );

  return (
    <div className="relative">
      {/* Selection Box */}
      <div className="flex items-center border rounded-lg p-1 w-fit">
        <Button
          variant="ghost"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          data-placeholder={!selectedCategory}
        >
          {selectedCategory ? selectedCategory.name : "Select category"}
        </Button>

        {selectedCategory && (
          <Button variant="ghost" size="icon" onClick={() => onSelect(null)}>
            <X className="h-4 w-4" />
          </Button>
        )}

        <Button variant="ghost" size="icon" onClick={() => setIsOpen((prev) => !prev)}>
          <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
        </Button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-1 w-fit rounded-lg border bg-background p-1 shadow-lg">
          {categories.map((cat) => (
            <DropdownItem
              key={cat.id}
              category={cat}
              depth={0}
              onSelect={(c) => {
                onSelect(c);
                setIsOpen(false);
              }}
              selectedId={selectedId}
              expandedSet={expandedSet}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Recursive Dropdown ---
interface DropdownItemProps {
  category: Category;
  depth: number;
  onSelect: (category: Category) => void;
  selectedId?: number | null;
  expandedSet: Set<number>;
}

const DropdownItem = ({ category, depth, onSelect, selectedId, expandedSet }: DropdownItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = category.subCategories && category.subCategories.length > 0;
  const isOpen = expandedSet.has(category.id) || expanded;

  return (
    <div>
      <div className="flex items-center w-full">
        <button
          type="button"
          className={cn(
            "flex flex-1 items-center gap-2 rounded-md py-1 pr-4 text-left hover:bg-accent hover:text-accent-foreground",
            selectedId === category.id && "bg-accent text-accent-foreground",
          )}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => onSelect(category)}
        >
          {hasChildren && <ChevronRight className="h-4 w-4" />}
          <span>{category.name}</span>
          {selectedId === category.id && <Check className="h-4 w-4" />}
        </button>

        {hasChildren && (
          <Button variant="ghost" size="icon" onClick={() => setExpanded((prev) => !prev)}>
            <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
          </Button>
        )}
      </div>

      {isOpen &&
        hasChildren &&
        category.subCategories?.map((sub) => (
          <DropdownItem
            key={sub.id}
            category={sub}
            depth={depth + 1}
            onSelect={onSelect}
            selectedId={selectedId}
            expandedSet={expandedSet}
          />
        ))}
    </div>
  );
};

export default FilterByCategory;
