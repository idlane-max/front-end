import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home1 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home2');
    }, 3000); // 3000 ms = 3 secondes

    return () => clearTimeout(timer); // Nettoyage du timer
  }, [navigate]);

  return (
    <div style={styles.container}>
      <img
        src="/assets/logo.png" // Remplace par ton chemin réel si besoin
        alt="Logo"
        style={styles.image}
      />
      <p style={styles.message}>Bienvenue sur YDAYS !</p>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // 🔍 Agrandissement de l'image
    width: 250, // Augmenté de 150 à 250
    height: 250, // Augmenté de 150 à 250
    objectFit: 'contain',
  },
  message: {
    marginTop: 30, // Un peu plus d'espace entre l'image et le texte
    // 🔍 Agrandissement de la police
    fontSize: 28, // Augmenté de 18 à 28
    color: '#333',
    fontWeight: 'bold', // Ajout d'un peu de gras pour mieux ressortir
  },
};

export default Home1;