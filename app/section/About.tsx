'use client'

import { useAboutPage } from '../hooks/useAboutPage';
import { useEffect, useRef, useState } from 'react';
import { techKeywords } from '../utils/techKeywords';
import Image from 'next/image';

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
      setCount(Math.floor(progress * target));
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

export default function About({id}: AboutProps) {
  const { data, loading, error } = useAboutPage();
  const aboutPageRaw = data?.aboutPage?.aboutPage ? Object.values(data.aboutPage.aboutPage)[0] as any : null;
  const statsRaw = data?.stats ? Object.values(data.stats)[0] as any : null;

  const getGoogleDriveImageUrl = (fileId: string) => {
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
        '<span class="text-[#286F6E]">$1</span>'
      );
    });
    return highlighted;
  };

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (!loading && !error) setAnimate(true);
  }, [loading, error]);

  const duration = 3000;
  const experienceYears = useCountUp(12, duration, animate);

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
      <div className="min-h-screen p-4 sm:p-8 md:p-12 lg:p-20 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#286F6E]"></div>
          <p className="mt-4 text-lg text-gray-800">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 sm:p-8 md:p-12 lg:p-20 flex items-center justify-center bg-white">
        <div className="text-center text-red-500">
          <p className="text-lg">Error loading data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 sm:p-8 md:p-12 lg:p-20 transition-opacity duration-700" style={{ opacity: animate ? 1 : 0 }} id={id}>
      <div className="max-w-7xl mx-auto">
        
        <div className="hidden lg:block text-center mb-12 px-60">
          <h2 className="text-[#286F6E] text-lg font-medium mb-4">
            {aboutPageRaw?.subTitle}
          </h2>
          <h1
            className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight"
            dangerouslySetInnerHTML={{
              __html: highlightTechKeywords(aboutPageRaw?.title || 'A Passionate Developer Who Loves to Code'),
            }}
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center min-h-[600px]">
          <div className="flex flex-col items-center lg:items-start space-y-6 order-1 lg:order-1">
            <div className="relative w-full max-w-md mx-auto lg:mx-0 h-[600px]">
              <div className="relative w-full h-full">
                
                <div className="absolute top-0 right-0 w-80 h-96 bg-gray-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20">
                  <Image 
                    src={getGoogleDriveImageUrl(aboutPageRaw?.image)}
                    alt="Profile" 
                    width={320}
                    height={384}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute bottom-8 left-0 w-64 h-80 bg-gradient-to-br from-[#286F6E] to-[#1a4a49] rounded-3xl overflow-hidden shadow-xl border-4 border-white z-10">
                  <Image 
                    src={getGoogleDriveImageUrl(aboutPageRaw?.image)}
                    alt="Profile Secondary" 
                    width={256}
                    height={320}
                    className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
                </div>

                <div className="absolute top-4 right-4 w-16 h-16 bg-[#286F6E] rounded-full shadow-lg z-30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>


                <div className="absolute bottom-52 right-2 w-8 h-8 bg-blue-500 rounded-full shadow-lg z-30"></div>

                <div className="absolute top-36 left-8 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-gray-100 z-30">
                  <svg className="w-10 h-10 text-[#286F6E]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zM12 4.82L19.18 8 12 11.18 4.82 8 12 4.82zM4 10.18l7 3.5v7l-7-3.5v-7zm16 0v7l-7 3.5v-7l7-3.5z"/>
                  </svg>
                </div>

                <div className="absolute bottom-4 right-12 bg-gray-900 text-white rounded-2xl p-6 shadow-2xl z-30 border-4 border-white">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{experienceYears}</div>
                    <div className="text-sm font-medium text-gray-300">Successful<br/>Years</div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-24 w-24 h-3 bg-[#286F6E] rounded-full shadow-lg z-15"></div>
                
                <div className="absolute top-72 right-16 w-6 h-6 border-4 border-[#286F6E] rounded-full z-25"></div>

                <div className="absolute bottom-14 left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-200 z-35 transform -rotate-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Available</div>
                      <div className="text-xs text-gray-500">For Projects</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-28 right-32 grid grid-cols-3 gap-2 z-5">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-[#286F6E] rounded-full opacity-30"></div>
                  ))}
                </div>

                <div className="absolute top-10 left-12 w-10 h-10 bg-purple-500 rounded-full shadow-lg z-30"></div>

                <div className="absolute bottom-29 right-32 w-14 h-14 bg-yellow-400 rounded-2xl shadow-lg z-30 rotate-12 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>

                <div className="absolute top-80 left-8 w-4 h-4 bg-red-500 rounded-full shadow-lg z-30"></div>

              </div>
            </div>
          </div>

          <div className="text-left mb-5 order-2 lg:hidden mt-10">
            <h2 className="text-[#286F6E] text-lg font-medium mb-4">
              {aboutPageRaw?.subTitle}
            </h2>
            <h1
              className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight"
              dangerouslySetInnerHTML={{
                __html: highlightTechKeywords(aboutPageRaw?.title || 'A Passionate Developer Who Loves to Code'),
              }}
            />
          </div>

          <div className="flex flex-col justify-center space-y-8 order-3 lg:order-2">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">My Bio</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {aboutPageRaw?.description || 'I am a passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions and bringing ideas to life through clean, efficient code.'}
              </p>
            </div>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                {personalInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className={`
                      group p-4 md:p-6 transition-all duration-300 hover:bg-gray-50 hover:shadow-md cursor-pointer
                      ${index % 2 === 0 && 'md:border-r border-gray-200'}
                      ${index < personalInfo.length - 1 && 'border-b md:border-b-0 border-gray-200 md:border-b-0'}
                    `}
                  >
                    <div className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2 group-hover:text-[#286F6E] transition-colors duration-300">
                      {info.value}
                    </div>
                    <div className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {info.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <a
                href={aboutPageRaw?.cv_link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#286F6E] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#00c299] transition-colors duration-300 shadow-lg"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-[#286F6E] mb-2">
                {statsRaw?.project_completed || '15'}
              </div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                Projects Completed
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-[#286F6E] mb-2">
                {statsRaw?.client_count || '16'}
              </div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                Happy Clients
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-[#286F6E] mb-2">
                {statsRaw?.work_stats || '3'}
              </div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                Work Experience
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-[#286F6E] mb-2">
                {experienceYears}
              </div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}