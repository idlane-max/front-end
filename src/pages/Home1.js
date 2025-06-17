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
    width: 150,
    height: 150,
    objectFit: 'contain',
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
};

export default Home1;