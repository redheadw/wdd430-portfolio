
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto mt-16 max-w-xl rounded-lg border bg-white p-6 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-green-700">
        Project Not Found
      </h1>

      <p className="mt-3 text-gray-700">
        The project you are looking for does not exist.
      </p>

      <Link
        href="/projects"
        className="mt-6 inline-block rounded bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-800"
      >
        Back to Projects
      </Link>
    </main>
  );
}
