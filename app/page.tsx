import Navbar from "./components/Navbar";
import Hero from "./section/Hero";
import About from "./section/About";
import Work from "./section/Work";
import Project from "./section/Project";
import Testimonial from "./section/Testimonial";
import Contact from "./section/Contact";
import ScrollAnimation from "./components/ScrollAnimation";
import Stacks from "./section/Stacks";
import BackToTopButton from "./components/BackToTopButton";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div>
        <Hero id="hero" />
        <Stacks id="stacks" />
        <ScrollAnimation delay={0.1}>
          <About id="about" />
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <Work id="works" />
        </ScrollAnimation>
        <ScrollAnimation delay={0.3}>
          <Project id="notes" />
        </ScrollAnimation>
        <ScrollAnimation delay={0.1}>
          <Testimonial id="experience" />
        </ScrollAnimation>
        <ScrollAnimation delay={0.4}>
          <Contact id="contact" />
        </ScrollAnimation>
      </div>
      <Footer />
      <BackToTopButton />
    </main>
  );
}
