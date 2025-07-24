import Hero from "./sections/Hero";
import Navbar from "./components/Navbar";
import About from "./sections/About";

export default function Home(){
  return(
    <main>
      <Navbar />
      <div>
        <Hero />
        <About />
      </div>
    </main>
  )
}