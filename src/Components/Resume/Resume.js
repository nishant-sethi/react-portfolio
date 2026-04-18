import React from 'react';
import './Resume.css';

const Resume = ({ data }) => {
  if (!data) return null;

  const { skillmessage, work, skills, education } = data;

  const workExperience = work.map((job) => (
    <div key={job.company} className="resume-item">
      <h3>{job.company}</h3>
      <p className="resume-info">
        {job.title}<span>&bull;</span> <em className="resume-date">{job.years}</em>
      </p>
      <p className="resume-description">{job.description}</p>
    </div>
  ));

  const skillPills = skills.map((skill) => (
    <li key={skill.name} className="skill-pill">
      {skill.name}
    </li>
  ));

  const educationDetails = education.map((edu) => (
    <div key={edu.school} className="resume-item">
      <h3>{edu.school}</h3>
      <p className="resume-info">
        {edu.degree} <span>&bull;</span>
        <em className="resume-date">{edu.graduated}</em>
      </p>
      <p className="resume-description">{edu.description}</p>
    </div>
  ));

  return (
    <section id="resume" className="section-padding resume-section">
      <div className="container">
        
        {/* Work / Impact */}
        <div className="resume-block resume-grid">
          <div className="resume-header">
            <h1>Architecture & Impact</h1>
          </div>
          <div className="resume-content">
            {workExperience}
          </div>
        </div>

        {/* Education */}
        <div className="resume-block resume-grid">
          <div className="resume-header">
            <h1>Education</h1>
          </div>
          <div className="resume-content">
            {educationDetails}
          </div>
        </div>

        {/* Skills */}
        <div className="resume-block resume-grid">
          <div className="resume-header">
            <h1>Core Competencies</h1>
          </div>
          <div className="resume-content">
            <p className="resume-description">{skillmessage}</p>
            <ul className="skills-grid">
              {skillPills}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Resume;
