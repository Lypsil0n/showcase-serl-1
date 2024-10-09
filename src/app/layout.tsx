"use client"
import './globals.css';

import Header from './components/header';
import Footer from './components/footer'
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [,setProjects] = useState<any[]>([]);

  useEffect(() => {


    const fetchProjects = async () => {
      const response = await fetch('/data/projects_real.json');
      
      const data = await response.json();
      setProjects(data); // Update state with projects
      localStorage.setItem('allProjects', JSON.stringify(data));
    };

    fetchProjects();
    const intervalId = setInterval(fetchProjects, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <html lang="en">
      <title>ShowcaseSERL</title>
      <body className="flex flex-col min-h-screen"> {/* Use flexbox and min-height */}
        <h1 style={headingStyle}>ShowcaseSERL</h1>
        <Header />
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