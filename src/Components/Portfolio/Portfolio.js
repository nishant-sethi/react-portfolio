import React from "react";
import "./Portfolio.css";

const Portfolio = ({ data }) => {
  if (!data) return null;

  const projects = data.projects.map((project) => {
    const projectImage = project.image.startsWith("http")
      ? project.image
      : "/images/portfolio/" + project.image;

    return (
      <div key={project.title} className="portfolio-card">
        <a
          href={project.url}
          title={project.title}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="portfolio-image-wrapper">
            <img alt={project.title} src={projectImage} loading="lazy" />
          </div>
          <div className="portfolio-card-content">
            <h5>{project.title}</h5>
            <p>{project.category}</p>
          </div>
        </a>
      </div>
    );
  });

  return (
    <section id="portfolio" className="section-padding portfolio-section">
      <div className="container">
        <div className="portfolio-header">
          <h1>Case Studies & Projects</h1>
          <p>
            Highlighting complex systems, applications, and pipelines I've
            built.
          </p>
        </div>

        <div className="portfolio-grid">{projects}</div>
      </div>
    </section>
  );
};

export default Portfolio;
