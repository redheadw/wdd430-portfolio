
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import type { Project } from "@/lib/projects-db";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");

  if (type && type !== "opensource" && type !== "school") {
    return NextResponse.json(
      { error: "Invalid project type" },
      { status: 400 }
    );
  }

  try {
    let projects;

    if (type) {
      const result = await sql<Project>`
        SELECT * FROM projects
        WHERE type = ${type}
        ORDER BY id
      `;
      projects = result.rows;
    } else {
      const result = await sql<Project>`
        SELECT * FROM projects
        ORDER BY id
      `;
      projects = result.rows;
    }

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
