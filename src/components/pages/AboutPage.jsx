import React from 'react';
import '../css/AboutSection.css'; 
import AboutSection from "./AboutSection";
import img from '../../assets/img/about-pic.jpg'
import Navbar from './Navbar';
import Footer from './Footer';


const AboutPage = () => {
  return (
    <section className="about-page">

    <Navbar/>
    <AboutSection/>
    <Footer/>
    
    </section>
  );
};

export default AboutPage;
