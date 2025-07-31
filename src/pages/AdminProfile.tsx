import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Save, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface Profile {
  id?: string;
  availability_status: string;
  availability_details: string;
  phone: string;
  location: string;
  bio: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
}

const AdminProfile = () => {
  const [profile, setProfile] = useState<Profile>({
    availability_status: 'available',
    availability_details: '',
    phone: '',
    location: 'Paris, France',
    bio: '',
    github_url: 'https://github.com/Ashraf-Khabar/',
    linkedin_url: 'https://www.linkedin.com/in/achraf-khabar/',
    twitter_url: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: t('toast.error'),
        description: "Impossible de charger le profil",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const profileData = {
        availability_status: profile.availability_status,
        availability_details: profile.availability_details || '',
        phone: profile.phone || '',
        location: profile.location || 'Paris, France',
        bio: profile.bio || '',
        github_url: profile.github_url || '',
        linkedin_url: profile.linkedin_url || '',
        twitter_url: profile.twitter_url || '',
      };

      if (profile.id) {
        const { error } = await supabase
          .from("profile")
          .update(profileData)
          .eq("id", profile.id);
        if (error) throw error;
      } else {
        const { error, data } = await supabase
          .from("profile")
          .insert([profileData])
          .select()
          .single();
        if (error) throw error;
        setProfile({ ...profile, id: data.id });
      }

      toast({
        title: t('toast.success'),
        description: t('toast.profile.saved'),
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: t('toast.error'),
        description: "Impossible de sauvegarder le profil",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const availabilityOptions = [
    { value: 'available', label: t('admin.availability.available') },
    { value: 'busy', label: t('admin.availability.busy') },
    { value: 'freelance', label: t('admin.availability.freelance') },
    { value: 'cdi', label: t('admin.availability.cdi') },
    { value: 'portage', label: t('admin.availability.portage') },
    { value: 'open_to_opportunities', label: t('admin.availability.contract') },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Card className="glass-card p-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold gradient-text">{t('admin.profile.title')}</h2>
      </div>

      <div className="grid gap-6">
        {/* Availability Status */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="availability_status">{t('admin.profile.availability')}</Label>
            <Select
              value={profile.availability_status}
              onValueChange={(value) => setProfile({ ...profile, availability_status: value })}
            >
              <SelectTrigger className="glass-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availabilityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="phone">{t('admin.profile.phone')}</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="glass-card"
              placeholder="+33 6 XX XX XX XX"
            />
          </div>
        </div>

        {/* Availability Details */}
        <div>
          <Label htmlFor="availability_details">{t('admin.profile.details')}</Label>
          <Textarea
            id="availability_details"
            value={profile.availability_details}
            onChange={(e) => setProfile({ ...profile, availability_details: e.target.value })}
            className="glass-card"
            rows={3}
            placeholder="Détails sur votre disponibilité..."
          />
        </div>

        {/* Location & Bio */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location">{t('admin.profile.location')}</Label>
            <Input
              id="location"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="glass-card"
              placeholder="Paris, France"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="bio">{t('admin.profile.bio')}</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="glass-card"
            rows={4}
            placeholder="Votre biographie professionnelle..."
          />
        </div>

        <Separator />

        {/* Social URLs */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Réseaux Sociaux</h3>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="github_url">{t('admin.profile.github')}</Label>
              <Input
                id="github_url"
                value={profile.github_url}
                onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                className="glass-card"
                placeholder="https://github.com/username"
              />
            </div>

            <div>
              <Label htmlFor="linkedin_url">{t('admin.profile.linkedin')}</Label>
              <Input
                id="linkedin_url"
                value={profile.linkedin_url}
                onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                className="glass-card"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <Label htmlFor="twitter_url">{t('admin.profile.twitter')}</Label>
              <Input
                id="twitter_url"
                value={profile.twitter_url}
                onChange={(e) => setProfile({ ...profile, twitter_url: e.target.value })}
                className="glass-card"
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="glow-border"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Sauvegarde...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {t('admin.profile.save')}
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AdminProfile;