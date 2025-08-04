import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  canGoToNextPage: boolean;
  canGoToPreviousPage: boolean;
  className?: string;
  showEllipsis?: boolean;
  maxVisiblePages?: number;
}

const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  canGoToNextPage,
  canGoToPreviousPage,
  className,
  showEllipsis = true,
  maxVisiblePages = 5,
}: CustomPaginationProps) => {
  // Calculate which pages to show
  const getVisiblePages = (): number[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    const end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = showEllipsis && visiblePages[0] > 2;
  const showEndEllipsis = showEllipsis && visiblePages[visiblePages.length - 1] < totalPages - 1;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn("", className)}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => canGoToPreviousPage && onPageChange(currentPage - 1)}
              className={cn("cursor-pointer", !canGoToPreviousPage && "pointer-events-none opacity-50")}
            />
          </PaginationItem>

          {/* First page */}
          {showStartEllipsis && (
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(1)} isActive={currentPage === 1} className="cursor-pointer">
                1
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Start ellipsis */}
          {showStartEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Visible page numbers */}
          {visiblePages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* End ellipsis */}
          {showEndEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Last page */}
          {showEndEllipsis && (
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(totalPages)}
                isActive={currentPage === totalPages}
                className="cursor-pointer"
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => canGoToNextPage && onPageChange(currentPage + 1)}
              className={cn("cursor-pointer", !canGoToNextPage && "pointer-events-none opacity-50")}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
