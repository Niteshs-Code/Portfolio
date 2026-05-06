import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";

import "./globals.css";


export const metadata = {
 "title": "Professional Web Development Services | Custom Business Solutions & SaaS",
  "description": "Transform your business with high-performance web solutions. We build fast, secure, and SEO-ready websites tailored for growth. From startups to enterprises, get scalable digital products that deliver results.",
  "keywords": [
    "Web Development Services India",
    "Hire Full Stack Developer for Business",
    "Custom SaaS Product Development",
    "Professional Website Builder for Startups",
    "Enterprise Web Applications India",
    "Digital Transformation Expert",
    "Affordable Web Development Agency",
    "High Performance Business Websites"
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