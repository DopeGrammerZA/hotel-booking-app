import React from "react";
import "../css/AboutSection.css";
import AboutSection from "./AboutSection";
import img from "../../assets/img/about-pic.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../css/aboutPage.css'

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-header">
          <div className="inner-about">

            <div className="about-heading">
              <h1>About us</h1>
            </div>
            <p>At Peaceful Hotel, Your Comfort is Our Mission — Enjoy Exceptional Service in a Cozy Setting. 
            </p>
          </div>
      </div>
      <Navbar />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
