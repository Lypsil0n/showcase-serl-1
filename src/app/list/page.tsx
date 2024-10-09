"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function List() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProjectsFromLocalStorage = () => {
    const storedProjects = localStorage.getItem('allProjects');
    
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

    const intervalId = setInterval(fetchProjectsFromLocalStorage, 10000);

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
    router.push('/kiosk');
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (filteredProjects.length === 0) {
    return <div>
            <p className="filterBox">
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="ml-2 p-2 border border-gray-300 rounded"
                placeholder="Search projects..."
              />
            </p>
            <p>No projects match the search query.</p>
          </div>
  }

  return (
    <div>
      <p className="filterBox">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-2 p-2 border bg-gray-100 rounded"
          placeholder="Search projects:"
        />
      </p>
      
      <button
          className="kioskButton text-white px-4 py-2 rounded mt-4 ml-2" // Added ml-4 for left margin
          onClick={goToKiosk}
        >
          Enter Kiosk Mode with applied filter
      </button>

      <p className="my-4">{filteredProjects.length} entries found.</p>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col p-6 h-full" // Set card height
            style={{ minHeight: '300px' }} // Minimum height for uniformity
          >
            <h2 className="text-xl font-bold mb-2">
              <Link href={`/projects/${project.id}`}>
                {project.title}
              </Link>
            </h2>
            <p className="text-gray-600 flex-grow overflow-hidden text-ellipsis line-clamp-3">
              {project.smallDesc}
            </p>
            <p className="text-sm text-gray-500 mt-1">Type: {project.type}</p>
            <p className="text-sm text-gray-500">Tags: {project.tags.join(", ")}</p>
            <p className="text-blue-500 mt-2">
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
  );
}  