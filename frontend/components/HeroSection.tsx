"use client"

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const headingRef = useRef(null);
  
  useEffect(() => {
    if (!headingRef.current) return;
    
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval = null;
    
    const startAnimation = () => {
      let iteration = 0;
      const originalText = headingRef.current.dataset.value;
      
      clearInterval(interval);
      
      interval = setInterval(() => {
        headingRef.current.innerText = originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            
            if (letter === " ") return " ";
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");
        
        if (iteration >= originalText.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
    };
    
    startAnimation();
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(headingRef.current);
    
    return () => {
      clearInterval(interval);
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, []);
  
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-0"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <h1 
          ref={headingRef}
          data-value="MUSICIAN & DEVELOPER"
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tighter"
        >
          MUSICIAN & DEVELOPER
        </h1>
        
        <h2 className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Creating harmonious experiences through code and sound
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
          <a 
            href="#projects" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-colors duration-300"
          >
            View Projects
          </a>
          <a 
            href="#music" 
            className="bg-transparent border border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-md transition-colors duration-300"
          >
            Listen to Music
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}