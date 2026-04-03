import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollBar from "@/components/ScrollBar";
import Skills from "@/components/Skills";
import Pricing from "@/components/Pricing";




export default function Home() {
  return (
    <main>
      
      <Navbar/>
      <Hero />
      <About/>
      <Skills/>
      <Projects/>
       <Pricing/>
      <Contact/>
      <Footer/>
      <ScrollBar />

    </main>
  );
}