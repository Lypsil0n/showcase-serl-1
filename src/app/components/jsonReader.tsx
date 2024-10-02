import { useState, useEffect } from "react";

export function jsonReader() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = () => {
    setLoading(true); 
    fetch("/data/projects.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData: Project[]) => {
        setProjects(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, fetchProjects }; // Expose fetchProjects
}

export default jsonReader;
