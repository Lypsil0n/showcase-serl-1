"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function List() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProjectsFromLocalStorage = () => {
    const storedProjects = localStorage.getItem('filteredProjects');
    
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      console.error('No projects found in localStorage.');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProjectsFromLocalStorage();
    setLoading(false);

    const intervalId = setInterval(fetchProjectsFromLocalStorage, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredProjects = projects.filter((project) => {
    const searchTerm = filter.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchTerm) ||
      project.type.toLowerCase().includes(searchTerm) ||
      project.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm))
    );
  });

  const goToKiosk = () => {
    localStorage.setItem('filteredProjects', JSON.stringify(filteredProjects));
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div>
      <p className="filterBox">
        Filter: 
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </p>
      <p>{filteredProjects.length} entries found.</p>
      <button className="kioskButton" onClick={goToKiosk} style={{ marginTop: "20px" }}>
        <Link href="/kiosk">Enter Kiosk Mode with applied filter</Link>
      </button>

      {/* Render filtered project list */}
      {filteredProjects.map((project) => (
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
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
