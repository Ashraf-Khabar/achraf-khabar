import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import ProjectsWithSearch from "@/components/ProjectsWithSearch";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Skills />
      <ProjectsWithSearch />
      <Contact />
      <BackToTop />
    </div>
  );
};

export default Index;
