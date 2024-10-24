"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjectsFromLocalStorage = () => {
    const storedProjects = localStorage.getItem('allProjects');
    
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);
      setProjects(parsedProjects.slice(-4)); 
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProjectsFromLocalStorage();
    setLoading(false);

    const intervalId = setInterval(fetchProjectsFromLocalStorage, 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div>
      <div className="my-8">
        <p>Welcome to ShowcaseSERL!</p>
        <p>These are the latest projects added to the repository.</p>
      </div>
       <div className="flex justify-center mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col p-6 h-full" // Set card height
            style={{ minHeight: '300px' }} // Minimum height for uniformity
          >
            <h2 className="text-xl font-bold mb-2 hover:text-gray-500">
              <Link href={`/projects/${project.id}`}>
                {project.title}
              </Link>
            </h2>
            <p className="text-gray-600 flex-grow overflow-hidden text-ellipsis line-clamp-3">
              {project.smallDesc}
            </p>
            <p className="text-sm text-gray-500 mt-1">Type: {project.type}</p>
            <p className="text-sm text-gray-500">Tags: {project.tags.join(", ")}</p>
            <p className="text-blue-500 mt-2 hover:text-cyan-500">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                Visit Homepage
              </a>
            </p>
            
            {project.screenshots.length > 0 && (
              <div className="mt-4 h-48 flex justify-center">
                <img
                  src={project.screenshots[0]}
                  alt="Screenshot 1"
                  className="h-full w-auto max-w-full object-cover rounded-md" // Maintain aspect ratio and max width
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}  