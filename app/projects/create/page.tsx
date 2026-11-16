
import Link from "next/link";
import { createProject } from "@/app/lib/actions";

export default function CreateProjectPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold text-green-700">
        Create New Project
      </h1>

      <form action={createProject} className="space-y-6">
        <div>
          <label htmlFor="title" className="block font-semibold">
            Project Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={2}
            className="mt-2 w-full rounded border p-3"
            placeholder="Enter project title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            minLength={10}
            rows={4}
            className="mt-2 w-full rounded border p-3"
            placeholder="Describe your project"
          />
        </div>

        <div>
          <label htmlFor="type" className="block font-semibold">
            Project Type
          </label>
          <select
            id="type"
            name="type"
            required
            defaultValue=""
            className="mt-2 w-full rounded border p-3"
          >
            <option value="" disabled>
              Select a project type
            </option>
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
            required
            className="mt-2 w-full rounded border p-3"
            placeholder="React, Next.js, TypeScript"
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
            Save Project
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
