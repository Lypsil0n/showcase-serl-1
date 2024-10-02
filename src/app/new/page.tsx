"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Overview() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjectsFromLocalStorage = () => {
    const storedProjects = localStorage.getItem('filteredProjects');
    
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);
      setProjects(parsedProjects.slice(-2)); 
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProjectsFromLocalStorage();
    setLoading(false);

    const intervalId = setInterval(fetchProjectsFromLocalStorage, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div>
      {/* Render the last two projects */}
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} style={{ marginBottom: "30px" }}>
            <h2>
              <Link href={`/projects/${project.id}`}>
                {project.title}
              </Link>
            </h2>
            <p>{project.smallDesc}</p>
            <p>Type: {project.type}</p>
            <p>Tags: {project.tags.join(", ")}</p>
            <p className="link">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                Visit Homepage
              </a>
            </p>
            <div className="screenshotList">
              {project.screenshots.length > 0 && (
                <img
                  src={project.screenshots[0]}
                  alt="Screenshot 1"
                  style={{ maxWidth: "300px", height: "auto" }}
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}
