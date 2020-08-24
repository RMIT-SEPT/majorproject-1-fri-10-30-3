import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import "./Home.css"

const Home = () => (
  <div>
    <div id="home" className="landing"> {/* LANDING */} 
    <Header></Header>
    <div className="landing-content">
      <div className="landing-box">
        
        {/* Titles */}
        <h1 className="landing-title ff-yellow">Fitness <span>Factory</span></h1>
        <p className="landing-sub-title">Strength & Conditioning</p>
        
        {/* Actions */}
        <div className="landing-box-buttons">
          <button className="landing-box-action button-solid ff-bg-yellow">Services</button>
          <button className="landing-box-action button-alt ff-yellow">Learn More</button>
        </div>
        
        {/* Socials */}
        <div className="landing-box-socials">
          <button className="landing-socials"><i className="landing-social-action fab fa-facebook"></i></button>
          <button className="landing-socials"><i className="landing-social-action fab fa-twitter"></i></button>
          <button className="landing-socials"><i className="landing-social-action fab fa-instagram"></i></button>
          <button className="landing-socials"><i className="landing-social-action fab fa-google"></i></button>
        </div>

      </div>
    </div>
    </div>

    <div id="services" className="landing-containers landing-services"> {/* SERVICES */} </div>

    <div id="aboutus" className="landing-containers landing-about-us"> {/* ABOUT US */} </div>

    <div id="contact" className="landing-containers landing-contact"> {/* CONTACT */} </div>

    <Footer></Footer>
  </div>
)

export default Home
