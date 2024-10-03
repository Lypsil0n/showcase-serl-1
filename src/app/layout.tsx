"use client"
import './globals.css';
import { ReactNode } from 'react';
import Header from './components/header';
import { useEffect, useState } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/data/projects_real.json');
      
      const data = await response.json();
      setProjects(data); // Update state with projects
      localStorage.setItem('filteredProjects', JSON.stringify(data));
    };

    fetchProjects();
    const intervalId = setInterval(fetchProjects, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <html lang="en">
      <body>
        {/* Place the <h1> before the Header */}
        <h1 style={headingStyle}>ShowcaseSERL</h1>
        <Header />
        <br></br>
        <main>{children}</main>
      </body>
    </html>
  );
}

const headingStyle: React.CSSProperties = {
  textAlign: 'center',
};