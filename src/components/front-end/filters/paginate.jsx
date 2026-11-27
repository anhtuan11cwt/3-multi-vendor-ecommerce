import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Paginate({ totalItems = 0, pageSize = 6 }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="?page=1" />
        </PaginationItem>
        {pages.slice(0, 3).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href={`?page=${page}`} isActive={page === 1}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > 3 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`?page=${totalPages}`}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext href={`?page=${totalPages}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
