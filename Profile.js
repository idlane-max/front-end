import React, { useState, useRef } from 'react';

const initialProfile = {
  photo: "https://ui-avatars.com/api/?name=Anass+Akker&background=7c3aed&color=fff",
  email: "anass@example.com",
  password: "",
  firstName: "Anass",
  lastName: "Akker",
  website: "",
  company: "Casablanca",
  phone: "0700856336",
  address: "",
  city: "",
  country: "Maroc",
  pincode: "",
};

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [saving, setSaving] = useState(false);
  const photoInputRef = useRef();

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = e => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = event => {
        setProfile(prev => ({ ...prev, photo: event.target.result }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Modifications enregistrées avec succès !');
    }, 1500);
  };

  return (
    <div style={styles.profileContainer}>
      <div style={styles.profileCard}>
        <h1 style={styles.profileTitle}>
          <i className="fas fa-user-cog"></i> Paramètres du compte
        </h1>

        {/* Photo de profil */}
        <div style={styles.profileSection}>
          <h2 style={styles.sectionTitle}>
            <i className="fas fa-camera"></i> Photo de profil
          </h2>
          <div style={styles.photoRow}>
            <img
              src={profile.photo}
              alt="Photo de profil"
              style={styles.profilePhoto}
            />
            <div style={styles.photoUpload}>
              <button
                style={styles.photoUploadBtn}
                type="button"
                onClick={() => photoInputRef.current.click()}
              >
                <i className="fas fa-upload"></i> Changer la photo
              </button>
              <input
                type="file"
                accept="image/*"
                ref={photoInputRef}
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />
            </div>
          </div>
        </div>

        {/* Informations du compte */}
        <div style={styles.profileSection}>
          <h2 style={styles.sectionTitle}>
            <i className="fas fa-user-circle"></i> Informations du compte
          </h2>
          <div style={styles.formGroup}>
            <label className="form-label" style={styles.formLabel}>Email</label>
            <input
              type="email"
              name="email"
              style={styles.formInput}
              value={profile.email}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label className="form-label" style={styles.formLabel}>Mot de passe</label>
            <input
              type="password"
              name="password"
              style={styles.formInput}
              placeholder="Entrez un nouveau mot de passe"
              value={profile.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Informations personnelles */}
        <div style={styles.profileSection}>
          <h2 style={styles.sectionTitle}>
            <i className="fas fa-id-card"></i> Informations personnelles
          </h2>
          <div style={styles.formGroup}>
            <label className="form-label" style={styles.formLabel}>Prénom</label>
            <input
              type="text"
              name="firstName"
              style={styles.formInput}
              value={profile.firstName}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label className="form-label" style={styles.formLabel}>Nom</label>
            <input
              type="text"
              name="lastName"
              style={styles.formInput}
              value={profile.lastName}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label className="form-label" style={styles.formLabel}>Site web</label>
            <input
              type="text"
              name="website"
              style={styles.formInput}
              placeholder="Entrez votre site web"
              value={profile.website}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label className="form-label" style={styles.formLabel}>Entreprise</label>
            <input
              type="text"
              name="company"
              style={styles.formInput}
              value={profile.company}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Coordonnées */}
        <div style={styles.profileSection}>
          <h2 style={styles.sectionTitle}>
            <i className="fas fa-address-book"></i> Coordonnées
          </h2>
          <p style={styles.infoText}>
            Ces informations sont privées et ne seront utilisées que pour vous contacter concernant vos billets ou prix.
          </p>
          <div style={styles.formGroup}>
            <label className="form-label" style={styles.formLabel}>Téléphone</label>
            <input
              type="text"
              name="phone"
              style={styles.formInput}
              value={profile.phone}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label className="form-label" style={styles.formLabel}>Adresse</label>
            <input
              type="text"
              name="address"
              style={styles.formInput}
              placeholder="Entrez votre adresse"
              value={profile.address}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label className="form-label" style={styles.formLabel}>Ville</label>
            <input
              type="text"
              name="city"
              style={styles.formInput}
              placeholder="Entrez votre ville"
              value={profile.city}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label className="form-label" style={styles.formLabel}>Pays</label>
            <input
              type="text"
              name="country"
              style={styles.formInput}
              value={profile.country}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label className="form-label" style={styles.formLabel}>Code postal</label>
            <input
              type="text"
              name="pincode"
              style={styles.formInput}
              placeholder="Entrez votre code postal"
              value={profile.pincode}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          style={styles.saveBtn}
          onClick={handleSave}
          disabled={saving}
        >
          <i className="fas fa-save"></i>
          {saving ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Enregistrement...
            </>
          ) : (
            "Enregistrer les modifications"
          )}
        </button>
      </div>
    </div>
  );
};

const styles = {
  profileContainer: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '2rem',
  },
  profileCard: {
    background: '#fff',
    borderRadius: 16,
    padding: '2.5rem',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  },
  profileTitle: {
    fontSize: '1.75rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#7c3aed',
  },
  profileSection: {
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1.25rem',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  photoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #e5e7eb',
  },
  photoUpload: {
    position: 'relative',
  },
  photoUploadBtn: {
    backgroundColor: '#7c3aed',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    padding: '0.75rem 1.25rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  formGroup: {
    marginBottom: '1.25rem',
  },
  formLabel: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 500,
    color: '#1f2937',
  },
  formInput: {
    width: '100%',
    padding: '1rem',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    fontSize: '1rem',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  },
  infoText: {
    color: '#6b7280',
    fontSize: '0.875rem',
    marginBottom: '1.25rem',
    lineHeight: 1.5,
  },
  saveBtn: {
    backgroundColor: '#7c3aed',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    padding: '1rem',
    width: '100%',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
};

export default Profile;