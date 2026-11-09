
import { sql } from "@vercel/postgres";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

// Get all projects or filter by project type
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

// Get a single project by its ID
export async function getProjectById(
  id: number
): Promise<Project | null> {
  const result = await sql<Project>`
    SELECT * FROM projects
    WHERE id = ${id}
  `;

  return result.rows[0] ?? null;
}

// Number of projects displayed per page
const ITEMS_PER_PAGE = 6;

// Search projects and return one page of results
export async function fetchFilteredProjects(
  query: string,
  currentPage: number
): Promise<Project[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const searchTerm = `%${query}%`;

  const result = await sql<Project>`
    SELECT *
    FROM projects
    WHERE
      title ILIKE ${searchTerm}
      OR description ILIKE ${searchTerm}
      OR type ILIKE ${searchTerm}
      OR EXISTS (
        SELECT 1
        FROM unnest(technologies) AS technology
        WHERE technology ILIKE ${searchTerm}
      )
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return result.rows;
}

// Count matching projects and calculate total pages
export async function fetchProjectsPages(
  query: string
): Promise<number> {
  const searchTerm = `%${query}%`;

  const result = await sql<{ count: string }>`
    SELECT COUNT(*) AS count
    FROM projects
    WHERE
      title ILIKE ${searchTerm}
      OR description ILIKE ${searchTerm}
      OR type ILIKE ${searchTerm}
      OR EXISTS (
        SELECT 1
        FROM unnest(technologies) AS technology
        WHERE technology ILIKE ${searchTerm}
      )
  `;

  const totalProjects = Number(result.rows[0]?.count ?? 0);

  return Math.ceil(totalProjects / ITEMS_PER_PAGE);
}
