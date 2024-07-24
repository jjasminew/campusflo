import './InfoHomeSection.css'
import React from 'react';
import line from '../assets/homeline.png';

export default function InfoHomeSection({ heading, description }){
  return (
    <div className="pt-5 infoHomeSection">
      <h2 className="heading">{heading}</h2>
      <p className="description">{description}</p>
      <img style={{ width: '26vw' }} src={line} alt="line" />
    </div>
  );
};
