
import NavLinks from "./NavLinks";
import { Suspense } from "react";

export default function Header() {
  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 p-4">
        <h1 className="text-2xl font-bold">
          My Portfolio
        </h1>

        <Suspense fallback={<span>Loading navigation...</span>}>
          <NavLinks />
        </Suspense>
      </div>
    </header>
  );
}
