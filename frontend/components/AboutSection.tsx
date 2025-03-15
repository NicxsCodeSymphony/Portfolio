
export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-800/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          About <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Me</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4">
              The Harmony of Code and Music
            </h3>
            <p className="text-gray-300 mb-6">
              Hello! I'm a passionate full stack developer and musician, blending the art of code with the harmony of sound. With expertise in modern web technologies and a background in music production, I bring a unique creative perspective to my projects.
            </p>
            <p className="text-gray-300 mb-6">
              My technical journey spans across the entire development stack, from creating responsive front-end interfaces to building robust back-end systems. Meanwhile, my musical background infuses my work with creativity and attention to detail.
            </p>
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-3">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
{['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Three.js', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'].map((skill) => (
                  <span key={skill} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Musical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {['Music Production', 'Guitar', 'Piano', 'Sound Design', 'Music Theory', 'Digital Audio Workstations'].map((skill) => (
                  <span key={skill} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative h-80 md:h-96">
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-600/30 backdrop-blur-sm p-1">
              <div className="w-full h-full rounded-lg bg-gray-900/60 flex items-center justify-center overflow-hidden">
                <div className="text-9xl font-bold opacity-20">&lt;/&gt;</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg md:text-xl font-bold">Your Photo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}