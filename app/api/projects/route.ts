
import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/lib/projects-db";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");

  if (type && type !== "opensource" && type !== "school") {
    return NextResponse.json(
      { error: "Invalid project type" },
      { status: 400 }
    );
  }

  try {
    const projects = await getProjects(type);
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
