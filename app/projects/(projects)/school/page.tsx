
import { Suspense } from "react";
import { getProjects } from "@/lib/projects-db";
import ProjectList from "@/components/ProjectList";

// Async Server Component
async function SchoolProjectList() {
  

  const projects = await getProjects("school");

  return <ProjectList projects={projects} />;
}

// Loading skeleton for project cards
function SchoolProjectsSkeleton() {
  return (
    <div
      className="mt-6 grid gap-4 md:grid-cols-2"
      role="status"
      aria-label="Loading school projects"
    >
      {[1, 2].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-lg border p-5 shadow-sm"
        >
          <div className="mb-4 h-6 w-3/4 rounded bg-gray-200" />
          <div className="mb-2 h-4 w-full rounded bg-gray-200" />
          <div className="mb-4 h-4 w-5/6 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>
      ))}
      <span className="sr-only">Loading school projects...</span>
    </div>
  );
}

export default function SchoolProjectsPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-green-700">
        School Projects
      </h1>

      <Suspense fallback={<SchoolProjectsSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </main>
  );
}
