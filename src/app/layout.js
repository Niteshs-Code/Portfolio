import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";

import "./globals.css";


export const metadata = {
  title: "Nitesh | Full Stack Developer in India | Next.js & React Developer",
  description:
    "Nitesh is a Full Stack Developer in India specializing in Next.js, React, and MERN stack. View portfolio, projects, and contact for web development services.",
  keywords: [
    "Full Stack Developer India",
    "Next.js Developer",
    "React Developer Portfolio",
    "MERN Stack Developer",
    "Frontend Developer India",
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