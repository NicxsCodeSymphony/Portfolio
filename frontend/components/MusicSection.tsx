"use client"

export default function MusicSection() {
  const tracks = [
    {
      id: 1,
      title: "Digital Symphony",
      description: "Electronic orchestral fusion with ambient textures",
      duration: "3:45",
      image: "/api/placeholder/200/200"
    },
    {
      id: 2,
      title: "Coded Melodies",
      description: "Lo-fi beats with algorithm-generated melodies",
      duration: "4:21",
      image: "/api/placeholder/200/200"
    },
    {
      id: 3,
      title: "Binary Rhythm",
      description: "Techno inspired by programming patterns",
      duration: "5:18",
      image: "/api/placeholder/200/200"
    },
    {
      id: 4,
      title: "Function Loop",
      description: "Recursive ambient soundscapes",
      duration: "6:02",
      image: "/api/placeholder/200/200"
    }
  ];
  
  return (
    <section id="music" className="py-20 bg-gray-800/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          My <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Music</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-6">Latest Tracks</h3>
            <div className="space-y-4">
              {tracks.map((track) => (
                <div 
                  key={track.id}
                  className="bg-gray-800/70 rounded-lg p-4 flex items-center gap-4 transition-all duration-300 hover:bg-gray-700/70"
                >
                  <div className="w-16 h-16 flex-shrink-0 relative group">
                    <img 
                      src={track.image} 
                      alt={track.title} 
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                      <button className="text-white">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold">{track.title}</h4>
                    <p className="text-sm text-gray-400">{track.description}</p>
                  </div>
                  <div className="text-sm text-gray-400">{track.duration}</div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a 
                href="#" 
                className="inline-flex items-center text-blue-400 hover:text-blue-500"
              >
                View all tracks
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Music & Development</h3>
            <div className="bg-gray-800/70 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                My journey as both a musician and developer has led me to explore the fascinating intersection between sound and code. I'm passionate about creating digital experiences that bridge these two worlds.
              </p>
              <p className="text-gray-300 mb-4">
                From developing audio visualization tools to creating interactive music applications, I leverage my dual expertise to build unique projects that push the boundaries of web technology and sound design.
              </p>
              <p className="text-gray-300 mb-6">
                Interested in collaborating on a project that combines music and technology? Let's create something amazing together.
              </p>
              <a 
                href="#contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-300 inline-block"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}