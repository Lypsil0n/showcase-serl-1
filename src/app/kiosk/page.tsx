"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const QRCode = dynamic(() => import('qrcode.react').then(mod => mod.QRCodeSVG), { ssr: false });

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
  const qrValue = currentProject.url;

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="bg-white p-8 rounded-lg shadow-lg w-[1100px] h-[950px] mx-auto mt-8 flex flex-col justify-between">
        <h2 className="text-2xl font-bold mb-4">{currentProject.title}</h2>

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
          <QRCode value={qrValue} size={150} />
        </div>
      </div>
    </div>
  );
}