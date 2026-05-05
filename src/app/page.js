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

      <section className="px-6 py-16 max-w-5xl mx-auto text-left border-b border-gray-800"> {/* Border ko dark background ke liye dark kiya */}
  <div className="grid md:grid-cols-2 gap-10 items-center">
    <div>
      {/* H2 Title - Text ko white (slate-100) kiya taaki dark BG pe dikhe */}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 leading-tight">
        Need a <span className="text-blue-500">Performance-Driven</span> Web Developer?
      </h2>
      {/* P Text - Text ko light gray (slate-300) kiya leading visibility ke liye */}
      <p className="mt-4 text-slate-300 text-lg">
  I’m Nitesh, a <strong className="font-bold text-white">Full Stack Developer based in India</strong>. 
  I don't just write code; I build solutions. Whether you need a <strong className="text-white">Next.js SaaS platform</strong>, 
  a <strong className="text-white">React-based dashboard</strong>, or a <strong className="text-white">full MERN stack application</strong>, 
  I ensure your project is optimized for speed, security, and search engines.
</p>
      {/* UL List - Text white kiya */}
      <ul className="mt-6 space-y-3 text-slate-100">
        <li className="flex items-center gap-2">✅ <strong>SEO-Friendly</strong> architecture for organic growth.</li>
        <li className="flex items-center gap-2">✅ <strong>API Integration</strong> & Secure Backend systems.</li>
        <li className="flex items-center gap-2">✅ <strong>Fast Turnaround</strong> without compromising quality.</li>
      </ul>
    </div>
    {/* Right Card - Iska background light hai, isliye iska text already dark dikhega */}
    <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-center text-black">Let's Discuss Your Project</h3>
      <p className="text-sm text-center text-gray-500 mb-6">Free consultation for startups & businesses.</p>
      
      {/* Option 1: WhatsApp Link (Dono links ko side-by-side) */}
      <div className="flex gap-4">
        <a 
          href="https://wa.me/918595460058?text=I'm%20interested%20in%20discussing%20a%20project%20with%20you" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 text-center bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          WhatsApp Me
        </a>
        
        {/* Option 2: Direct Call Link */}
        <a 
          href="tel:+918595460058" 
          className="flex-1 text-center bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Call Me
        </a>
      </div>
    </div>
  </div>
</section>
      <Footer/>
      <ScrollBar />

    </main>
  );
}