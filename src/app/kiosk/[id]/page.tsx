"use client"

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Project } from '../../types/types';
import Link from 'next/link'

// Dynamic import for the QRCode component
const QRCode = dynamic(() => import('qrcode.react').then(mod => mod.QRCodeSVG), { ssr: false });

const KioskPage = ({ params }: { params: { id: string } }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrValue, setQrValue] = useState<string>('');

  useEffect(() => {
    const fetchProject = () => {
      const storedProjectsString = localStorage.getItem('allProjects');
      if (storedProjectsString) {
        const allProjects: Project[] = JSON.parse(storedProjectsString);
        const foundProject = allProjects.find((project) => project.id === params.id); // Find the project by ID

        if (foundProject) {
          setCurrentProject(foundProject);
          const projectUrl = `${window.location.origin}/projects/${foundProject.id}`;
          console.log('Project URL:', projectUrl);
          setQrValue(projectUrl); // Set the QR value
        } else {
          setError('Project not found.'); 
        }
      } else {
        setError('No projects found in local storage.');
      }
    };

    fetchProject();
  }, [params.id]);

  if (error) {
    return <div>
      <p className='my-4'>{error}</p>
      <p className='my-4 hover:text-cyan-500'><a><Link href='/'>Return to Homepage</Link></a></p>
    </div>
  }

  if (!currentProject) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[1100px] h-[950px] mx-auto mt-8 flex flex-col justify-between">
        <h2 className="text-2xl font-bold">
          <a href={currentProject.url} target="_blank" rel="noopener noreferrer">
            {currentProject.title}
          </a>
        </h2>

        <div className="screenshots flex flex-wrap justify-center mb-4">
          {currentProject.screenshots.slice(1).map((url: string, index: number) => (
            <img
              key={index}
              src={url}
              alt={`Screenshot ${index + 2}`}
              className="rounded-lg border border-gray-200 w-2/3 object-cover"
            />
          ))}
        </div>

        <p className="text-gray-700">{currentProject.longDesc}</p>

        <div className="flex">
          <div className="qrCode flex-shrink-0">
            <QRCode value={qrValue} size={150} /> {/* Use the qrValue state */}
          </div>

          <div className="flex flex-col justify-center items-center text-center ml-12">
            <p className="text-gray-500">Type: {currentProject.type}</p>
            <p className="text-gray-500">Tags: {currentProject.tags.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KioskPage;
