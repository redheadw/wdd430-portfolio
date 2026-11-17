
"use client";

import { useActionState } from "react";
import { createProject, type State } from "@/app/lib/actions";

const initialState: State = {
  message: null,
  errors: {},
};

export default function CreateProjectForm() {
  const [state, formAction, isPending] = useActionState(
    createProject,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="title" className="block font-semibold">
          Project Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          aria-describedby="title-error"
          className="mt-2 w-full rounded border p-3"
          placeholder="Enter project title"
        />
        <div id="title-error" aria-live="polite">
          {state.errors?.title?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block font-semibold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          aria-describedby="description-error"
          className="mt-2 w-full rounded border p-3"
          placeholder="Describe your project"
        />
        <div id="description-error" aria-live="polite">
          {state.errors?.description?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="type" className="block font-semibold">
          Project Type
        </label>
        <select
          id="type"
          name="type"
          defaultValue=""
          aria-describedby="type-error"
          className="mt-2 w-full rounded border p-3"
        >
          <option value="" disabled>
            Select a project type
          </option>
          <option value="opensource">Open Source</option>
          <option value="school">School Project</option>
        </select>
        <div id="type-error" aria-live="polite">
          {state.errors?.type?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="technologies" className="block font-semibold">
          Technologies
        </label>
        <input
          id="technologies"
          name="technologies"
          type="text"
          aria-describedby="technologies-error"
          className="mt-2 w-full rounded border p-3"
          placeholder="React, Next.js, TypeScript"
        />
        <div id="technologies-error" aria-live="polite">
          {state.errors?.technologies?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="yearCompleted" className="block font-semibold">
          Year Completed
        </label>
        <input
          id="yearCompleted"
          name="yearCompleted"
          type="number"
          min="2000"
          max="2099"
          aria-describedby="yearCompleted-error"
          className="mt-2 w-full rounded border p-3"
          placeholder="2026"
        />
        <div id="yearCompleted-error" aria-live="polite">
          {state.errors?.yearCompleted?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {state.message && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
}

