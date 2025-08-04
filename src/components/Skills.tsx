import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import InteractiveCard from "./InteractiveCard";
import { Code, Server, Database, Cloud, TestTube, Settings, Brain, Cpu } from "lucide-react";

const Skills = () => {
  const { t } = useLanguage();
  const [animatedSkills, setAnimatedSkills] = useState<{[key: string]: number}>({});
  
  const technicalSkills = [
    { name: "Python", level: 90, category: "Backend", icon: Code },
    { name: "JavaScript", level: 85, category: "Frontend", icon: Code },
    { name: "React", level: 80, category: "Frontend", icon: Code },
    { name: "Laravel", level: 85, category: "Backend", icon: Server },
    { name: "Docker", level: 88, category: "DevOps", icon: Settings },
    { name: "Kubernetes", level: 82, category: "DevOps", icon: Cloud },
    { name: "Terraform", level: 85, category: "DevOps", icon: Settings },
    { name: "Ansible", level: 80, category: "DevOps", icon: Settings },
    { name: "Jenkins", level: 87, category: "DevOps", icon: Settings },
    { name: "Machine Learning", level: 75, category: "AI/ML", icon: Brain },
    { name: "Computer Vision", level: 70, category: "AI/ML", icon: Brain },
    { name: "Oracle DB", level: 80, category: "Database", icon: Database },
    { name: "MySQL", level: 85, category: "Database", icon: Database },
    { name: "Selenium", level: 92, category: "Testing", icon: TestTube },
    { name: "AWS", level: 83, category: "Cloud", icon: Cloud },
    { name: "Azure", level: 78, category: "Cloud", icon: Cloud }
  ];

  const categories = [
    { name: "Backend", icon: Server, color: "text-blue-400" },
    { name: "Frontend", icon: Code, color: "text-green-400" },
    { name: "DevOps", icon: Settings, color: "text-purple-400" },
    { name: "Database", icon: Database, color: "text-orange-400" },
    { name: "Testing", icon: TestTube, color: "text-red-400" },
    { name: "AI/ML", icon: Brain, color: "text-pink-400" },
    { name: "Cloud", icon: Cloud, color: "text-cyan-400" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const animated: {[key: string]: number} = {};
      technicalSkills.forEach(skill => {
        animated[skill.name] = skill.level;
      });
      setAnimatedSkills(animated);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getCategoryInfo = (categoryName: string) => {
    return categories.find(cat => cat.name === categoryName) || { name: categoryName, icon: Cpu, color: "text-gray-400" };
  };

  return (
    <section className="py-20 bg-background/90 backdrop-blur-sm relative overflow-hidden z-10">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-primary/15 blur-2xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold gradient-text mb-4 text-shadow">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const categorySkills = technicalSkills.filter(skill => skill.category === category.name);
            const IconComponent = category.icon;
            
            return (
              <InteractiveCard 
                key={category.name} 
                className="glass-card border-border/50 animate-bounce-in hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 ${category.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <Badge variant="outline" className="shimmer animate-rainbow">
                        {category.name}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categorySkills.map((skill, skillIndex) => {
                    const SkillIcon = skill.icon;
                    return (
                      <div 
                        key={skill.name} 
                        className="space-y-2 group hover:scale-105 transition-transform duration-300"
                        style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <SkillIcon className="w-4 h-4 text-primary group-hover:animate-wiggle" />
                            <span className="font-medium text-foreground">{skill.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground font-bold">
                            {animatedSkills[skill.name] || 0}%
                          </span>
                        </div>
                        <div className="relative">
                          <Progress 
                            value={animatedSkills[skill.name] || 0} 
                            className="h-3 group-hover:neon-glow transition-all duration-300" 
                          />
                          {animatedSkills[skill.name] >= 85 && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-heartbeat"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </InteractiveCard>
            );
          })}
        </div>

        {/* Fun stats section */}
        <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: "1s" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-card p-6 hover-glow group cursor-pointer">
              <div className="text-3xl font-bold gradient-text group-hover:animate-heartbeat">15+</div>
              <div className="text-sm text-muted-foreground">{t('skills.stats.technologies')}</div>
            </div>
            <div className="glass-card p-6 hover-glow group cursor-pointer">
              <div className="text-3xl font-bold gradient-text group-hover:animate-heartbeat">5+</div>
              <div className="text-sm text-muted-foreground">{t('skills.stats.experience')}</div>
            </div>
            <div className="glass-card p-6 hover-glow group cursor-pointer">
              <div className="text-3xl font-bold gradient-text group-hover:animate-heartbeat">50+</div>
              <div className="text-sm text-muted-foreground">{t('skills.stats.projects')}</div>
            </div>
            <div className="glass-card p-6 hover-glow group cursor-pointer">
              <div className="text-3xl font-bold gradient-text group-hover:animate-heartbeat">100%</div>
              <div className="text-sm text-muted-foreground">{t('skills.stats.satisfaction')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;