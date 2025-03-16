// components/Navbar.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Define the type for the props
interface NavbarProps {
  activeSection: string; 
}

interface NavLink {
  name: string;
  href: string;
  id: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Track scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks: NavLink[] = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Music', href: '#music', id: 'music' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];
  
  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md py-2 shadow-lg' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="#hero" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              John Nico M. Edisan
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.id}
                href={link.href}
                className={`text-sm hover:text-blue-400 transition-colors relative ${
                  activeSection === link.id 
                    ? 'text-blue-500 font-medium' 
                    : 'text-gray-300'
                }`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                  e.preventDefault();
                  const element = document.querySelector(link.href);
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
          
          {/* Resume Button (Desktop) */}
          <div className="hidden md:block">
            <Link 
              href="#contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20"
              onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                e.preventDefault();
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({
                    behavior: 'smooth',
                  });
                }
              }}
            >
              Contact Me
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-200 hover:text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-gray-900/90 backdrop-blur-lg rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`text-sm py-2 px-3 rounded-md transition-colors ${
                    activeSection === link.id
                      ? 'bg-blue-900/50 text-blue-400 font-medium'
                      : 'text-gray-300 hover:bg-gray-800/50'
                  }`}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                    e.preventDefault();
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium text-center"
                onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                  e.preventDefault();
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }
                  setMobileMenuOpen(false);
                }}
              >
                Contact Me
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
