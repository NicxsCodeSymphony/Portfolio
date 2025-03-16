// components/LoadingScreen.js
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 z-50">
      <div className="relative w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-blue-500 font-mono text-sm">Loading Experience... {progress}%</p>
      
      <div className="mt-16 flex items-center space-x-4">
        <div className="animate-pulse w-4 h-4 bg-blue-500 rounded-full"></div>
        <div className="animate-pulse w-4 h-4 bg-purple-500 rounded-full delay-100"></div>
        <div className="animate-pulse w-4 h-4 bg-pink-500 rounded-full delay-200"></div>
      </div>
    </div>
  );
}