'use client'

import { useAboutPage } from '../hooks/useAboutPage';
import { useEffect, useRef, useState } from 'react';
import { techKeywords } from '../utils/techKeywords';

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

  // Function to highlight tech keywords in the title
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
  const maxVal = Math.max(
    statsRaw?.project_completed || 0,
    statsRaw?.client_count || 0,
    statsRaw?.work_stats || 0
  );
  const projectCount = useCountUp(statsRaw?.project_completed || 0, duration, animate);
  const clientCount = useCountUp(statsRaw?.client_count || 0, duration, animate);
  const workStats = useCountUp(statsRaw?.work_stats || 0, duration, animate);

  if (loading) {
    return (
      <div className="min-h-screen p-4 sm:p-8 md:p-12 lg:p-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#286F6E]"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen p-4 sm:p-8 md:p-12 lg:p-20 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-lg">Error loading data: {error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-12 lg:p-20 transition-opacity duration-700" style={{ opacity: animate ? 1 : 0 }} id={id}>
      <div className="w-full h-full flex flex-col lg:flex-row gap-6 lg:gap-10">
        <div className="w-full lg:w-[45%]"></div>
        <div className="w-full lg:w-[55%] p-4 sm:p-6 md:p-8 lg:p-10 text-center lg:text-left">
          <h2 className="text-[16px] sm:text-[18px] font-medium">
            {aboutPageRaw?.subTitle || 'About Me'}
          </h2>
          <h1
            className={
              'mt-3 lg:mt-4 text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.2] lg:leading-[60px] uppercase w-full lg:w-[80%] mx-auto lg:mx-0'
            }
            dangerouslySetInnerHTML={{
              __html: highlightTechKeywords(aboutPageRaw?.title || 'I am available for full stack project'),
            }}
          />
          <p className="w-full lg:w-[80%] mt-5 lg:mt-7 text-[18px] sm:text-[20px] lg:text-[22px] mx-auto lg:mx-0">
            {aboutPageRaw?.description || 'Loading description...'}
          </p>
          <div className="lg:flex lg:justify-start lg:gap-20 mt-10 lg:mt-14">
            <div className="flex flex-col items-center gap-8 lg:hidden">
              <div className="w-full flex justify-center">
                <div className="text-center">
                  <h1 className="font-semibold text-[45px] sm:text-[55px]">
                    {projectCount}+
                  </h1>
                  <p className="">Project Completed</p>
                </div>
              </div>
              <div className="w-full flex justify-center gap-20 sm:gap-32">
                <div className="text-center">
                  <h1 className="font-semibold text-[45px] sm:text-[55px]">
                    {clientCount}+
                  </h1>
                  <p className="">Happy Clients</p>
                </div>
                <div className="text-center">
                  <h1 className="font-semibold text-[45px] sm:text-[55px]">
                    {workStats}
                  </h1>
                  <p className="">Work Experience</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex lg:gap-20">
              <div className="text-center lg:text-left">
                <h1 className="font-semibold text-[65px]">
                  {projectCount}+
                </h1>
                <p className="">Project Completed</p>
              </div>
              <div className="text-center lg:text-left">
                <h1 className="font-semibold text-[65px]">
                  {clientCount}+
                </h1>
                <p className="">Happy Clients</p>
              </div>
              <div className="text-center lg:text-left">
                <h1 className="font-semibold text-[65px]">
                  {workStats}
                </h1>
                <p className="">Work Experience</p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center lg:justify-start">
            <a
              href={aboutPageRaw?.cv_link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-20 lg:text-24 bg-[#D9D9D9] px-6 sm:px-8 lg:px-10 py-4 lg:py-5 mt-12 lg:mt-16 rounded-[10px] hover:bg-[#286F6E] hover:text-white transition-colors duration-300 inline-block"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}