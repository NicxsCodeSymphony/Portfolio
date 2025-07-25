"use client"

import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiGit,
} from 'react-icons/si';

interface LoadingPageProps {
  onLoadingComplete: () => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [iconIndex, setIconIndex] = useState<number>(0);
  const [audioUnlocked, setAudioUnlocked] = useState<boolean>(false);

  const techIcons = [
    { icon: <SiReact size={20} />, position: 'top-8' },
    { icon: <SiJavascript size={20} />, position: 'top-12' },
    { icon: <SiTypescript size={20} />, position: 'top-16' },
    { icon: <SiNodedotjs size={20} />, position: 'top-20' },
    { icon: <SiHtml5 size={20} />, position: 'top-24' },
    { icon: <SiCss3 size={20} />, position: 'top-28' },
    { icon: <SiTailwindcss size={20} />, position: 'top-32' },
    { icon: <SiGit size={20} />, position: 'top-36' },
  ];

  // Unlock Tone.js AudioContext once on first user interaction
  useEffect(() => {
    const unlockAudio = async () => {
      await Tone.start();
      setAudioUnlocked(true);
      document.removeEventListener('pointerdown', unlockAudio);
    };
    document.addEventListener('pointerdown', unlockAudio);
    return () => document.removeEventListener('pointerdown', unlockAudio);
  }, []);

  const playStartupSound = () => {
    if (!audioUnlocked) return;
    const synth = new Tone.Synth({
      oscillator: { type: 'square' },
      envelope: { attack: 0.05, decay: 0.1, sustain: 0.2, release: 0.3 },
    }).toDestination();

    const melody = ['C4', 'E4', 'G4', 'B4'];
    const time = Tone.now();
    melody.forEach((note, index) => {
      synth.triggerAttackRelease(note, '8n', time + index * 0.25);
    });

    setTimeout(() => synth.dispose(), 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 4 + 2;
        if (next >= 100) {
          setIsComplete(true);
          playStartupSound();
          setTimeout(onLoadingComplete, 2000);
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [audioUnlocked, onLoadingComplete]);

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setIconIndex(prev => (prev + 1) % techIcons.length);
    }, 500);
    return () => clearInterval(iconInterval);
  }, []);

  const IconStaff: React.FC = () => (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative h-40 mb-8">
        {[0, 1, 2, 3, 4].map(line => (
          <div
            key={line}
            className="absolute w-full h-0.5 bg-black/30 dark:bg-white/30"
            style={{ top: `${20 + line * 20}px` }}
          />
        ))}
        <div className="absolute left-4 top-2 text-4xl text-black/80 dark:text-white/80">
          {"</>"}
        </div>
        <div className="absolute inset-0 overflow-hidden">
          {techIcons.map((item, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-1000 ease-in-out ${
                index <= Math.floor((progress / 100) * techIcons.length) ? 'opacity-100' : 'opacity-30'
              }`}
              style={{
                left: `${120 + index * 80}px`,
                transform: `translateX(${progress * 2}px)`,
                top: `${12 + (index % 5) * 16}px`
              }}
            >
              <div className={`transition-all duration-300 ${
                index === iconIndex ? 'text-black dark:text-blue-400 scale-125' : 'text-black dark:text-white'
              }`}>
                {item.icon}
              </div>
              {index === iconIndex && (
                <div className="absolute inset-0 text-xl text-black dark:text-blue-400 animate-ping">
                  {item.icon}
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          className="absolute top-0 w-0.5 bg-black dark:bg-gradient-to-b dark:from-blue-400 dark:to-purple-400 h-full transition-all duration-200 ease-out"
          style={{ left: `${120 + (progress / 100) * 560}px` }}
        >
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-black dark:bg-blue-400 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );

  const FloatingIcons: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-black/10 dark:text-white/10 animate-bounce font-mono"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            fontSize: `${12 + Math.random() * 8}px`
          }}
        >
          {['{', '}', '<', '>', '=', '()', '=>', '</>', ';;'][Math.floor(Math.random() * 9)]}
        </div>
      ))}
    </div>
  );

  if (isComplete) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 flex items-center justify-center z-50">
        <div className="text-center animate-fade-in">
          <div className="relative mb-6">
            <div className="text-8xl text-black dark:text-white animate-bounce">💻</div>
            <div className="absolute inset-0 text-8xl text-black/50 dark:text-blue-400/50 animate-ping">💻</div>
          </div>
          <h2 className="text-4xl font-bold text-black dark:text-white mb-2 animate-pulse">
            Ready to Deploy!
          </h2>
          <p className="text-gray-600 dark:text-blue-200 text-lg">
            Your codebase is live and humming...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 flex flex-col items-center justify-center z-50 p-4">
      <FloatingIcons />
      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-black/10 dark:bg-blue-500/20 rounded-full blur-2xl animate-pulse scale-150" />
            <div className="relative text-6xl">💻</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Compiling Your Portfolio
          </h1>
          <p className="text-gray-600 dark:text-blue-200 text-lg md:text-xl">
            Writing functions and styling components...
          </p>
        </div>

        <IconStaff />

        <div className="text-center space-y-6">
          <div className="w-full max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="text-black/80 dark:text-white/80 text-sm">Build Progress</span>
              <span className="text-black/80 dark:text-white/80 text-sm">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-black dark:bg-gradient-to-r dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse" />
                <div className="absolute right-0 top-0 w-6 h-full bg-white/50 blur-sm" />
              </div>
            </div>
          </div>

          <div className="text-black/60 dark:text-white/60 text-base font-mono">
            {progress < 30 && "🛠️ Setting up the development environment..."}
            {progress >= 30 && progress < 60 && "📦 Installing dependencies..."}
            {progress >= 60 && progress < 90 && "🔧 Compiling modules..."}
            {progress >= 90 && "🚀 Launching the application..."}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
