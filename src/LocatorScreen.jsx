import './LocatorScreen.css';
import React, {useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useGeoLocation from "./hooks/useGeoLocation";
import locations from "./locations.json";
import Navbar from './components/Navbar'
import SideNavbar from './components/SideNavbar'
import Redmarker from './assets/redmarker.png'
import Bluemarker from './assets/bluemarker.png'

const markerIcon = new L.Icon({
  iconUrl: Redmarker,
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const hereIcon = new L.Icon({
  iconUrl: Bluemarker,
  iconSize: [30, 45],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

// function for calculating closest distance
const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => x * Math.PI / 180;
  const R = 6371; // Earth radius in kilometers

  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};


export default function LocatorScreen() {
  const [userName, setUserName] = useState(null);

  //checking if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  
  const [center, setCenter] = useState({ lat: 34.052235, lng: -118.243683 });
  const mapRef = useRef();
  const location = useGeoLocation();
  const [nearestLocation, setNearestLocation] = useState(null);

  //finding the closest location
  useEffect(() => {
    if (location.loaded && !location.error) {
      let minDistance = Infinity;
      let closestLocation = null;

      locations.forEach((loc) => {
        const distance = haversineDistance(location.coordinates, { lat: loc.lat, lng: loc.lng });
        if (distance < minDistance) {
          minDistance = distance;
          closestLocation = loc;
        }
      });

      setNearestLocation(closestLocation);
    }
  }, [location]);

  //zooms into the users location
  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      const map = mapRef.current;
      if (map) {
        map.flyTo(
          [location.coordinates.lat, location.coordinates.lng],
          16, // defining the zoom level
          { animate: true }
        );
      }
    } else if (location.error) {
      alert(location.error.message);
    } else {
      alert("Location is not loaded yet. Try again in a few seconds.");
    }
  };

  return (
    <>
      <Navbar/>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto px-0">
            <SideNavbar />
          </div>
          <div className="col mx-3">
            <div className="row d-flex justify-content-center">
              <div className="px-2 px-md-5">
                <div className="locatorTxtAlign">
                  <h1 className="locatorTxt">
                    Welcome{userName ? ` ${userName},` : ','}
                  </h1>
                  <p className="locatorSubTxt">Explore locations near you providing free menstrual products on your campus.</p>
                </div>
                <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={true} ref={mapRef}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {/* creating markers for all locations */}
                  {locations.map((location, idx) => (
                    <Marker
                      position={[location.lat, location.lng]}
                      icon={markerIcon}
                      key={idx}
                    >
                      {/* pop up information in the marker */}
                      <Popup>  
                        <h5>{location.title}</h5>
                        <p>School: {location.school}</p>
                        <p>Address: {location.address}</p>
                        <p>Additional Info: {location.addinfo}</p>
                      </Popup>
                    </Marker>
                  ))}

                  {/* creating marker for current location */}
                  {location.loaded && !location.error && (
                    <Marker 
                      position={[
                        location.coordinates.lat,
                        location.coordinates.lng,
                      ]}
                      icon={hereIcon}
                    >
                      <Popup>
                        <b>
                          You are here!
                        </b>
                      </Popup>
                    </Marker>
                  )}
                  {nearestLocation && (
                    <Polyline  //creates a line for the closest location
                      positions={[
                        [location.coordinates.lat, location.coordinates.lng],
                        [nearestLocation.lat, nearestLocation.lng]
                      ]}
                      color="blue"
                    /> 
                  )}
                </MapContainer>
          
                <div className="row my-4">
                  <div className="col d-flex justify-content-center">
                    <button className="locateBtn" onClick={showMyLocation}> {/* locate button */}
                      Locate Me
                    </button>
                  </div>
                  <p className="mt-2 feedback">Can't find your campus resources? Let us know <Link
                      style={{color: '#C2242D'}}
                      to='https://forms.gle/X8n7XVc1NE5Hv6NbA' 
                      target="_blank" 
                      rel="noopener noreferrer">here.
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}