import SkillsCard from "@/components/SkillsCard";
import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: "My First Project",
    description: "Replace this with an accurate description of a project I built.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "",
  },
  {
    title: "My Second Project",
    description: "Replace this with an accurate description of another project I built.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "",
  },
];

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">
          My Portfolio
        </h1>
        <p className="text-lg text-gray-700">
          Welcome to my WDD430 portfolio! I am learning
          full-stack web development using Next.js,
          React, TypeScript, and Tailwind CSS.
        </p>
      </section>

      <h2 className="text-2xl font-bold mb-6">
        My Projects
      </h2>

      <ProjectList projects={projects} />

      <div className="mt-12">
        <SkillsCard
          title="Technical Skills I Am Learning"
          skills={[
            "HTML",
            "CSS",
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Tailwind CSS"
          ]}
        />
      </div>
    </main>
  );
}
