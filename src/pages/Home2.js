// src/Home2.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home2 = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.imageRow}>
        <img src="/assets/img1.jpg" alt="1" style={styles.roundImage} />
        <img src="/assets/img2.jpg" alt="2" style={styles.roundImage} />
        <img src="/assets/img3.jpg" alt="3" style={styles.roundImage} />
      </div>

      <p style={styles.text}>Découvrez les meilleures activités à Casablanca</p>

      <button style={styles.button} onClick={() => navigate('/page-principale')}>
        Commencer à explorer
      </button>

      <p style={styles.loginText}>
        Vous avez déjà un compte ?{' '}
        <span onClick={() => navigate('/signup')} style={styles.link}>
          Connectez-vous
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  imageRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  roundImage: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#ff4b5c',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    marginBottom: 15,
  },
  loginText: {
    fontSize: 14,
    color: '#444',
  },
  link: {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Home2;