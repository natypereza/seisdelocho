import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Education } from '@/components/Education';
import { Certifications } from '@/components/Certifications';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="bg-white pt-16 md:pt-20">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Certifications />
      </main>
      <Footer />
    </>
  );
}
