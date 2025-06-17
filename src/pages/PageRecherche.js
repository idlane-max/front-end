import React, { useState, useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import { Link, useLocation } from 'react-router-dom'; // Importez Link et useLocation
// Importations CSS nécessaires
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../App.css'; // Assurez-vous que ce chemin est correct si App.css est à la racine de src

// Données d'événements (déplacées en dehors du composant pour éviter les recréations inutiles)
const nearbyEventsData = [
  {
    id: 1,
    title: "Concert Gims",
    type: "concert",
    location: "Stade Mohammed V",
    date: "15 Juin 2023",
    time: "20:00",
    distance: "0.5 km",
    lat: 33.5689,
    lng: -7.5876,
    image: "https://source.unsplash.com/random/400x300/?concert,gims"
  },
  {
    id: 2,
    title: "Festival Jazz",
    type: "festival",
    location: "Parc de la Ligue Arabe",
    date: "17 Juin 2023",
    time: "18:30",
    distance: "1.2 km",
    lat: 33.5725,
    lng: -7.5861,
    image: "https://source.unsplash.com/random/400x300/?jazz,festival"
  },
  {
    id: 3,
    title: "Exposition d'Art",
    type: "exhibition",
    location: "Villa des Arts",
    date: "10-25 Juin 2023",
    time: "10:00-18:00",
    distance: "0.8 km",
    lat: 33.5702,
    lng: -7.5923,
    image: "https://source.unsplash.com/random/400x300/?art,exhibition"
  },
  {
    id: 4,
    title: "Restaurant Le Gourmet",
    type: "restaurant",
    location: "Anfa Place",
    date: "Ouvert maintenant",
    time: "12:00-23:00",
    distance: "0.3 km",
    lat: 33.5745,
    lng: -7.5912,
    image: "https://source.unsplash.com/random/400x300/?restaurant,gourmet"
  },
  {
    id: 5,
    title: "Café Maure",
    type: "cafe",
    location: "Corniche",
    date: "Ouvert maintenant",
    time: "08:00-22:00",
    distance: "1.5 km",
    lat: 33.5768,
    lng: -7.6832,
    image: "https://source.unsplash.com/random/400x300/?moroccan,cafe"
  }
];

// Composant pour une carte d'événement unique
const EventCard = ({ event }) => (
  <div className="event-card">
    <img src={event.image} alt={event.title} className="event-image" />
    <div className="event-content">
      <h4 className="event-title">{event.title}</h4>
      <div className="event-details">
        <div>{event.date}</div>
        <div>{event.time}</div>
      </div>
      <div className="event-location">
        <i className="fas fa-map-marker-alt"></i>
        <span>{event.location} • {event.distance}</span>
      </div>
    </div>
  </div>
);

// Composant pour la navigation inférieure
const BottomNavigation = () => {
  const location = useLocation(); // Utilisez useLocation pour obtenir le chemin actuel

  // Définition des éléments de navigation avec leurs chemins et l'icône FontAwesome
  const navItems = [
    { iconClass: "fas fa-home", label: "Accueil", path: "/page-principale" },
    { iconClass: "fas fa-heart", label: "Favoris", path: "/favoris" }, // Exemple de chemin pour favoris
    { iconClass: "fas fa-search", label: "Recherche", path: "/recherche" },
    { iconClass: "fas fa-calendar-check", label: "Réservations", path: "/reservations" }, // Exemple de chemin
    { iconClass: "fas fa-user", label: "Profil", path: "/profile" }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`} // Condition d'activation
        >
          <i className={item.iconClass}></i>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

function PageRecherche() {
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const mapRef = useRef(null); // Pour stocker l'instance de la carte Leaflet

  const handleBackClick = () => {
    window.history.back(); // Retour à la page précédente
  };

  const handleSearchInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    console.log('Recherche pour :', searchTerm);
    // Ici, vous implémenteriez la logique de filtrage des événements
  };

  const togglePanel = useCallback(() => {
    setIsPanelExpanded(prev => !prev);
  }, []);

  // Effet pour initialiser la carte Leaflet
  useEffect(() => {
    // Vérifie si la carte n'a pas déjà été initialisée
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([33.5731, -7.5898], 14); // Coordonnées de Casablanca

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      // Ajout des marqueurs pour les événements
      nearbyEventsData.forEach((event, index) => {
        const markerIcon = L.divIcon({
          className: 'map-marker',
          html: `<span>${index + 1}</span>`,
          iconSize: [30, 30]
        });

        L.marker([event.lat, event.lng], { icon: markerIcon }).addTo(mapRef.current)
          .bindPopup(`
            <b>${event.title}</b><br>
            ${event.location}<br>
            ${event.date} • ${event.time}<br>
            <small>${event.distance} de votre position</small>
          `);
      });

      // Simulation de la géolocalisation pour le marqueur de position actuelle
      setTimeout(() => {
        L.marker([33.5731, -7.5898], {
          icon: L.divIcon({
            className: 'current-location-marker', // Définie dans App.css ou un fichier CSS dédié
            html: '<div style="background-color: var(--primary); width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.3);"></div>',
            iconSize: [22, 22]
          })
        }).addTo(mapRef.current).bindPopup('Votre position').openPopup();
      }, 1000);
    }

    // Fonction de nettoyage pour détruire l'instance de la carte lors du démontage du composant
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une seule fois après le premier rendu

  return (
    <div className="search-container">
      {/* En-tête de recherche */}
      <div className="search-header">
        <div className="search-bar">
          <button className="back-btn" onClick={handleBackClick}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher des événements, restaurants..."
            autoFocus
            onChange={handleSearchInputChange}
          />
        </div>
      </div>

      {/* Conteneur de la carte */}
      <div className="map-container">
        <div id="map"></div>

        {/* Panneau des événements à proximité */}
        <div className={`nearby-events ${isPanelExpanded ? 'expanded' : ''}`} onClick={togglePanel}>
          <div className="panel-header">
            <h3 className="panel-title">{nearbyEventsData.length} événements à proximité</h3>
            <button className="panel-toggle">
              <i className={`fas ${isPanelExpanded ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
            </button>
          </div>

          <div className="events-scroll">
            <div className="events-list">
              {nearbyEventsData.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation inférieure */}
      <BottomNavigation />
    </div>
  );
}

export default PageRecherche;