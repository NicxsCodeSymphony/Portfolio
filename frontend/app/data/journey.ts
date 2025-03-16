export interface JourneyData {
    id: number;
    date: string;
    title: string;
    description: string;
    icon: string;
    color: string;
  }
  
  export const journeyData: JourneyData[] = [
    {
      id: 1,
      date: "2018",
      title: "Started Learning Web Development",
      description: "Started learning HTML, CSS, and basic JavaScript through online courses and tutorials.",
      icon: "code",
      color: "blue",
    },
    {
      id: 2,
      date: "2019",
      title: "First Freelance Project",
      description: "Completed my first paid project building a simple website for a local business.",
      icon: "work",
      color: "green",
    },
    {
      id: 3,
      date: "2020",
      title: "Learned React & Node.js",
      description: "Expanded my skills to include frontend frameworks and backend development.",
      icon: "auto_awesome",
      color: "purple",
    },
    {
      id: 4,
      date: "2021",
      title: "Junior Developer Position",
      description: "Secured my first full-time role as a Junior Developer at a tech startup.",
      icon: "business_center",
      color: "amber",
    },
    {
      id: 5,
      date: "2022",
      title: "Full Stack Developer",
      description: "Promoted to Full Stack Developer after demonstrating proficiency in both frontend and backend technologies.",
      icon: "engineering",
      color: "red",
    },
    {
      id: 6,
      date: "2023",
      title: "Team Lead",
      description: "Advanced to Team Lead position, managing a small team of developers and overseeing multiple projects.",
      icon: "groups",
      color: "teal",
    },
    {
      id: 7,
      date: "2024",
      title: "Senior Developer",
      description: "Currently working as a Senior Developer, focusing on complex architecture and mentoring junior team members.",
      icon: "rocket_launch",
      color: "indigo",
    }
  ];
  