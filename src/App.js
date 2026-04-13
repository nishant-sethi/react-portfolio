import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Header,
  Footer,
  About,
  Resume,
  Contact,
  Testimonials,
  Portfolio,
} from './Components';

const App = () => {
  const [resumeData, setResumeData] = useState({});

  useEffect(() => {
    fetch('/resumeData.json')
      .then((res) => res.json())
      .then((data) => setResumeData(data))
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, []);

  return (
    <div className='App'>
      <Header data={resumeData.main} />
      <About data={resumeData.main} />
      <Resume data={resumeData.resume} />
      <Portfolio data={resumeData.portfolio} />
      <Testimonials data={resumeData.testimonials} />
      <Contact data={resumeData.main} />
      <Footer data={resumeData.main} />
    </div>
  );
};

export default App;
