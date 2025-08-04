import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import InteractiveCard from "./InteractiveCard";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await supabase
        .from("profile")
        .select("*")
        .limit(1)
        .single();
      
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://ebtufiefalvzuuqoaxhc.supabase.co/functions/v1/send-contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast({
          title: t('toast.message.sent'),
          description: t('toast.message.sent.desc'),
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: t('toast.error'),
        description: t('toast.message.error'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "khabarachraf@gmail.com",
      link: "mailto:khabarachraf@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: t('contact.form.phone'),
      value: profile?.phone || "+33 6 XX XX XX XX",
      link: profile?.phone ? `tel:${profile.phone}` : "tel:+33600000000"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: t('contact.info.location'),
      value: profile?.location || "Paris, France",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      name: "GitHub",
      url: profile?.github_url || "https://github.com/Ashraf-Khabar/",
      color: "hover:text-foreground"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: "LinkedIn",
      url: profile?.linkedin_url || "https://www.linkedin.com/in/achraf-khabar/",
      color: "hover:text-blue-400"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      name: "Twitter",
      url: profile?.twitter_url || "https://twitter.com",
      color: "hover:text-blue-400"
    }
  ].filter(link => link.url && link.url !== "");

  const getAvailabilityStatus = () => {
    if (!profile) return { text: t('contact.availability.status'), color: 'text-orange-400' };
    
    switch (profile.availability_status) {
      case 'available':
        return { text: t('admin.availability.available'), color: 'text-green-400' };
      case 'freelance':
        return { text: t('contact.availability.freelance'), color: 'text-green-400' };
      case 'busy':
        return { text: t('admin.availability.busy'), color: 'text-red-400' };
      case 'cdi':
        return { text: t('admin.availability.cdi'), color: 'text-blue-400' };
      case 'portage':
        return { text: t('admin.availability.portage'), color: 'text-purple-400' };
      case 'open_to_opportunities':
        return { text: t('admin.availability.contract'), color: 'text-orange-400' };
      default:
        return { text: t('contact.availability.status'), color: 'text-orange-400' };
    }
  };

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-primary/15 blur-2xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4 text-shadow animate-bounce-in">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto animate-fade-in-scale" style={{ animationDelay: "0.3s" }}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <InteractiveCard className="glass-card p-8 animate-slide-up hover-lift" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-semibold mb-6 gradient-text">{t('contact.form.title')}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="animate-bounce-in" style={{ animationDelay: "0.4s" }}>
                  <Label htmlFor="name" className="text-foreground font-medium">{t('contact.form.name')} *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="glass-card hover:border-primary/50 transition-all duration-300 focus:neon-glow"
                    placeholder={t('contact.form.name')}
                  />
                </div>
                <div className="animate-bounce-in" style={{ animationDelay: "0.5s" }}>
                  <Label htmlFor="email" className="text-foreground font-medium">{t('contact.form.email')} *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="glass-card hover:border-primary/50 transition-all duration-300 focus:neon-glow"
                    placeholder={t('contact.form.email')}
                  />
                </div>
              </div>

              <div className="animate-bounce-in" style={{ animationDelay: "0.6s" }}>
                <Label htmlFor="subject" className="text-foreground font-medium">{t('contact.form.subject')} *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="glass-card hover:border-primary/50 transition-all duration-300 focus:neon-glow"
                  placeholder={t('contact.form.subject')}
                />
              </div>

              <div className="animate-bounce-in" style={{ animationDelay: "0.7s" }}>
                <Label htmlFor="message" className="text-foreground font-medium">{t('contact.form.message')} *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="glass-card hover:border-primary/50 transition-all duration-300 focus:neon-glow resize-none"
                  rows={6}
                  placeholder={t('contact.form.message')}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full glow-border hover-glow group animate-bounce-in"
                style={{ animationDelay: "0.8s" }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2 group-hover:animate-wiggle" />
                    {t('contact.form.submit')}
                  </>
                )}
              </Button>
            </form>
          </InteractiveCard>

          {/* Contact Info */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div>
              <h3 className="text-2xl font-semibold mb-6 gradient-text">{t('contact.info.title')}</h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <InteractiveCard 
                    key={info.title}
                    className="glass-card p-4 hover-lift group animate-bounce-in"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="flex items-center gap-4 group-hover:text-primary transition-colors duration-300"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 group-hover:animate-heartbeat transition-transform duration-300">
                          {info.icon}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{info.title}</p>
                          <p className="text-sm text-foreground/70">{info.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:animate-heartbeat">
                          {info.icon}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{info.title}</p>
                          <p className="text-sm text-foreground/70">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </InteractiveCard>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="animate-bounce-in" style={{ animationDelay: "1s" }}>
              <h4 className="text-lg font-semibold mb-4 gradient-text">{t('contact.social.title')}</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="sm"
                    className={`glass-card hover:scale-110 hover-glow transition-all duration-300 group animate-bounce-in ${social.color}`}
                    style={{ animationDelay: `${1.1 + index * 0.1}s` }}
                    onClick={() => window.open(social.url, '_blank')}
                  >
                    <span className="group-hover:animate-wiggle">{social.icon}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <InteractiveCard className="glass-card p-6 animate-bounce-in" style={{ animationDelay: "1.4s" }}>
              <h4 className="font-semibold mb-2 text-foreground">{t('contact.availability.title')}</h4>
              <p className="text-sm text-foreground/70 mb-2">
                {profile?.availability_details || t('contact.availability.status')}
              </p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-heartbeat ${getAvailabilityStatus().color.includes('green') ? 'bg-green-400' : getAvailabilityStatus().color.includes('red') ? 'bg-red-400' : getAvailabilityStatus().color.includes('blue') ? 'bg-blue-400' : getAvailabilityStatus().color.includes('purple') ? 'bg-purple-400' : 'bg-orange-400'}`}></div>
                <span className={`text-xs font-medium ${getAvailabilityStatus().color}`}>{getAvailabilityStatus().text}</span>
              </div>
            </InteractiveCard>

            {/* Response Time */}
            <InteractiveCard className="glass-card p-6 animate-bounce-in" style={{ animationDelay: "1.6s" }}>
              <h4 className="font-semibold mb-2 text-foreground">{t('contact.response.title')}</h4>
              <p className="text-sm text-foreground/70">
                {t('contact.response.desc')}
              </p>
            </InteractiveCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;