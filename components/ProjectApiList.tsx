
"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects-db";

interface Props {
  type?: "opensource" | "school";
}

export default function ProjectApiList({ type }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      setLoading(true);
      setError("");

      try {
        const url = type
          ? `/api/projects?type=${type}`
          : "/api/projects";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to load projects");
        }

        const data: Project[] = await response.json();

        if (!cancelled) {
          setProjects(data);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load projects.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, [type]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p role="alert">{error}</p>;

  if (projects.length === 0) {
    return <p>No projects found.</p>;
  }

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.id}
          className="rounded-lg border-l-4 border-green-700 bg-gray-50 p-6"
        >
          <h2 className="text-xl font-bold">
            {project.title}
          </h2>

          <p className="mt-2">{project.description}</p>

          <p className="mt-3 text-sm">
            <strong>Technologies:</strong>{" "}
            {project.technologies.join(", ")}
          </p>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-green-700 underline"
            >
              View Project
            </a>
          )}
        </article>
      ))}
    </div>
  );
}
