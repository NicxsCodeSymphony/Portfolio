"use client"

import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as DiIcons from 'react-icons/di';
import * as IoIcons from 'react-icons/io';
import * as TbIcons from 'react-icons/tb';
import { useStacks, getStackColor } from '../utils/stack';

type StacksProps = {id?: string}

const iconSets = [FaIcons, SiIcons, DiIcons, IoIcons, TbIcons];

function toPascalCase(str: string) {
  return str
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/\s+/g, '');
}

function findIconComponent(stack: string) {
  const candidates = [
    toPascalCase(stack),
    toPascalCase(stack) + 'Js',
    toPascalCase(stack).replace(/Js$/, 'JS'),
    toPascalCase(stack).replace(/Js$/, ''),
  ];

  for (const icons of iconSets) {
    for (const candidate of candidates) {
      for (const prefix of ['Fa', 'Si', 'Di', 'Io', 'Tb']) {
        const iconName = prefix + candidate;
        const iconSet = icons as Record<string, React.ComponentType<any>>;
        if (iconSet[iconName]) {
          return iconSet[iconName];
        }
      }
    }
  }
  return null;
}

// Helper to normalize stack names
function normalizeStackName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/\.js$/, 'js')
    .replace(/\./g, '')
    .replace(/-/g, '');
}


export default function Stacks({id}: StacksProps) {
  const { stacks, loading } = useStacks();
  const stackNames = stacks.map((s: { stack: string }) => s.stack);
  const marqueeStacks = [...stackNames, ...stackNames];

  if (loading) {
    return (
      <section className="w-full h-[20vh] relative py-20 md:py-16 px-4 flex items-center justify-center">
        <div className="text-black text-lg">Loading stacks...</div>
      </section>
    );
  }

  return (
    <section className="w-full h-[20vh] relative py-20 md:py-16 px-4" id={id}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full z-50 rounded-xl overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
          {/* Gradient fade on edges for better UX */}
          <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#F5F5F5] via-[#F5F5F5]/80 to-transparent" />
          <div className="absolute right-0 top-0 h-full bg-gradient-to-l from-[#F5F5F5] via-[#F5F5F5]/80 to-transparent" />
        </div>
        <div className="w-full overflow-x-hidden">
          <ul
            className="flex animate-marquee gap-x-32 md:gap-x-48 min-w-max items-center justify-center"
            aria-label="Technology stack icons"
            tabIndex={0}
          >
            {marqueeStacks.map((stack, idx) => {
              const normalized = normalizeStackName(stack);
              const Icon = findIconComponent(stack);
              const color = getStackColor(stack);
              return (
                <li
                  key={stack + '-' + idx}
                  className="flex flex-col items-center justify-center text-[clamp(2rem,4vw,2.5rem)] md:text-[clamp(2.5rem,3vw,3.5rem)] transition-transform duration-200 hover:scale-110 focus:scale-110 cursor-pointer group outline-none"
                  tabIndex={0}
                  aria-label={stack}
                >
                  <span className="transition-shadow duration-200 group-hover:shadow-lg group-focus:shadow-lg rounded-full">
                    {Icon ? (
                      <Icon title={stack} color={color} />
                    ) : (
                      <span className="">{stack}</span>
                    )}
                  </span>
                  <span className="text-xs md:text-sm mt-1 capitalize select-none">
                    {stack}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-marquee {
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
}