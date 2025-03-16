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
      date: "2015",
      title: "Microsoft Office Workshop",
      description: "Enrolled in a 30 hours workshop of Microsoft office software when I was in 6th grade",
      icon: "",
      color: "green",
    },
    {
      id: 2,
      date: "2017",
      title: "Start Learning to Code",
      description: "Start learning the fundamentals of coding and making web pages using HTML and CSS",
      icon: "",
      color: "orange",
    },
    {
      id: 3,
      date: "2019",
      title: "Graduated High School",
      description: "Graduated in Information and Communication Technology strand in High School.",
      icon: "",
      color: "purple",
    },
    {
      id: 4,
      date: "2021",
      title: "Freelancing",
      description: "Started doing freelancing specialized in web development and troubleshooting while I'm at my first year in college.",
      icon: "",
      color: "amber",
    },
    {
      id: 5,
      date: "2025",
      title: "On-The-Job Training",
      description: "Currently at my pracicum",
      icon: "",
      color: "red",
    },
  ];
  