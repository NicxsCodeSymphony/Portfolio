"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function MobileNavLink({ href, onClick, children }) {
    return (
      <Link href={href}>
        <span className="block text-gray-300 hover:text-white py-2 cursor-pointer" onClick={onClick}>
          {children}
        </span>
      </Link>
    );
  }

  function NavLink({ href, children }) {
    return (
      <Link href={href}>
        <span className="text-gray-300 hover:text-white transition-colors relative group cursor-pointer">
          {children}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
        </span>
      </Link>
    );
  }
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 w-full z-20 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/90 backdrop-blur-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent cursor-pointer">
            John Nico M. Edisan
          </span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#music">Music</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-2">
          <div className="flex flex-col space-y-3">
            <MobileNavLink href="#about" onClick={() => setMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink href="#projects" onClick={() => setMenuOpen(false)}>Projects</MobileNavLink>
            <MobileNavLink href="#music" onClick={() => setMenuOpen(false)}>Music</MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => setMenuOpen(false)}>Contact</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
}


