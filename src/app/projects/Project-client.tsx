"use client";

import { useSearchParams } from "next/navigation";

export default function ProjectsClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div>
      <h1>Projects</h1>
      <p>Category: {category}</p>
    </div>
  );
}
