import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi du formulaire
    setTimeout(() => {
      toast({
        title: "Message envoyé !",
        description: "Je vous répondrai dans les plus brefs délais.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "contact@monportfolio.fr",
      link: "mailto:contact@monportfolio.fr"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Téléphone",
      value: "+33 6 XX XX XX XX",
      link: "tel:+33600000000"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Localisation",
      value: "Paris, France",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      name: "GitHub",
      url: "https://github.com",
      color: "hover:text-foreground"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: "LinkedIn",
      url: "https://linkedin.com",
      color: "hover:text-blue-400"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      name: "Twitter",
      url: "https://twitter.com",
      color: "hover:text-blue-400"
    }
  ];

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Contactez-moi
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Vous avez un projet, une question ou simplement envie de discuter ?
            N'hésitez pas à me contacter !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="glass-card p-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-semibold mb-6">Envoyez-moi un message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="glass-card"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="glass-card"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Sujet *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="glass-card"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="glass-card"
                  rows={6}
                  placeholder="Décrivez votre projet ou votre demande..."
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full glow-border"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer le message
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Informations de contact</h3>
              
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <Card 
                    key={info.title}
                    className="glass-card p-4 hover:scale-105 transition-all duration-300 group"
                  >
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="flex items-center gap-4 group-hover:text-primary transition-colors duration-300"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          {info.icon}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{info.title}</p>
                          <p className="text-sm text-foreground/70">{info.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          {info.icon}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{info.title}</p>
                          <p className="text-sm text-foreground/70">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Retrouvez-moi sur</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="sm"
                    className={`glass-card hover:scale-110 transition-all duration-300 ${social.color}`}
                    onClick={() => window.open(social.url, '_blank')}
                  >
                    {social.icon}
                  </Button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <Card className="glass-card p-6">
              <h4 className="font-semibold mb-2 text-foreground">Disponibilité</h4>
              <p className="text-sm text-foreground/70 mb-2">
                Actuellement ouvert aux nouvelles opportunités
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">Disponible pour freelance</span>
              </div>
            </Card>

            {/* Response Time */}
            <Card className="glass-card p-6">
              <h4 className="font-semibold mb-2 text-foreground">Temps de réponse</h4>
              <p className="text-sm text-foreground/70">
                Je réponds généralement sous <span className="font-medium text-primary">24 heures</span> aux messages reçus du lundi au vendredi.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;