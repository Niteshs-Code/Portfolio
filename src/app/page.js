import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollBar from "@/components/ScrollBar";
import Skills from "@/components/Skills";
import ProjectGallery from "@/components/ProjectGallery";
import Pricing from "@/components/Pricing";
import Collaborate from "@/components/Collaborate";
import BlogPreview from "@/components/BlogPreview";

export default function Home() {
  return (
    <>
<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Nitesh Web developer",
            "image": "https://portfolio-omega-five-sz84sz7cb9.vercel.app/og-image.jpg",
            "telephone": "+918595460058",
            "url": "https://portfolio-omega-five-sz84sz7cb9.vercel.app",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "S-Block, vikas valley, Hastsal",
              "addressLocality": "New Delhi",
              "addressRegion": "Delhi",
              "postalCode": "110059",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "28.647292078766085",
              "longitude": "77.04603118201756"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "00:00",
              "closes": "23:59"
            }
          }),
        }}
      />

    <main className="bg-black text-white min-h-screen">
      
      <Navbar/>
      <Hero />
      <About/>
      <Skills/>
      <Projects/>
      <Pricing/>
      <ProjectGallery />
       <Collaborate />
       <BlogPreview />

      <Contact/>

      {/* Polish Call To Action Section - Completely Dark Styled */}
      <section className="px-6 py-20 max-w-5xl mx-auto text-left border-t border-zinc-900">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 leading-tight">
              Need a <span className="text-blue-500">Performance-Driven</span> Web Developer?
            </h2>
            <p className="mt-4 text-zinc-400 text-base leading-relaxed">
              I’m Nitesh, a <strong className="font-bold text-white">Full Stack Developer based in India</strong>. 
              I don't just write code; I build high-converting conversion engines. Whether you need a <strong className="text-white">Next.js SaaS platform</strong>, 
              a custom dashboard, or a complete MERN system, I ensure optimization for speed, security, and organic search engine discovery.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-300">
              <li className="flex items-center gap-2">✓ <strong>SEO-Friendly</strong> architecture for scale and indexability.</li>
              <li className="flex items-center gap-2">✓ <strong>API Integrity</strong> & Secure silent input sanitization.</li>
              <li className="flex items-center gap-2">✓ <strong>Fast Delivery</strong> timelines with direct communication.</li>
            </ul>
          </div>

          {/* Right Card - Swapped from White to Industrial Deep Gray */}
          <div className="bg-[#09090b] p-8 rounded-2xl border border-zinc-800/80 shadow-2xl">
            <h3 className="text-xl font-bold mb-2 text-center text-zinc-100">Let's Discuss Your Project</h3>
            <p className="text-xs text-center text-zinc-500 mb-6">Direct consultation route for global startups & active scale ventures.</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/918595460058?text=Hello%20Nitesh%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
              >
                WhatsApp Me
              </a>
              
              <a 
                href="tel:+918595460058" 
                className="flex-1 text-center bg-zinc-100 hover:bg-white text-black py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
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
    </>
  );
}