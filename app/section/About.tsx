'use client'

import { useEffect, useRef, useState } from 'react';
// import { MapPin } from 'lucide-react';
import * as THREE from 'three';
import { useAboutPage } from '../hooks/useAboutPage';
import type { AboutPageData } from '../interfaces/about.interface';
import Image from 'next/image';


const techKeywords = ['React', 'Node.js', 'JavaScript', 'TypeScript', 'Three.js', 'Developer', 'Code', 'Web', 'Frontend', 'Backend', 'Full-stack'];

type AboutProps = {id?: string}

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    let startTimestamp: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutCubic * target));
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    raf.current = requestAnimationFrame(animate);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, duration, start]);
  return count;
}

function useIntersectionObserver(ref: React.RefObject<Element | null>, options: IntersectionObserverInit = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, ...options }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
}

function ThreeJSScene({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x286F6E, 0.8, 100);
    pointLight.position.set(-10, -10, -10);
    scene.add(pointLight);

    camera.position.z = 30;

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mousePosition]);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />;
}

export default function About({id}: AboutProps) {

  const { data, loading, error } = useAboutPage();

  const aboutPageRaw = data?.aboutPage
    ? (() => {
        const val = Object.values(data.aboutPage?.aboutPage)[0];
        return typeof val === 'object' && val !== null ? (val as AboutPageData['aboutPage'][string]) : null;
      })()
    : null;
  const statsRaw = data?.stats ? Object.values(data.stats)[0] : null;


  const [animate, setAnimate] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  
  const statsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const isStatsVisible = useIntersectionObserver(statsRef);
  const isHeroVisible = useIntersectionObserver(heroRef);
  const isBioVisible = useIntersectionObserver(bioRef);
  const isInfoVisible = useIntersectionObserver(infoRef);

  useEffect(() => {
    if (!loading && !error) {
      setTimeout(() => setAnimate(true), 200);
    }
  }, [loading, error]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isHeroVisible) setVisibleElements(prev => new Set([...prev, 'hero']));
    if (isBioVisible) setVisibleElements(prev => new Set([...prev, 'bio']));
    if (isInfoVisible) setVisibleElements(prev => new Set([...prev, 'info']));
    if (isStatsVisible) setVisibleElements(prev => new Set([...prev, 'stats']));
  }, [isHeroVisible, isBioVisible, isInfoVisible, isStatsVisible]);

  const duration = 3000;

  const experienceYears =  useCountUp(statsRaw?.project_completed ?? 12, duration, animate);
  const projectsCount = useCountUp(statsRaw?.project_completed ?? 15, duration, animate);
  const clientsCount = useCountUp(statsRaw?.client_count ?? 16, duration, animate);
  const workExperienceCount = useCountUp(statsRaw?.work_stats ?? 3, duration, animate);

  const getGoogleDriveImageUrl = (fileId: string | undefined) => {
    if (!fileId) return "/api/placeholder/384/480";
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  };

  const highlightTechKeywords = (title: string | undefined) => {
    if (!title) return '';
    let highlighted = title;
    techKeywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlighted = highlighted.replace(
        regex,
        '<span class="text-[#286F6E] animate-pulse font-bold">$1</span>'
      );
    });
    return highlighted;
  };

  const personalInfo = [
    { label: "Name", value: statsRaw?.name },
    { label: "Address", value: statsRaw?.location || "Bungtod, Bogo City, Cebu" },
    { label: "Email", value: statsRaw?.email || "edisannico@gmail.com" },
    { label: "Phone", value: statsRaw?.contact || "+63 9929770266" },
    { label: "Website", value: "www.edisannico.dev" },
    { label: "Freelance", value: statsRaw?.availability || "Available" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen p-4 sm:p-8 md:p-12 lg:p-20 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 md:h-32 md:w-32 border-b-4 border-[#286F6E]"></div>
            <div className="animate-ping absolute inset-0 rounded-full h-20 w-20 md:h-32 md:w-32 border border-[#286F6E] opacity-20"></div>
          </div>
          <p className="mt-6 text-lg md:text-xl text-gray-800 font-medium animate-pulse">Loading amazing 3D content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 sm:p-8 md:p-12 lg:p-20 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">😵</div>
          <p className="text-lg md:text-xl text-red-600 font-semibold">Oops! Something went wrong</p>
          <p className="text-sm text-red-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE] text-gray-900 relative overflow-hidden" id={id}>
      {/* 3D Background Scene */}
      <ThreeJSScene mousePosition={mousePosition} />
      
      {/* Gradient Overlay */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-gray-50/90 via-white/80 to-gray-100/90 z-1"
        style={{ 
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(40, 111, 110, 0.1) 0%, rgba(255,255,255,0.9) 50%)`
        }}
      />

      <div className="relative z-10 p-4 sm:p-8 md:p-12 lg:p-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div 
            ref={heroRef}
            className={`text-center mb-8 md:mb-12 lg:mb-16 px-4 md:px-32 lg:px-60 transition-all duration-1000 ${
              visibleElements.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)` }}
          >
            <h2 className="text-[#286F6E] text-base md:text-lg font-medium mb-2 md:mb-4 animate-fade-in-up delay-200">
              {aboutPageRaw?.subTitle}
            </h2>
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-[#c0c0c0] via-[#1c2421] to-[#000] bg-clip-text text-transparent animate-fade-in-up delay-400"
              style={{ 
                textShadow: '0 0 30px rgba(40, 111, 110, 0.3)',
                transform: `translateZ(20px)`
              }}
              dangerouslySetInnerHTML={{
                __html: highlightTechKeywords(aboutPageRaw?.title || 'A Passionate Developer Who Loves to Code'),
              }}
            />
          </div>
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px] lg:min-h-[700px]">
            
            {/* Image Section with 3D Effects */}
            <div 
              className={`flex flex-col items-center lg:items-start space-y-4 md:space-y-6 transition-all duration-1200 delay-200 ${
                visibleElements.has('hero') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{ 
                transform: `perspective(1000px) rotateY(${mousePosition.x * 0.02}deg) translateZ(10px)` 
              }}
            >
              <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-lg mx-auto lg:mx-0 h-[400px] md:h-[500px] lg:h-[700px] group">
                <div className="relative w-full h-full transform transition-transform duration-700 hover:scale-105">
                  
                  {/* Main Profile Image with 3D depth */}
                  <div 
                    className="absolute top-0 right-0 w-48 md:w-64 lg:w-96 h-60 md:h-80 lg:h-[480px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform transition-all duration-500 hover:shadow-3xl hover:border-[#286F6E] group-hover:rotate-1"
                    style={{ 
                      transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg) translateZ(30px)`,
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <Image
                      src={getGoogleDriveImageUrl(aboutPageRaw?.image ?? '1h-V-40I3DzAKLIOp9XG--_qQfrlpCOyy')}
                      alt="Profile"
                      width={384}
                      height={480}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Secondary Image with enhanced 3D effect */}
                  <div 
                    className="absolute bottom-4 md:bottom-8 left-0 w-40 md:w-52 lg:w-72 h-48 md:h-64 lg:h-96 bg-gradient-to-br from-[#286F6E] to-[#1a4a49] rounded-3xl overflow-hidden shadow-xl border-4 border-white transform transition-all duration-700 hover:scale-105 group-hover:-rotate-2"
                    style={{ 
                      transform: `perspective(1000px) rotateX(${-mousePosition.y * 0.015}deg) rotateY(${-mousePosition.x * 0.015}deg) translateZ(20px)`,
                      boxShadow: '0 20px 40px -12px rgba(40, 111, 110, 0.6)'
                    }}
                  >
                    <Image
                      src={getGoogleDriveImageUrl(aboutPageRaw?.image ?? '')}
                      alt="Profile Secondary" 
                      width={384}
                      height={480}
                      className="w-full h-full object-cover opacity-80 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40"></div>
                  </div>

                  {/* Years Experience Card with 3D depth */}
                  <div 
                    className="absolute bottom-2 md:bottom-4 right-4 md:right-12 lg:right-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-2xl border-4 border-white transform transition-all duration-500 hover:scale-110 hover:rotate-3 group-hover:shadow-3xl"
                    style={{ 
                      transform: `perspective(500px) rotateX(${-mousePosition.y * 0.01}deg) rotateY(${-mousePosition.x * 0.01}deg) translateZ(35px)`,
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div className="text-center">
                      <div className="text-xl md:text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-[#00c299] to-white bg-clip-text mb-1 animate-pulse">{experienceYears}</div>
                      <div className="text-xs md:text-sm lg:text-base font-medium text-gray-300">Successful<br/>Years</div>
                    </div>
                  </div>

                  {/* Additional floating 3D elements */}
                  <div 
                    className="absolute bottom-32 md:bottom-52 right-2 w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg animate-pulse hover:animate-bounce"
                    style={{ 
                      transform: `perspective(300px) translateZ(25px) rotateX(${mousePosition.y * 0.03}deg)`,
                      boxShadow: '0 10px 20px rgba(59, 130, 246, 0.5)'
                    }}
                  ></div>

                  <div 
                    className="absolute top-20 md:top-32 lg:top-40 left-4 md:left-8 w-14 md:w-18 lg:w-24 h-14 md:h-18 lg:h-24 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-gray-100 transform transition-all duration-500 hover:rotate-12 hover:scale-110 group-hover:shadow-2xl"
                    style={{ 
                      transform: `perspective(400px) rotateY(${mousePosition.x * 0.025}deg) translateZ(30px)`,
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <svg className="w-7 h-7 md:w-9 md:h-9 lg:w-12 lg:h-12 text-[#286F6E]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zM12 4.82L19.18 8 12 11.18 4.82 8 12 4.82zM4 10.18l7 3.5v7l-7-3.5v-7zm16 0v7l-7 3.5v-7l7-3.5z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section with 3D effects */}
            <div 
              className="flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-10"
              style={{ 
                transform: `perspective(1000px) rotateY(${-mousePosition.x * 0.01}deg) translateZ(10px)` 
              }}
            >
              
              {/* Bio Section */}
              <div 
                ref={bioRef}
                className={`transition-all duration-1000 delay-400 ${
                  visibleElements.has('bio') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transform: `translateZ(15px)`,
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900 bg-gradient-to-r from-[#286F6E] to-gray-700 bg-clip-text text-transparent">
                  My Bio
                </h3>
                <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed transform transition-all duration-500 hover:text-gray-800">
                  {aboutPageRaw?.description || 'I am a passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions and bringing ideas to life through clean, efficient code.'}
                </p>
              </div>

              {/* Personal Info Grid with 3D cards */}
              <div 
                ref={infoRef}
                className={`transition-all duration-1200 delay-600 ${
                  visibleElements.has('info') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
                  style={{ 
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 0.005}deg) rotateY(${mousePosition.x * 0.005}deg) translateZ(20px)`,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {personalInfo.map((info, index) => (
                    <div 
                      key={index} 
                      className={`
                        group p-4 md:p-6 lg:p-8 transition-all duration-500 hover:bg-gradient-to-r hover:from-[#286F6E]/10 hover:to-[#00c299]/10 cursor-pointer transform relative backdrop-blur-sm
                        ${index % 2 === 0 ? 'md:border-r border-gray-200 group-hover:border-transparent' : ''}
                      `}
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        transform: `translateZ(${index * 2}px)`,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div className="flex items-center space-x-3 md:space-x-4 group-hover:scale-105 transition-transform duration-300">
                        <div className="flex-1">
                          <div className="text-sm md:text-base text-gray-500 font-medium group-hover:text-[#286F6E] transition-colors duration-300">
                            {info.label}
                          </div>
                          <div className="text-base md:text-lg lg:text-xl text-gray-800 font-semibold group-hover:text-gray-900 transition-colors duration-300 truncate">
                            {info.value}
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#286F6E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  ))}
                </div>
                {/* Download CV Button with 3D effect - moved here below personal info */}
                <div 
                  className={`mt-8 flex justify-center lg:justify-start transition-all duration-1600 delay-1000 ${
                    visibleElements.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <a
                    href={aboutPageRaw?.cv_link || '#'}
                    className="group relative inline-flex items-center space-x-3 md:space-x-4 bg-gradient-to-r from-[#286F6E] to-[#00c299] text-white px-6 md:px-8 lg:px-12 py-3 md:py-4 lg:py-6 rounded-2xl font-bold text-base md:text-lg lg:text-xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-[#286F6E]/50 overflow-hidden"
                    style={{ 
                      transform: `perspective(600px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg) translateZ(25px)`,
                      boxShadow: '0 25px 50px -12px rgba(40, 111, 110, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {/* Button content */}
                    <span className="relative z-10">📄</span>
                    <span className="relative z-10 group-hover:text-yellow-100 transition-colors duration-300">Download CV</span>
                    <span className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00c299] to-[#286F6E] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    {/* Ripple effect on hover */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 group-hover:animate-ping transition-opacity duration-1000"></div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Statistics Cards with enhanced 3D effects */}
              

              {/* Download CV Button with 3D effect */}
            </div>
          </div>
        </div>
      </div>
      {/* Static Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 mt-12 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {[
            { label: 'Years Experience', value: experienceYears, color: 'from-blue-500 to-blue-600' },
            { label: 'Projects Done', value: projectsCount, color: 'from-green-500 to-green-600' },
            { label: 'Happy Clients', value: clientsCount, color: 'from-purple-500 to-purple-600' },
            { label: 'Companies', value: workExperienceCount, color: 'from-orange-500 to-orange-600' }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 flex flex-col items-center justify-center"
            >
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-base text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .delay-200 { animation-delay: 200ms; }
        .delay-400 { animation-delay: 400ms; }
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 70px -12px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
}