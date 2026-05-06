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

        <section className="px-6 py-16 max-w-7xl mx-auto text-left border-b border-gray-800 bg-[#0a0a0a]">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT: SEO & Conversion Focused */}
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            #1 Web Development Solutions in India
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 leading-[1.1]">
            Build a Website that <span className="text-blue-500 text-glow">Converts Visitors</span> into Customers
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
            Stop losing leads to slow, outdated websites. We engineer 
            <strong className="text-white"> high-performance digital products</strong> that are fast, secure, 
            and built to dominate search engine rankings. From startups to enterprises, 
            we deliver the reliability your business deserves.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <ul className="space-y-3 text-slate-200">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span> <strong>SEO-Dominant</strong> Architecture
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span> <strong>Lightning Fast</strong> Load Speed
              </li>
            </ul>
            <ul className="space-y-3 text-slate-200">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span> <strong>Scalable</strong> Business Logic
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span> <strong>24/7</strong> Reliable Support
              </li>
            </ul>
          </div>

          {/* Social Proof / Trust Badge */}
          <div className="pt-4 border-t border-gray-800 flex items-center gap-4">
            
            <p className="text-sm text-slate-500">
              Trusted by <span className="text-white font-bold">50+ businesses</span> worldwide
            </p>
          </div>
        </div>

        {/* RIGHT CONTENT: Lead Generation Card */}
        <div className="relative">
          {/* Decorative Blur Background */}
          <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full" />
          
          <div className="relative bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-2 text-gray-900 text-center">Ready to Scale?</h3>
            <p className="text-gray-500 text-center mb-8">
              Get a free consultation and project roadmap within 24 hours.
            </p>
            
            <div className="space-y-4">
              <a 
                href="https://wa.me/918595460058?text=Hi, I'm looking for a professional web solution for my business." 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#20bd5a] transition-all transform hover:scale-[1.02] shadow-lg shadow-green-500/20"
              >
                <span>Start Free Consultation</span>
              </a>
              
              <a 
                href="tel:+918595460058" 
                className="flex items-center justify-center gap-2 w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-[1.02]"
              >
                Request a Quote
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-gray-400">
              <div className="text-center">
                <p className="text-black font-bold text-xl">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-black">Secure</p>
              </div>
              <div className="w-[1px] h-8 bg-gray-400" />
              <div className="text-center">
                <p className="text-black font-bold text-xl">Fast</p>
                <p className="text-[10px] uppercase tracking-widest text-black">Delivery</p>
              </div>
              <div className="w-[1px] h-8 bg-gray-400" />
              <div className="text-center">
                <p className="text-black font-bold text-xl">Top</p>
                <p className="text-[10px] uppercase tracking-widest text-black">Rated</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
      <Footer/>
      <ScrollBar />

    </main>
  );
}