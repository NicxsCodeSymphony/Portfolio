import Hero from "./sections/Hero";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Work from "./sections/Work";
import Project from "./sections/Project";
import Testimonial from "./sections/Testimonials";
import Contact from "./sections/Contact";

export default function Home(){
  return(
    <main>
      <Navbar />
      <div>
        <Hero />
        <About />
        <Work />
        <Project />
        <Testimonial />
        <Contact />
      </div>
    </main>
  )
}