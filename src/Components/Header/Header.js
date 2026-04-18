import React from "react";
import "./Header.css";

const Header = ({ data }) => {
  if (!data) return null;

  const { name, occupation, description, address: { city }, social } = data;

  const networks = social.map((network) => {
    // Ensure FontAwesome classic classes work (e.g., 'fa fa-github' -> 'fab fa-github' generally, but keeping as is since FA v6 has back-compat)
    return (
      <li key={network.name}>
        <a href={network.url} className="social-icon" target="_blank" rel="noopener noreferrer">
          <i className={network.className}></i>
        </a>
      </li>
    );
  });

  return (
    <header className="hero-header" id="home">
      {/* Sleek Glassmorphism Navigation */}
      <nav className="main-nav glass-panel">
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#resume">Architecture & Impact</a></li>
          <li><a href="#portfolio">Case Studies</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Content */}
      <div className="hero-content">
        <span className="hero-greeting">Hi, I am</span>
        <h1 className="hero-title text-gradient">{name}</h1>
        <p className="hero-subtitle">
          I'm a <strong>{city}</strong> based software architect designing scalable systems, resilient cloud infrastructure, and modern data pipelines. {description}.
        </p>
        <ul className="social-links">{networks}</ul>
      </div>
    </header>
  );
};

export default Header;
