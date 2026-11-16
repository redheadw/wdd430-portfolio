
import Link from "next/link";
import { deleteProject } from "@/app/lib/actions";
import DeleteProjectButton from "./DeleteProjectButton";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string | null;
}

export default function ProjectCard({
  id,
  title,
  description,
  technologies,
  link,
}: ProjectCardProps) {
  const deleteProjectWithId = deleteProject.bind(null, id);

  return (
    <article className="rounded border-l-4 border-green-700 bg-gray-50 p-4">
      <h3 className="mb-2 text-xl font-bold text-gray-900">
        {title}
      </h3>

      <p className="mb-3 text-gray-700">
        {description}
      </p>

      <p className="text-sm text-gray-600">
        <strong>Technologies:</strong>{" "}
        {technologies.join(", ")}
      </p>

      {link && (
        <p className="mt-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 hover:underline"
          >
            View Project
          </a>
        </p>
      )}

      <div className="mt-4 flex gap-3">
        <Link
          href={`/projects/${id}/edit`}
          className="rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Edit
        </Link>

        <form action={deleteProjectWithId}>
          <DeleteProjectButton projectTitle={title} />
        </form>
      </div>
    </article>
  );
}
