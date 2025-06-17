import React, { useState } from 'react';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Connexion réussie ! Redirection en cours...');
      // window.location.href = '/profile';
    }, 1500);
  };

  const handleSocial = (type) => {
    alert(`Connexion avec ${type}`);
  };

  return (
    <div style={styles.loginContainer}>
      <h1 style={styles.loginTitle}>
        Bienvenue <span style={{ color: styles.primary }}>à nouveau</span>
      </h1>
      <p style={styles.loginSubtitle}>
        Remplissez vos informations ci-dessous ou connectez-vous avec vos réseaux sociaux.
      </p>
      <form style={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          style={styles.formInput}
          placeholder="Adresse email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          style={styles.formInput}
          placeholder="Mot de passe"
          required
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit" style={styles.loginBtn} disabled={loading}>
          <i className="fas fa-sign-in-alt"></i>
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Connexion en cours...
            </>
          ) : (
            'Connexion'
          )}
        </button>
      </form>
      <div style={styles.separator}>
        <span style={styles.separatorText}>Ou connectez-vous avec</span>
      </div>
      <div style={styles.socialLogin}>
        <button
          style={{ ...styles.socialBtn, ...styles.facebookBtn }}
          type="button"
          onClick={() => handleSocial('Facebook')}
        >
          <i className="fab fa-facebook-f"></i>
        </button>
        <button
          style={{ ...styles.socialBtn, ...styles.googleBtn }}
          type="button"
          onClick={() => handleSocial('Google')}
        >
          <i className="fab fa-google"></i>
        </button>
      </div>
      <p style={styles.loginFooter}>
        Vous n'avez pas de compte ?{' '}
        <a href="/signup" style={styles.loginLink}>Inscrivez-vous</a>
      </p>
    </div>
  );
};

const styles = {
  primary: '#7c3aed',
  primaryHover: '#6d28d9',
  border: '#e5e7eb',
  text: '#1f2937',
  textLight: '#6b7280',
  loginContainer: {
    background: '#fff',
    borderRadius: 16,
    padding: '2.5rem',
    width: '100%',
    maxWidth: 400,
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
    margin: '2rem auto',
  },
  loginTitle: {
    fontSize: '1.75rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#1f2937',
  },
  loginSubtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '2rem',
    lineHeight: 1.5,
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formInput: {
    width: '100%',
    padding: '1rem',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    fontSize: '1rem',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  },
  loginBtn: {
    backgroundColor: '#7c3aed',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  },
  separator: {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
    color: '#6b7280',
  },
  separatorText: {
    padding: '0 1rem',
    fontSize: '0.875rem',
  },
  socialLogin: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1.25rem',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  },
  facebookBtn: {
    color: '#1877F2',
  },
  googleBtn: {
    color: '#DB4437',
  },
  loginFooter: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '0.875rem',
  },
  loginLink: {
    color: '#7c3aed',
    textDecoration: 'none',
    fontWeight: 600,
  },
};

export default Login;