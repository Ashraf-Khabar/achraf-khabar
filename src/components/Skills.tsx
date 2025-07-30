import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const technicalSkills = [
    { name: "Python", level: 90, category: "Backend" },
    { name: "JavaScript", level: 85, category: "Frontend" },
    { name: "React", level: 80, category: "Frontend" },
    { name: "Laravel", level: 85, category: "Backend" },
    { name: "Flask", level: 80, category: "Backend" },
    { name: "Machine Learning", level: 75, category: "AI/ML" },
    { name: "Computer Vision", level: 70, category: "AI/ML" },
    { name: "Oracle DB", level: 80, category: "Database" },
    { name: "MySQL", level: 85, category: "Database" },
    { name: "Git", level: 90, category: "Tools" }
  ];

  const categories = [...new Set(technicalSkills.map(skill => skill.category))];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Compétences Techniques
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un aperçu de mes compétences et technologies maîtrisées
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Card key={category} className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">{category}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {technicalSkills
                  .filter(skill => skill.category === category)
                  .map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;