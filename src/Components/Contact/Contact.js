import React, { useState } from "react";
import "./Contact.css";

const Contact = ({ data }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  if (!data) return null;

  const handleClick = (e) => {
    e.preventDefault();
    window.open(
      `mailto:${data.email}?subject=${subject}&body=From: ${name} (${email})%0D%0A%0D%0A${message}`,
    );
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        <div className="contact-header">
          <h1>Let's Connect.</h1>
        </div>

        <div className="contact-grid">
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleClick}>
              <div className="form-group">
                <label htmlFor="contactName">Name *</label>
                <input
                  type="text"
                  id="contactName"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactEmail">Email *</label>
                <input
                  type="email"
                  id="contactEmail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactSubject">Subject</label>
                <input
                  type="text"
                  id="contactSubject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactMessage">Message *</label>
                <textarea
                  id="contactMessage"
                  required
                  rows="6"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>

          <aside className="contact-info">
            <h4>Address</h4>
            <p className="address">
              {data.name}
              <br />
              {data.address.street}
              <br />
              {data.address.city}, {data.address.state} {data.address.zip}
              <br />
              {data.phone}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
