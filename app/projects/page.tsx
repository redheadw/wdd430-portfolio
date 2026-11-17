
import Link from "next/link";
import { Suspense } from "react";
import {
  fetchFilteredProjects,
  fetchProjectsPages,
} from "@/lib/projects-db";
import ProjectList from "@/components/ProjectList";
import ProjectSearch from "@/components/ProjectSearch";
import Pagination from "@/components/Pagination";

interface ProjectsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

// Fetch matching projects and pagination information
async function ProjectsContent({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const [projects, totalPages] = await Promise.all([
    fetchFilteredProjects(query, currentPage),
    fetchProjectsPages(query),
  ]);

  return (
    <div className="space-y-6">
      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <p className="text-gray-600">
          No projects found. Try a different search.
        </p>
      )}

      <Pagination totalPages={totalPages} />
    </div>
  );
}

// Read URL parameters within a Suspense boundary
async function ProjectsResults({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;

  const query = params.query ?? "";
  const parsedPage = Number(params.page ?? "1");

  const currentPage =
    Number.isSafeInteger(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  return (
    <Suspense
      key={`${query}-${currentPage}`}
      fallback={<p>Loading projects...</p>}
    >
      <ProjectsContent
        query={query}
        currentPage={currentPage}
      />
    </Suspense>
  );
}

// Main Projects page
export default function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  return (
    <main className="p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            Projects Overview
          </h1>

          <p className="mt-4">
            Browse all my projects.
          </p>
        </div>

        <Link
          href="/projects/create"
          className="inline-flex items-center justify-center rounded-md bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
        >
          + Create New Project
        </Link>
      </div>

      <Suspense fallback={<p>Loading search...</p>}>
        <ProjectSearch />
      </Suspense>

      <Suspense fallback={<p>Loading projects...</p>}>
        <ProjectsResults searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
