import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Function to handle search
  const handleSearch = () => {
    navigate('/reservation');
  };

  // Function to generate days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get first day of month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Function to handle month navigation
  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  // Function to handle date selection
  const handleDateClick = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date);
  };

  // Generate calendar days
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });
    
    let days = [];
    let blanks = [];
    
    // Create blanks for days before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(<td key={`blank-${i}`} className="empty"></td>);
    }
    
    // Create days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate && 
                         selectedDate.getDate() === day && 
                         selectedDate.getMonth() === currentMonth && 
                         selectedDate.getFullYear() === currentYear;
      
      days.push(
        <td 
          key={`day-${day}`} 
          className={`day ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </td>
      );
    }
    
    // Combine blanks and days
    let totalSlots = [...blanks, ...days];
    let rows = [];
    let cells = [];
    
    totalSlots.forEach((slot, i) => {
      if (i % 7 !== 0) {
        cells.push(slot);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(slot);
      }
      
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });
    
    return (
      <>
        <div className="month-header">
          <button onClick={() => handleMonthChange('prev')}>‹</button>
          <span>{`${monthName} ${currentYear}`}</span>
          <button onClick={() => handleMonthChange('next')}>›</button>
        </div>
        <table className="calendar">
          <thead>
            <tr>
              <th>Su</th>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={`row-${i}`}>{row}</tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/events">Events</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Trouvez votre restaurant idéal</h1>
        <p>Réservez en quelques clics.</p>
      </div>

      {/* Search Form */}
      <div className="search-container">
        <div className="search-form">
          <div className="form-group">
            <label>Recherchez un restaurant</label>
            <input type="text" placeholder="Nom du restaurant" />
          </div>

          <div className="form-group">
            <label>Date de réservation</label>
            <div className="date-picker">
              {renderCalendar()}
              {selectedDate && (
                <div className="selected-date">
                  Date sélectionnée: {selectedDate.toLocaleDateString('fr-FR')}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Nombre de personnes</label>
            <input type="number" placeholder="1" min="1" />
          </div>

          <button className="search-button" onClick={handleSearch}>Rechercher</button>
        </div>
      </div>
    </div>
  );
};

export default Home;