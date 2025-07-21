import { useEffect, useState } from "react";
import axios from "axios";

export interface Stack {
  stack: string;
  created_at: string;
  updated_at: string;
}

// Brand color map for stack icons
const stackColorMap: Record<string, string> = {
  react: '#61DAFB',
  svelte: '#FF3E00',
  nestjs: '#E0234E',
  express: '#000000',
  electron: '#47848F',
  html5: '#E34F26',
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  css3: '#1572B6',
  tailwindcss: '#06B6D4',
  nextjs: '#000000',
};

// Helper to get the color for a stack name
export function getStackColor(stack: string): string {
  const key = stack.toLowerCase().replace(/\s+/g, '').replace(/\.js$/, 'js').replace(/\./g, '').replace(/-/g, '');
  return stackColorMap[key] || '#666';
}

export function useStacks() {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/stacks")
      .then((res) => {
        const data = Object.values(res.data) as Stack[];
        setStacks(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { stacks, loading };
}
