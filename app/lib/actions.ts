
"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Shared validation for creating and editing projects
const ProjectFormSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters."),
  description: z.string().trim().min(10, "Description must be at least 10 characters."),
  type: z.enum(["opensource", "school"]),
  technologies: z.string().trim().min(2, "Enter at least one technology."),
});

// Additional validation for creating a project
const CreateProjectSchema = ProjectFormSchema.extend({
  yearCompleted: z.coerce.number<number>()
    .int("Year must be a whole number.")
    .min(2000, "Year must be 2000 or later.")
    .max(new Date().getFullYear(), "Year cannot be in the future."),
});

// State returned to the create form
export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    type?: string[];
    technologies?: string[];
    yearCompleted?: string[];
  };
  message?: string | null;
};

// CREATE PROJECT
export async function createProject(
  prevState: State,
  formData: FormData
): Promise<State> {
  const parsed = CreateProjectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type"),
    technologies: formData.get("technologies"),
    yearCompleted: formData.get("yearCompleted"),
  });

  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  const {
    title,
    description,
    type,
    technologies,
    yearCompleted,
  } = parsed.data;

  const technologiesArray = technologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  if (technologiesArray.length === 0) {
    return {
      errors: {
        technologies: ["Enter at least one technology."],
      },
      message: "Please correct the errors below.",
    };
  }

  try {
    await sql`
      INSERT INTO projects
        (title, description, type, technologies, year_completed)
      VALUES (
        ${title},
        ${description},
        ${type},
        string_to_array(${technologiesArray.join(",")}, ','),
        ${yearCompleted}
      )
    `;
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      message: "Database error: Failed to create project.",
    };
  }

  revalidatePath("/projects");
  redirect("/projects");
}

// UPDATE PROJECT
export async function updateProject(
  id: string,
  formData: FormData
) {
  const projectId = Number(id);

  if (!Number.isSafeInteger(projectId) || projectId <= 0) {
    throw new Error("Invalid project ID.");
  }

  const parsed = ProjectFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type"),
    technologies: formData.get("technologies"),
  });

  if (!parsed.success) {
    throw new Error("Invalid project input.");
  }

  const { title, description, type, technologies } = parsed.data;

  const technologiesArray = technologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  if (technologiesArray.length === 0) {
    throw new Error("Enter at least one technology.");
  }

  try {
    await sql`
      UPDATE projects
      SET
        title = ${title},
        description = ${description},
        type = ${type},
        technologies = string_to_array(${technologiesArray.join(",")}, ',')
      WHERE id = ${projectId}
    `;
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Failed to update project.");
  }

  revalidatePath("/projects");
  redirect("/projects");
}

// DELETE PROJECT
export async function deleteProject(id: number) {
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("Invalid project ID.");
  }

  try {
    await sql`
      DELETE FROM projects
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project.");
  }

  revalidatePath("/projects");
}
