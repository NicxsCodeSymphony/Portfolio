'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useProjectPage } from '../hooks/useProjectPage'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type ProjectProps = { id?: string }

export default function Project({ id }: ProjectProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(1);



    const {data: allProjects, loading, error} = useProjectPage()

    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerPage(3);
            } else if (window.innerWidth >= 768) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(1);
            }
        };
        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    useEffect(() => {
        setCurrentPage(0);
    }, [itemsPerPage]);

    const totalPages = Math.ceil(allProjects.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const projects = allProjects.slice(startIndex, endIndex);

    const backgroundColors = ['#EEC052', '#286F6E', '#E74C3C', '#9B59B6', '#3498DB', '#E67E22'];
    const fallbackImages = ['/assets/crmc.png', '/assets/nico.png'];

    const getGoogleDriveImageUrl = (fileId: string) => {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
    };

    const getImageSource = (imageUrl: string, fallbackImage: string) => {
        if (!imageUrl) return fallbackImage;
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
        if (imageUrl.startsWith('/')) return imageUrl;
        if (/^[a-zA-Z0-9_-]+$/.test(imageUrl)) return getGoogleDriveImageUrl(imageUrl);
        return fallbackImage;
    };

    const animatePageChange = (newPage: number) => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentPage(newPage);
            setTimeout(() => {
                setIsAnimating(false);
            }, 150);
        }, 150);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) animatePageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) animatePageChange(currentPage + 1);
    };

    const goToPage = (pageIndex: number) => {
        if (pageIndex !== currentPage) animatePageChange(pageIndex);
    };

    

    const formatUrl = (url: string) => {
        if (!/^https?:\/\//i.test(url)) {
          return 'https://' + url;
        }
        return url;
      };

    return (
        <div className="min-h-screen w-full py-16 md:py-24 lg:py-32" id={id}>
            <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center px-4 md:px-16 lg:px-32 xl:px-56">
                <div>
                    <h1 className="text-[28px] md:text-[42px] lg:text-[50px] font-medium">My Latest Works</h1>
                    <p className="text-[14px] md:text-[18px] lg:text-[20px] mt-2">Perfect solution for digital experience</p>
                    <div className="inline-flex items-center bg-[#286F6E] text-white rounded-full px-4 py-2 shadow-md mt-4">
                        <span className="font-semibold text-[12px] md:text-[14px]">{allProjects.length} Total Projects</span>
                    </div>
                </div>

                <Link href="/projects" className="capitalize text-[#286F6E] font-semibold underline text-[14px] md:text-[16px] hover:text-[#1e5a59] transition-colors duration-300">
                    Explore more works
                </Link>
            </div>

            {/* Project Display */}
            <div className="mt-12 md:mt-16 lg:mt-20 scrollbar-hide pl-7 pr-16 md:pl-16 md:pr-16 lg:pl-24 lg:pr-32 xl:pr-56">
                <div className={`flex gap-16 md:gap-8 lg:gap-14 pb-4 transition-all duration-300 ${
                    isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`} style={{ width: 'max-content' }}>
                    {projects.map((project, index) => {
                        const backgroundColor = backgroundColors[(startIndex + index) % backgroundColors.length];
                        const fallbackImage = fallbackImages[index % fallbackImages.length];
                        const imageSource = getImageSource(project.image_url, fallbackImage);

                        return (
                            <div key={project.uid} className="h-[400px] w-[320px] md:h-[500px] md:w-[420px] lg:h-[536px] lg:w-[550px] rounded-[30px] md:rounded-[40px] lg:rounded-[50px] px-4 md:px-8 py-8 md:py-12 flex flex-col justify-between relative overflow-hidden flex-shrink-0 transition-all duration-300 cursor-pointer group"
                                style={{ backgroundColor }}>
                                <div className="absolute top-8 md:top-12 right-4 md:right-8 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                                    {project.project_url && (
                                        <a href={formatUrl(project.project_url)} target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 bg-white text-[#286F6E] rounded-full flex items-center justify-center hover:bg-[#286F6E] hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg">
                                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                    {project.github_url && (
                                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    )}
                                </div>

                                <div className="z-10">
                                    <h1 className="text-[20px] md:text-[28px] lg:text-[32px] font-semibold text-[#FFF5D8]">
                                        {project.type}
                                    </h1>
                                    <p className="text-[12px] md:text-[15px] lg:text-[16px] text-[#FFF5D8] mt-2">
                                        {project.title}
                                    </p>
                                </div>

                                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-[180px] h-[120px] md:w-[260px] md:h-[160px] lg:w-[300px] lg:h-[200px] rounded-xl overflow-hidden">
                                    <Image 
                                        src={imageSource} 
                                        alt={project.title} 
                                        width={300} 
                                        height={200} 
                                        className="object-cover w-full h-full" 
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex flex-col items-center">
                        <div className="flex space-x-2 mb-4">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button key={index} onClick={() => goToPage(index)} className={`w-3 h-3 rounded-full ${currentPage === index ? 'bg-[#286F6E]' : 'bg-gray-300 hover:bg-gray-400'}`}></button>
                            ))}
                        </div>

                        <div className="flex space-x-4">
                            <button onClick={handlePrevPage} disabled={currentPage === 0 || isAnimating} className={`p-2 rounded-full ${currentPage === 0 ? 'bg-gray-200 text-gray-400' : 'bg-[#286F6E] text-white hover:bg-[#1e5a59]'}`}><FaArrowLeft /></button>
                            <span className="text-sm">{currentPage + 1} of {totalPages}</span>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages - 1 || isAnimating} className={`p-2 rounded-full ${currentPage === totalPages - 1 ? 'bg-gray-200 text-gray-400' : 'bg-[#286F6E] text-white hover:bg-[#1e5a59]'}`}><FaArrowRight /></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
