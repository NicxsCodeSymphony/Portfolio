"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface Track {
  id: string;
  videoId: string;
  image?: string;
  title?: string;
  description?: string;
  duration: string;
  youtubeAudioUrl?: string;  
}


export default function MusicSection() {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const response = await fetch('/api/tracks');
      const data = await response.json();
      setTracks(data);
    };

    fetchTracks();
  }, []);
  
  const audioRef = useRef<YT.Player | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const progressInterval = useRef<number | null>(null);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      
      if (firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
  
      window.onYouTubeIframeAPIReady = fetchVideoDetails;
    } else {
      fetchVideoDetails();
    }
  }, []);
  
  const fetchVideoDetails = async () => {
    const updatedTracks = [...tracks];
    
    for (let i = 0; i < updatedTracks.length; i++) {
      const track = updatedTracks[i];
      const videoId = track.youtubeAudioUrl?.split('v=')[1]?.split('&')[0] || 'defaultVideoId';
      
      const tempDiv = document.createElement('div');
      tempDiv.id = `temp-player-${i}`;
      tempDiv.style.display = 'none';
      document.body.appendChild(tempDiv);
      
      const tempPlayer = new (window as any).YT.Player(`temp-player-${i}`, {
        height: "0",
        width: "0",
        videoId: videoId,
        events: {
          onReady: (event: YT.PlayerEvent) => {
            const player = event.target as YT.Player & { getVideoData?: () => { title: string } };
      
            const duration: number = player.getDuration();
            const title: string = player.getVideoData?.().title ?? "Unknown Title";
      
            updatedTracks[i].duration = formatTime(duration);
            updatedTracks[i].title = title;
            setTracks([...updatedTracks]);
      
            event.target.destroy();
            document.body.removeChild(tempDiv);
          },
        },
      });
      
    }
  }
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      progressInterval.current = window.setInterval(() => {
        if (
          audioRef.current &&
          "getCurrentTime" in audioRef.current &&
          "getDuration" in audioRef.current
        ) {
          const currentTime = (audioRef.current as YT.Player).getCurrentTime();
          const duration = (audioRef.current as YT.Player).getDuration();
          setTrackProgress(currentTime);
          setTrackDuration(duration);
        }
      }, 1000);
    }
  
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);
  
  const handlePlayTrack = (track: Track) => {
    if (activeTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
      if (audioRef.current) {
        if (isPlaying) {
          (audioRef.current as YT.Player).pauseVideo();
        } else {
          (audioRef.current as YT.Player).playVideo();
        }
      }
    } else {
      setActiveTrack({
        ...track,
        id: String(track.id),
        image: track.image || "default-image.jpg",
        title: track.title || "Unknown Title",
        duration: track.duration || "0:00",
      });
      
  
      setIsPlaying(true);
      setTrackProgress(0);
  
      if (audioRef.current) {
        (audioRef.current as YT.Player).destroy();
      }
  
      if (!(window as any).YT) {
        loadYouTubeAPI(() => createPlayer(track)); // Load API only once
      } else {
        createPlayer(track);
      }
    }
  };
  
  
  const loadYouTubeAPI = (callback: () => void) => {
    if ((window as any).YT) {
      callback();
      return;
    }
    
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  
    (window as any).onYouTubeIframeAPIReady = callback;
  };
  
  
  
  const createPlayer = (track: { videoId: string }) => {
    audioRef.current = new (window as any).YT.Player("youtube-audio-player", {
      height: "0",
      width: "0",
      videoId: track.videoId, // Use track.videoId
      playerVars: {
        autoplay: 1,
        controls: 0,
      },
      events: {
        onStateChange: (event: { data: number }) => {
          switch (event.data) {
            case (window as any).YT.PlayerState.PLAYING:
              setIsPlaying(true);
              break;
            case (window as any).YT.PlayerState.PAUSED:
            case (window as any).YT.PlayerState.ENDED:
              setIsPlaying(false);
              if (event.data === (window as any).YT.PlayerState.ENDED) {
                setActiveTrack(null);
                setTrackProgress(0);
              }
              break;
            default:
              break;
          }
        },
      },
    });
  };
  

  
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && progressRef.current && trackDuration > 0) {
      const rect = progressRef.current.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      const seekTime = position * trackDuration;
  
      audioRef.current.seekTo(seekTime, true);
      setTrackProgress(seekTime);
    }
  };
  
  
  // Animation variants for scroll animations
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Generate soundwave pattern for visualization
  const generateSoundwave = () => {
    const numBars = 40;
    const bars = [];
    
    for (let i = 0; i < numBars; i++) {
      // Random height between 20% and 100%
      const height = 20;
      bars.push(
        <div 
          key={i}
          className={`w-1 bg-blue-500 mx-px rounded-full transition-all duration-200 ${isPlaying ? 'animate-soundwave' : ''}`}
          style={{ 
            height: `${height}%`,
            animationDelay: `${i * 0.05}s`
          }}
        />
      );
    }
    
    return bars;
  };
  
  return (
    <motion.section 
      id="music" 
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div id="youtube-audio-player" className="hidden"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 md:mb-16 text-center"
          variants={itemVariants}
        >
          My <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Music</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Latest Tracks</h3>
            
            {activeTrack && (
              <motion.div 
                className="bg-gray-800/80 backdrop-blur-md rounded-xl p-4 sm:p-6 mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                    <img 
                      src={activeTrack.image} 
                      alt={activeTrack.title} 
                      className={`w-full h-full object-cover rounded-md ${isPlaying ? 'pulse-animation' : ''}`}
                    />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-semibold text-base sm:text-lg truncate">{activeTrack.title}</h4>
                  </div>
                  <button 
                    className="ml-auto bg-blue-600 hover:bg-blue-700 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors"
                    onClick={() => handlePlayTrack(activeTrack)}
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                
                <div className="mb-2 h-8 sm:h-10 md:h-12 flex items-center">
                  <div 
                    className="flex-1 h-full flex items-center justify-between cursor-pointer overflow-hidden rounded-lg bg-gray-700/50 relative"
                    ref={progressRef}
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="absolute h-full bg-blue-500/30 z-0 pointer-events-none"
                      style={{ width: `${(trackProgress / trackDuration) * 100}%` }}
                    ></div>
  
                    <div className="flex items-end h-full w-full px-2 py-1 relative">
                      {generateSoundwave()}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{formatTime(trackProgress)}</span>
                  <span>{activeTrack.duration}</span>
                </div>
              </motion.div>
            )}
            
            <div className="space-y-3 sm:space-y-4">
              {tracks.map((track) => (
                <motion.div 
                  key={track.id}
                  className={`bg-gray-800/70 rounded-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4 transition-all duration-300 hover:bg-gray-700/70 ${
                    activeTrack?.id === String(track.id) ? 'border-l-4 border-blue-500 pl-2 sm:pl-3' : ''
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div 
                    className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 relative group cursor-pointer"
                    onClick={() => {
                     const videoId = track.youtubeAudioUrl?.split('v=')[1]?.split('&')[0] || 'defaultVideoId';
                      handlePlayTrack({
                        id: String(track.id),
                        videoId: videoId,  // Add the videoId correctly
                        image: track.image,
                        title: track.title,
                        description: track.description,
                        duration: track.duration,
                      });
                    }}
                  >
                    <img 
                      src={track.image || "/placeholder.jpg"}  
                      alt={track.title || "Untitled Track"}  
                      className={`w-full h-full object-cover rounded-md transition-all duration-300 ${
                        activeTrack?.id === String(track.id) && isPlaying ? 'pulse-animation' : ''
                      }`}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                      <button className="text-white">
                        {activeTrack?.id === String(track.id) && isPlaying ? (
                          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
  
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base truncate">{track.title || "Unknown Title"}</h4>
                    <p className="text-xs sm:text-sm text-gray-400 truncate">{track.description || "No description available"}</p>
                  </div>
  
                  <div className="text-xs sm:text-sm text-gray-400 flex-shrink-0">{track.duration || "--:--"}</div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="mt-6 sm:mt-8"
              variants={itemVariants}
            >
              <a 
                href="#" 
                className="inline-flex items-center text-blue-400 hover:text-blue-500 text-sm sm:text-base"
              >
                View all tracks
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-8 lg:mt-0">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Music & Development</h3>
            <motion.div 
              className="bg-gray-800/70 backdrop-blur-sm rounded-lg p-4 sm:p-6"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                My journey as both a musician and developer has led me to explore the fascinating intersection between sound and code. I'm passionate about creating digital experiences that bridge these two worlds.
              </p>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                From developing audio visualization tools to creating interactive music applications, I leverage my dual expertise to build unique projects that push the boundaries of web technology and sound design.
              </p>
              <p className="text-gray-300 mb-6 text-sm sm:text-base">
                Interested in collaborating on a project that combines music and technology? Let's create something amazing together.
              </p>
              <motion.a 
                href="#contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-md transition-colors duration-300 inline-block text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .pulse-animation {
          animation: pulse 2s infinite ease-in-out;
        }
        
        @keyframes soundwave {
          0% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
          100% { transform: scaleY(0.3); }
        }
        .animate-soundwave {
          animation: soundwave 1.2s infinite ease-in-out;
        }
      `}</style>
    </motion.section>
  );
}