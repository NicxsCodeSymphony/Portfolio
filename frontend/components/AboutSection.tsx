"use client"

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase, FaFigma, FaGuitar } from "react-icons/fa";
import { SiTailwindcss, SiFirebase, SiMongodb, SiNextdotjs, SiExpress, SiThreedotjs } from "react-icons/si";
import { IoMdMusicalNote } from "react-icons/io";

export default function AboutSection() {
  const audioVisualizerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  // Audio visualizer animation effect
  useEffect(() => {
    if (!audioVisualizerRef.current) return;
  
    const bars = audioVisualizerRef.current.querySelectorAll('.visualizer-bar');
  
    const animateBars = () => {
      bars.forEach((bar) => {
        const height = Math.floor(Math.random() * 100) + 20;
        (bar as HTMLElement).style.height = `${height}%`;
      });
    };
  
    const interval = setInterval(animateBars, 200);
    return () => clearInterval(interval);
  }, []);
  
  // Framer Motion variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };
  
  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }
  };
  
  const staggerItems = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const skillItem = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  const profileAnimation = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15, 
        delay: 0.2 
      } 
    }
  };
  
  const codeContainerAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        delay: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      } 
    }
  };
  
  const codeLineAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: 0.8 + (i * 0.1),
        duration: 0.5
      }
    })
  };

  // Organized skill stacks
  const frontendStack = [
    { name: "React.js", icon: <FaReact className="text-blue-400" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: "Three.js", icon: <SiThreedotjs className="text-white" /> },
  ];

  const backendStack = [
    { name: "Node.js", icon: <FaNodeJs className="text-green-400" /> },
    { name: "Express", icon: <SiExpress className="text-gray-300" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
    { name: "MySQL", icon: <FaDatabase className="text-orange-400" /> },
  ];

  const toolsStack = [
    { name: "Firebase", icon: <SiFirebase className="text-yellow-400" /> },
    { name: "Figma", icon: <FaFigma className="text-pink-400" /> },
    { name: "Guitar", icon: <FaGuitar className="text-red-400" /> },
    { name: "Piano", icon: <IoMdMusicalNote className="text-blue-300" /> },
  ];

  return (
    <motion.section 
      id="about" 
      className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      {/* Background code snippets with reduced opacity */}
      <div className="absolute inset-0 opacity-5 overflow-hidden z-10">
  {/* Top Left Code */}
  <motion.div
    className="absolute top-10 left-5 text-xs md:text-sm rotate-6 font-mono"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2, duration: 1 }}
  >
    <pre>
      <code>
        {`const harmony = () => {
  return music.connect(code);
};`}
      </code>
    </pre>
  </motion.div>

  {/* Bottom Right Code */}
  <motion.div
    className="absolute bottom-20 right-10 text-xs md:text-sm -rotate-3 font-mono"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5, duration: 1 }}
  >
    <pre>
      <code>
        {`function createMelody() {
  return new Promise(resolve => {
    const notes = ["C", "E", "G"];
    resolve(notes);
  });
};`}
      </code>
    </pre>
  </motion.div>

  {/* Upper Right Code */}
  <motion.div
    className="absolute top-5 right-5 text-xs md:text-sm rotate-2 font-mono"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.8, duration: 1 }}
  >
    <pre>
      <code>
        {`const rhythm = beat => {
  return beat.loop();
};`}
      </code>
    </pre>
  </motion.div>

  {/* Lower Left Code */}
  <motion.div
    className="absolute bottom-10 left-10 text-xs md:text-sm -rotate-2 font-mono"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2, duration: 1 }}
  >
    <pre>
      <code>
        {`async function playTrack() {
  const track = await loadAudio();
  track.play();
};`}
      </code>
    </pre>
  </motion.div>
