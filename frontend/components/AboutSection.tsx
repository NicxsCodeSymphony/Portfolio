"use client"

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase, FaFigma } from "react-icons/fa";
import { SiTailwindcss, SiFirebase, SiMongodb } from "react-icons/si";

export default function AboutSection() {
  const audioVisualizerRef = useRef<HTMLDivElement | null>(null);

  
  // Audio visualizer animation effect
  useEffect(() => {
    if (!audioVisualizerRef.current) return; // Prevents errors if ref is null
  
    const bars = audioVisualizerRef.current.querySelectorAll('.visualizer-bar');
  
    const animateBars = () => {
      bars.forEach((bar) => {
        const height = Math.floor(Math.random() * 100) + 20;
        (bar as HTMLElement).style.height = `${height}%`; // Type assertion to HTMLElement
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
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: 0.8 + (i * 0.1),
        duration: 0.5
      }
    })
  };

  const techStack = [
    { name: "React.js", icon: <FaReact className="text-blue-400" />, color: "from-blue-500 to-blue-400" },
    { name: "Node.js", icon: <FaNodeJs className="text-green-400" />, color: "from-green-500 to-green-400" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" />, color: "from-cyan-500 to-cyan-400" },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, color: "from-green-600 to-green-400" },
    { name: "Firebase", icon: <SiFirebase className="text-yellow-400" />, color: "from-yellow-500 to-yellow-400" },
    { name: "MySQL", icon: <FaDatabase className="text-orange-400" />, color: "from-orange-500 to-orange-400" },
    { name: "Figma", icon: <FaFigma className="text-pink-400" />, color: "from-pink-500 to-pink-400" },
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
      {/* Background code snippets */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
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

  <motion.div
    className="absolute top-40 right-20 text-xs md:text-sm rotate-12 font-mono"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.8, duration: 1 }}
  >
    <pre>
      <code>
        {`import { rhythm } from 'music';
import { algorithm } from 'code';

export const creativity = rhythm + algorithm;`}
      </code>
    </pre>
  </motion.div>
</div>

      
      <div className="container mx-auto px-4">
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
                  <div className="w-full h-full rounded-lg bg-gray-900/60 flex items-center justify-center overflow-hidden">
                    {/* Code symbol background */}
                    <motion.div 
                      className="text-9xl font-bold opacity-10"
                      animate={{ rotateY: [0, 180] }}
                      transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    >&lt;/&gt;</motion.div>
                    
                    {/* Profile image placeholder with animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1"
                        animate={{ 
                          boxShadow: [
                            "0 0 0 rgba(59, 130, 246, 0.5)", 
                            "0 0 20px rgba(59, 130, 246, 0.7)", 
                            "0 0 0 rgba(59, 130, 246, 0.5)"
                          ] 
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center relative overflow-hidden">
                          {/* You can replace this with an actual image */}
                          <span className="text-lg md:text-xl font-bold text-white">Your Photo</span>
                          
                          {/* Audio visualizer effect at the bottom of profile */}
                          <div 
                            ref={audioVisualizerRef}
                            className="absolute bottom-0 w-full h-8 flex items-end justify-center gap-0.5 px-2"
                          >
                            {[...Array(20)].map((_, i) => (
                              <motion.div 
                                key={i} 
                                className="visualizer-bar w-full bg-gradient-to-t from-blue-500 to-purple-600 h-2 rounded-t transition-all duration-200"
                                initial={{ height: "10%" }}
                                animate={{ height: "40%" }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
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
              
              <div className="space-y-6 text-gray-300">
                <motion.p 
                  className="leading-relaxed"
                  variants={slideUp}
                >
                  Hello! I'm a passionate full stack developer and musician, blending the art of code with the harmony of sound. With expertise in modern web technologies and a background in music production, I bring a unique creative perspective to my projects.
                </motion.p>
                
                <motion.p 
                  className="leading-relaxed"
                  variants={slideUp}
                >
                  My technical journey spans across the entire development stack, from creating responsive front-end interfaces to building robust back-end systems. Meanwhile, my musical background infuses my work with creativity, rhythm, and attention to detail.
                </motion.p>
                
                <motion.blockquote 
                  className="border-l-4 border-blue-500 pl-4 italic my-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  I believe the best digital experiences are built at the intersection of technology and creativity – where logic meets art.
</motion.blockquote>
                
                <motion.p 
                  className="leading-relaxed"
                  variants={slideUp}
                >
                  When I'm not writing code or composing music, I'm exploring new technologies, collaborating with other artists, or finding inspiration in nature. I'm constantly seeking to expand my skills and push the boundaries of what's possible in both digital and musical worlds.
                </motion.p>
              </div>
              
              {/* Skills section with animated progress bars */}
              <motion.div 
                className="mt-10"
                variants={staggerItems}
              >
                <h4 className="text-xl font-semibold mb-6 flex items-center">
                  <span className="mr-2">Skills</span>
                  <span className="h-px flex-grow bg-gradient-to-r from-blue-500/50 to-transparent"></span>
                </h4>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="text-2xl">{tech.icon}</div>
          <span className="font-medium text-white">{tech.name}</span>
        </motion.div>
      ))}
    </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none">
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