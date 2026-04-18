import React from 'react';
import './Footer.css';

const Footer = ({ data }) => {
  if (!data) return null;

  const networks = data.social.map((network) => (
    <li key={network.name}>
      <a href={network.url} className="footer-social-icon" target="_blank" rel="noopener noreferrer">
        <i className={network.className}></i>
      </a>
    </li>
  ));

  return (
    <footer className="site-footer">
      <div className="container">
        <ul className="footer-social">{networks}</ul>

        <ul className="copyright">
          <li>
            &copy; Copyright {new Date().getFullYear()} {' '}
            <a href="https://www.linkedin.com/in/nishant-sethi-0188b1a2/" target="_blank" rel="noopener noreferrer">
              <strong>Nishant Sethi</strong>
            </a>
            . All rights reserved.
          </li>
        </ul>

        {/* Go to top floating button */}
        <a className="go-top" title="Back to Top" href="#home">
          <i className="fa fa-chevron-up"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
