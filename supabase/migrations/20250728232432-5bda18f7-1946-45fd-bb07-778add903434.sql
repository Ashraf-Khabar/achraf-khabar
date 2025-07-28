-- Créer la table pour les articles de blog
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  tags TEXT[],
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Politique pour que tout le monde puisse lire les articles publiés
CREATE POLICY "Tout le monde peut lire les articles publiés" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

-- Politique pour que seuls les utilisateurs authentifiés puissent voir tous les articles
CREATE POLICY "Utilisateurs auth peuvent voir tous les articles" 
ON public.blog_posts 
FOR SELECT 
TO authenticated
USING (true);

-- Politique pour que seuls les utilisateurs authentifiés puissent créer des articles
CREATE POLICY "Utilisateurs auth peuvent créer des articles" 
ON public.blog_posts 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Politique pour que seuls les utilisateurs authentifiés puissent modifier des articles
CREATE POLICY "Utilisateurs auth peuvent modifier des articles" 
ON public.blog_posts 
FOR UPDATE 
TO authenticated
USING (true);

-- Politique pour que seuls les utilisateurs authentifiés puissent supprimer des articles
CREATE POLICY "Utilisateurs auth peuvent supprimer des articles" 
ON public.blog_posts 
FOR DELETE 
TO authenticated
USING (true);

-- Fonction pour mettre à jour les timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement les timestamps
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index pour optimiser les requêtes
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_created_at ON public.blog_posts(created_at DESC);