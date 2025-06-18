import React, { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaTag, FaHome, FaHeart, FaCalendarCheck, FaCommentDots, FaUser, FaPlus, FaStar, FaUtensils } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Importez useNavigate
import './PagePrincipale.css';

function PagePrincipale() {
  const [activeTab, setActiveTab] = useState('Événements');
  const [customSpaces, setCustomSpaces] = useState([
    {
      title: "Espace VIP",
      icon: <FaStar />,
      images: [
        { src: "https://source.unsplash.com/random/600x400/?luxury,event", title: "Soirée Exclusive", subtitle: "25 Juin 2023" },
        { src: "https://source.unsplash.com/random/600x400/?chef,food", title: "Dîner avec Chef Étoilé", subtitle: "30 Juin 2023" }
      ]
    },
    {
      title: "Nouveaux Restaurants",
      icon: <FaUtensils />,
      images: [
        { src: "https://source.unsplash.com/random/600x400/?restaurant,terrace", title: "La Terrasse", subtitle: "Ouvert depuis 1 semaine" },
        { src: "https://source.unsplash.com/random/600x400/?seafood,restaurant", title: "Le Poissonnier", subtitle: "Spécialités marines" },
        { src: "https://source.unsplash.com/random/600x400/?vegan,restaurant", title: "Green Life", subtitle: "Cuisine 100% végétale" }
      ]
    }
  ]);

  const events = [
    { src: "https://source.unsplash.com/random/600x400/?concert,gims", title: "Concert Gims", location: "Stade Mohammed V, Casablanca" },
    { src: "https://source.unsplash.com/random/600x400/?jazz,festival", title: "Festival Jazz au Chellah", location: "Rabat, MAR" },
    { src: "https://source.unsplash.com/random/600x400/?theater,performance", title: "Théâtre National", location: "Marrakech, MAR" },
    { src: "https://source.unsplash.com/random/600x400/?art,exhibition", title: "Exposition d'Art Contemporain", location: "Villa des Arts, Casablanca" },
    { src: "https://source.unsplash.com/random/600x400/?football,stadium", title: "Match Wydad vs Raja", location: "Stade Mohammed V, Casablanca" }
  ];

  const restaurants = [
    { src: "https://source.unsplash.com/random/600x400/?restaurant,gourmet", title: "Le Gourmet", location: "Anfa Place, Casablanca" },
    { src: "https://source.unsplash.com/random/600x400/?moroccan,cafe", title: "Café Maure", location: "Jardin Majorelle, Marrakech" },
    { src: "https://source.unsplash.com/random/600x400/?italian,pizza", title: "Pizzeria Italia", location: "Hay Riad, Rabat" },
    { src: "https://source.unsplash.com/random/600x400/?japanese,sushi", title: "Sushi Bar Premium", location: "Tanger City Mall" },
    { src: "https://source.unsplash.com/random/600x400/?steak,restaurant", title: "Steak House", location: "Marina Agadir" }
  ];

  const addImage = (spaceIndex) => {
    const newImage = {
      src: `https://source.unsplash.com/random/600x400/?custom${Math.floor(Math.random() * 100)}`,
      title: "Nouvel Élément",
      subtitle: "Description ici"
    };

    setCustomSpaces(prevSpaces => {
      const updatedSpaces = [...prevSpaces];
      updatedSpaces[spaceIndex] = {
        ...updatedSpaces[spaceIndex],
        images: [...updatedSpaces[spaceIndex].images, newImage]
      };
      return updatedSpaces;
    });

    alert('En production, cette fonction permettrait d\'uploader vos propres images et d\'ajouter des descriptions.');
  };

  const scrollContainerRefs = useRef([]);

  useEffect(() => {
    const scrollContainers = scrollContainerRefs.current;
    const cleanupFns = []; // Pour stocker les fonctions de nettoyage spécifiques à chaque conteneur

    scrollContainers.forEach(container => {
      if (!container) return;

      let isDown = false;
      let startX;
      let scrollLeft;
      let velocity = 0;
      let rafId; // Déclarer rafId ici pour chaque itération

      const smoothScroll = () => {
        velocity *= 0.95; // friction
        if (Math.abs(velocity) > 0.5) {
          container.scrollLeft += velocity * 16;
          rafId = requestAnimationFrame(smoothScroll);
        } else {
          cancelAnimationFrame(rafId);
        }
      };

      const handleMouseDown = (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        cancelAnimationFrame(rafId);
        velocity = 0;
        lastTime = performance.now();
      };

      const handleMouseLeave = () => {
        isDown = false;
        // Optionnel: Appliquer l'inertie si la souris quitte pendant le drag
        if (Math.abs(velocity) > 0.5) {
          smoothScroll();
        }
      };

      const handleMouseUp = () => {
        isDown = false;
        if (Math.abs(velocity) > 0.5) {
          smoothScroll();
        }
      };

      let lastTime = performance.now(); // Déclarer lastTime ici pour chaque itération
      const handleMouseMove = (e) => {
        if(!isDown) return;
        e.preventDefault();
        const now = performance.now();
        const deltaTime = now - lastTime;
        lastTime = now;

        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        const prevScrollLeft = container.scrollLeft;
        container.scrollLeft = scrollLeft - walk;

        // Assurez-vous que deltaTime n'est pas zéro pour éviter la division par zéro
        velocity = deltaTime > 0 ? (container.scrollLeft - prevScrollLeft) / deltaTime : 0;
      };

      const handleTouchStart = (e) => {
        isDown = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        cancelAnimationFrame(rafId);
        velocity = 0;
        lastTime = performance.now();
      };

      const handleTouchEnd = () => {
        isDown = false;
        if (Math.abs(velocity) > 0.5) {
          smoothScroll();
        }
      };

      const handleTouchMove = (e) => {
        if(!isDown) return;
        e.preventDefault();
        const now = performance.now();
        const deltaTime = now - lastTime;
        lastTime = now;

        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        const prevScrollLeft = container.scrollLeft;
        container.scrollLeft = scrollLeft - walk;

        velocity = deltaTime > 0 ? (container.scrollLeft - prevScrollLeft) / deltaTime : 0;
      };

      // Ajout des écouteurs d'événements
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('touchstart', handleTouchStart, {passive: false});
      container.addEventListener('touchend', handleTouchEnd, {passive: false});
      container.addEventListener('touchmove', handleTouchMove, {passive: false});

      // Ajouter une fonction de nettoyage pour ce conteneur spécifique
      cleanupFns.push(() => {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
        container.removeEventListener('touchmove', handleTouchMove);
        cancelAnimationFrame(rafId);
      });
    });

    return () => {
      cleanupFns.forEach(fn => fn()); // Exécuter toutes les fonctions de nettoyage
    };
  }, []); // Dépendances vides pour n'exécuter qu'une fois au montage

  return (
    <div className="app-main-page">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="main-content-container">
        <Section title="Événements recommandés" seeAllLink="#">
          {/* Utiliser un tableau de ref pour chaque instance */}
          <HorizontalScroll items={events} scrollRef={el => (scrollContainerRefs.current[0] = el)} />
        </Section>

        <Section title="Restaurants récents" seeAllLink="#">
          <HorizontalScroll items={restaurants} scrollRef={el => (scrollContainerRefs.current[1] = el)} />
        </Section>

        {customSpaces.map((space, index) => (
          <CustomSpace
            key={index}
            title={space.title}
            icon={space.icon}
            images={space.images}
            onAddImage={() => addImage(index)}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

const Header = ({ activeTab, setActiveTab }) => {
  const tabs = ['Événements', 'Restaurants', 'Hôtels'];
  const navigate = useNavigate(); // Initialisez useNavigate

  const handleSearchClick = () => {
    navigate('/recherche'); // Redirige vers la page de recherche
  };

  return (
    <header className="header">
      <div className="location-category">
        <div className="location">
          <FaMapMarkerAlt />
          <span>Casablanca, MAR</span>
        </div>
        <div className="category">
          <FaTag />
          <span>Catégorie</span>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher un événement ou restaurant"
          readOnly // Empêche la saisie directe, on clique pour rechercher
          onClick={handleSearchClick} // Ajoute l'événement onClick
        />
      </div>

      <div className="category-tabs">
        {tabs.map(tab => (
          <div
            key={tab}
            className={`category-tab ${activeTab === tab ? 'active-tab' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
    </header>
  );
};

const Section = ({ title, seeAllLink, children }) => {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <Link to={seeAllLink} className="see-all">Voir tout</Link>
      </div>
      {children}
    </div>
  );
};

const HorizontalScroll = ({ items, scrollRef }) => {
  return (
    <div className="scroll-container" ref={scrollRef}>
      <div className="scroll-content">
        {items.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ src, title, location }) => {
  return (
    <div className="card">
      <img src={src} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-location">
          <FaMapMarkerAlt /> {location}
        </p>
      </div>
    </div>
  );
};

const CustomSpace = ({ title, icon, images, onAddImage }) => {
  return (
    <div className="custom-space">
      <h3 className="space-title">{icon} {title}</h3>
      <div className="space-images">
        {images.map((image, index) => (
          <div key={index} className="space-image-container">
            <img src={image.src} alt={image.title} className="space-image" />
            <div className="image-overlay">
              <h4 className="image-title">{image.title}</h4>
              <p className="image-subtitle">{image.subtitle}</p>
            </div>
          </div>
        ))}
        <div className="add-image-btn" onClick={onAddImage}>
          <FaPlus />
          <span>Ajouter un événement</span>
        </div>
      </div>
    </div>
  );
};

const BottomNav = () => {
  const navItems = [
    { icon: <FaHome />, label: "Accueil", path: "/", active: true },
    { icon: <FaHeart />, label: "Favoris", path: "#" },
    { icon: <FaCalendarCheck />, label: "Réservations", path: "#" },
    { icon: <FaCommentDots />, label: "Messages", path: "#" },
    { icon: <FaUser />, label: "Profil", path: "/profile" }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`nav-item ${item.active ? 'active-nav-item' : ''}`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default PagePrincipale;