interface SkillsCardProps {
  title: string;
  skills: string[];
}

export default function SkillsCard({ title, skills }: SkillsCardProps) {
  return (
    <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        {title}
      </h2>

      <ul className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <li
            key={skill}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
