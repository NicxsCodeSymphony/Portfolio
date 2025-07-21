'use client'

import { useWorkPage } from '../hooks/useWorkPage';
import { motion } from 'framer-motion';

type WorkProps = {id?: string}

export default function Work({id}: WorkProps){
    const { data, loading, error } = useWorkPage();

    const parseDate = (dateString: string) => {
        const [month, year] = dateString.split(' ');
        const monthMap: { [key: string]: number } = {
            'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };
        return new Date(parseInt(year), monthMap[month] || 0);
    };

    const workExperiences = data ? Object.entries(data)
        .map(([id, work]) => ({
            id,
            ...work
        }))
        .sort((a, b) => {
            if (a.end_date.toLowerCase() === "present" && b.end_date.toLowerCase() !== "present") {
                return -1;
            }
            if (b.end_date.toLowerCase() === "present" && a.end_date.toLowerCase() !== "present") {
                return 1;
            }
            
            const dateA = parseDate(a.start_date);
            const dateB = parseDate(b.start_date);
            return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 4) : [];

    const colorSchemes = [
        { bg: 'bg-teal-100', text: 'text-teal-800', dot: 'bg-teal-500', accent: 'text-teal-600' },
        { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500', accent: 'text-red-600' },
        { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500', accent: 'text-yellow-600' },
        { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500', accent: 'text-blue-600' },
        { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500', accent: 'text-purple-600' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.9
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1
        }
    };

    const timelineVariants = {
        hidden: { 
            scaleY: 0,
            opacity: 0
        },
        visible: { 
            scaleY: 1,
            opacity: 1
        }
    };

    const dotVariants = {
        hidden: { 
            scale: 0,
            opacity: 0
        },
        visible: { 
            scale: 1,
            opacity: 1
        },
        hover: {
            scale: 1.2
        }
    };

    if (loading) {
        return (
            <motion.div 
                className="min-h-screen w-full bg-[#F5F5F5] py-16 md:py-24 lg:py-32 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center">
                    <motion.div 
                        className="rounded-full h-32 w-32 border-b-2 border-[#286F6E] mx-auto"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    ></motion.div>
                    <motion.p 
                        className="mt-4 text-lg text-gray-600"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Loading work experience...
                    </motion.p>
                </div>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div 
                className="min-h-screen w-full bg-[#F5F5F5] py-16 md:py-24 lg:py-32 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="text-center text-red-500"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <p className="text-lg">Error loading work experience: {error}</p>
                </motion.div>
            </motion.div>
        );
    }

    return(
        <motion.div 
            className="min-h-screen w-full bg-[#F5F5F5] py-16 md:py-24 lg:py-32" 
            id={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div 
                className="text-left lg:text-center px-4 md:px-8 mb-12 md:mb-20"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.h1 
                    className="text-[#0A2F3B] text-[32px] md:text-[60px] lg:text-[80px] font-bold mb-4 md:mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    My Work Experience
                </motion.h1>
                <motion.p 
                    className="text-gray-600 text-[16px] md:text-[20px] lg:text-[24px] max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    A journey through my professional development and key contributions
                </motion.p>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="relative">
                    <motion.div 
                        className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-1 bg-gradient-to-b from-teal-400 to-red-400 origin-top"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ 
                            duration: 2,
                            delay: 0.5 
                        }}
                    ></motion.div>
                    
                    <motion.div 
                        className="space-y-8 md:space-y-12 lg:space-y-20"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            staggerChildren: 0.3,
                            delayChildren: 0.2
                        }}
                    >
                        {workExperiences.map((work, index) => {
                            const colors = colorSchemes[index % colorSchemes.length];
                            
                            return (
                                <motion.div 
                                    key={work.id} 
                                    className="relative"
                                    variants={itemVariants}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1
                                    }}
                                >
                                    <motion.div 
                                        className="lg:hidden rounded-2xl shadow-lg p-6 bg-white hover:shadow-xl transition-all duration-300"
                                        whileHover={{ 
                                            y: -5,
                                            scale: 1.02,
                                            transition: { duration: 0.2 }
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex flex-col space-y-3">
                                            <div className="flex items-center justify-between">
                                                <motion.span 
                                                    className={`${colors.bg} ${colors.text} text-[12px] md:text-[14px] px-3 py-1 rounded-full font-semibold`}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    {work.start_date} - {work.end_date}
                                                </motion.span>
                                                <motion.div 
                                                    className={`w-4 h-4 ${colors.dot} rounded-full`}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.3, duration: 0.3 }}
                                                    whileHover={{ scale: 1.3 }}
                                                ></motion.div>
                                            </div>
                                            <motion.h3 
                                                className="text-[#0A2F3B] text-[22px] md:text-[26px] font-bold"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                {work.title}
                                            </motion.h3>
                                            <motion.p 
                                                className={`${colors.accent} text-[16px] md:text-[18px] font-medium`}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                {work.company}
                                            </motion.p>
                                            <motion.p 
                                                className="text-gray-700 text-[14px] md:text-[16px] leading-relaxed"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                {work.description}
                                            </motion.p>
                                        </div>
                                    </motion.div>

                                    <div className="hidden lg:flex items-center">
                                        <motion.div 
                                            className="w-1/2 pr-12 text-right"
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <motion.div 
                                                className="rounded-xl shadow-md p-6 bg-white hover:shadow-xl transition-all duration-300"
                                                whileHover={{ 
                                                    scale: 1.02,
                                                    x: -10,
                                                    transition: { duration: 0.2 }
                                                }}
                                            >
                                                <motion.span 
                                                    className={`${colors.bg} ${colors.text} text-[16px] px-4 py-2 rounded-full font-semibold inline-block mb-3`}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    {work.start_date} - {work.end_date}
                                                </motion.span>
                                                <motion.h3 
                                                    className="text-[#0A2F3B] text-[28px] font-bold mb-2"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.4 }}
                                                >
                                                    {work.title}
                                                </motion.h3>
                                                <motion.p 
                                                    className={`${colors.accent} text-[20px] font-medium`}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.5 }}
                                                >
                                                    {work.company}
                                                </motion.p>
                                            </motion.div>
                                        </motion.div>
                                        
                                        <motion.div 
                                            className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 ${colors.dot} rounded-full border-4 border-white shadow-lg z-10`}
                                            variants={dotVariants}
                                            initial="hidden"
                                            animate="visible"
                                            whileHover="hover"
                                            transition={{ 
                                                delay: index * 0.1 + 0.8,
                                                duration: 0.4,
                                                type: "spring",
                                                stiffness: 300
                                            }}
                                        ></motion.div>
                                        
                                        <motion.div 
                                            className="w-1/2 pl-12"
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <motion.div 
                                                className="rounded-xl shadow-md p-6 bg-white hover:shadow-xl transition-all duration-300"
                                                whileHover={{ 
                                                    scale: 1.02,
                                                    x: 10,
                                                    transition: { duration: 0.2 }
                                                }}
                                            >
                                                <motion.h1 
                                                    className='text-[#0A2F3B] text-[28px] font-bold mb-2'
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.4 }}
                                                >
                                                    {work.title}
                                                </motion.h1>
                                                <motion.p 
                                                    className="text-gray-700 text-[18px] leading-relaxed"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.6 }}
                                                >
                                                    {work.description}
                                                </motion.p>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}