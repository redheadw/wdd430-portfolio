
import SkillsCard from "@/components/SkillsCard";

const projects = [
  {
    title: "My First Project",
    description:
      "Replace this with an accurate description of a project I built.",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "My Second Project",
    description:
      "Replace this with an accurate description of another project I built.",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      {/* Welcome Section */}
      <section className="py-12 text-center">
        <h1 className="font-script mb-6 text-5xl font-bold text-green-700">
          Welcome to My Portfolio
        </h1>

        <p className="text-lg text-gray-700">
          Welcome to my WDD430 portfolio! I am learning
          full-stack web development using Next.js,
          React, TypeScript, and Tailwind CSS.
        </p>
      </section>

      {/* Projects Section */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          My Projects
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded border-l-4 border-green-700 bg-gray-50 p-4"
            >
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {project.title}
              </h3>

              <p className="mb-3 text-gray-700">
                {project.description}
              </p>

              <p className="text-sm text-gray-600">
                <strong>Technologies:</strong>{" "}
                {project.technologies.join(", ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="mt-12">
        <SkillsCard
          title="Technical Skills I Am Learning"
          skills={[
            "HTML",
            "CSS",
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Tailwind CSS",
          ]}
        />
      </section>
    </main>
  );
}
