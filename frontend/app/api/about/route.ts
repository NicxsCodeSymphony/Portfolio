import { NextResponse } from 'next/server';

// Skill interface definition with name and icon
export interface Skill {
  name: string;
  icon: string;
}

// AboutData interface with profile details, bio, skills, etc.
export interface AboutData {
  name: string;
  bio: {
    paragraphs: string[];
    quote: string;
  };
  profileImage: string;
  videoUrl: string;
  codeSnippets: {
    topLeft: string;
    bottomRight: string;
    upperRight: string;
    lowerLeft: string;
  };
  skills: {
    frontend: Skill[];
    backend: Skill[];
    tools: Skill[];
  };
}

// GET function to fetch about data, possibly from a database or CMS
export async function GET() {
  // Simulated About Data (this can be fetched from a database in a real app)
  const aboutData: AboutData = {
    name: "John Nico M. Edisan",
    bio: {
      paragraphs: [
        "I'm an aspiring IT professional who loves building user-friendly websites and applications. I combine technical skills with creative problem-solving to create solutions that work smoothly and look great.",
        "When I'm not coding, I enjoy making music. To me, writing code and composing music are similar—they both require precision, creativity, and a good sense of patterns to create something meaningful."
      ],
      quote: "Currently undergoing my On-The-Job Training, where I'm developing an inventory system for an educational institution."
    },
    profileImage: "https://avatars.githubusercontent.com/u/118499511?v=4",
    videoUrl: "https://www.youtube.com/embed/FFARF3jFYv8",
    codeSnippets: {
      topLeft: `const harmony = () => {\n  return music.connect(code);\n};`,
      bottomRight: `function createMelody() {\n  return new Promise(resolve => {\n    const notes = ["C", "E", "G"];\n    resolve(notes);\n  });\n};`,
      upperRight: `const rhythm = beat => {\n  return beat.loop();\n};`,
      lowerLeft: `async function playTrack() {\n  const track = await loadAudio();\n  track.play();\n};`
    },
    skills: {
      frontend: [
        { name: "React.js", icon: "FaReact" },
        { name: "Next.js", icon: "SiNextdotjs" },
        { name: "Tailwind CSS", icon: "SiTailwindcss" },
        { name: "Three.js", icon: "SiThreedotjs" }
      ],
      backend: [
        { name: "Node.js", icon: "FaNodeJs" },
        { name: "Express", icon: "SiExpress" },
        { name: "MongoDB", icon: "SiMongodb" },
        { name: "MySQL", icon: "FaDatabase" }
      ],
      tools: [
        { name: "Firebase", icon: "SiFirebase" },
        { name: "Figma", icon: "FaFigma" },
        { name: "Guitar", icon: "FaGuitar" },
        { name: "Piano", icon: "IoMdMusicalNote" }
      ]
    }
  };

  // Return the about data as a JSON response
  return NextResponse.json({ data: aboutData });
}
