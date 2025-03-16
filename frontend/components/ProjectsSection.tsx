"use client"

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  name: string;
  description?: string;
  category?: string;
  technologies?: string[];
  image?: string;
  title: string;
  url?: string;
  status?: string;
}

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState('all');
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error(err)
      }
    };
    
    fetchProjects();
  }, []);
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        setProjects(data);
      } catch (err) {

      }
    };
    
    fetchProjects();
  }, []);
  
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const tabsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const codeSnippets = [
    { 
      top: "5%", 
      left: "2%", 
      rotate: "-5deg",
      code: `function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
}`
    },
    { 
      top: "30%", 
      right: "3%", 
      rotate: "8deg",
      code: `.projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  transform-style: preserve-3d;
  perspective: 1000px;
}`
    },
    { 
      bottom: "10%", 
      left: "5%", 
      rotate: "3deg",
      code: `const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);`
    }
  ];
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <section 
      id="projects" 
      className="py-20 bg-gray-900 relative overflow-hidden"
      ref={sectionRef}
    >
      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          className="absolute opacity-5 hidden lg:block pointer-events-none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.5 * index }}
          style={{
            top: snippet.top || "auto",
            left: snippet.left || "auto",
            right: snippet.right || "auto",
            bottom: snippet.bottom || "auto",
            transform: `rotate(${snippet.rotate})`,
            zIndex: 0,
            maxWidth: "400px"
          }}
        >
          <pre className="text-blue-500 text-xs whitespace-pre-wrap">
            {snippet.code}
          </pre>
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          variants={titleVariants}
          initial="hidden"
          animate={controls}
        >
          Featured <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Projects</span>
        </motion.h2>
        
        <motion.div 
          className="flex justify-center mb-10"
          variants={tabsVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="inline-flex bg-gray-800 rounded-lg p-1">
            {['all', 'Frontend', 'Fullstack', 'Music'].map((tab) => (
              <motion.button
                key={tab}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => handleTabChange(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-gray-800 rounded-lg overflow-hidden"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                layout
                layoutId={`project-${project.id}`}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" 
                }}
                transition={{ 
                  layout: { type: "spring", stiffness: 200, damping: 25 },
                  duration: 0.3
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <motion.div 
                    className="absolute bottom-4 left-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="bg-blue-600 text-xs px-2 py-1 rounded-md">
                      {project.category}
                    </span>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.technologies || []).map((tech, index) => (
                      <motion.span 
                        key={tech} 
                        className="bg-gray-700 px-2 py-1 rounded-md text-xs"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index + 0.2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <motion.a 
                    // href="#" 
                    className="text-blue-400 hover:text-blue-500 text-sm flex items-center group cursor cursor-pointer"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = `${project.url}`}
                  >
                    See Demo
                    <motion.svg 
                      className="w-4 h-4 ml-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                      initial={{ x: 0 }}
                      animate={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400 text-lg">No projects found for this category.</p>
            <button 
              onClick={() => setActiveTab('all')}
              className="mt-4 px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors"
            >
              View All Projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}