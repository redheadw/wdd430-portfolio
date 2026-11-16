
"use client";

interface DeleteProjectButtonProps {
  projectTitle: string;
}

export default function DeleteProjectButton({
  projectTitle,
}: DeleteProjectButtonProps) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${projectTitle}"?`
    );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <button
      type="submit"
      onClick={handleClick}
      className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
}
