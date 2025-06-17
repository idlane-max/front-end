import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Avis.css"; // Importez le fichier CSS

const reviews = [
  {
    name: "John D.",
    date: "1 day ago",
    avatar: "🧑",
    text: "Super expérience du début à la fin. Réservation facile et un personnel serviable. Je recommande vivement cette appli 📍",
  },
  {
    name: "Sarah W.",
    date: "5 days ago",
    avatar: "👩",
    text: "Super expérience du début à la fin. Réservation facile et un personnel serviable. Je recommande vivement cette appli 📍",
  },
  {
    name: "David R.",
    date: "1 month ago",
    avatar: "👨",
    text: "Super expérience du début à la fin. Réservation facile et un personnel serviable. Je recommande vivement cette appli 📍",
  },
];

export default function Avis() {
  const navigate = useNavigate();

  return (
    <div className="avis-container">
      {/* Header */}
      <div className="avis-header">
        <button className="header-button">←</button>
        <h1 className="text-xl font-semibold tracking-wide">Notes & Commentaires</h1>
        <button className="header-button">🔍</button>
      </div>

      {/* Titre principal */}
      <h2 className="main-title">
        Avis des Utilisateurs
      </h2>

      {/* Liste des avis */}
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="review-card"
            style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
          >
            <div className="review-avatar">
              {review.avatar}
            </div>

            <div className="review-content">
              <div className="review-header">
                <h3 className="review-name">{review.name}</h3>
                <span className="review-date">{review.date}</span>
              </div>
              <div className="stars-container">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="#facc15" color="#facc15" size={18} />
                ))}
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton flottant */}
      <button
        onClick={() => navigate("/ajouter")}
        className="floating-button"
      >
        +
      </button>
    </div>
  );
}