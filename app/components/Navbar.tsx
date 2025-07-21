"use client"

import { useState, useEffect } from 'react';

export default function Navbar(){
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return(
        <>
            <div className={`fixed top-0 left-0 right-0 z-100 px-4 sm:px-8 md:px-16 lg:px-48 py-4 transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
            }`}>
                <div className="flex justify-between items-center h-12">
                    <h1 className="text-[22px] font" style={{fontFamily: 'Sarina, cursive'}}>Nicxs</h1>

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex justify-between items-center gap-[60px] uppercase text-[14px]">
                        <li><a href="#about" className="hover:text-[#286F6E] transition-colors">About</a></li>
                        <li><a href="#works" className="hover:text-[#286F6E] transition-colors">Work</a></li>
                        <li><a href="#notes" className="hover:text-[#286F6E] transition-colors">Projects</a></li>
                        <li><a href="#experience" className="hover:text-[#286F6E] transition-colors">Testimonials</a></li>
                        <li><a href="#contact" className="hover:text-[#286F6E] transition-colors">Contact</a></li>
                    </ul>
                    <p className="hidden lg:block text-[14px]">+63 9929770266</p>

                    {/* Hamburger Button */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden flex flex-col gap-1.5 p-2"
                    >
                        <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 h-screen w-[300px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="flex flex-col pt-24 px-8">
                    <ul className="flex flex-col gap-8 uppercase text-[16px]">
                        <li>
                            <a href="#about" 
                               className="hover:text-[#286F6E] transition-colors block py-2"
                               onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#works" 
                               className="hover:text-[#286F6E] transition-colors block py-2"
                               onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Work
                            </a>
                        </li>
                        <li>
                            <a href="#notes" 
                               className="hover:text-[#286F6E] transition-colors block py-2"
                               onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Projects
                            </a>
                        </li>
                        <li>
                            <a href="#experience" 
                               className="hover:text-[#286F6E] transition-colors block py-2"
                               onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Testimonials
                            </a>
                        </li>
                        <li>
                            <a href="#contact" 
                               className="hover:text-[#286F6E] transition-colors block py-2"
                               onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                    <p className="mt-8 text-[14px]">+63 9929770266</p>
                </div>
            </div>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}
        </>
    )
}