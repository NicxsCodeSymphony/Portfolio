import { Code, Palette, Smartphone, Globe, ArrowRight, Download, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { strapiAPI } from '../lib/strapi';
import { HeroSectionProps } from '../lib/types';

const HeroSection = ({data}: HeroSectionProps) => {
    if(!data){
        console.error("Hero Section data is undefined")
        return null;
    }

    const backgroundIcons = [
        { Icon: Code, position: 'top-20 left-20', delay: '0s' },
        { Icon: Palette, position: 'top-40 right-20', delay: '0.5s' },
        { Icon: Smartphone, position: 'bottom-40 left-16', delay: '1s' },
        { Icon: Globe, position: 'bottom-32 right-24', delay: '1.5s' },
        { Icon: Code, position: 'top-1/3 left-8', delay: '2s' },
        { Icon: Palette, position: 'top-1/4 right-8', delay: '2.5s' }
      ];

      const socialLinks = [
        { Icon: Github, href: '#', label: 'GitHub' },
        { Icon: Linkedin, href: '#', label: 'LinkedIn' },
        { Icon: Mail, href: '#', label: 'Email' },
        { Icon: Twitter, href: '#', label: 'Twitter' }
      ];

      return(
        <section className='relative min-h-screen bg-white overflow-hidden flex items-center justify-center'>
            <div className='absolute inset-0 pointer-events-none'>
                {backgroundIcons.map((item, index) => (
                    <div
                    key={index}
                    className={`absolute ${item.position} opacity-2 animate-pulse`}
                    style={{
                        animationDelay: item.delay,
                        animationDuration: '5s',
                    }}
                    >
                        <item.Icon size={32} className='text-gray-300' />
                    </div>
                ))}
            </div>

            <div className='relative z-10 container max-auto px-6 text-center'>
                <div className='max-w-4xl mx-auto'>
                    <div className='mb-8'>
                        
                        {/* Profile Image */}
                        <div className='w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-gray-50 to gray-100 shadow-xk overflow-hidden border-4 border-white'>
                            {data.profileImage && (
                                <img
                                src={strapiAPI.getMediaURL(data.profileImage?.formats?.medium || data.profileImage) || ''}
                                alt={data.profileImage?.alternativeText || 'Profile Image'}
                                className='w-full h-full object-cover'
                                ></img>
                            )}
                        </div>

                            {/* Hero Subtitle */}
                        <h2 className='text-lg font-medium text-gray-500 mb-3 tracking-wider uppercase'>
                            {data.subtitle}
                        </h2>

                            {/* Hero Title */}

                        <h1 className='text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight tracking-tight'>
                            {data.title}
                        </h1>

                            {/* Hero Description */}
                        
                        <p className='text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto font-light'>
                            {data.description}
                        </p>

                        {/* CTA Button */}
                        <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
                            {data.ctaButton?.map((button: any) => (
                                <a
                                key={button.id}
                                href={button.url}
                                className={`
                                    inline-flex items-center px-8 py-4 text-base font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                                    ${button.variant === 'primary' 
                                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                                    : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                    }
                                    `}
                                >
                                    {button.label}
                                    {button.variant === 'primary'
                                    ? <ArrowRight className='ml-2 h-5 w-5' />
                                    : <Download className='ml-2 h-5 w-5' />
                                    }
                                </a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className='flex justify-center space-x-6'>
                            {socialLinks.map((social, index) => (
                                <a
                                key={index}
                                href={social.href}
                                className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all duration-300 transform hover:scale-110"
                                aria-label={social.label}
                                >
                                    <social.Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            <div className='absolute left-1/2 transform -translate-x-1/2 animate-bounce'>
                <div className='w-5 h-8 border border-gray-300 rounded-full flex justify-center'>
                    <div className='w-0.5 h-2 bg-gray-400 rounded-full mt-1.5 animate-pulse'></div>
                </div>
            </div>

            </div>
        </section>
      )
}

export default HeroSection