import { useNavigate } from "react-router-dom";
import "./AjouterAvis.css"; // Importez le fichier CSS

export default function AjouterAvis() {
  const navigate = useNavigate();

  return (
    <div className="ajouter-avis-container">
      {/* Header */}
      <div className="ajouter-avis-header">
        <button
          onClick={() => navigate("/")}
          className="back-button"
        >
          ←
        </button>
        <h1 className="ajouter-avis-title">Écrire un avis</h1>
      </div>

      {/* Formulaire */}
      <form className="avis-form">
        <div className="form-group">
          <label className="form-label">
            Nom
          </label>
          <input
            type="text"
            placeholder="Votre nom"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Commentaire
          </label>
          <textarea
            placeholder="Votre avis"
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Note
          </label>
          <select className="form-select">
            <option>⭐ 5 étoiles</option>
            <option>⭐ 4 étoiles</option>
            <option>⭐ 3 étoiles</option>
            <option>⭐ 2 étoiles</option>
            <option>⭐ 1 étoile</option>
          </select>
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          Soumettre l'avis
        </button>
      </form>
    </div>
  );
}