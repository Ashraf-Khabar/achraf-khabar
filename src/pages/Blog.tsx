import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  tags: string[] | null;
  created_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image, tags, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Blog & Articles
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Mes réflexions, tutoriels et découvertes dans le monde du développement
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-card p-6 animate-pulse">
                  <div className="aspect-video bg-muted rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Posts Grid */}
          {!loading && posts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
              {posts.map((post, index) => (
                <Card 
                  key={post.id}
                  className="glass-card overflow-hidden hover:scale-105 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Cover Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                    {post.cover_image ? (
                      <img 
                        src={post.cover_image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:gradient-text transition-all duration-300">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-foreground/70 text-sm mb-4 line-clamp-3">
                      {post.excerpt || "Découvrez cet article passionnant..."}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-foreground/60 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.created_at)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        5 min
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-full justify-between group-hover:bg-primary/10 transition-colors duration-300"
                      onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                    >
                      Lire l'article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && posts.length === 0 && (
            <div className="text-center py-16 animate-fade-in-scale">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-foreground/60" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Aucun article publié
              </h3>
              <p className="text-foreground/70 max-w-md mx-auto">
                Les premiers articles arrivent bientôt ! En attendant, n'hésitez pas à explorer le reste du portfolio.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;