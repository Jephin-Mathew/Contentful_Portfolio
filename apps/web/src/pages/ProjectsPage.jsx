import { useEffect, useMemo, useState } from "react";
import { getProjects } from "../services/contentful/api";
import ProjectsSection from "../features/projects/ProjectsSection";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getProjects({ locale: "en-US" })
      .then((items) => {
        console.log("Projects fetched:", items);
        setProjects(Array.isArray(items) ? items : []);
      })
      .catch((err) => {
        console.error("Projects fetch failed:", err);
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filterOptions = useMemo(() => {
    const set = new Set();

    for (const p of projects) {
      const stack = p?.fields?.techStack;
      if (Array.isArray(stack)) stack.forEach((t) => t && set.add(t));
    }

    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  return (
    <ProjectsSection
      title="All Projects"
      subtitle="A collection of web applications, platforms and digital experiences built across various industries."
      projects={projects}
      filterOptions={filterOptions}
      loading={loading}
    />
  );
}