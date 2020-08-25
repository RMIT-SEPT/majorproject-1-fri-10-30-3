import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import BookingBar from '../BookingBar/BookingBar'
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

    <div id="services" className="landing-containers landing-services"> {/* SERVICES */} 
      <BookingBar></BookingBar>
    </div>

    <div id="aboutus" className="landing-containers landing-about-us"> {/* ABOUT US */} 
      <h1 className="title-style ff-yellow"> About <span>Us</span></h1>
      <p className="paragraph ff-white">
      We are a group training facility offering a wide variety of classes. We are designed to take the guesswork out of the fitness journey. 
      We simplify our classes and help teach you the fundamental basics of weight lifting, boxing, and HIIT. 
      With the personalized touch from Fitness Factory, there is nothing too big or small we can’t change to suit your own fitness needs. 
      ‘The Fitness Factory’ is an inclusive and supportive environment where our members’ needs are our number one priority. You are just one step away from a life-changing class. 
      <br></br>
      <br></br>
      <br></br>
      OUR MISSION <br></br>
      To create a safe and inclusive fitness facility where members can reach their full potential. 
      <br></br>
      <br></br>
      <br></br>
      OUR VISION <br></br>
      To transform and educate our members on the fundamental principles of living a healthier and happier life.
      </p>
    </div>

    <div id="contact" className="landing-containers landing-contact"> {/* CONTACT */} 
      <div className="contact-box">
        {/* CONTACT */}
      <h1 className="title-style ff-yellow"> Contact </h1>
      <p className="paragraph ff-grey">
        <br></br>
        <br></br>
        Tel: +03 4231 1456
      </p>
      <p className="paragraph ff-grey">
        Email: admin@fitnessfactory.com.au
      </p> 
      <p className="paragraph ff-grey">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        Opening Hours
      </p>
      <p className="paragraph ff-grey">
        Mon - Fri: 7am - 10pm
        <br></br>
        <br></br>
        Sat - Sun: 10am - 10pm
      </p> 
      </div>


      <div className="findus-box">
        {/* Findus */}
        <h1 className="title-style ff-yellow"> Find Us </h1>
        <p className="paragraph ff-grey">
        <br></br>
        <br></br>
        128, Swanston Street, Melbourne, 3000, Victoria, Australia
        </p>
        <img className="findus-img" src="/findus-map.png"></img>
      </div>
    </div>

    <Footer></Footer>
  </div>
)

export default Home
