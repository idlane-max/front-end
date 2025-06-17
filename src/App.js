// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importation des pages
import Home1 from './pages/Home1';
import Home2 from './pages/Home2';
import PagePrincipale from './pages/PagePrincipale';
import PageRecherche from './pages/PageRecherche';
import PageCategorieResto from './pages/PageCategorieResto';
import PageCategorieEvent from './pages/PageCategorieEvent';

// Importation des pages d'authentification
import Login from './auth/Login';
import Signup from './auth/Signup';
import Verify from './auth/Verify';

// Importation des pages utilisateur
import Profile from './user/Profile';
import CentreInteret from './user/CentreInteret';

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages principales */}
        <Route path="/" element={<Home1 />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/page-principale" element={<PagePrincipale />} />
        <Route path="/recherche" element={<PageRecherche />} />
        <Route path="/categorie-restaurant" element={<PageCategorieResto />} />
        <Route path="/categorie-evenement" element={<PageCategorieEvent />} />

        {/* Authentification */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />

        {/* Utilisateur */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/centre-interet" element={<CentreInteret />} />
      </Routes>
    </Router>
  );
}

export default App;