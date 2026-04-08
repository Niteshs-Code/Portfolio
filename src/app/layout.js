import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";

import "./globals.css";


export const metadata = {
  title: "Nitesh Portfolio",
  description: "Full Stack Developer",
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