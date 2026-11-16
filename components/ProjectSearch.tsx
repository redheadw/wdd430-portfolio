
"use client";

import { useEffect, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface SearchInputProps {
  currentQuery: string;
}

function SearchInput({ currentQuery }: SearchInputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(currentQuery);

  // Debounce search updates by 300 milliseconds
  useEffect(() => {
    if (searchTerm === currentQuery) {
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(
        searchParams.toString()
      );

      if (searchTerm.trim()) {
        params.set("query", searchTerm.trim());
      } else {
        params.delete("query");
      }

      // Reset pagination when the search changes
      params.set("page", "1");

      router.push(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, currentQuery, pathname, router, searchParams]);

  return (
    <div className="relative mb-6">
      <label
        htmlFor="project-search"
        className="mb-2 block font-medium"
      >
        Search Projects
      </label>

      <input
        id="project-search"
        type="search"
        placeholder="Search by title, description, or technology..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
    </div>
  );
}

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") ?? "";

  return (
    <SearchInput
      key={currentQuery}
      currentQuery={currentQuery}
    />
  );
}
