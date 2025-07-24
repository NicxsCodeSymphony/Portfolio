'use client';

import { useState } from 'react';
import { useContactPage } from '../hooks/useContactPage';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGlobe,
} from 'react-icons/fa';
import axios from 'axios';

type ContactProps = { id?: string };

export default function Contact({ id }: ContactProps) {
  const { data, loading } = useContactPage();
  const statsData = data[0];

  const iconMap = {
    linkedin: { icon: <FaLinkedin />, color: 'bg-[#0077B5]', hoverColor: 'hover:bg-[#005885]' },
    github: { icon: <FaGithub />, color: 'bg-[#333333]', hoverColor: 'hover:bg-[#1a1a1a]' },
    facebook: { icon: <FaFacebookF />, color: 'bg-[#1877F2]', hoverColor: 'hover:bg-[#166FE5]' },
    instagram: { icon: <FaInstagram />, color: 'bg-gradient-to-r from-[#E4405F] to-[#833AB4]', hoverColor: 'hover:from-[#D63384] hover:to-[#7209B7]' },
    twitter: { icon: <FaTwitter />, color: 'bg-[#1DA1F2]', hoverColor: 'hover:bg-[#0d8bd9]' },
    portfolio: { icon: <FaGlobe />, color: 'bg-[#286F6E]', hoverColor: 'hover:bg-[#1f5a5a]' },
  };

  type SocialType = keyof typeof iconMap;

  const icons = statsData?.social
    ? Object.values(statsData.social).map((social) => {
        const type = (social.social?.toLowerCase() as SocialType) || 'portfolio';
        return {
          name: social.social,
          url: social.link,
          ...iconMap[type] || iconMap['portfolio'],
        };
      })
    : [];

    console.log(icons)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [error, setError] = useState<boolean>(false)
  
  const handleSubmit = async () => {
    setSubmitting(true);
    setStatusMessage('');
    setError(false);
  
    const { name, email, subject, message } = formData;
  
    if (!name || !email || !subject || !message) {
      setStatusMessage('Please fill out all fields.');
      setError(true);
      setSubmitting(false);
      return;
    }
  
    try {
      const response = await axios.post('/api/send-email', {
        name,
        email,
        subject,
        message,
      });
  
      if (response.status === 200) {
        setStatusMessage('Your message was sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatusMessage(response.data?.error || 'Something went wrong. Please try again.');
        setError(true);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setStatusMessage(err.response?.data?.error || 'Failed to send. Please try again later.');
      } else if (err instanceof Error) {
        setStatusMessage(err.message || 'Failed to send. Please try again later.');
      } else {
        setStatusMessage('Failed to send. Please try again later.');
      }
      setError(true);
    }
  
    setSubmitting(false);
  };
  


  if (loading) {
    return (
      <div className="min-h-screen w-full py-24 bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#286F6E] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contact information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-24 bg-[#F5F5F5]" id={id}>
      {/* Header */}
      <div className="text-center px-4 md:px-8 mb-16">
        <h1 className="text-[#0A2F3B] text-4xl md:text-6xl font-bold mb-4">
          Get In Touch
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Let&apos;s work together to bring your ideas to life. I&apos;m always excited to take on new challenges.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <div className="rounded-2xl shadow-lg bg-white p-8 h-fit">
            <h2 className="text-[#0A2F3B] text-2xl font-bold mb-6">Send Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#286F6E] focus:border-transparent transition-all duration-200"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#286F6E] focus:border-transparent transition-all duration-200"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#286F6E] focus:border-transparent transition-all duration-200"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-[#286F6E] focus:border-transparent transition-all duration-200"
              />
              <button
  type="button"
  onClick={handleSubmit}
  disabled={submitting}
  className="w-full py-3 px-6 bg-[#286F6E] text-white font-semibold rounded-xl hover:bg-[#1f5a5a] transform hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
>
  {submitting ? 'Sending...' : 'Send Message'}
</button>

{statusMessage && (
  <p className={`text-sm mt-2 font-medium ${error ? 'text-red-500' : 'text-green-600'}`}>
    {statusMessage}
  </p>
)}

            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="rounded-2xl shadow-lg p-6 bg-white flex items-start space-x-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#286F6E] rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                <FaEnvelope />
              </div>
              <div className="flex-grow">
                <h3 className="text-[#0A2F3B] font-bold text-lg mb-1">Email</h3>
                <p className="text-gray-600 font-medium">{statsData?.personalInfo?.email}</p>
                <p className="text-gray-500 text-sm">{statsData?.personalInfo?.status}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="rounded-2xl shadow-lg p-6 bg-white flex items-start space-x-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#EEC052] rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                <FaPhoneAlt />
              </div>
              <div className="flex-grow">
                <h3 className="text-[#0A2F3B] font-bold text-lg mb-1">Phone</h3>
                <p className="text-gray-600 font-medium">{statsData?.personalInfo?.contact}</p>
                <p className="text-gray-500 text-sm">{statsData?.availability1}</p>
              </div>
            </div>

            {/* Location */}
            <div className="rounded-2xl shadow-lg p-6 bg-white flex items-start space-x-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#E74C3C] rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div className="flex-grow">
                <h3 className="text-[#0A2F3B] font-bold text-lg mb-1">Location</h3>
                <p className="text-gray-600 font-medium">{statsData?.personalInfo?.address}</p>
                <p className="text-gray-500 text-sm">{statsData?.availability2}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              {icons.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white w-14 h-14 rounded-full flex items-center justify-center text-lg ${social.color} ${social.hoverColor} transition-all duration-300 transform hover:scale-105`}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
