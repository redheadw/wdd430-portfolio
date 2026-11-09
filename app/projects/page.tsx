
import { Suspense } from "react";
import { getProjects } from "@/lib/projects-db";
import ProjectList from "@/components/ProjectList";

async function ProjectsContent() {
  const projects = await getProjects();

  return <ProjectList projects={projects} />;
}

export default function ProjectsPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-green-700">
        Projects Overview
      </h1>

      <p className="mt-4 mb-6">
        Browse all my projects.
      </p>

      <Suspense fallback={<p>Loading projects...</p>}>
        <ProjectsContent />
      </Suspense>
    </main>
  );
}
