import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import "./Home.css"

const Home = () => (
  <div>
    <div className="landing"> {/* LANDING */} 
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
          <button>fb</button>
          <button>insta</button>
          <button>google</button>
        </div>

      </div>
    </div>
    </div>

    <div className="landing-containers landing-services"> {/* SERVICES */} </div>

    <div className="landing-containers landing-about-us"> {/* ABOUT US */} </div>

    <div className="landing-containers landing-contact"> {/* CONTACT */} </div>

    <Footer></Footer>
  </div>
)

export default Home
