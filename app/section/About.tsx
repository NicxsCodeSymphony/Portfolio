'use client'

import { useAboutPage } from '../hooks/useAboutPage';
import { useEffect, useRef, useState } from 'react';
import { techKeywords } from '../utils/techKeywords';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import type { RefObject } from 'react';

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

function useIntersectionObserver(ref: RefObject<Element | null>, options: IntersectionObserverInit = {}) {
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

export default function About({id}: AboutProps) {
  const { data, loading, error } = useAboutPage();
  type AboutPageRaw = {
    title: string;
    subTitle: string;
    description: string;
    cv_link: string;
    image?: string;
  };
  type StatsRaw = {
    availability: string;
    client_count: number;
    contact: string;
    email: string;
    location: string;
    project_completed: number;
    work_stats: number;
    name?: string;
    website?: string;
  };
  const aboutPageRaw: AboutPageRaw | null = data?.aboutPage?.aboutPage ? Object.values(data.aboutPage.aboutPage)[0] as unknown as AboutPageRaw : null;
  const statsRaw: StatsRaw | null = data?.stats ? Object.values(data.stats)[0] as unknown as StatsRaw : null;

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
  const experienceYears = useCountUp(12, duration, animate && isStatsVisible);
  const projectsCount = useCountUp(parseInt(String(statsRaw?.project_completed ?? '15')), duration, animate && isStatsVisible);
  const clientsCount = useCountUp(parseInt(String(statsRaw?.client_count ?? '16')), duration, animate && isStatsVisible);
  const workExperienceCount = useCountUp(parseInt(String(statsRaw?.work_stats ?? '3')), duration, animate && isStatsVisible);

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
        '<span class="text-[#286F6E] animate-pulse">$1</span>'
      );
    });
    return highlighted;
  };

  const personalInfo = [
    { label: "Name", value: statsRaw?.name || "Edisan Nico" },
    { label: "Address", value: statsRaw?.location || "Bungtod, Bogo City, Cebu" },
    { label: "Email", value: statsRaw?.email || "edisannico@gmail.com" },
    { label: "Phone", value: statsRaw?.contact || "+63 9929770266" },
    { label: "Website", value: statsRaw?.website || "www.edisannico.dev" },
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
          <p className="mt-6 text-lg md:text-xl text-gray-800 font-medium animate-pulse">Loading amazing content...</p>
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
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 relative overflow-hidden"
      style={{ 
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(40, 111, 110, 0.03) 0%, transparent 50%)`
      }}
      id={id}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#286F6E] to-transparent rounded-full opacity-5 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-500 to-transparent rounded-full opacity-5 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400 to-transparent rounded-full opacity-3 animate-spin duration-[20000ms]"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-8 md:p-12 lg:p-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div 
            ref={heroRef}
            className={`text-center mb-8 md:mb-12 lg:mb-16 px-4 md:px-32 lg:px-60 transition-all duration-1000 ${
              visibleElements.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-[#286F6E] text-base md:text-lg font-medium mb-2 md:mb-4 animate-fade-in-up delay-200">
              {aboutPageRaw?.subTitle}
            </h2>
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-[#c0c0c0] via-[#000] to-gray-700 bg-clip-text text-transparent animate-fade-in-up delay-400"
              dangerouslySetInnerHTML={{
                __html: highlightTechKeywords(aboutPageRaw?.title || 'A Passionate Developer Who Loves to Code'),
              }}
            />
          </div>
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px] lg:min-h-[700px]">
            
            {/* Image Section with Enhanced Animations */}
            <div 
              className={`flex flex-col items-center lg:items-start space-y-4 md:space-y-6 transition-all duration-1200 delay-200 ${
                visibleElements.has('hero') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-lg mx-auto lg:mx-0 h-[400px] md:h-[500px] lg:h-[700px] group">
                <div className="relative w-full h-full transform transition-transform duration-700 hover:scale-105">
                  
                  {/* Main Profile Image */}
                  <div className="absolute top-0 right-0 w-48 md:w-64 lg:w-96 h-60 md:h-80 lg:h-[480px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform transition-all duration-500 hover:shadow-3xl hover:border-[#286F6E] group-hover:rotate-1">
                    <Image 
                      src={getGoogleDriveImageUrl(aboutPageRaw?.image ?? '')}
                      alt="Profile" 
                      width={384}
                      height={480}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Secondary Image with Enhanced Animation */}
                  <div className="absolute bottom-4 md:bottom-8 left-0 w-40 md:w-52 lg:w-72 h-48 md:h-64 lg:h-96 bg-gradient-to-br from-[#286F6E] to-[#1a4a49] rounded-3xl overflow-hidden shadow-xl border-4 border-white transform transition-all duration-700 hover:scale-105 group-hover:-rotate-2">
                    <Image 
                      src={getGoogleDriveImageUrl(aboutPageRaw?.image ?? '')}
                      alt="Profile Secondary" 
                      width={288}
                      height={384}
                      className="w-full h-full object-cover opacity-80 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40"></div>
                  </div>

                  {/* Animated Decorative Elements */}
                  <div className="absolute top-4 right-4 w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 bg-gradient-to-br from-[#286F6E] to-[#00c299] rounded-full shadow-lg flex items-center justify-center animate-bounce hover:animate-spin transition-all duration-300">
                    <svg className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>

                  {/* Floating Elements with Improved Animations */}
                  <div className="absolute bottom-32 md:bottom-52 right-2 w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg animate-pulse hover:animate-bounce"></div>

                  <div className="absolute top-20 md:top-32 lg:top-40 left-4 md:left-8 w-14 md:w-18 lg:w-24 h-14 md:h-18 lg:h-24 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-gray-100 transform transition-all duration-500 hover:rotate-12 hover:scale-110 group-hover:shadow-2xl">
                    <svg className="w-7 h-7 md:w-9 md:h-9 lg:w-12 lg:h-12 text-[#286F6E]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zM12 4.82L19.18 8 12 11.18 4.82 8 12 4.82zM4 10.18l7 3.5v7l-7-3.5v-7zm16 0v7l-7 3.5v-7l7-3.5z"/>
                    </svg>
                  </div>

                  {/* Years Experience Card with Enhanced Animation */}
                  <div className="absolute bottom-2 md:bottom-4 right-4 md:right-12 lg:right-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-2xl border-4 border-white transform transition-all duration-500 hover:scale-110 hover:rotate-3 group-hover:shadow-3xl">
                    <div className="text-center">
                      <div className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-1 animate-pulse">{experienceYears}</div>
                      <div className="text-xs md:text-sm lg:text-base font-medium text-gray-300">Successful<br/>Years</div>
                    </div>
                  </div>

                  {/* Additional Decorative Elements */}
                  <div className="absolute bottom-0 left-12 md:left-20 lg:left-32 w-16 md:w-20 lg:w-32 h-3 md:h-4 lg:h-5 bg-gradient-to-r from-[#286F6E] to-[#00c299] rounded-full shadow-lg animate-pulse"></div>
                  
                  <div className="absolute top-48 md:top-72 lg:top-96 right-8 md:right-16 lg:right-20 w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10 border-4 md:border-6 border-[#286F6E] rounded-full animate-ping"></div>

                  {/* Status Card */}
                  <div className="absolute bottom-8 md:bottom-16 lg:bottom-20 left-2 md:left-4 bg-white rounded-2xl p-3 md:p-4 lg:p-5 shadow-xl border border-gray-200 transform transition-all duration-500 hover:scale-105 hover:-rotate-3 group-hover:shadow-2xl">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <div className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-pulse">
                        <svg className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs md:text-sm lg:text-base font-semibold text-gray-900">Available</div>
                        <div className="text-[10px] md:text-xs lg:text-sm text-gray-500">For Projects</div>
                      </div>
                    </div>
                  </div>

                  {/* Grid Pattern */}
                  <div className="absolute top-16 md:top-24 lg:top-32 right-16 md:right-28 lg:right-40 grid grid-cols-3 gap-1 md:gap-2 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                    {[...Array(9)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-2 md:w-3 lg:w-4 h-2 md:h-3 lg:h-4 bg-[#286F6E] rounded-full animate-pulse" 
                        style={{ animationDelay: `${i * 200}ms` }}
                      ></div>
                    ))}
                  </div>

                  {/* More Floating Elements */}
                  <div className="absolute top-24 md:top-12 lg:top-16 left-6 md:left-12 lg:left-16 w-8 md:w-10 lg:w-14 h-8 md:h-10 lg:h-14 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '1s' }}></div>

                  <div className="absolute bottom-24 md:bottom-32 lg:bottom-40 right-16 md:right-28 lg:right-40 w-10 md:w-12 lg:w-16 h-10 md:h-12 lg:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg rotate-12 flex items-center justify-center transition-all duration-500 hover:rotate-45 hover:scale-110">
                    <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>

                  <div className="absolute top-64 md:top-80 lg:top-[400px] left-4 md:left-8 lg:left-12 w-3 md:w-4 lg:w-5 h-3 md:h-4 lg:h-5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full shadow-lg animate-ping"></div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-10">
              
              {/* Bio Section */}
              <div 
                ref={bioRef}
                className={`transition-all duration-1000 delay-400 ${
                  visibleElements.has('bio') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900 bg-gradient-to-r from-[#286F6E] to-gray-700 bg-clip-text text-transparent">
                  My Bio
                </h3>
                <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed transform transition-all duration-500 hover:text-gray-800">
                  {aboutPageRaw?.description || 'I am a passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions and bringing ideas to life through clean, efficient code.'}
                </p>
              </div>

              {/* Personal Info Grid */}
              <div 
                ref={infoRef}
                className={`transition-all duration-1200 delay-600 ${
                  visibleElements.has('info') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden backdrop-blur-sm bg-white/80">
                  {personalInfo.map((info, index) => (
                    <div 
                      key={index} 
                      className={`
                        group p-4 md:p-6 lg:p-8 transition-all duration-500 hover:bg-gradient-to-r  cursor-pointer transform relative
                        ${index % 2 === 0 ? 'md:border-r border-gray-200 group-hover:border-transparent' : ''}
                        ${(index === 0 || index === 1 || index === 4 || index === 5) ? '' : ''}
                      `}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex flex-col">
                        <div className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 md:mb-2  transition-colors duration-300 flex items-center gap-2">
                          {info.value}
                          {info.label === 'Address' && (
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.value)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 ml-2 transition-colors duration-200"
                              title="View on map"
                            >
                              <MapPin className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <div className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide  transition-colors duration-300">
                          {info.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download CV Button */}
              <div className="flex justify-center lg:justify-start">
                <a
                  href={aboutPageRaw?.cv_link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-3 bg-gradient-to-r from-[#286F6E] to-[#00c299] text-white px-8 md:px-10 lg:px-12 py-4 md:py-5 lg:py-6 rounded-2xl font-bold text-base md:text-lg lg:text-xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 transform hover:-translate-y-1"
                >
                  <span>Download CV</span>
                  <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 7h-2v4H9l3 3 3-3h-2V7zM15 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-5-6zM18 20H6V4h8.17L18 7.83V20z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div 
            ref={statsRef}
            className={`mt-16 md:mt-20 lg:mt-24 transition-all duration-1500 delay-800 ${
              visibleElements.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {[
                { value: projectsCount, label: "Projects Completed", gradient: "from-blue-500 to-purple-600" },
                { value: clientsCount, label: "Happy Clients", gradient: "from-green-500 to-teal-600" },
                { value: workExperienceCount, label: "Work Experience", gradient: "from-orange-500 to-red-600" },
                { value: experienceYears, label: "Years Experience", gradient: "from-[#286F6E] to-[#00c299]" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-3xl p-6 md:p-8 lg:p-10 text-center shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer backdrop-blur-sm bg-white/90"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-xs md:text-sm lg:text-base font-semibold uppercase tracking-wide group-hover:text-gray-800 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}