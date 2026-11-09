
import { NextResponse } from "next/server";
import { getProjectById } from "@/lib/projects-db";

export async function GET(
  request: Request,
  context: RouteContext<"/api/projects/[id]">
) {
  const { id } = await context.params;

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
    const project = await getProjectById(projectId);

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
