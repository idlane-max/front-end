// src/pages/Home2.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home2.css'; // IMPORTEZ LE FICHIER CSS

const Home2 = () => {
  const navigate = useNavigate();

  return (
    <div className="home2-container">
      {/* SECTION HAUTE : IMAGES */}
      <div className="top-images-container">
        {/* CORRECTION ICI : Supprimez "image" du texte alt */}
        <img src="/assets/img1.jpg" alt="Vue d'hôtel latérale gauche" className="small-round-image-left" />
        <img src="/assets/img2.jpg" alt="Marina English Point Hotel" className="main-round-image" />
        <img src="/assets/img4.jpg" alt="Piscine et parasols" className="small-round-image-right" />
      </div>

      {/* SECTION BASSE : TEXTES ET BOUTONS */}
      <div className="content-section">
        <h1 className="title">Unleash Your Inner Traveller</h1>
        <p className="description">
          Your passport to a world of extraordinary hotel experiences. Join us today and unlock a realm
          of comfort, luxury, and adventure.
        </p>

        <button
          className="action-button"
          onClick={() => navigate('/page-principale')} // Ou la page d'exploration réelle
        >
          Start Exploring
          <span className="arrow-icon">→</span> {/* Flèche Unicode */}
        </button>

        <p className="login-text">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="login-link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home2;