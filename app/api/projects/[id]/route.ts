
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import type { Project } from "@/lib/projects-db";

export async function GET(
  request: Request,
  context: RouteContext<"/api/projects/[id]">
) {
  const { id } = await context.params;

  // Validate the project ID
  if (!/^[1-9]\d*$/.test(id)) {
    return NextResponse.json(
      { error: "Invalid project ID" },
      { status: 400 }
    );
  }

  const projectId = Number(id);

  if (!Number.isSafeInteger(projectId)) {
    return NextResponse.json(
      { error: "Invalid project ID" },
      { status: 400 }
    );
  }

  try {
    // Retrieve the project from PostgreSQL
    const result = await sql<Project>`
      SELECT * FROM projects
      WHERE id = ${projectId}
    `;

    const project = result.rows[0];

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
