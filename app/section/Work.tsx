'use client'

import { useWorkPage } from '../hooks/useWorkPage';

type WorkProps = {id?: string}

export default function Work({id}: WorkProps){
    const { data, loading, error } = useWorkPage();

    // Function to parse date strings for sorting
    const parseDate = (dateString: string) => {
        const [month, year] = dateString.split(' ');
        const monthMap: { [key: string]: number } = {
            'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };
        return new Date(parseInt(year), monthMap[month] || 0);
    };

    // Convert Firebase object to array, sort by most recent, and limit to 4
    const workExperiences = data ? Object.entries(data)
        .map(([id, work]) => ({
            id,
            ...work
        }))
        .sort((a, b) => {
            // Prioritize current positions (end_date = "present") first
            if (a.end_date.toLowerCase() === "present" && b.end_date.toLowerCase() !== "present") {
                return -1; // a comes first
            }
            if (b.end_date.toLowerCase() === "present" && a.end_date.toLowerCase() !== "present") {
                return 1; // b comes first
            }
            
            // If both are current or both are past positions, sort by start_date
            const dateA = parseDate(a.start_date);
            const dateB = parseDate(b.start_date);
            return dateB.getTime() - dateA.getTime(); // Most recent first
        })
        .slice(0, 4) : []; // Limit to 4 most recent

    // Color schemes for different work experiences
    const colorSchemes = [
        { bg: 'bg-teal-100', text: 'text-teal-800', dot: 'bg-teal-500', accent: 'text-teal-600' },
        { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500', accent: 'text-red-600' },
        { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500', accent: 'text-yellow-600' },
        { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500', accent: 'text-blue-600' },
        { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500', accent: 'text-purple-600' }
    ];

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-[#F5F5F5] py-16 md:py-24 lg:py-32 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#286F6E] mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading work experience...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen w-full bg-[#F5F5F5] py-16 md:py-24 lg:py-32 flex items-center justify-center">
                <div className="text-center text-red-500">
                    <p className="text-lg">Error loading work experience: {error}</p>
                </div>
            </div>
        );
    }

    return(
            <div className="min-h-screen w-full bg-[#F5F5F5] py-16 md:py-24 lg:py-32" id={id}>
                
                {/* Header Section */}
                <div className="text-center px-4 md:px-8 mb-12 md:mb-20">
                    <h1 className="text-[#0A2F3B] text-[32px] md:text-[60px] lg:text-[80px] font-bold mb-4 md:mb-6">
                        My Work Experience
                    </h1>
                    <p className="text-gray-600 text-[16px] md:text-[20px] lg:text-[24px] max-w-3xl mx-auto">
                        A journey through my professional development and key contributions
                    </p>
                </div>

                {/* Experience Timeline */}
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    
                    {/* Mobile: Card Layout, Desktop: Timeline Layout */}
                    <div className="relative">
                        
                        {/* Timeline line - Desktop only */}
                        <div className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-1 bg-gradient-to-b from-teal-400 to-red-400"></div>
                        
                        <div className="space-y-8 md:space-y-12 lg:space-y-20">
                            
                            {workExperiences.map((work, index) => {
                                const colors = colorSchemes[index % colorSchemes.length];
                                
                                return (
                                    <div key={work.id} className="relative">
                                        {/* Mobile Card Layout */}
                                        <div className="lg:hidden rounded-2xl shadow-lg p-6">
                                            <div className="flex flex-col space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className={`${colors.bg} ${colors.text} text-[12px] md:text-[14px] px-3 py-1 rounded-full font-semibold`}>
                                                        {work.start_date} - {work.end_date}
                                                    </span>
                                                    <div className={`w-4 h-4 ${colors.dot} rounded-full`}></div>
                                                </div>
                                                <h3 className="text-[#0A2F3B] text-[22px] md:text-[26px] font-bold">{work.title}</h3>
                                                <p className={`${colors.accent} text-[16px] md:text-[18px] font-medium`}>{work.company}</p>
                                                <p className="text-gray-700 text-[14px] md:text-[16px] leading-relaxed">
                                                    {work.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Desktop Timeline Layout */}
                                        <div className="hidden lg:flex items-center">
                                            <div className="w-1/2 pr-12 text-right">
                                                <div className="rounded-xl shadow-md p-6">
                                                    <span className={`${colors.bg} ${colors.text} text-[16px] px-4 py-2 rounded-full font-semibold inline-block mb-3`}>
                                                        {work.start_date} - {work.end_date}
                                                    </span>
                                                    <h3 className="text-[#0A2F3B] text-[28px] font-bold mb-2">{work.title}</h3>
                                                    <p className={`${colors.accent} text-[20px] font-medium`}>{work.company}</p>
                                                </div>
                                            </div>
                                            
                                            {/* Timeline dot */}
                                            <div className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 ${colors.dot} rounded-full border-4 border-white shadow-lg z-10`}></div>
                                            
                                            <div className="w-1/2 pl-12">
                                                <div className="rounded-xl shadow-md p-6">
                                                    <h1 className='text-[#0A2F3B] text-[28px] font-bold mb-2'>{work.title}</h1>
                                                    <p className="text-gray-700 text-[18px] leading-relaxed">
                                                        {work.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>
            </div>
        )
    }