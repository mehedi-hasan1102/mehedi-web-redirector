import type { Metadata } from "next";
import "./globals.css";
// import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import InfiniteMarquee from "./components/InfiniteMarquee";

export const metadata: Metadata = {
  title: "Mehedi Hasan | Developer, Storyteller & Technical Writer",
  description: "Discover Mehedi Hasan’s portfolio of Next.js and React projects, case studies, and technical writing. Learn through stories and code.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=document.cookie.match(/(?:^|; )theme=([^;]+)/);var t=m?decodeURIComponent(m[1]):'dark';if(t==='light'){document.documentElement.classList.add('light-mode');}else{document.documentElement.classList.remove('light-mode');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <Navbar />
        {/* <ThemeToggle /> */}
        {children}
        <Contact />
        <InfiniteMarquee />
      </body>
    </html>
  );
}
