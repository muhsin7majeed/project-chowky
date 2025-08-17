import { Snail, X } from "lucide-react";
import { useState } from "react";
import NavigationMenu from "@/components/ui/navigation-menu";
import useCategories from "@/features/admin/categories/apis/use-categories";
import type { Category } from "@/types/category";
import type { GenericLabelValue } from "@/types/common";

interface FilterByCategoryProps {
  selectedCategory: GenericLabelValue<number> | null;
  onCategorySelect: (category: GenericLabelValue<number> | null) => void;
}

const FilterByCategory = ({ selectedCategory, onCategorySelect }: FilterByCategoryProps) => {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories({ includeChildren: true });

  if (isCategoriesLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <Snail className="animate-bounce h-4 w-4" />
      </div>
    );
  }

  return (
    <NavigationMenu viewport={false} className="w-full flex-wrap">
      {Array.from({ length: 15 }).map((_) => {
        return (
          <NavigationMenu.List
            // TODO: update key
            key={crypto.randomUUID()}
            className="relative z-1"
          >
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>List</NavigationMenu.Trigger>

              <NavigationMenu.Content>
                <NavigationMenu.Sub>
                  <NavigationMenu.List>
                    <NavigationMenu.Item>
                      <NavigationMenu.Trigger>Child</NavigationMenu.Trigger>

                      <NavigationMenu.Content>Hello World</NavigationMenu.Content>
                    </NavigationMenu.Item>
                  </NavigationMenu.List>
                </NavigationMenu.Sub>

                <ul className="md:w-[400px] lg:w-[500px]">
                  <li className="">
                    <NavigationMenu.Link asChild>
                      <div>
                        <div className="font-medium">Components</div>
                        <div className="text-muted-foreground">Browse all components in the library.</div>
                      </div>
                    </NavigationMenu.Link>

                    <NavigationMenu.Link asChild>
                      <div>
                        <div className="font-medium">Documentation</div>
                        <div className="text-muted-foreground">Learn how to use the library.</div>
                      </div>
                    </NavigationMenu.Link>

                    <NavigationMenu.Link asChild>
                      <div>
                        <div className="font-medium">Blog</div>
                        <div className="text-muted-foreground">Read our latest blog posts.</div>
                      </div>
                    </NavigationMenu.Link>
                  </li>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        );
      })}
    </NavigationMenu>
  );
};

export default FilterByCategory;
