import { NextResponse } from 'next/server';


export async function GET() {
  const projects = [
    {
        id: 1,
        title: "Cebu Roosevelt Memorial Colleges Website",
        description: "A school website developed during my OJT at Cebu Roosevelt Memorial Colleges. Built with React, Node.js, and MySQL to provide easy access to school information and services.",
        image: "https://crmc-website.vercel.app/img/crmc%20building.png",
        category: "Fullstack",
        technologies: ["Svelte", "Tailwind CSS", "ElectronJS", "NodeJS", "ExoressJS", "MySQL", "DomainWink", "Vercel"],
        url: "https://crmc-website.vercel.app/",
        status: "Finished",
      },
    {
      id: 2,
      title: "Onboard Bus Ticketing and Management System",
      description: "A comprehensive bus ticketing and management system designed for onboard services. Built with React and Three.js to provide a seamless ticket booking experience and efficient bus management functionalities.",
      image: "/api/placeholder/600/400",
      category: "Fullstack",
      technologies: ["ElectronJS", "React Native", "Tailwind CSS", "NodeJs", "Firebase", "Vercel", "Thermal Printer"],
      url: "https://drive.google.com/file/d/1hnTpRtNSeB1Rb4UJDRtPyqsq54wg0_9b/view?usp=drivesdk",
      status: "On Progress",
    },
  ];

  return NextResponse.json(projects);
}