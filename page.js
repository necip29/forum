"use client"

import { useState, useEffect } from "react"

const recipes = {
  poulet: {
    title: "Poulet rôti aux herbes",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=400&fit=crop",
    time: "45 min",
    difficulty: "Intermédiaire",
    servings: "4 personnes",
    author: "Marie C.",
    rating: "4.8",
    likes: 245,
    description: "Un poulet rôti croustillant avec un mélange parfumé de thym, romarin et lavande. Parfait pour un dimanche en famille.",
    ingredients: [
      "1 poulet entier (1.5 kg)",
      "4 cs d'huile d'olive",
      "3 branches de thym frais",
      "2 branches de romarin",
      "1 tête d'ail coupée en deux",
      "1 citron",
      "Sel et poivre noir",
      "30g de beurre"
    ],
    steps: [
      "Préchauffez le four à 200°C (th. 7).",
      "Séchez le poulet avec du papier absorbant.",
      "Frottez le poulet avec l'huile dolive, le sel et le poivre.",
      "Placez les herbes et l'ail à l'intérieur du poulet.",
      "Badigeonnez de beurre ramolli.",
      "Placez le poulet dans un plat et enfournez 45 min.",
      "Retournez à mi-cuisson et arrosez de jus.",
      "Laissez reposer 10 min avant de servir."
    ],
    tips: [
      "Pour une peau plus croustillante, badigeonnez de beurre 15 min avant la fin.",
      "Vérifiez la cuisson avec un thermomètre: 74°C au cœur.",
      "Servez avec des légumes rôtis ou des pommes de terre."
    ]
  },
  fondant: {
    title: "Fondant au chocolat",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=400&fit=crop",
    time: "40 min",
    difficulty: "Intermédiaire",
    servings: "6 personnes",
    author: "Jean L.",
    rating: "5.0",
    likes: 389,
    description: "Le dessert incontourn pour les amateurs de chocolat. Un cœur coulant fondant qui ravira tous les palais.",
    ingredients: [
      "200g de chocolat noir",
      "100g de beurre",
      "100g de sucre",
      "3 œufs + 3 jaunes",
      "50g de farine",
      "1 pointe de sel",
      "Sucre glace pour saupoudrer"
    ],
    steps: [
      "Préchauffez le four à 220°C (th. 8).",
      "Faites fondre chocolat et beurre au bain-marie.",
      "Fouettez les œufs avec le sucre jusqu'à blanchiment.",
      "Incorporez le mélange chocolat aux œufs.",
      "Ajoutez la farine et le sel, mélbez bien.",
      "Beurrez et farinez 6 ramequins.",
      "Répartissez la pâte et enfournez 12-14 min.",
      "Démoulez sofort et saupoudrez de sucre glace."
    ],
    tips: [
      "Ne dépassez pas le temps de cuisson pour garder le cœur coulant.",
      "Vous pouvez préparer à l'avance et réchauffez 8 min.",
      "Servez avec une boule de glace à la vanille."
    ]
  }
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [modalRecipe, setModalRecipe] = useState(null)
  const [statsCounted, setStatsCounted] = useState({ members: 0, recipes: 0, discussions: 0, favorites: 0 })

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }
  }, [darkMode])

  useEffect(() => {
    const animateCount = (target, key, duration = 2000) => {
      let start = 0
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setStatsCounted(prev => ({ ...prev, [key]: target }))
          clearInterval(timer)
        } else {
          setStatsCounted(prev => ({ ...prev, [key]: Math.floor(start) }))
        }
      }, 16)
    }
    animateCount(52000, "members")
    animateCount(12500, "recipes")
    animateCount(89000, "discussions")
    animateCount(4500, "favorites")
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll(".reveal-up").forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const openRecipeModal = (recipeKey) => {
    setModalRecipe(recipes[recipeKey])
  }

  const closeModal = () => {
    setModalRecipe(null)
  }

  const recipeCards = [
    { key: "poulet", category: "plat", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop", time: "45 min", difficulty: "intermediate", categoryLabel: "Plats principaux", rating: "4.8", title: "Poulet rôti aux herbes", author: "Marie C.", likes: 245 },
    { key: "fondant", category: "dessert", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop", time: "40 min", difficulty: "intermediate", categoryLabel: "Desserts", rating: "5.0", title: "Fondant au chocolat", author: "Jean L.", likes: 389 },
    { key: "saladegrecque", category: "entree", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop", time: "15 min", difficulty: "easy", categoryLabel: "Entrées", rating: "4.2", title: "Salade grecque authentique", author: "Nikos K.", likes: 178 },
    { key: "saumon", category: "plat", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop", time: "35 min", difficulty: "intermediate", categoryLabel: "Plats principaux", rating: "4.7", title: "Saumon grillé à la crème", author: "Sophie B.", likes: 312 },
    { key: "tiramisu", category: "dessert", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop", time: "30 min", difficulty: "easy", categoryLabel: "Desserts", rating: "4.9", title: "Tiramisu italiano", author: "Anna R.", likes: 456 },
    { key: "mojito", category: "boisson", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop", time: "10 min", difficulty: "easy", categoryLabel: "Boissons", rating: "4.3", title: "Mojito rafraîchissant", author: "Pierre M.", likes: 201 },
    { key: "pizza", category: "plat", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop", time: "50 min", difficulty: "hard", categoryLabel: "Plats principaux", rating: "4.9", title: "Pizza napolitaine", author: "Luca M.", likes: 567 },
    { key: "tajine", category: "plat", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop", time: "60 min", difficulty: "intermediate", categoryLabel: "Plats principaux", rating: "4.6", title: "Tajine Marocain", author: "Fatima H.", likes: 423 },
    { key: "cheesecake", category: "dessert", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop", time: "25 min", difficulty: "easy", categoryLabel: "Desserts", rating: "4.8", title: "Cheesecake NY", author: "Emma W.", likes: 334 },
    { key: "bruschetta", category: "entree", image: "https://images.unsplash.com/photo-1626645738196-c2a72c7d8e70?w=400&h=300&fit=crop", time: "30 min", difficulty: "intermediate", categoryLabel: "Entrées", rating: "4.5", title: "Bruschetta italiana", author: "Roberto P.", likes: 189 },
    { key: "risotto", category: "plat", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop", time: "40 min", difficulty: "intermediate", categoryLabel: "Plats principaux", rating: "4.9", title: "Risotto aux champignons", author: "Giovanni M.", likes: 298 },
    { key: "smoothie", category: "boisson", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop", time: "5 min", difficulty: "easy", categoryLabel: "Boissons", rating: "4.7", title: "Smoothie detox", author: "Claire B.", likes: 167 }
  ]

  const threads = [
    { avatar: "AH", title: "Comment réussir sa pâte à pizza?", preview: "Je cherche des conseils pour une pâte bien croustillante...", user: "Ahmed H.", time: "Il y a 2h", replies: 24 },
    { avatar: "LF", title: "RecetteTagine Marocain authentique", preview: "Partage de ma recette de tajine aux pruneaux et amandes...", user: "Leila F.", time: "Il y a 5h", replies: 56 },
    { avatar: "MB", title: "Quel robot cuiseur choisir en 2026?", preview: "Comparatif entre Thermomix, Cookéo et autres...", user: "Michel B.", time: "Il y a 8h", replies: 89 },
    { avatar: "CD", title: "Conservation des aliments: les règles à savoir", preview: "Guide complet pour bien conserver vos preparations...", user: "Claire D.", time: "Il y a 12h", replies: 34 }
  ]

  const members = [
    { name: "Marie Cuisine", title: "Chef Professionnel", recipes: 245, hearts: "12.5k", badge: "gold" },
    { name: "Jean Pâtissier", title: "Passionné de desserts", recipes: 189, hearts: "8.2k", badge: "silver" },
    { name: "Sophie Bio", title: "Cuisine healthy", recipes: 156, hearts: "6.8k", badge: "bronze" },
    { name: "Nikos Chef", title: "Cuisine grecque", recipes: 134, hearts: "5.1k", badge: "" }
  ]

  const filteredRecipes = activeFilter === "all" ? recipeCards : recipeCards.filter(r => r.category === activeFilter)

  const difficultyLabels = { easy: "Facile", intermediate: "Intermédiaire", hard: "Difficile" }

  return (
    <>
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Mode sombre">
        <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
      </button>

      <header>
        <nav>
          <div className="logo">
            <i className="fas fa-utensils"></i>
            <span>Cook<span className="accent">Nation</span></span>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Rechercher recettes, discussions..." />
            <button><i className="fas fa-search"></i></button>
          </div>
          <ul className="nav-links">
            <li><a href="#home" className="active">Accueil</a></li>
            <li><a href="#recipes">Recettes</a></li>
            <li><a href="#forum">Forum</a></li>
            <li><a href="#community">Communauté</a></li>
            <li><a href="#login" className="btn-login"><i className="fas fa-user"></i> Connexion</a></li>
          </ul>
          <button className="menu-toggle" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="hero-content">
          <span className="badge fade-in"><i className="fas fa-fire"></i> Communauté de 50,000+ cuisiniers</span>
          <h1 className="fade-in delay-1">Partagez votre passion pour la <span className="highlight">cuisine</span></h1>
          <p className="fade-in delay-2">Rejoignez CookNation: le forum où les passionnés de cuisine se retrouvent pour échanger recettes, conseils et techniques.</p>
          <div className="hero-buttons fade-in delay-3">
            <a href="#register" className="btn btn-primary">Rejoindre la communauté</a>
            <a href="#recipes" className="btn btn-outline">Découvrir les recettes</a>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <i className="fas fa-users"></i>
              <span className="stat-number">{statsCounted.members.toLocaleString()}</span>
              <span className="stat-label">Membres</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-book-open"></i>
              <span className="stat-number">{statsCounted.recipes.toLocaleString()}</span>
              <span className="stat-label">Recettes</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-comments"></i>
              <span className="stat-number">{statsCounted.discussions.toLocaleString()}</span>
              <span className="stat-label">Discussions</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-star"></i>
              <span className="stat-number">{statsCounted.favorites.toLocaleString()}</span>
              <span className="stat-label">Recettes favorites</span>
            </div>
          </div>
        </div>
      </section>

      <section id="recipes" className="recipes">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Recettes populaires</span>
            <h2>Les recettes du moment</h2>
            <p>Découvrez les recettes les plus aimées par notre communauté cette semaine.</p>
          </div>
          <div className="recipe-filters reveal-up">
            <button className={`filter-btn ${activeFilter === "all" ? "active" : ""}`} onClick={() => setActiveFilter("all")}>Toutes</button>
            <button className={`filter-btn ${activeFilter === "entree" ? "active" : ""}`} onClick={() => setActiveFilter("entree")}>Entrées</button>
            <button className={`filter-btn ${activeFilter === "plat" ? "active" : ""}`} onClick={() => setActiveFilter("plat")}>Plats principaux</button>
            <button className={`filter-btn ${activeFilter === "dessert" ? "active" : ""}`} onClick={() => setActiveFilter("dessert")}>Desserts</button>
            <button className={`filter-btn ${activeFilter === "boisson" ? "active" : ""}`} onClick={() => setActiveFilter("boisson")}>Boissons</button>
          </div>
          <div className="recipes-grid">
            {filteredRecipes.map((recipe, idx) => (
              <article key={recipe.key} className={`recipe-card reveal-up delay-${(idx % 4) + 1}`}>
                <div className="recipe-image" style={{ background: `url('${recipe.image}') center/cover` }}>
                  <span className="recipe-time"><i className="fas fa-clock"></i> {recipe.time}</span>
                  <span className={`recipe-difficulty ${recipe.difficulty}`}>{difficultyLabels[recipe.difficulty]}</span>
                </div>
                <div className="recipe-content">
                  <div className="recipe-meta">
                    <span className="category">{recipe.categoryLabel}</span>
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className={`fas ${parseFloat(recipe.rating) >= 4.8 ? "fa-star" : "fa-star-half-alt"}`}></i>
                      <span>{recipe.rating}</span>
                    </div>
                  </div>
                  <h3>{recipe.title}</h3>
                  <p>{recipe.key === "fondant" ? "Gâteau au cœur coulant de chocolat noir超好吃." : recipe.key === "saladegrecque" ? "Tomates, concombres, olives feta et olive oil." : recipe.key === "mojito" ? "Cocktail cubain avec menthe thérapeutische et citron vert." : `Délicieux plat préparée par ${recipe.author}.`}</p>
                  <div className="recipe-footer">
                    <div className="author">
                      <div className="author-avatar">{recipe.author.split(" ").map(n => n[0]).join("")}</div>
                      <span>{recipe.author}</span>
                    </div>
                    <div className="recipe-actions">
                      <button className="recipe-btn" onClick={() => openRecipeModal(recipe.key)}>
                        <i className="fas fa-book-open"></i> Voir
                      </button>
                      <button className="like-btn"><i className="far fa-heart"></i> {recipe.likes}</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="forum" className="forum">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Forum de discussion</span>
            <h2>Dernières discussions</h2>
            <p>Échangez avec la communauté sur vos sujets culinaire préférés.</p>
          </div>
          <div className="forum-categories reveal-up">
            <div className="category-card">
              <div className="category-icon"><i className="fas fa-knife"></i></div>
              <div className="category-info">
                <h4>Techniques de cuisine</h4>
                <p>Conseils et astuces pour maîtriser les bases</p>
                <span className="topic-count"><i className="fas fa-comments"></i> 2,450 sujets</span>
              </div>
            </div>
            <div className="category-card">
              <div className="category-icon"><i className="fas fa-carrot"></i></div>
              <div className="category-info">
                <h4>Ingrédients & courses</h4>
                <p>Où trouver les meilleurs produits</p>
                <span className="topic-count"><i className="fas fa-comments"></i> 1,890 sujets</span>
              </div>
            </div>
            <div className="category-card">
              <div className="category-icon"><i className="fas fa-camera"></i></div>
              <div className="category-info">
                <h4>Presentation & photos</h4>
                <p>Astuces pour sublimer vos plats</p>
                <span className="topic-count"><i className="fas fa-comments"></i> 980 sujets</span>
              </div>
            </div>
            <div className="category-card">
              <div className="category-icon"><i className="fas fa-bread-slice"></i></div>
              <div className="category-info">
                <h4>Pain & boulangerie</h4>
                <p>Tout sur la fabrication du pain</p>
                <span className="topic-count"><i className="fas fa-comments"></i> 1,670 sujets</span>
              </div>
            </div>
          </div>
          <div className="recent-threads">
            <h3><i className="fas fa-clock"></i> Sujets récents</h3>
            <div className="thread-list">
              {threads.map((thread, idx) => (
                <div key={idx} className="thread-item reveal-up">
                  <div className="thread-avatar">{thread.avatar}</div>
                  <div className="thread-content">
                    <h4>{thread.title}</h4>
                    <p>{thread.preview}</p>
                    <div className="thread-meta">
                      <span><i className="fas fa-user"></i> {thread.user}</span>
                      <span><i className="fas fa-clock"></i> {thread.time}</span>
                      <span><i className="fas fa-comment"></i> {thread.replies} réponses</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="community" className="community">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Top membres</span>
            <h2>Chefs en vedette</h2>
            <p>Découvrez les membres les plus actifs de notre communauté.</p>
          </div>
          <div className="members-grid">
            {members.map((member, idx) => (
              <div key={idx} className={`member-card reveal-up delay-${idx + 1}`}>
                {member.badge && <div className={`member-badge ${member.badge}`}><i className="fas fa-crown"></i></div>}
                <div className="member-avatar">
                  <span>{member.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <h4>{member.name}</h4>
                <p className="member-title">{member.title}</p>
                <div className="member-stats">
                  <span><i className="fas fa-book"></i> {member.recipes} recettes</span>
                  <span><i className="fas fa-heart"></i> {member.hearts}</span>
                </div>
                <button className="btn-follow">Suivre</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="register" className="cta-section">
        <div className="container">
          <div className="cta-content reveal-up">
            <h2>Rejoignez CookNation!</h2>
            <p>Créez votre compte gratuitement et partagez votre passion pour la cuisine avec des milliers de passionnés.</p>
            <form className="register-form">
              <input type="text" placeholder="Votre pseudo" />
              <input type="email" placeholder="Votre email" />
              <input type="password" placeholder="Mot de passe" />
              <button type="submit" className="btn btn-primary">Créer mon compte</button>
            </form>
            <p className="login-link">Déjà membre? <a href="#login">Se connecter</a></p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <i className="fas fa-utensils"></i>
                <span>Cook<span className="accent">Nation</span></span>
              </div>
              <p>La plus grande communauté de cuisiniers francophones. Partagez, apprenez et culinaryez ensemble!</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="#"><i className="fab fa-tiktok"></i></a>
              </div>
            </div>
            <div className="footer-links">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#home">Accueil</a></li>
                <li><a href="#recipes">Recettes</a></li>
                <li><a href="#forum">Forum</a></li>
                <li><a href="#community">Communauté</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Catégories</h4>
              <ul>
                <li><a href="#">Entrées</a></li>
                <li><a href="#">Plats</a></li>
                <li><a href="#">Desserts</a></li>
                <li><a href="#">Boissons</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Aide</a></li>
                <li><a href="#">Règles du forum</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 CookNation. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {modalRecipe && (
        <div id="recipeModal" className="modal" style={{ display: "flex" }} onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <img src={modalRecipe.image} alt={modalRecipe.title} className="recipe-detail-image" />
            <div className="recipe-detail-content">
              <div className="recipe-detail-header">
                <h2>{modalRecipe.title}</h2>
                <div className="recipe-detail-meta">
                  <span className="time"><i className="fas fa-clock"></i> {modalRecipe.time}</span>
                  <span className="difficulty"><i className="fas fa-signal"></i> {modalRecipe.difficulty}</span>
                  <span><i className="fas fa-users"></i> {modalRecipe.servings}</span>
                  <span><i className="fas fa-user"></i> {modalRecipe.author}</span>
                </div>
              </div>
              <p style={{ marginBottom: "1.5rem" }}>{modalRecipe.description}</p>
              <div className="recipe-section">
                <h3>Ingrédients</h3>
                <ul className="ingredients-list">
                  {modalRecipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                </ul>
              </div>
              <div className="recipe-section">
                <h3>Étapes</h3>
                <ol className="steps-list">
                  {modalRecipe.steps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              </div>
              <div className="recipe-tips">
                <h4><i className="fas fa-lightbulb"></i> Astuces</h4>
                <ul>
                  {modalRecipe.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}