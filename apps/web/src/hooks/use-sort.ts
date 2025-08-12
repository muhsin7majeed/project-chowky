import { useState } from "react";
import type { Sort } from "@/types/common";

const useSort = <T = string>(initialSort: Sort<T>) => {
  const [sort, setSort] = useState<Sort<T>>(initialSort);

  const handleSort = (column: T) => {
    setSort((prev) => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return { sort, handleSort };
};

export default useSort;
