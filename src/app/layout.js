import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";

import "./globals.css";


export const metadata = {
 title: "Nitesh | Expert Next.js Developer for Scalable Web Applications",
  description: "Transforming ideas into high-performance digital products. Specialized in Next.js, React, and MERN stack. Hire a reliable Full Stack Developer in India for fast & SEO-ready websites.",
  keywords: [
    "Hire Next.js Developer India",
    "Full Stack Freelancer for Startups",
    "Professional MERN Stack Services",
    "Next.js SEO Optimization Expert",
    "Custom Web Application Development"
  ],
  other: {
    "google-site-verification": "wMNSAN6beMZxE7dUCE_UV2TpP3CSBTbSXAtmVJXleqE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <CursorGlow/>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}