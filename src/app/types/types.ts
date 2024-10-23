export interface Project {
  id: string;
  title: string;
  smallDesc: string;
  longDesc: string;
  tags: string[];
  screenshots: string[];
  url: string;
  gitUrl: string;
  type: string;
}