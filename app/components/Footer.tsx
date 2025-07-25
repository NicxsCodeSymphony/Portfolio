'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useContactPage } from '../hooks/useContactPage';
import Image from 'next/image';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data } = useContactPage();

  const aboutData = data?.[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const navigationLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Works', href: '#works' },
    { name: 'Projects', href: '#notes' },
    { name: 'Testimonials', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const generateDriveURL = (id: string) =>
    `https://drive.google.com/thumbnail?id=${id}&sz=w32-h32`;

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

          {/* About / Brand */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#286F6E] mb-3">
              {aboutData?.personalInfo?.name || 'Edisan Nico'}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {aboutData?.description || "Let's build something great together."}
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-3">
              {aboutData?.social &&
                Object.values(aboutData.social).map((social: { i: string; social: string; icon: string }, index: number) => (
                  <motion.a
                    key={index}
                    href={social.i}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group p-2 rounded-full bg-gray-800 hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={generateDriveURL(social.icon)}
                      alt={social.social}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform duration-200 text-xs bg-gray-800 text-white px-2 py-1 rounded-md z-10">
                      {social.social}
                    </span>
                  </motion.a>
                ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
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
            <h4 className="text-lg font-semibold text-white mb-3">Contact Info</h4>
            <div className="text-gray-300 text-sm space-y-3">
              <p>Email: {aboutData?.personalInfo?.email || ''}</p>
              <p>Phone: {aboutData?.personalInfo?.contact || ''}</p>
              <p>Location: {aboutData?.personalInfo?.address || ''}</p>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-3">Stay Updated</h4>
            <p className="text-gray-300 text-sm">
              Subscribe to get notified about new projects and blog updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#286F6E] focus:ring-1 focus:ring-[#286F6E]"
                required
              />
              <motion.button
                type="submit"
                className="w-full bg-[#286F6E] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1e5a58] transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
          <p className="text-gray-400 text-xs text-center">
            © {new Date().getFullYear()} {aboutData?.personalInfo?.name}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
