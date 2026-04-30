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

      <section className="px-6 py-12 max-w-4xl mx-auto text-center">
  <h1 className="text-2xl md:text-3xl font-bold mb-6">
    Frontend & Full Stack Developer in India | Next.js Expert
  </h1>

  <p className="text-gray-600 mb-4">
    I am a Full Stack Developer based in India specializing in Next.js, React.js,
    and MERN stack development. I build fast, responsive, and SEO-friendly
    web applications for startups, businesses, and individuals.
  </p>

  <p className="text-gray-600 mb-4">
    With strong experience in frontend and backend development, I create
    modern websites using technologies like Next.js, React, Node.js,
    MongoDB, and Tailwind CSS.
  </p>

  <p className="text-gray-600">
    If you are looking for a professional web developer in India for your
    project, I can help you build scalable and high-performance applications.
  </p>
</section>
      <Footer/>
      <ScrollBar />

    </main>
  );
}