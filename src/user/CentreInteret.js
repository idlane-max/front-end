import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Pour la redirection

const interestsData = [
  {
    category: 'Musique',
    icon: 'fas fa-music',
    subcategories: [
      { heading: 'Concerts & Festivals', items: [
        { id: 'concerts', label: 'Concerts live' },
        { id: 'festivals', label: 'Festivals de musique' },
        { id: 'dj', label: 'Soirées DJ' },
        { id: 'opera', label: 'Opéras & Symphonies' },
      ]},
    ],
  },
  {
    category: 'Arts & Culture',
    icon: 'fas fa-palette',
    subcategories: [
      { heading: 'Événements culturels', items: [
        { id: 'theater', label: 'Pièces de théâtre' },
        { id: 'dance', label: 'Spectacles de danse' },
        { id: 'art', label: 'Expositions d\'art' },
        { id: 'museum', label: 'Nuits des musées' },
      ]},
    ],
  },
  {
    category: 'Voyages & Aventures',
    icon: 'fas fa-plane',
    subcategories: [
      { heading: 'Expériences uniques', items: [
        { id: 'adventure', label: 'Voyages d\'aventure' },
        { id: 'cultural', label: 'Expériences culturelles' },
        { id: 'food', label: 'Tourisme culinaire' },
        { id: 'eco', label: 'Écotourisme' },
      ]},
    ],
  },
  {
    category: 'Gastronomie',
    icon: 'fas fa-utensils',
    subcategories: [
      { heading: 'Événements culinaires', items: [
        { id: 'tasting', label: 'Dégustations' },
        { id: 'cooking', label: 'Ateliers cuisine' },
        { id: 'wine', label: 'Salons des vins' },
        { id: 'foodfest', label: 'Festivals gastronomiques' },
      ]},
    ],
  },
  {
    category: 'Sports & Loisirs',
    icon: 'fas fa-running',
    subcategories: [
      { heading: 'Activités sportives', items: [
        { id: 'marathon', label: 'Marathons' },
        { id: 'sports', label: 'Événements sportifs' },
        { id: 'yoga', label: 'Retraites yoga' },
        { id: 'outdoor', label: 'Activités outdoor' },
      ]},
    ],
  },
];

