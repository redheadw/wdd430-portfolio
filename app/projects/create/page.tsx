
import CreateProjectForm from "./create-project-form";

export default function CreateProjectPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold text-green-700">
        Create New Project
      </h1>

      <p className="mb-6 text-gray-700">
        Fill out the form below to add a new project.
      </p>

      <CreateProjectForm />
    </main>
  );
}
