"use client"
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import gsap from 'gsap';
import { journeyData } from '@/app/data/journey';


const JourneySection = () => {
    const progressLineRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(containerRef, { once: false, amount: 0.1 });
    const controls = useAnimation();
  
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);
  
    useEffect(() => {
      if (!progressLineRef.current) return;
  
      const milestones = document.querySelectorAll<HTMLElement>('.milestone');
      if (milestones.length === 0) return;
  
      const scrollTriggers: ScrollTrigger[] = [];
  
      milestones.forEach((milestone, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: milestone,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        });
  
        const progress = (index / (milestones.length - 1)) * 100;
        
        tl.to(progressLineRef.current, {
          height: `${progress}%`,
          duration: 0.6,
          ease: "power2.inOut",
        });
  
        scrollTriggers.push(tl.scrollTrigger as ScrollTrigger);
      });
  
      return () => {
        scrollTriggers.forEach((trigger) => {
          if (trigger) trigger.kill();
        });
      };
    }, []);
  
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.3,
        },
      },
    };
  
    const childVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };
  
    const getColorClass = (color: string): string => {
      const colorMap: { [key: string]: string } = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        purple: "bg-purple-500",
        amber: "bg-amber-500",
        red: "bg-red-500",
        teal: "bg-teal-500",
        indigo: "bg-indigo-500",
      };
      return colorMap[color] || "bg-blue-500";
    };
  
    const getIconColorClass = (color: string): string => {
      const colorMap: { [key: string]: string } = {
        blue: "text-blue-500",
        green: "text-green-500",
        purple: "text-purple-500",
        amber: "text-amber-500",
        red: "text-red-500",
        teal: "text-teal-500",
        indigo: "text-indigo-500",
      };
      return colorMap[color] || "text-blue-500";
    };

  return (
    <motion.section 
      id="journey" 
      className="py-16 md:py-24 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      ref={containerRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="section-content" variants={childVariants}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 md:mb-16 text-center">
            My <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Journey</span>
          </h2>
          
          <div className="relative flex flex-col items-center">
            {/* Progress line */}
            <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-gray-700/50 rounded-full">
              <div 
                ref={progressLineRef} 
                className="w-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                style={{ height: "0%" }}
              />
            </div>
            
            {/* Timeline items */}
            <div className="w-full flex flex-col items-center">
              {journeyData.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className={`milestone flex w-full md:w-3/4 lg:w-2/3 mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  variants={childVariants}
                >
                  {/* Card content */}
                  <div 
                    className={`w-full md:w-1/2 p-1 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}
                  >
                    <motion.div 
                      className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-700/50"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <span className={`px-4 py-1 rounded-full text-sm ${getColorClass(item.color)} text-white`}>
                          {item.date}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm sm:text-base">{item.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Center icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className={`w-10 h-10 rounded-full ${getColorClass(item.color)} flex items-center justify-center shadow-lg shadow-${item.color}-500/20 z-10`}>
                      <span className="material-icons text-white">{item.icon}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </motion.section>
  );
};

export default JourneySection;