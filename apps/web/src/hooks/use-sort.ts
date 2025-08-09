import { useEffect, useState } from "react";

interface Sort {
  column: string;
  direction: "asc" | "desc";
}

const useSort = (initialSort: Sort) => {
  const [sort, setSort] = useState<Sort>(initialSort);

  useEffect(() => {
    // if (initialSort.column) {
    //   setSort(initialSort);
    // }
  }, [initialSort]);

  const handleSort = (column: string) => {
    setSort((prev) => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return { sort, handleSort };
};

export default useSort;
