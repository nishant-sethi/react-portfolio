import React from 'react';

const Footer = ({ data }) => {
  let networks;

  if (data) {
    networks = data.social.map((network) => (
      <li key={network.name}>
        <a href={network.url}>
          <i className={network.className}></i>
        </a>
      </li>
    ));
  }

  return (
    <footer>
      <div className='row'>
        <div className='twelve columns'>
          <ul className='social-links'>{networks}</ul>

          <ul className='copyright'>
            <li>
              &copy; Copyright 2026{' '}
              <a href='https://www.linkedin.com/in/nishant-sethi-0188b1a2/'>
                <strong>Nishant Sethi</strong>
              </a>
              . All rights reserved.
            </li>
          </ul>
        </div>
        <div id='go-top'>
          <a className='smoothscroll' title='Back to Top' href='#home'>
            <i className='icon-up-open'></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
