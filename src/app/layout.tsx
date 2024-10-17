"use client"
import React from 'react';
import './globals.css';

import Header from './components/header';
import Footer from './components/footer'
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [,setProjects] = useState<any[]>([]);

  useEffect(() => {


    const fetchProjects = async () => {
      const response = await fetch('/data/projects_real.json');
      
      const data = await response.json();
      setProjects(data); // Update state with projects
      localStorage.setItem('allProjects', JSON.stringify(data));
    };

    fetchProjects();
    const intervalId = setInterval(fetchProjects, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const isKioskRoute = pathname.startsWith('/kiosk');

  return (
    <html lang="en">
      <title>ShowcaseSERL</title>
      <body className="flex flex-col min-h-screen"> {/* Use flexbox and min-height */}
        {!isKioskRoute && (
          <>
          <h1 style={headingStyle}>ShowcaseSERL</h1>
          <Header />
          </>
        )}
        <br></br>
        <main className="flex-grow"> {/* Allow the main content to grow */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

const headingStyle: React.CSSProperties = {
  textAlign: 'center',
};