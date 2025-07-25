import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, Wifi } from 'lucide-react';

interface NoInternetProps {
  onRetry?: () => void;
}

const NoInternet: React.FC<NoInternetProps> = ({ onRetry }) => {
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [animationPhase, setAnimationPhase] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleRetry = async (): Promise<void> => {
    setIsRetrying(true);
    
    // Simulate retry delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (onRetry) {
      onRetry();
    }
    
    setIsRetrying(false);
  };

  const CloudSVG: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg
      viewBox="0 0 200 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 80c-16.569 0-30-13.431-30-30 0-16.569 13.431-30 30-30 4.5 0 8.765 1 12.598 2.792C69.5 12.5 80.5 5 93 5c17.673 0 32 14.327 32 32 0 2-.184 3.956-.536 5.852C132.716 44.571 140 52.694 140 62.5c0 10.77-8.73 19.5-19.5 19.5H50z"
        fill="currentColor"
        className="opacity-20"
      />
      <circle
        cx="100"
        cy="50"
        r="3"
        fill="currentColor"
        className="opacity-40"
      >
        <animate
          attributeName="opacity"
          values="0.4;0.8;0.4"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="110"
        cy="45"
        r="2"
        fill="currentColor"
        className="opacity-30"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.7;0.3"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="85"
        cy="55"
        r="2.5"
        fill="currentColor"
        className="opacity-35"
      >
        <animate
          attributeName="opacity"
          values="0.35;0.75;0.35"
          dur="1.8s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );

  const WaveAnimation: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full animate-pulse delay-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      <WaveAnimation />
      
      <div className="relative z-10 h-screen flex flex-col justify-center items-center text-center px-6">
        {/* Main Icon Container */}
        <div className="relative mb-8">
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 scale-150 animate-pulse"></div>
            
            {/* Main icon container */}
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full p-8 shadow-2xl border border-white/20 dark:border-slate-700/20">
              <div className="relative">
                <WifiOff 
                  size={64} 
                  className={`text-slate-600 dark:text-slate-300 transition-all duration-1000 ${
                    animationPhase === 0 ? 'scale-100 opacity-100' : 
                    animationPhase === 1 ? 'scale-110 opacity-80' : 'scale-95 opacity-90'
                  }`}
                />
                
                {/* Animated X mark */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-16 h-0.5 bg-red-500 rounded-full transform rotate-45 transition-all duration-500 ${
                    animationPhase === 1 ? 'scale-110' : 'scale-100'
                  }`}></div>
                  <div className={`absolute w-16 h-0.5 bg-red-500 rounded-full transform -rotate-45 transition-all duration-500 ${
                    animationPhase === 1 ? 'scale-110' : 'scale-100'
                  }`}></div>
                </div>
                
                {/* Signal waves */}
                <div className="absolute -top-2 -right-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`absolute w-4 h-4 border-2 border-slate-400 dark:border-slate-500 rounded-full transition-all duration-1000 ${
                        animationPhase === 2 ? 'scale-150 opacity-0' : 'scale-100 opacity-60'
                      }`}
                      style={{
                        animationDelay: `${i * 0.2}s`,
                        top: `${i * -8}px`,
                        right: `${i * -8}px`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating cloud */}
          <div className="absolute -top-20 -right-20 opacity-30">
            <CloudSVG className="w-32 h-20 text-slate-400 dark:text-slate-600" />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-md space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              No Internet Connection
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Oops! It looks like you&apos;re not connected to the internet. Please check your connection and try again.
            </p>
          </div>

          {/* Status indicators */}
          <div className="flex justify-center space-x-8 py-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Offline</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-50"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Connecting...</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-3 h-3 bg-green-400 rounded-full opacity-30"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Online</span>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            
            <div className="relative flex items-center space-x-3">
              {isRetrying ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Wifi className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              )}
              <span>
                {isRetrying ? 'Retrying...' : 'Try Again'}
              </span>
            </div>
          </button>

          {/* Help text */}
          <div className="mt-8 p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg border border-white/20 dark:border-slate-700/20">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <strong>Troubleshooting tips:</strong>
            </p>
            <ul className="text-xs text-slate-500 dark:text-slate-400 mt-2 space-y-1">
              <li>• Check your WiFi or mobile data connection</li>
              <li>• Try moving to a different location</li>
              <li>• Restart your router or device</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoInternet;