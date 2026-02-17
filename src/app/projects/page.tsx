import { Suspense } from "react";
import ProjectsClient from "./Project-client";

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <ProjectsClient />
    </Suspense>
  );
}
