"use client";

// src/app/kiosk/page.tsx
import { useEffect, useState } from 'react';

export default function Kiosk() {
  const [projects, setProjects] = useState<any[]>([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedProjects = localStorage.getItem('filteredProjects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      const intervalId = startCycling(projects.length);
      return () => clearInterval(intervalId);
    }
  }, [projects]);

  const startCycling = (projectCount: number) => {
    return setInterval(() => {
      setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projectCount);
    }, 5000);
  };

  if (!projects.length) {
    return <div>No projects available</div>;
  }

  if (loading) {
    return <div className="spinner"></div>;
  }

  const currentProject = projects[currentProjectIndex];

  return (
    <div>
      <div className="project-display">
        <h2>{currentProject.title}</h2>
        <p>{currentProject.longDesc}</p>
        <p>Type: {currentProject.type}</p>
        <p>Tags: {currentProject.tags.join(', ')}</p>
        <div className="screenshots">
          {currentProject.screenshots.map((url: string, index: number) => (
            <img key={index} src={url} alt={`Screenshot ${index + 1}`} />
          ))}
      </div>
      </div>
    </div>
  );
}