'use client'

import { useState } from 'react';
import { useAboutPage } from '../hooks/useAboutPage';
import { contactService, ContactFormData } from '../services/contact.service';
import { getSocialIcon, getBackgroundColor } from '../components/SocialIcons';

type ContactProps = {id?: string}

export default function Contact({id}: ContactProps){
    const { data, loading } = useAboutPage();
    
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{type: 'success' | null, message: string}>({
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
                    type: 'success',
                    message: response.message
                });
            }
        } catch (error) {
            console.log(error)
            setSubmitStatus({
                type: 'success',
                message: 'Failed to send message. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
        }
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
    
    return(
        <div className="min-h-screen w-full py-16 md:py-24 lg:py-32 bg-[#F5F5F5]" id={id}>
            
            {/* Header Section */}
            <div className="text-center px-4 md:px-8 mb-12 md:mb-20">
                <h1 className="text-[#0A2F3B] text-[32px] md:text-[60px] lg:text-[80px] font-bold mb-4 md:mb-6">
                    Get In Touch
                </h1>
                <p className="text-gray-600 text-[16px] md:text-[20px] lg:text-[24px] max-w-3xl mx-auto">
                    Let&apos;s work together to bring your ideas to life. I&apos;m always excited to take on new challenges.
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
                                <div className="flex flex-wrap gap-2 gap-y-1 sm:gap-3 sm:gap-y-1 md:gap-4 md:gap-y-2">
                                    {socialLinks.length > 0 ? (
                                        socialLinks.map((link, index) => {
                                            return (
                                                <a 
                                                    key={index}
                                                    href={link.link} 
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border border-gray-200 transition-colors duration-300 ${getBackgroundColor(link.social)} text-white`}
                                                    title={link.social}
                                                >
                                                    <div className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center">
                                                        {getSocialIcon(link.social)}
                                                    </div>
                                                </a>
                                            );
                                        })
                                    ) : (
                                        // Fallback social links if no data
                                        <></>
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
