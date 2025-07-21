'use client'

import { useState } from 'react';
import { useAboutPage } from '../hooks/useAboutPage';
import { contactService, ContactFormData } from '../services/contact.service';

type ContactProps = {id?: string}

export default function Contact({id}: ContactProps){
    const { data, loading, error } = useAboutPage();
    
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error' | null, message: string}>({
        type: null,
        message: ''
    });

    const statsData = data?.stats ? Object.values(data.stats)[0] : null;
    const socialLinks = data?.links ? Object.values(data.links) : [];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await contactService.sendMessage(formData);
            
            if (response.success) {
                setSubmitStatus({
                    type: 'success',
                    message: response.message
                });
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: response.message
                });
            }
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Failed to send message. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    
    const getSocialIcon = (socialName: string) => {
        const name = socialName.toLowerCase();
        
        if (name.includes('linkedin')) {
            return (
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            );
        } else if (name.includes('github')) {
            return (
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            );
        } else if (name.includes('twitter')) {
            return (
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
            );
        } else if (name.includes('instagram')) {
            return (
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            );
        } else if (name.includes('facebook')) {
            return (
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
                </svg>
            );
        }
        // Default icon for unknown social platforms
        return (
            <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
        );
    };

    // Get background color for social links
    const getSocialBgColor = (socialName: string) => {
        const name = socialName.toLowerCase();
        if (name.includes('linkedin')) return 'bg-blue-600 hover:bg-blue-700';
        if (name.includes('github')) return 'bg-gray-800 hover:bg-gray-900';
        if (name.includes('twitter')) return 'bg-blue-400 hover:bg-blue-500';
        if (name.includes('instagram')) return 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600';
        if (name.includes('facebook')) return 'bg-blue-700 hover:bg-blue-800';
        return 'bg-gray-600 hover:bg-gray-700'; // Default color
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full py-16 md:py-24 lg:py-32 bg-[#F5F5F5] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#286F6E] mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading contact information...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen w-full py-16 md:py-24 lg:py-32 bg-[#F5F5F5] flex items-center justify-center">
                <div className="text-center text-red-500">
                    <p className="text-lg">Error loading contact information: {error}</p>
                </div>
            </div>
        );
    }
    
    return(
        <div className="min-h-screen w-full py-16 md:py-24 lg:py-32 bg-[#F5F5F5]" id={id}>
            
            {/* Header Section */}
            <div className="text-center px-4 md:px-8 mb-12 md:mb-20">
                <h1 className="text-[#0A2F3B] text-[32px] md:text-[60px] lg:text-[80px] font-bold mb-4 md:mb-6">
                    Get In Touch
                </h1>
                <p className="text-gray-600 text-[16px] md:text-[20px] lg:text-[24px] max-w-3xl mx-auto">
                    Let's work together to bring your ideas to life. I'm always excited to take on new challenges.
                </p>
            </div>

            {/* Contact Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    
                    {/* Contact Form */}
                    <div className="order-2 lg:order-1">
                        <div className="rounded-2xl shadow-lg p-6 md:p-8 lg:p-10">
                            <h2 className="text-[#0A2F3B] text-[24px] md:text-[28px] lg:text-[32px] font-bold mb-6 md:mb-8">
                                Send Message
                            </h2>
                            
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Status Message */}
                                {submitStatus.type && (
                                    <div className={`p-4 rounded-xl ${
                                        submitStatus.type === 'success' 
                                            ? 'bg-green-100 text-green-700 border border-green-200' 
                                            : 'bg-red-100 text-red-700 border border-red-200'
                                    }`}>
                                        {submitStatus.message}
                                    </div>
                                )}

                                {/* Name and Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div>
                                        <label className="block text-gray-700 text-[14px] md:text-[16px] font-semibold mb-2">
                                            Your Name
                                        </label>
                                        <input 
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#286F6E] focus:border-transparent text-[14px] md:text-[16px]"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-[14px] md:text-[16px] font-semibold mb-2">
                                            Email Address
                                        </label>
                                        <input 
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#286F6E] focus:border-transparent text-[14px] md:text-[16px]"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-gray-700 text-[14px] md:text-[16px] font-semibold mb-2">
                                        Subject
                                    </label>
                                    <input 
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#286F6E] focus:border-transparent text-[14px] md:text-[16px]"
                                        placeholder="Project Discussion"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-gray-700 text-[14px] md:text-[16px] font-semibold mb-2">
                                        Message
                                    </label>
                                    <textarea 
                                        rows={6}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#286F6E] focus:border-transparent text-[14px] md:text-[16px] resize-none"
                                        placeholder="Tell me about your project..."
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 md:py-4 px-6 rounded-xl font-semibold text-[16px] md:text-[18px] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#286F6E] focus:ring-offset-2 ${
                                        isSubmitting 
                                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                            : 'bg-[#286F6E] text-white hover:bg-[#1f5a5a]'
                                    }`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="order-1 lg:order-2">
                        <div className="space-y-8 md:space-y-10">
                            
                            {/* Contact Info Cards */}
                            <div className="space-y-6">
                                
                                {/* Email */}
                                <div className="rounded-2xl shadow-lg p-6 md:p-8 flex items-start space-x-4">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#286F6E] rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-[#0A2F3B] text-[18px] md:text-[20px] lg:text-[22px] font-bold mb-2">Email</h3>
                                        <p className="text-gray-600 text-[14px] md:text-[16px] lg:text-[18px]">{statsData?.email || 'contact@yourname.com'}</p>
                                        <p className="text-gray-600 text-[14px] md:text-[16px] lg:text-[18px]">Available {statsData?.availability || 'Mon-Fri'}</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="rounded-2xl shadow-lg p-6 md:p-8 flex items-start space-x-4">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#EEC052] rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-[#0A2F3B] text-[18px] md:text-[20px] lg:text-[22px] font-bold mb-2">Phone</h3>
                                        <p className="text-gray-600 text-[14px] md:text-[16px] lg:text-[18px]">{statsData?.contact || '+1 (555) 123-4567'}</p>
                                        <p className="text-gray-600 text-[14px] md:text-[16px] lg:text-[18px]">Available for consultation</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="rounded-2xl shadow-lg p-6 md:p-8 flex items-start space-x-4">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#E74C3C] rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-[#0A2F3B] text-[18px] md:text-[20px] lg:text-[22px] font-bold mb-2">Location</h3>
                                        <p className="text-gray-600 text-[14px] md:text-[16px] lg:text-[18px]">{statsData?.location || 'Available worldwide'}</p>
                                        <p className="text-gray-600 text-[14px] md:text-[16px] lg:text-[18px]">Available for remote work</p>
                                    </div>
                                </div>

                            </div>

                            {/* Social Links */}
                            <div className="rounded-2xl shadow-lg p-6 md:p-8">
                                <h3 className="text-[#0A2F3B] text-[20px] md:text-[22px] lg:text-[24px] font-bold mb-6">Follow Me</h3>
                                <div className="flex space-x-4 flex-wrap gap-2">
                                    {socialLinks.length > 0 ? (
                                        socialLinks.map((link, index) => {
                                            return (
                                                <a 
                                                    key={index}
                                                    href={link.link} 
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${getSocialBgColor(link.social)}`}
                                                    title={link.social}
                                                    onClick={() => console.log('Clicked link:', link.link)}
                                                >
                                                    {getSocialIcon(link.social)}
                                                </a>
                                            );
                                        })
                                    ) : (
                                        // Fallback social links if no data
                                        <>
                                            <a href="#" className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
                                                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                </svg>
                                            </a>
                                            <a href="#" className="w-12 h-12 md:w-14 md:h-14 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors duration-300">
                                                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                </svg>
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
