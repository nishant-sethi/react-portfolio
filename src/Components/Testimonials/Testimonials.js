import React from "react";
import "./Testimonials.css";

const Testimonials = ({ data }) => {
  if (!data) return null;

  const testimonials = data.testimonials.map((testimonial) => (
    <div className="testimonial-card" key={testimonial.user}>
      <i className="fa fa-quote-left"></i>
      <p>"{testimonial.text}"</p>
      <cite>{testimonial.user}</cite>
    </div>
  ));

  return (
    <section id="testimonials" className="section-padding testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <h1>Client & Peer Endorsements</h1>
        </div>
        <div className="testimonials-grid">{testimonials}</div>
      </div>
    </section>
  );
};

export default Testimonials;
