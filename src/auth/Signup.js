import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate

// Si tu utilises react-icons, décommente ces lignes :
// import { FaUserPlus, FaFacebookF, FaGoogle, FaSpinner } from 'react-icons/fa';

const roles = [
  { label: 'Visiteur', value: 'visitor' },
  { label: 'Organisateur', value: 'organizer' },
  { label: 'Restaurateur', value: 'restaurateur' },
];

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialisez useNavigate

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRole = value => {
    setSelectedRole(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!selectedRole) {
      alert('Veuillez sélectionner un rôle');
      return;
    }
    setLoading(true);
    // Simuler un appel API
    setTimeout(() => {
      setLoading(false);
      alert('Inscription réussie ! Redirection en cours...');
      // Rediriger vers la page /verify
      navigate('/verify'); 
    }, 1500);
  };

  const handleSocial = (type) => {
    alert(`Inscription avec ${type}`);
  };

  return (
    <div style={styles.signupContainer}>
      <h1 style={styles.signupTitle}>
        Créer un <span style={{ color: styles.primary }}>compte</span>
      </h1>
      <p style={styles.signupSubtitle}>
        Remplissez vos informations ci-dessous ou inscrivez-vous avec vos réseaux sociaux.
      </p>
      <form style={styles.signupForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          style={styles.formInput}
          placeholder="Nom d'utilisateur"
          required
          value={form.username}
          onChange={handleChange}
        />
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

        <p style={styles.roleLabel}>Sélectionner votre rôle</p>
        <div style={styles.roleButtons}>
          {roles.map(role => (
            <button
              type="button"
              key={role.value}
              style={{
                ...styles.roleBtn,
                ...(selectedRole === role.value ? styles.roleBtnActive : {}),
              }}
              onClick={() => handleRole(role.value)}
            >
              {role.label}
            </button>
          ))}
        </div>

        <button type="submit" style={styles.signupBtn} disabled={loading}>
          {/* <FaUserPlus /> */}
          <i className="fas fa-user-plus"></i>
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Traitement...
            </>
          ) : (
            'Continuer'
          )}
        </button>
      </form>

      <div style={styles.separator}>
        <span style={styles.separatorText}>Ou inscrivez-vous avec</span>
      </div>

      <div style={styles.socialLogin}>
        <button
          style={{ ...styles.socialBtn, ...styles.facebookBtn }}
          onClick={() => handleSocial('Facebook')}
        >
          {/* <FaFacebookF /> */}
          <i className="fab fa-facebook-f"></i>
        </button>
        <button
          style={{ ...styles.socialBtn, ...styles.googleBtn }}
          onClick={() => handleSocial('Google')}
        >
          {/* <FaGoogle /> */}
          <i className="fab fa-google"></i>
        </button>
      </div>

      <p style={styles.signupFooter}>
        Vous avez déjà un compte ?{' '}
        <a href="/login" style={styles.loginLink}>Connectez-vous</a>
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
  signupContainer: {
    background: '#fff',
    borderRadius: 16,
    padding: '2.5rem',
    width: '100%',
    maxWidth: 450,
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
    margin: '2rem auto',
  },
  signupTitle: {
    fontSize: '1.75rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#1f2937',
  },
  signupSubtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '2rem',
    lineHeight: 1.5,
  },
  signupForm: {
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
  roleLabel: {
    fontWeight: 600,
    marginTop: '0.5rem',
    color: '#1f2937',
  },
  roleButtons: {
    display: 'flex',
    gap: '0.75rem',
    margin: '0.75rem 0 1.5rem',
  },
  roleBtn: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
    textAlign: 'center',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  },
  roleBtnActive: {
    backgroundColor: '#7c3aed',
    color: 'white',
    borderColor: '#7c3aed',
    fontWeight: 600,
  },
  signupBtn: {
    backgroundColor: '#7c3aed',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '0.5rem',
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
  signupFooter: {
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

export default Signup;