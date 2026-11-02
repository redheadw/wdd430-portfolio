
import Link from "next/link";
import type { ReactNode } from "react";

export default function ProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="min-h-screen bg-green-50">
      <nav className="bg-green-700 p-4 text-white">
        <div className="flex flex-wrap gap-6">
          <Link href="/projects">Overview</Link>
          <Link href="/projects/opensource">
            Open Source
          </Link>
          <Link href="/projects/school">
            School Projects
          </Link>
          <Link href="/projects/settings">
            Settings
          </Link>
        </div>
      </nav>

      <div className="p-6">
        {children}
      </div>
    </section>
  );
}

