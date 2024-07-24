import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Navbar from './components/Navbar';
import InfoHomeSection from './components/InfoHomeSection';
import './HomeScreen.css';
import pads from './assets/pads.jpg';

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <p className="mt-md-4 mt-2 text-center subtitle">A community to talk about menstrual health</p>
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
              description="It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference."
            />
            <InfoHomeSection
              heading="Products & pills classifier" 
              description="It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference."
            />
            <InfoHomeSection
              heading="Community hub" 
              description="It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference."
            />
            <img className="infoHomeSection" style={{height: "20vw"}} src={pads} alt="pads" />
          </div>
        </div>
      </div>
      <footer style={{ backgroundColor: "#F7DCDC", height: "10vh" }}></footer>
    </>
  );
}

// import { Link } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import InfoHomeSection from './components/InfoHomeSection';
// import './HomeScreen.css';
// import pads from './assets/pads.jpg';

// export default function HomeScreen() {
//   return (
//     <>
//       <Navbar />  
//       <div className="header">
//         <h1 className="mt-5 text-center title">CampusFlo</h1>
//         <p className="mt-md-4 mt-2 text-center subtitle">A community to talk about menstrual health</p>
//         <div className="d-flex justify-content-center">
//           <Link style={{textDecoration: 'none'}} to='/signup'>
//             <div className="mt-md-4 mt-1 p-md-3 p-2 joinBtn">Join Our Community</div>
//           </Link>
//         </div>
//       </div>
//       <div className="about">
//         <h2 className="pt-md-5 pt-2 mx-5 statsTitle">1 in 10 college students in the U.S. experience period poverty or a lack of access to menstrual products when they need them.</h2>
//         <div className="mx-5">
//            <div className="infoHomeContainer">
//              <InfoHomeSection
//                heading="Free products locator" 
//                description="It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference."
//              />
//              <InfoHomeSection
//                heading="Products & pills classifier" 
//                description="It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference."
//              />
//              <InfoHomeSection
//                heading="Community hub" 
//                description="It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference."
//              />
//              <img className="infoHomeSection" style={{height: "20vw"}} src={pads} alt="pads" />
//            </div>
//         </div>
//       </div>
//       <footer style={{ backgroundColor: "#F7DCDC", height: "10vh" }}></footer>
//     </>
//   )
// }