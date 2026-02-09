'use client';

import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import DiagonalMarquee from './components/DiagonalMarquee';
import WhatIDo from './components/WhatIDo';
import GitHubActivity from './components/GitHubActivity';

export default function Home() {
  return (
    <SmoothScroll>
      <main>
  <Hero />
  <DiagonalMarquee />
<About />
 <Skills />
  <Projects />
  <Experience />
  <WhatIDo />

  

 
  
<Certificates />
  <GitHubActivity />
  
</main>
    </SmoothScroll>
  );
}
