"use client";

import { useProjectPage } from '../hooks/useProjectPage';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WorksPage() {
  const { data, loading, error } = useProjectPage();
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const router = useRouter();

  const getGoogleDriveImageUrl = (fileId: string) => `https://drive.google.com/uc?export=view&id=${fileId}`;
  const getImageSource = (imageUrl: string, fallbackImage: string) => {
    if (!imageUrl) return fallbackImage;
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
    if (imageUrl.startsWith('/')) return imageUrl;
    if (/^[a-zA-Z0-9_-]+$/.test(imageUrl)) return getGoogleDriveImageUrl(imageUrl);
    return fallbackImage;
  };

  const projects = data
    ? Object.entries(data)
        .map(([id, project]) => ({ id, ...project }))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    : [];

  const gridCols = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12';
  const colorSchemes = [
    'bg-teal-100 border-teal-300',
    'bg-red-100 border-red-300',
    'bg-yellow-100 border-yellow-300',
    'bg-blue-100 border-blue-300',
    'bg-purple-100 border-purple-300',
    'bg-orange-100 border-orange-300',
  ];

  return (
    <div className="min-h-screen w-full bg-[#F5F5F5] py-16 md:py-24 lg:py-32 px-4 md:px-12 lg:px-32 xl:px-56">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 rounded-full bg-[#286F6E] text-white font-semibold hover:bg-[#1e5a59] transition-colors duration-200 shadow-md border border-[#286F6E]"
        >
          Go Back
        </button>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-full font-semibold border transition-colors duration-200 ${view === 'grid' ? 'bg-[#286F6E] text-white border-[#286F6E]' : 'bg-white text-[#286F6E] border-[#286F6E] hover:bg-[#e6f2f1]'}`}
            onClick={() => setView('grid')}
            aria-pressed={view === 'grid'}
          >
            Grid View
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold border transition-colors duration-200 ${view === 'table' ? 'bg-[#286F6E] text-white border-[#286F6E]' : 'bg-white text-[#286F6E] border-[#286F6E] hover:bg-[#e6f2f1]'}`}
            onClick={() => setView('table')}
            aria-pressed={view === 'table'}
          >
            Table View
          </button>
        </div>
      </div>
      <div className="text-center mb-12 md:mb-20">
        <h1 className="text-[#0A2F3B] text-[32px] md:text-[60px] lg:text-[80px] font-bold mb-4 md:mb-6">
          All Projects
        </h1>
        <p className="text-gray-600 text-[16px] md:text-[20px] lg:text-[24px] max-w-3xl mx-auto">
          Explore my latest projects, digital solutions, and creative work.
        </p>
      </div>
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-[#286F6E] mb-4"></div>
          <p className="text-lg text-gray-600">Loading projects...</p>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <p className="text-lg text-red-500">Error loading projects: {error}</p>
        </div>
      )}
      {!loading && !error && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <p className="text-lg text-gray-500">No projects found.</p>
        </div>
      )}
      {!loading && !error && projects.length > 0 && view === 'grid' && (
        <div className={gridCols}>
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`relative group rounded-3xl border-2 shadow-lg p-8 md:p-10 transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:shadow-2xl flex flex-col h-[500px] md:h-[540px] lg:h-[560px] ${colorSchemes[idx % colorSchemes.length]}`}
              tabIndex={0}
              aria-label={`Project: ${project.title}`}
            >
              <div className="w-full h-[180px] md:h-[220px] lg:h-[240px] rounded-xl overflow-hidden mb-6 bg-white flex items-center justify-center">
                <Image
                  src={getImageSource(project.image_url, '/assets/crmc.png')}
                  alt={project.title}
                  width={400}
                  height={220}
                  className="object-cover w-full h-full"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <div className="mb-2">
                <h2 className="text-2xl md:text-3xl font-bold text-[#286F6E]">
                  {project.title}
                </h2>
                <span className="inline-block mt-1 px-3 py-1 rounded-full bg-white text-[#286F6E] text-xs font-semibold border border-[#286F6E]">
                  {project.type}
                </span>
              </div>
              <p className="text-gray-600 text-base md:text-lg mb-4 line-clamp-4 transition-all duration-300 flex-1">
                {project.description}
              </p>
              <div className="mb-2">
                {Array.isArray(project.technologies)
                  ? project.technologies.map((tech: string, i: number) => (
                      <span key={i} className="inline-block bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs font-medium mr-1 mb-1">
                        {tech}
                      </span>
                    ))
                  : (project.technologies || '-')}
              </div>
              <div className="flex gap-4 mt-2">
                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-[#286F6E] text-white font-semibold text-sm hover:bg-[#1e5a59] transition-colors duration-300 shadow-md border border-[#286F6E]"
                    title="See Live Project"
                    onClick={e => e.stopPropagation()}
                  >
                    Live
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-gray-800 text-white font-semibold text-sm hover:bg-gray-700 transition-colors duration-300 shadow-md border border-gray-800"
                    title="GitHub Repository"
                    onClick={e => e.stopPropagation()}
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && !error && projects.length > 0 && view === 'table' && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-2xl shadow-lg">
            <thead>
              <tr className="bg-[#286F6E] text-white">
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Technologies</th>
                <th className="py-3 px-4 text-left">Links</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, idx) => (
                <tr key={project.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4">
                    <Image
                      src={getImageSource(project.image_url, '/assets/crmc.png')}
                      alt={project.title}
                      width={80}
                      height={45}
                      className="object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-4 font-semibold text-[#286F6E]">{project.title}</td>
                  <td className="py-2 px-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#e6f2f1] text-[#286F6E] text-xs font-semibold border border-[#286F6E]">
                      {project.type}
                    </span>
                  </td>
                  <td className="py-2 px-4 max-w-xs truncate" title={project.description}>{project.description}</td>
                  <td className="py-2 px-4">
                    {Array.isArray(project.technologies)
                      ? project.technologies.map((tech: string, i: number) => (
                          <span key={i} className="inline-block bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs font-medium mr-1 mb-1">
                            {tech}
                          </span>
                        ))
                      : (project.technologies || '-')}
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex gap-2">
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-full bg-[#286F6E] text-white font-semibold text-xs hover:bg-[#1e5a59] transition-colors duration-300 border border-[#286F6E]"
                          title="See Live Project"
                        >
                          Live
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-full bg-gray-800 text-white font-semibold text-xs hover:bg-gray-700 transition-colors duration-300 border border-gray-800"
                          title="GitHub Repository"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 