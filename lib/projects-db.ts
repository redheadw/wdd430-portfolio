
import { sql } from "@vercel/postgres";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

export async function getProjects(
  type?: string | null
): Promise<Project[]> {
  if (type) {
    const result = await sql<Project>`
      SELECT * FROM projects
      WHERE type = ${type}
      ORDER BY id
    `;
    return result.rows;
  }

  const result = await sql<Project>`
    SELECT * FROM projects
    ORDER BY id
  `;

  return result.rows;
}

export async function getProjectById(
  id: number
): Promise<Project | null> {
  const result = await sql<Project>`
    SELECT * FROM projects
    WHERE id = ${id}
  `;

  return result.rows[0] ?? null;
}
