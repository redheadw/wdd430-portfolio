
"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Validate project form inputs
const ProjectFormSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters"),
  type: z.enum(["opensource", "school"]),
  technologies: z.string().trim().min(2, "Enter at least one technology"),
});

// Create a new project
export async function createProject(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type"),
    technologies: formData.get("technologies"),
  };

  const parsed = ProjectFormSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error("Invalid project input.");
  }

  const { title, description, type, technologies } = parsed.data;

  // Convert comma-separated technologies into an array
  const technologiesArray = technologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  if (technologiesArray.length === 0) {
    throw new Error("Enter at least one technology.");
  }

  
  await sql`
    INSERT INTO projects (title, description, type, technologies)
    VALUES (
      ${title},
      ${description},
      ${type},
      string_to_array(${technologiesArray.join(",")}, ',')
    )
  `;


  revalidatePath("/projects");
  redirect("/projects");
}


export async function updateProject(id: string, formData: FormData) {
  // Validate the project ID
  const projectId = Number(id);

  if (!Number.isSafeInteger(projectId) || projectId <= 0) {
    throw new Error("Invalid project ID.");
  }

  // Get form values
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type"),
    technologies: formData.get("technologies"),
  };

  // Validate form inputs
  const parsed = ProjectFormSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error("Invalid project input.");
  }

  const { title, description, type, technologies } = parsed.data;

  // Convert technologies into a PostgreSQL array
  const technologiesArray = technologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  if (technologiesArray.length === 0) {
    throw new Error("Enter at least one technology.");
  }

  // Update only the project matching this ID
  await sql`
    UPDATE projects
    SET
      title = ${title},
      description = ${description},
      type = ${type},
      technologies = string_to_array(${technologiesArray.join(",")}, ',')
    WHERE id = ${projectId}
  `;

  // Refresh the projects list
  revalidatePath("/projects");

  // Return to Projects Overview
  redirect("/projects");
}


export async function deleteProject(id: number) {
  // Validate the project ID
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("Invalid project ID.");
  }

  // Delete only the project matching this ID
  await sql`
    DELETE FROM projects
    WHERE id = ${id}
  `;

  // Refresh the projects list
  revalidatePath("/projects");
}

