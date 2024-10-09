import fs from 'fs';
import path from 'path';
import dynamic from 'next/dynamic';

const QRCode = dynamic(() => import('qrcode.react').then(mod => mod.QRCodeSVG), { ssr: false });

// function to fetch project data from JSON using fs
async function getProjectData(id: string): Promise<Project | null> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'projects_real.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const projects: Project[] = JSON.parse(jsonData);
  return projects.find((project) => project.id === id) || null;
}

// generate static params for dynamic routes
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'projects_real.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const projects: Project[] = JSON.parse(jsonData);
  
  return projects.map(project => ({ id: project.id })); 
}

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const currentProject = await getProjectData(params.id);

  if (!currentProject) {
    return <div><p>Project not found.</p></div>;
  }

  const qrValue = currentProject.url;

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="bg-white p-8 rounded-lg shadow-lg w-[900px] h-[900px] mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">{currentProject.title}</h2>
        <p className="text-gray-700 mb-2">{currentProject.longDesc}</p>
        <p className="text-gray-500 mb-2">Type: {currentProject.type}</p>
        <p className="text-gray-500 mb-4">Tags: {currentProject.tags.join(', ')}</p>
  
        <div className="screenshots flex flex-wrap justify-center gap-4 mb-4">
          {currentProject.screenshots.slice(1).map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Screenshot ${index + 2}`}
              className="rounded-lg border border-gray-200 w-2/3"
            />
          ))}
        </div>
  
        <div className="qrCode flex justify-center">
          <QRCode value={qrValue} size={150} />
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
