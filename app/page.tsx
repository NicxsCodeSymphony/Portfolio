'use client';

import { useEffect, useState } from "react";
import Hero from "./sections/Hero";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Work from "./sections/Work";
import Project from "./sections/Project";
import Testimonial from "./sections/Testimonials";
import Contact from "./sections/Contact";
import NoInternet from "./components/NoInternet";
import LoadingPage from "./components/Loading";
import Footer from "./components/Footer";

export default function Home() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resourcesLoaded, setResourcesLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const checkResourcesLoaded = () => {
      if (document.readyState === 'complete') {
        const images = document.querySelectorAll('img');
        const imagePromises = Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = resolve;
            setTimeout(resolve, 10000);
          });
        });

        const fontPromises = document.fonts ? document.fonts.ready : Promise.resolve();

        Promise.all([...imagePromises, fontPromises])
          .then(() => {
            setTimeout(() => {
              setResourcesLoaded(true);
            }, 500);
          })
          .catch(() => {
            setTimeout(() => {
              setResourcesLoaded(true);
            }, 1000);
          });
      } else {
        window.addEventListener('load', checkResourcesLoaded);
      }
    };

    const timer = setTimeout(checkResourcesLoaded, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', checkResourcesLoaded);
    };
  }, []);

  useEffect(() => {
    let pendingRequests = 0;
    const originalFetch = window.fetch;

    window.fetch = async (...args: Parameters<typeof fetch>) => {
      pendingRequests++;
      try {
        const response = await originalFetch(...args);
        pendingRequests--;
        return response;
      } catch (error) {
        pendingRequests--;
        throw error;
      }
    };

    const checkNetworkComplete = setInterval(() => {
      if (pendingRequests === 0 && resourcesLoaded) {
        setResourcesLoaded(true);
        clearInterval(checkNetworkComplete);
      }
    }, 100);

    return () => {
      window.fetch = originalFetch;
      clearInterval(checkNetworkComplete);
    };
  }, [resourcesLoaded]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (!isOnline) {
    return <NoInternet onRetry={handleRetry} />;
  }

  if (isLoading) {
    return <LoadingPage onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div>
        <Hero />
        <About />
        <Work />
        <Project />
        <Testimonial />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}