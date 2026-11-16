
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects-db";
import { updateProject } from "@/app/lib/actions";
import { Suspense } from "react";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

async function EditProjectForm({
  params,
}: EditProjectPageProps) {
  const { id } = await params;
  const projectId = Number(id);

  if (!Number.isSafeInteger(projectId) || projectId <= 0) {
    notFound();
  }

  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProject.bind(null, id);

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold text-green-700">
        Edit Project
      </h1>

      <form action={updateProjectWithId} className="space-y-6">
        <div>
          <label htmlFor="title" className="block font-semibold">
            Project Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={project.title}
            required
            minLength={2}
            className="mt-2 w-full rounded border p-3"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={project.description}
            required
            minLength={10}
            rows={4}
            className="mt-2 w-full rounded border p-3"
          />
        </div>

        <div>
          <label htmlFor="type" className="block font-semibold">
            Project Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={project.type}
            required
            className="mt-2 w-full rounded border p-3"
          >
            <option value="opensource">Open Source</option>
            <option value="school">School Project</option>
          </select>
        </div>

        <div>
          <label htmlFor="technologies" className="block font-semibold">
            Technologies
          </label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            defaultValue={project.technologies.join(", ")}
            required
            className="mt-2 w-full rounded border p-3"
          />
          <p className="mt-1 text-sm text-gray-500">
            Separate technologies with commas.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="rounded bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            Save Changes
          </button>

          <Link
            href="/projects"
            className="rounded border px-6 py-3 hover:bg-gray-100"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}

export default function EditProjectPage(
  props: EditProjectPageProps
) {
  return (
    <Suspense fallback={<p className="p-8">Loading project...</p>}>
      <EditProjectForm {...props} />
    </Suspense>
  );
}
