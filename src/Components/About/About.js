import React from "react";
import "./About.css";

const About = ({ data }) => {
  if (!data) return null;

  const {
    name,
    image,
    bio,
    address: { street, city, state, zip },
    phone,
    email,
    resumedownload
  } = data;

  const profilepic = "/images/" + image;

  return (
    <section id="about" className="section-padding about-section">
      <div className="container about-grid">
        <div className="about-content">
          <h2>About Me</h2>
          <p className="about-bio">{bio}</p>
          
          <div className="about-details-grid">
            <div className="contact-details">
              <h2>Contact Details</h2>
              <p className="address">
                <span>{name}</span>
                <span>{street}</span>
                <span>{city} {state}, {zip}</span>
                <span>{phone}</span>
                <span>{email}</span>
              </p>
            </div>
            <div className="download-btn-container">
              <a href={resumedownload} className="download-btn" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-download"></i> Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
