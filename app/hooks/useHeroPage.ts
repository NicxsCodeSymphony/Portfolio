import { useState, useEffect } from "react";
import axios from "axios";
import { HeroPage } from "../../types/HeroPage";

export type HeroPageWithNested = Omit<HeroPage, 'uid'> & {
  personalInfo: {
    name: string;
    position: string;
    address: string;
    email: string;
    contact: string;
    status: string;
    website: string;
    projects_count: number;
    client_count: number;
    companies: number;
    years_experience: number;
    image1: string;
    image2: string;
    image3: string;
  };
  awards: Record<string, any>;
  files: Record<string, any>;
};

export const useHeroPage = () => {
  const [data, setData] = useState<HeroPageWithNested[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroPage = async () => {
      try {
        const res = await axios.get("/api/heroPage");

        // If the data is an object with UIDs as keys
        const rawData = res.data;

        const cleaned: HeroPageWithNested[] = Object.values(rawData);

        setData(cleaned);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchHeroPage();
  }, []);

  return { data, loading, error };
};
