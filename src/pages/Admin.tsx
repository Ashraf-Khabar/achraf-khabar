import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash, Save, Eye, LogOut, PenTool } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/RichTextEditor";
import type { User } from "@supabase/supabase-js";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  tags: string[] | null;
  published: boolean;
  created_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    cover_image: "",
    tags: [],
    published: false,
  });
  const [tagInput, setTagInput] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handleSignIn = async () => {
    const redirectUrl = `${window.location.origin}/admin`;
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'interface d'administration !",
      });
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast({
        title: "Déconnexion",
        description: "À bientôt !",
      });
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les articles",
        variant: "destructive",
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const handleSavePost = async () => {
    if (!currentPost.title || !currentPost.content) {
      toast({
        title: "Erreur",
        description: "Le titre et le contenu sont requis",
        variant: "destructive",
      });
      return;
    }

    const slug = generateSlug(currentPost.title);
    const postData = {
      title: currentPost.title,
      slug,
      content: currentPost.content,
      excerpt: currentPost.excerpt || "",
      cover_image: currentPost.cover_image || null,
      tags: currentPost.tags || [],
      published: currentPost.published || false,
    };

    try {
      if (currentPost.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", currentPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([postData]);
        if (error) throw error;
      }

      toast({
        title: "Succès",
        description: `Article ${currentPost.id ? 'modifié' : 'créé'} avec succès`,
      });
      
      setIsEditing(false);
      setCurrentPost({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        cover_image: "",
        tags: [],
        published: false,
      });
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'article",
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Article supprimé",
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'article",
        variant: "destructive",
      });
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !currentPost.tags?.includes(tagInput.trim())) {
      setCurrentPost({
        ...currentPost,
        tags: [...(currentPost.tags || []), tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCurrentPost({
      ...currentPost,
      tags: currentPost.tags?.filter(tag => tag !== tagToRemove) || [],
    });
  };

  // Auth Form
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="glass-card p-8 w-full max-w-md animate-fade-in-scale">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">Administration</h1>
            <p className="text-foreground/70 mt-2">Connectez-vous pour gérer vos articles</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-card"
              />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-card"
              />
            </div>
            <Button onClick={handleSignIn} className="w-full glow-border">
              Se connecter
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Dashboard Admin</h1>
            <p className="text-foreground/70">Gérez vos articles de blog</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsEditing(true)}
              className="glow-border"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvel Article
            </Button>
            <Button variant="outline" onClick={handleSignOut} className="glass-card">
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Editor */}
        {isEditing && (
          <Card className="glass-card p-6 mb-8 animate-slide-up">
            <h2 className="text-xl font-semibold mb-4">
              {currentPost.id ? "Modifier l'article" : "Nouvel article"}
            </h2>
            
            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    value={currentPost.title}
                    onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                    className="glass-card"
                  />
                </div>
                <div>
                  <Label htmlFor="cover_image">Image de couverture (URL)</Label>
                  <Input
                    id="cover_image"
                    value={currentPost.cover_image || ""}
                    onChange={(e) => setCurrentPost({...currentPost, cover_image: e.target.value})}
                    className="glass-card"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Extrait</Label>
                <Textarea
                  id="excerpt"
                  value={currentPost.excerpt}
                  onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                  className="glass-card"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Contenu</Label>
                <RichTextEditor
                  content={currentPost.content || ""}
                  onChange={(content) => setCurrentPost({...currentPost, content})}
                  placeholder="Commencez à écrire votre article... Utilisez la barre d'outils pour formater le texte, ajouter du code et des images."
                />
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                    placeholder="Ajouter un tag"
                    className="glass-card"
                  />
                  <Button onClick={addTag} variant="outline" size="sm">
                    Ajouter
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentPost.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={currentPost.published}
                  onCheckedChange={(checked) => setCurrentPost({...currentPost, published: checked})}
                />
                <Label>Publier l'article</Label>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button onClick={handleSavePost} className="glow-border">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                  className="glass-card"
                >
                  Annuler
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Posts List */}
        <div className="grid gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-xl font-semibold">Articles ({posts.length})</h2>
          
          {posts.map((post) => (
            <Card key={post.id} className="glass-card p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{post.title}</h3>
                    {post.published ? (
                      <Badge variant="default">Publié</Badge>
                    ) : (
                      <Badge variant="secondary">Brouillon</Badge>
                    )}
                  </div>
                  <p className="text-sm text-foreground/70 mb-2">{post.excerpt}</p>
                  <div className="flex gap-2 text-xs text-foreground/60">
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    {post.tags && <span>• {post.tags.length} tag(s)</span>}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentPost(post);
                      setIsEditing(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {posts.length === 0 && (
            <div className="text-center py-8 text-foreground/60">
              Aucun article créé. Commencez par créer votre premier article !
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;