import { strapiAPI } from "./lib/strapi";
import HeroSection from "./sections/HeroSection";
import type { Metadata } from "next";

export async function generateMetaData(): Promise<Metadata>{
  try{
    const homeData = await strapiAPI.getHeroSection();
    const seo = homeData?.data.seo || {};
  
    return{
      title: seo?.metaTitle || "Home | Portfolio",
      description: seo?.metaDescription || "Welcome to my portfolio",
      keywords: seo?.keywords || "portfolio, web development, software development, software engineer, software engineer portfolio, software engineer portfolio website, software engineer portfolio website design, software engineer portfolio website development, software engineer portfolio website design and development, software engineer portfolio website design and development, software engineer portfolio website design and development, software engineer portfolio website design and development",
      openGraph: {
        title: seo?.metaTitle || "Home | Portfolio",
        description: seo?.metaDescription || "Welcome to my portfolio",
        images: seo?.image?.data?.attributes?.url || "/images/default-og-image.png",
      },
      alternates: {}
    }
  } catch(error){
    console.error("Error generating metadata:", error);
    return{
      title: "Home | Portfolio",
      description: "Welcome to my portfolio",
      keywords: "portfolio, web development, software development, software engineer, software engineer portfolio, software engineer portfolio website, software engineer portfolio website design, software engineer portfolio website development, software engineer portfolio website design and development, software engineer portfolio website design and development, software engineer portfolio website design and development, software engineer portfolio website design and development",
    }
  }
}


export default async function Home(){
  try{
    const [heroData] = await Promise.all([
      strapiAPI.getHeroSection()
    ])

    return(
      <main>
        <HeroSection data={heroData?.data} />
      </main>
    )
  }
  catch(err){
    console.error("Error fetching data:", err);
    return(
      <main>
        <div className="container max-auto px-4 py-16">
          <h1>Error loading the page</h1>
        </div>
      </main>
    )
  }
}