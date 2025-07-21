'use client'

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAboutPage } from '../hooks/useAboutPage';
import { getSocialIcon, getSocialColor } from './SocialIcons';

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data, loading, error } = useAboutPage();

  const statsRaw = data?.stats ? Object.values(data.stats)[0] as any : null;
  const linksRaw = data?.links ? Object.values(data.links) as any[] : [];

  const socialLinks = linksRaw?.map((link: any) => ({
    name: link.social,
    icon: getSocialIcon(link.social),
    url: link.link,
    color: `hover:${getSocialColor(link.social)}`
  })) || [];

  const navigationLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Works', href: '#works' },
    { name: 'Projects', href: '#notes' },
    { name: 'Testimonials', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  if (loading) {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded-lg w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-700 rounded-lg w-64 mx-auto"></div>
          </div>
        </div>
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">Footer information temporarily unavailable</p>
        </div>
      </footer>
    );
  }

  return (
    <motion.footer 
      className="bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#286F6E] mb-3 sm:mb-4">{statsRaw?.name || 'Edisan Nico'}</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Full-stack developer passionate about creating innovative solutions. 
              Specializing in modern web technologies and user experience.
            </p>
            <div className="flex flex-wrap gap-2 gap-y-1 sm:gap-3 sm:gap-y-1 md:gap-4 md:gap-y-2 justify-center sm:justify-start">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-all duration-300 ${social.color} p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-gray-800 hover:shadow-lg`}
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6">
                    {social.icon}
                  </div>
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-[#286F6E] transition-colors duration-300 text-sm block py-1"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Contact Info</h4>
            <div className="space-y-3">
                              <motion.div 
                  className="flex items-center space-x-3 text-gray-300 text-sm"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-4 h-4 text-[#286F6E]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>{statsRaw?.email || 'edisannico@gmail.com'}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 text-gray-300 text-sm"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-4 h-4 text-[#286F6E]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span>{statsRaw?.contact || '+63 9929770266'}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 text-gray-300 text-sm"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-4 h-4 text-[#286F6E]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>{statsRaw?.location || 'Bogo City, Cebu'}</span>
                </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Stay Updated</h4>
            <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
              Subscribe to get notified about new projects and updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#286F6E] focus:ring-1 focus:ring-[#286F6E] transition-colors duration-300"
                  required
                />
              </motion.div>
              <motion.button
                type="submit"
                className="w-full bg-[#286F6E] text-white px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg font-semibold hover:bg-[#1e5a58] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#286F6E] focus:ring-offset-2 focus:ring-offset-gray-900"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {isSubmitted ? 'Thank You!' : 'Subscribe'}
              </motion.button>
            </form>
            {isSubmitted && (
              <motion.p 
                className="text-green-400 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Thanks for subscribing!
              </motion.p>
            )}
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gray-800 mt-8 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <motion.p 
              className="text-gray-400 text-xs sm:text-sm text-center sm:text-left"
              whileHover={{ color: '#286F6E' }}
              transition={{ duration: 0.3 }}
            >
              © {new Date().getFullYear()} {statsRaw?.name || 'Edisan Nico'}. All rights reserved.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
} 