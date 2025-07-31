import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="glass-card hover:scale-105 transition-all duration-300 group"
    >
      <Languages className="w-4 h-4 mr-2 group-hover:animate-wiggle" />
      <span className="font-medium">{language === 'en' ? 'FR' : 'EN'}</span>
    </Button>
  );
};

export default LanguageToggle;