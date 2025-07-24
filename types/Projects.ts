export interface Projects{
  uid: string;
  title: string;
  type: string;
  description: string;
  image_url: string;
  project_url: string;
  github_url: string;
  featured: string;
  stacks: {
    stack: string;
    icon: string;
  }
}