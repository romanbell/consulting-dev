// TODO:  

// Fix horizontal scroll overflow (fixed app asset), onlly visible when zoomed in 
// Service headings get streched on framer animation
// Create Mobile view 
// Submission handler

// DOCKER 
// npm install @fontsource/inter
// npm install @fontsource/roboto-mono
// npm install react-router-dom


import * as React from "react";
import { Routes, Route, Router } from 'react-router-dom';

//Components
import HomePage from "./components/homepage.js"
import Header from "./components/header.js"
//Pages
import AboutPage from "./components/about.js";
import Portfolio from "./components/portfolio.js"
import Newsletter from "./components/newsletter.js"
import ContactPage from "./components/contact.js"

import './App.css';


function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/portfolio" element={<Portfolio />} />
       <Route path="/newsletter" element={<Newsletter />} />
       <Route path="/about" element={<AboutPage />} />
       <Route path="/contact" element={<ContactPage />} />
      </Routes>

    </div>
  );
}

export default App;