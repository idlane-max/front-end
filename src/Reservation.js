import React from 'react';
import './Reservation.css';

const Reservation = () => {
  return (
    <div className="reservation-container">
      {/* Navigation */}
      <nav className="reservation-nav">
        <a href="/">Home</a>
        <a href="/events">Events</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>

      {/* Progress */}
      <div className="progress-indicator">
        <span>Scope 1 / 4</span>
        <div className="progress-bar"></div>
      </div>

      {/* Restaurant Info */}
      <div className="restaurant-card">
        <h3>Restaurant le Nomads</h3>
        <div className="restaurant-details">
          <p className="description">
            "Boom, delete as a new conversation of lightning pit. Lorem Ipsa or unlicensed as a seminar which seems easy? To, cleaners arguments!"
          </p>
          <p className="location">
            <span className="icon">🚀</span> 2 km du centre ville
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="price-section">
        <h3>Restaurant</h3>
        <p className="price">900 MAD</p>
      </div>

      {/* Form */}
      <div className="form-section">
        <h3>Vos informations</h3>
        <form>
          <div className="form-group">
            <label>Nom complet *</label>
            <input type="text" placeholder="Votre nom complet" required />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" placeholder="votre@email.com" required />
          </div>
          <div className="form-group">
            <label>Téléphone</label>
            <div className="phone-input">
              <span className="country-code">TAR - 212</span>
              <input 
                type="tel" 
                placeholder="Numero de téléphone" 
                pattern="[0-9]{9}" 
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Reservation;