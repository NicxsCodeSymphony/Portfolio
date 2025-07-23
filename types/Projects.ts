export interface Projects{
  title: string;
  type: string;
  description: string;
  image: string;
  project_url: string;
  github_url: string;
  featured: string;
  stacks: {
    stack: string;
    icon: string;
  }
}