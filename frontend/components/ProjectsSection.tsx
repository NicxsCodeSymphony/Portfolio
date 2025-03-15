"use client"

import { useState } from 'react';

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "Music Streaming Application",
      description: "A full-stack music streaming platform with custom audio visualizer built using React, Node.js, and MongoDB.",
      image: "/api/placeholder/600/400",
      category: "fullstack",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Web Audio API"]
    },
    {
      id: 2,
      title: "Interactive 3D Portfolio",
      description: "A Three.js powered interactive portfolio with custom 3D models and animations.",
      image: "/api/placeholder/600/400",
      category: "frontend",
      technologies: ["Three.js", "React", "GSAP", "WebGL"]
    },
    {
      id: 3,
      title: "Music Production Suite",
      description: "Digital audio workstation interface with collaborative features for musicians.",
      image: "/api/placeholder/600/400",
      category: "music",
      technologies: ["Vue.js", "Web Audio API", "Firebase", "Tone.js"]
    },
    {
      id: 4,
      title: "E-commerce Platform",
      description: "A fully responsive e-commerce platform with payment integration and admin dashboard.",
      image: "/api/placeholder/600/400",
      category: "fullstack",
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"]
    },
    {
      id: 5,
      title: "Musical Instrument Visualizer",
      description: "Interactive web application that visualizes sound frequencies from various instruments.",
      image: "/api/placeholder/600/400",
      category: "music",
      technologies: ["JavaScript", "Canvas API", "Web Audio API"]
    },
    {
      id: 6,
      title: "Developer Blog",
      description: "Personal tech blog with custom CMS and code snippet highlighting.",
      image: "/api/placeholder/600/400",
      category: "frontend",
      technologies: ["Gatsby", "GraphQL", "MDX", "Netlify CMS"]
    }
  ];
  
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);
  
  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Featured <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Projects</span>
        </h2>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-800 rounded-lg p-1">
            {['all', 'frontend', 'fullstack', 'music'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-blue-600 text-xs px-2 py-1 rounded-md">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-gray-700 px-2 py-1 rounded-md text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <a href="#" className="text-blue-400 hover:text-blue-500 text-sm flex items-center">
                  View Project
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}