</div>

      
      <div className="container mx-auto px-4 relative z-20">
        {/* Section header with decorative elements */}
        <motion.div 
          className="flex items-center justify-center mb-16 relative"
          variants={slideUp}
        >
          <motion.div 
            className="h-px w-12 bg-blue-500 mr-4"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 48, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          ></motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-center relative">
            About <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <motion.div 
            className="h-px w-12 bg-purple-500 ml-4"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 48, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          ></motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Profile visual column */}
          <motion.div 
            className="lg:col-span-5 order-1 lg:order-1"
            variants={slideUp}
          >
            <div className="h-full flex flex-col">
              {/* Profile image container */}
              <motion.div 
                className="relative h-80 md:h-96 mb-8 group"
                variants={profileAnimation}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.div 
                  className="absolute inset-4 -left-2 border-2 border-blue-500/30 rounded-lg"
                  animate={{ x: [0, -5, 0], y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 4, ease: "easeInOut" }}
                ></motion.div>
                <motion.div 
                  className="absolute inset-4 -right-2 border-2 border-purple-500/30 rounded-lg"
                  animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 4, ease: "easeInOut" }}
                ></motion.div>
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm p-1 relative z-10">
                <div className="w-full h-full rounded-lg bg-gray-900/60 flex items-center justify-center overflow-hidden relative">
      {/* Code symbol background */}
      <motion.div
        className="text-9xl font-bold opacity-10"
        animate={{ rotateY: [0, 180] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        &lt;/&gt;
      </motion.div>

      {/* Clickable Image / Video Container */}
      <div
        className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer"
        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
      >
        {!isVideoPlaying ? (
          <img
            src="https://avatars.githubusercontent.com/u/118499511?v=4" // Replace with a direct image URL
            alt="Profile Photo"
            className="w-full h-full object-cover"
          />
        ) : (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/FFARF3jFYv8?autoplay=1&mute=0&controls=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
                </div>
              </motion.div>
              
              {/* Tech/Music stacks visual */}
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
                variants={codeContainerAnimation}
              >
                <div className="flex items-center mb-4">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <div className="flex-1 text-xs text-gray-400 text-center">stack.js</div>
                </div>
                <div className="font-mono text-sm text-gray-300">
                  <motion.p custom={0} variants={codeLineAnimation}><span className="text-blue-400">const</span> <span className="text-green-400">developer</span> = {`{`}</motion.p>
                  <motion.p custom={1} variants={codeLineAnimation} className="ml-4"><span className="text-purple-400">frontend:</span> [<span className="text-yellow-300">'React'</span>, <span className="text-yellow-300">'Next.js'</span>, <span className="text-yellow-300">'Three.js'</span>],</motion.p>
                  <motion.p custom={2} variants={codeLineAnimation} className="ml-4"><span className="text-purple-400">backend:</span> [<span className="text-yellow-300">'Node'</span>, <span className="text-yellow-300">'Express'</span>, <span className="text-yellow-300">'MongoDB'</span>]</motion.p>
                  <motion.p custom={3} variants={codeLineAnimation}>{`}`};</motion.p>
                  <motion.p custom={4} variants={codeLineAnimation} className="mt-2"><span className="text-blue-400">const</span> <span className="text-green-400">musician</span> = {`{`}</motion.p>
                  <motion.p custom={5} variants={codeLineAnimation} className="ml-4"><span className="text-purple-400">instruments:</span> [<span className="text-yellow-300">'Guitar'</span>, <span className="text-yellow-300">'Piano'</span>],</motion.p>
                  <motion.p custom={6} variants={codeLineAnimation} className="ml-4"><span className="text-purple-400">production:</span> <span className="text-blue-400">true</span></motion.p>
                  <motion.p custom={7} variants={codeLineAnimation}>{`}`};</motion.p>
                  <motion.p custom={8} variants={codeLineAnimation} className="mt-2"><span className="text-green-400">export default</span> {`{`} ...developer, ...musician {`}`};</motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Content column */}
          <motion.div 
            className="lg:col-span-7 order-2 lg:order-2"
            variants={slideUp}
          >
            <motion.div 
              className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700/50 h-full"
              whileHover={{ boxShadow: "0 0 15px rgba(79, 70, 229, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
              className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent inline-block"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                The Harmony of Code and Music
              </motion.h3>
              
              {/* Bio content only - skills removed from text since they're in the skill section */}
              <div className="space-y-4 text-gray-300">
                <motion.p 
                  className="leading-relaxed"
                  variants={slideUp}
                >
                  Full stack developer and musician blending technical expertise with creative artistry. I craft immersive digital experiences using modern web technologies while drawing inspiration from my musical background.
                </motion.p>
                
                <motion.blockquote 
                  className="border-l-4 border-blue-500 pl-4 italic my-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Where logic meets art – creating at the intersection of technology and creativity.
                </motion.blockquote>
              </div>
              
              {/* Skills section with organized categories */}
              <motion.div 
                className="mt-8"
                variants={staggerItems}
              >
                <h4 className="text-xl font-semibold mb-6 flex items-center">
                  <span className="mr-2">Skills</span>
                  <span className="h-px flex-grow bg-gradient-to-r from-blue-500/50 to-transparent"></span>
                </h4>
                
                {/* Frontend Skills */}
                <div className="mb-6">
                  <h5 className="text-lg font-medium mb-3 text-blue-400">Frontend</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {frontendStack.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        className="flex items-center gap-2 bg-gray-800/60 p-3 rounded-lg"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.9)", y: -2 }}
                      >
                        <div className="text-xl">{tech.icon}</div>
                        <span className="font-medium text-white text-sm">{tech.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Backend Skills */}
                <div className="mb-6">
                  <h5 className="text-lg font-medium mb-3 text-green-400">Backend</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {backendStack.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        className="flex items-center gap-2 bg-gray-800/60 p-3 rounded-lg"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + (index * 0.05) }}
                        viewport={{ once: true }}
                        whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.9)", y: -2 }}
                      >
                        <div className="text-xl">{tech.icon}</div>
                        <span className="font-medium text-white text-sm">{tech.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Tools & Other Skills */}
                <div>
                  <h5 className="text-lg font-medium mb-3 text-purple-400">Tools & Music</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {toolsStack.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        className="flex items-center gap-2 bg-gray-800/60 p-3 rounded-lg"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + (index * 0.05) }}
                        viewport={{ once: true }}
                        whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.9)", y: -2 }}
                      >
                        <div className="text-xl">{tech.icon}</div>
                        <span className="font-medium text-white text-sm">{tech.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <motion.div 
          className="absolute top-20 left-[10%] w-12 h-12 rounded-full bg-blue-500/10"
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-40 right-[15%] w-24 h-24 rounded-full bg-purple-500/10"
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-[20%] w-16 h-16 rounded-full bg-cyan-500/10"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </motion.section>
  );
}