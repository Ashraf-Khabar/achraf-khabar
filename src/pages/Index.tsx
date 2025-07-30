import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import ProjectsWithSearch from "@/components/ProjectsWithSearch";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ScrollProgressBar />
      <div className="relative z-20">
        <Header />
        <Hero />
        <About />
        <Skills />
        <ProjectsWithSearch />
        <Contact />
        <BackToTop />
      </div>
      <ParticleBackground />
    </div>
  );
};

export default Index;
