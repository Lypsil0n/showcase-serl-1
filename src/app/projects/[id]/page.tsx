"use client"

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Project } from '../../types/types';

// Dynamic import for the QRCode component
const QRCode = dynamic(() => import('qrcode.react').then(mod => mod.QRCodeSVG), { ssr: false });

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrValue, setQrValue] = useState<string>(''); // Added state for QR value

  useEffect(() => {
    const fetchProject = () => {
      const storedProjectsString = localStorage.getItem('allProjects'); // Retrieve stored projects
      if (storedProjectsString) {
        const allProjects: Project[] = JSON.parse(storedProjectsString); // Parse JSON string into an object
        const foundProject = allProjects.find((project) => project.id === params.id); // Find the project by ID

        if (foundProject) {
          setCurrentProject(foundProject); // Set the project data in state
          // Construct the URL for QR code using window.location
          const projectUrl = `${window.location.origin}/projects/${foundProject.id}`;
          setQrValue(projectUrl); // Set the QR value
        } else {
          setError('Project not found'); // Set error if project not found
        }
      } else {
        setError('No projects found in local storage'); // Handle case where there are no projects
      }
    };

    fetchProject();
  }, [params.id]);

  // Handle loading or error states
  if (error) {
    return <div><p className='my-4'>{error}</p></div>; // Show error message if any
  }

  if (!currentProject) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[1100px] h-[950px] mx-auto mt-8 flex flex-col justify-between">
        <h2 className="text-2xl font-bold mb-4">
          <a href={currentProject.url} target="_blank" rel="noopener noreferrer">
            {currentProject.title}
          </a>
        </h2>

        <div className="screenshots flex flex-wrap justify-center gap-4 mb-4">
          {currentProject.screenshots.slice(1).map((url: string, index: number) => (
            <img
              key={index}
              src={url}
              alt={`Screenshot ${index + 2}`}
              className="rounded-lg border border-gray-200 w-2/3 object-cover"
            />
          ))}
        </div>

        <p className="text-gray-700 mb-2">{currentProject.longDesc}</p>
        <p className="text-gray-500 mb-2">Type: {currentProject.type}</p>
        <p className="text-gray-500 mb-4">Tags: {currentProject.tags.join(', ')}</p>

        <div className="qrCode flex justify-left pt-14">
          <QRCode value={qrValue} size={150} /> {/* Use the qrValue state */}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
