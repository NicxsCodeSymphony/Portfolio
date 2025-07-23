import Hero from "./sections/Hero";
import Navbar from "./components/Navbar";

export default function Home(){
  return(
    <main>
      <Navbar />
      <div>
        <Hero />
      </div>
    </main>
  )
}