
import ProjectApiList from "@/components/ProjectApiList";

export default function OpenSourcePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-green-700">
        Open Source Projects
      </h1>
      <ProjectApiList type="opensource" />
    </main>
  );
}
