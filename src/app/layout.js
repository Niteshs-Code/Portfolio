import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";

import "./globals.css";

export const metadata = {
  title: "Studio Nitesh | Next.js Developer & Digital Marketing Expert",
  description: "High-performance Full Stack Developer in India specializing in Next.js, MERN stack, Shopify, and WordPress customization. Boost your business with expert Google Ads management.",
  keywords: [
    "Hire Next.js Developer India",
    "Full Stack Freelancer for Startups",
    "Professional MERN Stack Services",
    "Shopify Customization Expert India",
    "WordPress Web Developer",
    "Google Ads Freelancer India",
    "PPC Marketing Expert India",
    "Next.js SEO Optimization Expert",
    "Nitesh Kumar Portfolio"
  ],
  alternates: {
    // Jab tum custom domain loge tab bas ise badalna, abhi sitemap sahi se map rahega
    canonical: "https://portfolio-omega-five-sz84sz7cb9.vercel.app", 
  },
  
  // 1. WhatsApp, Facebook aur LinkedIn ke liye (Open Graph)
  openGraph: {
    title: "Studio Nitesh | Next.js Developer & Digital Marketing Expert",
    description: "High-performance Full Stack Developer in India specializing in Next.js, MERN stack, Shopify, and WordPress customization.",
    url: "https://portfolio-omega-five-sz84sz7cb9.vercel.app",
    siteName: "Studio Nitesh",
    images: [
      {
        url: "https://portfolio-omega-five-sz84sz7cb9.vercel.app/projects/og-image.jpg", // Aapki image ka absolute URL
        width: 1200,
        height: 630,
        alt: "Studio Nitesh Portfolio Thumbnail",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 2. Twitter ke liye
  twitter: {
    card: "summary_large_image",
    title: "Studio Nitesh | Next.js Developer & Digital Marketing Expert",
    description: "High-performance Full Stack Developer in India specializing in Next.js, MERN stack, Shopify, and WordPress customization.",
    images: ["https://portfolio-omega-five-sz84sz7cb9.vercel.app/projects/og-image.jpg"],
  },

  other: {
    "google-site-verification": "wMNSAN6beMZxE7dUCE_UV2TpP3CSBTbSXAtmVJXleqE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScroll>
          <CursorGlow />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}