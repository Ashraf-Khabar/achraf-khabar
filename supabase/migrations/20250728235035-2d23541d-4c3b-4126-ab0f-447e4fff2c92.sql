-- Créer un article de test pour le blog
INSERT INTO public.blog_posts (
  title,
  slug,
  content,
  excerpt,
  tags,
  published
) VALUES (
  'Mon Premier Article de Blog',
  'mon-premier-article-de-blog',
  '<h1>Bienvenue sur mon Blog</h1>

<p>Ceci est mon premier article utilisant l''éditeur de texte riche ! Voici ce que vous pouvez faire :</p>

<h2>Fonctionnalités de l''éditeur</h2>

<ul>
  <li><strong>Texte en gras</strong> et <em>italique</em></li>
  <li><code>Code inline</code> pour les snippets rapides</li>
  <li>Listes à puces et numérotées</li>
  <li>Citations et blocs de code</li>
</ul>

<h3>Exemple de Code</h3>

<pre><code class="language-javascript">// Fonction JavaScript simple
function sayHello(name) {
  console.log(`Bonjour ${name} !`);
  return `Salut ${name}, bienvenue sur mon blog !`;
}

// Utilisation
const message = sayHello("Développeur");
</code></pre>

<blockquote>
  <p>💡 <strong>Astuce :</strong> Vous pouvez utiliser tous les outils de formatage dans la barre d''outils pour créer des articles riches et engageants !</p>
</blockquote>

<h2>Ce qui rend cet éditeur spécial</h2>

<p>L''éditeur supporte :</p>

<ol>
  <li><strong>Coloration syntaxique</strong> pour le code</li>
  <li><strong>Images</strong> via upload ou URL</li>
  <li><strong>Formatage riche</strong> comme dans Word</li>
  <li><strong>Responsive design</strong> sur tous les appareils</li>
</ol>

<p>Parfait pour créer du contenu technique avec style ! 🚀</p>',
  'Découvrez les fonctionnalités de l''éditeur de texte riche avec support pour le code, les images et le formatage avancé.',
  ARRAY['Tutorial', 'Blog', 'Editor'],
  true
);