const CentreInteret = () => {
  const [selectedInterests, setSelectedInterests] = useState(new Set(['adventure'])); // Initialise avec 'adventure' coché
  const [buttonMessage, setButtonMessage] = useState('Continuer');
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const navigate = useNavigate(); // Initialisez useNavigate

  // Calcule le nombre total d'intérêts possibles
  const totalInterests = interestsData.reduce((acc, category) => {
    return acc + category.subcategories.reduce((subAcc, sub) => subAcc + sub.items.length, 0);
  }, 0);

  // Gère le changement d'état d'une case à cocher
  const handleCheckboxChange = (id) => {
    setSelectedInterests(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  // Gère le clic sur un élément de liste pour cocher/décocher
  const handleListItemClick = (id) => {
    handleCheckboxChange(id);
  };

  // Gère le clic sur le bouton "Continuer"
  const handleContinue = () => {
    if (selectedInterests.size === 0) {
      setButtonMessage(<><i className="fas fa-exclamation-circle"></i> Sélectionnez au moins un élément</>);
      setTimeout(() => setButtonMessage('Continuer'), 2000);
      return;
    }

    setIsButtonLoading(true);
    setButtonMessage(<><i className="fas fa-spinner fa-spin"></i> Redirection...</>);

    setTimeout(() => {
      setIsButtonLoading(false);
      alert(`Préférences enregistrées !\n\nVous serez notifié pour :\n${Array.from(selectedInterests).join('\n')}`);
      // Rediriger vers la page principale
      navigate('/page-principale');
    }, 1000);
  };

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <i className="fas fa-calendar-alt"></i>
          <span>EventPass</span>
        </div>
        <p style={styles.subtitle}>Réservez vos événements préférés en quelques clics</p>
      </header>

      <div style={styles.progressContainer}>
        <div 
          style={{ 
            ...styles.progressBar, 
            width: `${(selectedInterests.size / totalInterests) * 100}%` 
          }}
        ></div>
      </div>

      {interestsData.map((category, catIndex) => (
        <section key={catIndex} style={styles.section}>
          <h1 style={styles.h1}>
            <i className={category.icon}></i> {category.category}
          </h1>
          {category.subcategories.map((subcat, subcatIndex) => (
            <React.Fragment key={subcatIndex}>
              <h2 style={styles.h2}>{subcat.heading}</h2>
              <ul style={styles.ul}>
                {subcat.items.map((item) => (
                  <li 
                    key={item.id} 
                    style={{ 
                      ...styles.li, 
                      ...(selectedInterests.has(item.id) ? styles.liChecked : {}) 
                    }}
                    onClick={() => handleListItemClick(item.id)}
                  >
                    <div style={styles.checkboxContainer}>
                      <input
                        type="checkbox"
                        id={item.id}
                        checked={selectedInterests.has(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                        style={styles.inputCheckbox}
                      />
                    </div>
                    <label htmlFor={item.id}>{item.label}</label>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ))}
        </section>
      ))}
      
      <button 
        style={styles.continueBtn} 
        onClick={handleContinue} 
        disabled={isButtonLoading}
      >
        <span>{buttonMessage}</span>
        {!isButtonLoading && <i className="fas fa-arrow-right"></i>}
        {!isButtonLoading && (
          <span style={styles.selectedCount}>
            {selectedInterests.size}
          </span>
        )}
      </button>
    </div>
  );
};

const styles = {
  // Vos styles CSS convertis en objets JavaScript
  primary: '#7c3aed',
  primaryHover: '#6d28d9',
  secondary: '#10b981',
  accent: '#f59e0b',
  text: '#1f2937',
  textLight: '#6b7280',
  border: '#e5e7eb',
  bgChecked: '#f5f3ff',
  bgSection: '#ffffff',
  bgBody: '#f8fafc',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  shadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

  body: { // Remplacer le `body` global par un conteneur principal
    fontFamily: 'Inter, sans-serif',
    lineHeight: 1.6,
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem',
    color: '#1f2937',
    backgroundColor: '#f8fafc',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#7c3aed',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  subtitle: {
    color: '#6b7280',
    fontWeight: 400,
  },
  section: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '1.75rem',
    marginBottom: '1.75rem',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid #e5e7eb',
    // Pas de pseudo-classes :hover ici, on les gère via JavaScript si nécessaire, ou on utilise un CSS externe
  },
  h1: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '1.25rem',
    color: '#7c3aed',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  h2: {
    fontSize: '1.25rem',
    fontWeight: 600,
    margin: '1.5rem 0 1rem',
    color: '#1f2937',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #e5e7eb',
  },
  h3: { // Non utilisé dans la structure actuelle, mais gardé pour référence
    fontSize: '1rem',
    fontWeight: 500,
    margin: '1rem 0 0.75rem',
    color: '#6b7280',
  },
  ul: {
    listStyle: 'none',
    margin: '0.75rem 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '0.5rem',
  },
  li: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.875rem',
    margin: '0.25rem 0',
    borderRadius: '10px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    // La pseudo-classe :hover sera gérée via CSS si vous externalisez
  },
  liChecked: {
    backgroundColor: '#f5f3ff',
    borderLeft: '3px solid #7c3aed',
  },
  checkboxContainer: {
    position: 'relative',
    marginRight: '1rem',
  },
  inputCheckbox: {
    appearance: 'none',
    width: '20px',
    height: '20px',
    border: '2px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // pseudo-classe :checked gérée par le composant
    '&:checked': {
      backgroundColor: '#7c3aed',
      borderColor: '#7c3aed',
    },
    '&:checked::after': {
      content: '"✓"', // Notez les guillemets pour le contenu
      color: 'white',
      fontSize: '0.75rem',
      fontWeight: 'bold',
    },
  },
  continueBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '2rem',
    padding: '1rem 2rem',
    backgroundColor: '#7c3aed',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    float: 'right', // Attention au float en React, flexbox/grid sont préférables
    // pseudo-classes :hover et :active gérées via CSS si externalisé
  },
  progressContainer: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    margin: '1.5rem 0',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #7c3aed, #10b981)',
    width: '0%', // Sera mis à jour par l'état
    transition: 'width 0.4s ease',
    borderRadius: '4px',
  },
  selectedCount: {
    backgroundColor: '#7c3aed',
    color: 'white',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    marginLeft: '0.5rem',
    transition: 'transform 0.2s ease-in-out', // Pour l'animation de scale
  },
  // Media queries: ces styles devraient être gérés via un fichier CSS externe ou une librairie de styles-in-js qui supporte les media queries directement (ex: styled-components, Emotion)
  // Ou en utilisant matchMedia si la logique React doit changer
};

export default CentreInteret;