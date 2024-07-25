import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Navbar from './components/Navbar';
import InfoHomeSection from './components/InfoHomeSection';
import TypingEffect from './components/TypingEffect';
import './HomeScreen.css';
import pads from './assets/pads.jpg';

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //checks if a user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <div className="header">
        <h1 className="mt-5 text-center title">CampusFlo</h1>
        <div className="d-flex flex-nowrap mt-md-4 mt-2 mb-3 text-center subtitle"><TypingEffect/></div>
        <div className="d-flex justify-content-center">
          {isLoggedIn ? (
            <Link style={{ textDecoration: 'none' }} to='/locator'>
              <div className="mt-md-4 mt-1 p-md-3 p-2 joinBtn">Return to Community</div>
            </Link>
          ) : (
            <Link style={{ textDecoration: 'none' }} to='/signup'>
              <div className="mt-md-4 mt-1 p-md-3 p-2 joinBtn">Join Our Community</div>
            </Link>
          )}
        </div>
      </div>
      <div className="about">
        <h2 className="pt-md-5 pt-2 mx-5 statsTitle">1 in 10 college students in the U.S. experience period poverty or a lack of access to menstrual products when they need them.</h2>
        <div className="mx-5">
          <div className="infoHomeContainer"> 
            <InfoHomeSection
              heading="Free products locator" 
              description="Find free menstrual products on your campus with ease using our locator. The locator detects your current location, identifying the closest products along with other nearby options. We want to ensure you always have access to menstrual products when you need them."
            />
            <InfoHomeSection
              heading="Products & pills classifier" 
              description="Gain a deeper understanding of the usage, benefits, materials, and disposal of menstrual products and pills with our image classifier. With 79% of teens feeling they lack proper menstrual health education, this tool bridges the gap, empowering them to make informed decisions."
            />
            <InfoHomeSection
              heading="Community hub" 
              description="Join a supportive space for menstrual health discussions. Given that 59% of teens feel periods aren’t openly discussed at school and 57% are uncomfortable talking about them, our hub creates a safe environment for sharing experiences, asking questions, and seeking advice."
            />
            <img className="infoHomeSection" style={{height: "20vw"}} src={pads} alt="pads" />
          </div>
        </div>
      </div>
      <footer style={{ backgroundColor: "#F7DCDC", height: "10vh" }}></footer>
    </>
  );
}