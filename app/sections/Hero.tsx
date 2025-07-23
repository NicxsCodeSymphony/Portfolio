"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Music, Square, Mail, ExternalLink } from 'lucide-react';
import Nico from '../../assets/nico.png'
import Image from 'next/image';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMusicClick = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  };

  const handleAudioEnded = () => setIsPlaying(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">

      <section className="relative px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="px-0 sm:px-8 lg:px-12 2xl:px-36 mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mt-12 lg:mt-0">
            
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 z-10 relative text-left">
              <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm animate-pulse 2xl:text-base xl:text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></span>
                  Hello There!
                </span>
              </div>

              <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl font-bold leading-tight 2xl:text-[3rem]">
                  I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EEC052] to-[#FFD600] animate-gradient">Nico Edisan</span>,<br />
                  <span className="inline-block hover:scale-105 transition-transform duration-300">Web & App Developer</span><br />
                  <span className="text-gray-700">Based in the Philippines.</span>
                </h1>
              </div>

              <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg xl:text-base 2xl:text-xl leading-relaxed max-w-2xl">
                I&apos;m a dedicated developer who enjoys creating responsive websites and mobile apps that are both easy to use and visually appealing. As a recent graduate, I&apos;m excited to turn ideas into real projects using clean code and practical design. I&apos;m ready to build something great with you.
                </p>
              </div>

              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <button className="group bg-gradient-to-r from-[#286F6E] to-[#1e5a59] hover:from-[#1e5a59] hover:to-[#286F6E] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center">
                  <span>View my Resume</span>
                  <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="group border-2 border-[#286F6E] text-[#286F6E] px-6 py-3 rounded-full font-semibold bg-white hover:bg-[#286F6E] hover:text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center">
                  <span>Hire Me</span>
                  <Mail className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                </button>
              </div>

            </div>

            {/* Right Content - Visual Elements */}
            <div className="hidden lg:block relative h-[70vh] xl:h-[90vh]">
              
              {/* Animated Background Shape */}
              <div className={`absolute inset-0 transition-all duration-2000 delay-500 ${isVisible ? 'scale-100 opacity-70' : 'scale-90 opacity-0'}`}>
                <svg className="w-[60vw] h-[50vh] max-w-[700px] max-h-[500px] xl:w-[90vw] xl:h-[90vh] xl:max-w-[1200px] xl:max-h-[900px] animate-float absolute left-1/3 top-3/5 -translate-x-[40%] -translate-y-1/2" viewBox="0 0 900 900" fill="none">
                  <defs>
                    <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD600" stopOpacity="0.8"/>
                      <stop offset="50%" stopColor="#EEC052" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#FFD600" stopOpacity="0.4"/>
                    </linearGradient>
                  </defs>
                  <path 
                    d="M650 160Q820 320 650 520Q480 720 240 560Q0 400 240 225Q480 50 650 160Z" 
                    fill="url(#shapeGradient)"
                    className="animate-pulse"
                  />
                </svg>
              </div>

              {/* Profile Area Placeholder */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1500 delay-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="w-[28vw] h-[100vh] max-w-[320px] max-h-[400px] xl:w-[48vw] xl:h-[80vh] xl:max-w-[520px] xl:max-h-[720px] rounded-2xl flex items-center justify-center absolute top-[20px] right-[85px] overflow-hidden group">
                  <Image src={Nico} alt="Nico Edisan" fill className="w-full h-full rounded-2xl" />
                </div>
              </div>

              {/* Logo Badge */}
              <div className={`absolute top-16 right-12 sm:top-20 sm:right-16 lg:top-24 lg:right-20 transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#286F6E] to-[#1e5a59] rounded-full shadow-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl lg:text-2xl hover:scale-110 transition-transform duration-300 animate-bounce-slow">
                  CR
                </div>
              </div>

              {/* Web/App Developer Badge */}
              <div className={`absolute bottom-16 left-4 sm:bottom-20 sm:left-8 lg:bottom-24 lg:left-12 transition-all duration-1000 delay-1400 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                <div className="flex items-center space-x-2 group">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#286F6E] group-hover:rotate-45 transition-transform duration-500" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M8 24L24 8M8 8h16v16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  </svg>
                  <span className="bg-gradient-to-r from-[#286F6E] to-[#1e5a59] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    Web/App Developer
                  </span>
                </div>
              </div>

              {/* Backend Developer Badge */}
              <div className={`absolute top-32 right-4 sm:top-40 sm:right-8 lg:top-48 lg:right-12 transition-all duration-1000 delay-1600 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                <div className="flex items-center space-x-2 group">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 group-hover:rotate-45 transition-transform duration-500" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M8 24L24 8M8 8h16v16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  </svg>
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    Backend Developer
                  </span>
                </div>
              </div>

              {/* Interactive Music Button */}
              <div className={`absolute sm:top-32 left-8 3xl:top-32 3xl:left-12 transition-all duration-1000 delay-1800 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
                    <button
                      className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#286F6E] to-[#1e5a59] rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#286F6E]/30 group"
                      onClick={handleMusicClick}
                      title={isPlaying ? "Stop Music" : "Play Music"}
                    >
                      {isPlaying ? (
                        <Square className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                      ) : (
                        <Music className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                      )}
                      {isPlaying && (
                        <div className="absolute inset-0 rounded-full border-2 border-[#286F6E] animate-ping"></div>
                      )}
                    </button>
                    <audio 
                      ref={audioRef} 
                      onEnded={handleAudioEnded}
                      preload="auto"
                    >
                      <source src="/song.mp3" type="audio/mpeg" />
                    </audio>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className={`absolute bottom-8 right-8 sm:bottom-12 sm:right-12 transition-all duration-1000 delay-2000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-3 h-3 bg-[#286F6E] rounded-full animate-bounce"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '1s'
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-br from-[#EEC052] to-[#FFD600] rounded-full animate-float-random opacity-60"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-random {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(20px, -20px) rotate(120deg); }
          66% { transform: translate(-15px, 15px) rotate(240deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-random {
          animation: float-random 4s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .animate-float {
            animation-duration: 4s;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;