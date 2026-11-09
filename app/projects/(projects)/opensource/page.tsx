
import { getProjects } from "@/lib/projects-db";

export default async function OpenSourcePage() {
  

  const projects = await getProjects("opensource");

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-green-700">
        Open Source Projects
      </h1>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-lg border p-5 shadow-sm"
          >
            <h2 className="text-xl font-semibold">
              {project.title}
            </h2>

            <p className="mt-2">{project.description}</p>

            <p className="mt-3 text-sm text-gray-600">
              {project.technologies.join(", ")}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
