import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

const BlogPostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
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

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-32 mb-8"></div>
              <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
              <div className="aspect-video bg-muted rounded-lg mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 px-6">
          <div className="container mx-auto max-w-4xl text-center py-16">
            <h1 className="text-2xl font-semibold mb-4">Article non trouvé</h1>
            <p className="text-foreground/70 mb-8">
              L'article que vous recherchez n'existe pas ou n'est pas publié.
            </p>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate("/blog")}
            className="mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Retour au blog
          </Button>

          {/* Article Header */}
          <article className="animate-slide-up">
            <header className="mb-8">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Author Info */}
              <div className="mb-4 text-sm text-foreground/80">
                <span>Rédigé par : <span className="font-medium text-foreground">Achraf KHABAR</span>, Ingénieur Software</span>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Publié le {formatDate(post.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{estimateReadingTime(post.content)} min de lecture</span>
                </div>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </div>

              {/* Cover Image */}
              {post.cover_image && (
                <div className="aspect-video rounded-xl overflow-hidden mb-8">
                  <img 
                    src={post.cover_image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </header>

            {/* Article Content */}
            <Card className="glass-card p-8 mb-8">
              <div 
                className="prose prose-gray dark:prose-invert max-w-none prose-headings:gradient-text prose-a:text-primary prose-code:text-primary prose-pre:bg-muted prose-pre:border"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Card>

            {/* Share Section */}
            <Card className="glass-card p-6 text-center">
              <h3 className="text-lg font-semibold mb-4">Cet article vous a plu ?</h3>
              <p className="text-foreground/70 mb-6">
                Partagez-le avec votre réseau ou laissez-moi un commentaire !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="glass-card">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager l'article
                </Button>
                <Button onClick={() => navigate("/#contact")}>
                  Me contacter
                </Button>
              </div>
            </Card>
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogPostDetail;