
"use client";

import Link from "next/link";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");

  const currentPage =
    Number.isSafeInteger(page) && page > 0
      ? page
      : 1;

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  }

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Project pagination"
      className="mt-6 flex items-center justify-center gap-4"
    >
      {hasPreviousPage ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-lg bg-gray-200 px-4 py-2 text-gray-500">
          Previous
        </span>
      )}

      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>

      {hasNextPage ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-lg bg-gray-200 px-4 py-2 text-gray-500">
          Next
        </span>
      )}
    </nav>
  );
}
