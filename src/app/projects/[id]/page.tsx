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
  
  return projects.map(project => ({ id: project.id })); // return an array of params
}

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const currentProject = await getProjectData(params.id);

  if (!currentProject) {
    return <div>Project not found</div>;
  }

  const qrValue = currentProject.url;

  return (
    <div>
      <div className="project-display">
        <h2>{currentProject.title}</h2>
        <p>{currentProject.longDesc}</p>
        <p>Type: {currentProject.type}</p>
        <p>Tags: {currentProject.tags.join(', ')}</p>
        <div className="screenshots">
          {currentProject.screenshots.map((url, index) => (
            <img key={index} src={url} alt={`Screenshot ${index + 1}`} />
          ))}
        </div>
        <div className='qrCode'>
          <QRCode value={qrValue}></QRCode>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
