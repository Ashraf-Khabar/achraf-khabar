import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, PenTool } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.projects'), href: "#projects" },
    { name: t('nav.blog'), href: "/blog" },
    { name: t('nav.contact'), href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg animate-slide-down"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold gradient-text hover:scale-105 hover-glow transition-all duration-300 group"
          >
            <span className="group-hover:animate-wiggle inline-block">Achraf</span>
            {" "}
            <span className="group-hover:animate-rainbow inline-block">KHABAR</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground/80 hover:text-foreground transition-all duration-300 relative group hover:scale-110 animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="group-hover:animate-wiggle inline-block">{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full neon-glow"></span>
              </Link>
            ))}
            
            {/* Language & Theme Toggle */}
            <div className="flex items-center gap-2 animate-bounce-in" style={{ animationDelay: "0.6s" }}>
              <LanguageToggle />
              <ThemeToggle />
            </div>
            
            {/* Admin Button */}
            <Link to="/admin" className="animate-bounce-in" style={{ animationDelay: "0.7s" }}>
              <Button variant="outline" size="sm" className="glass-card hover-glow group">
                <User className="w-4 h-4 mr-2 group-hover:animate-heartbeat" />
                <span className="group-hover:animate-wiggle">Admin</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover-glow group"
            >
              {isMenuOpen ? 
                <X className="w-5 h-5 group-hover:animate-wiggle" /> : 
                <Menu className="w-5 h-5 group-hover:animate-wiggle" />
              }
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 glass-card rounded-lg p-4 animate-slide-up hover-lift">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground/80 hover:text-foreground transition-all duration-300 py-2 hover:scale-105 animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="hover:animate-wiggle inline-block">{item.name}</span>
                </Link>
              ))}
              <Link 
                to="/admin" 
                onClick={() => setIsMenuOpen(false)}
                className="animate-bounce-in"
                style={{ animationDelay: "0.5s" }}
              >
                <Button variant="outline" size="sm" className="w-full glass-card hover-glow group">
                  <User className="w-4 h-4 mr-2 group-hover:animate-heartbeat" />
                  <span className="group-hover:animate-wiggle">Admin</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;