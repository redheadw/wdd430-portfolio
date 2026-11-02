
import ProjectApiList from "@/components/ProjectApiList";

export default function SchoolProjectsPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-green-700">
        School Projects
      </h1>
      <ProjectApiList type="school" />
    </main>
  );
}
