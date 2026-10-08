import {
  getBioData,
  getServicesData,
  getProjectsData,
  getSkillsData,
} from '@/lib/content';

import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Journey from '@/components/Journey';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

export default function HomePage() {
  const bio = getBioData();
  const services = getServicesData();
  const projects = getProjectsData();
  const skillsData = getSkillsData();

  return (
    <main>
      <Hero bio={bio} />
      <Marquee items={bio.marquee} />
      <About bio={bio} />
      <Journey />
      <Services services={services} />
      <Projects projects={projects} />
      <Skills skillsData={skillsData} />
      <Testimonials />
      <Contact bio={bio} />
    </main>
  );
}
