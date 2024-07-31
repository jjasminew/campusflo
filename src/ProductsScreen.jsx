import './ProductsScreen.css';
import React, { useState } from 'react';
import * as tmImage from '@teachablemachine/image';
import { jsPDF } from 'jspdf';
import Navbar from './components/Navbar';
import SideNavbar from './components/SideNavbar';
import Popup from './components/Popup';
import padPng from './assets/pads.jpg';
import tamponPng from './assets/tamponInfo.png';
import cupPng from './assets/cupInfo.png';
import ibuprofenPng from './assets/ibuprofen.png';
import naproxenPng from './assets/naproxen.png';
import acePng from './assets/acetaminophen.png';


export default function ProductsScreen() {
  //holds the two different teachable machines
  const URL = {
    products: 'https://teachablemachine.withgoogle.com/models/kVK7us0sg/',
    pills: 'https://teachablemachine.withgoogle.com/models/JmId9pDdi/',
  };

  //holds images corresponding to the products/pills
  const imageMap = {
    "Pad": padPng,
    "Tampon": tamponPng,
    "Menstrual Cup": cupPng,
    "Ibuprofen": ibuprofenPng,
    "Naproxen": naproxenPng,
    "Acetaminophen": acePng,
  };

  //holds the info of the products/pills
  const additionalInfo = {
    "Pad": {
      "How to use": "Wear inside underwear and secure with adhesive strips on the pad. Replace every 3-4 hours.",
      "What it's made of": "Combination of cotton, synthetic fibers, and absorbent polymers.",
      "Pros": "Easy to use, available in a range of absorbency levels, and suitable for overnight use.",
      "Cons": "May feel bulky, can be noticeable under clothing, and may cause irritation for some people.",
      "How to dispose": "Wrap used pads in toilet paper or the wrapper of a new pad and dispose of them in a trash bin. Do not flush pads down the toilet."
    },
    "Tampon": {
      "How to use": "Insert into the vagina using an applicator or fingers and removed and replace every 4-8 hours.",
      "What it's made of": "Cotton or rayon, sometimes combined with absorbent polymers.",
      "Pros": "Discreet, less noticeable under clothing, and suitable for physical activities like swimming.",
      "Cons": "Risk of Toxic Shock Syndrome (TSS) if left in for too long, may cause dryness or discomfort for some users.",
      "How to dispose": "Wrap used tampons in toilet paper and dispose of them in a trash bin. Do not flush tampons down the toilet."
    },
    "Menstrual Cup": {
      "How to use": "Insert into the vagina where it forms a seal and collects menstrual blood. Must be emptied, washed, and reinserted every 8-12 hours.",
      "What it's made of": "Medical-grade silicone, rubber, or elastomer.",
      "Pros": "Reusable, environmentally friendly, and can be worn for longer periods (up to 12 hours).",
      "Cons": "Challenging to insert and remove, requires practice to use effectively, and may cause irritation or discomfort for some users.",
      "How to dispose": "Reusable, so they do not require disposal. If a cup needs to be replaced, follow the manufacturer's disposal instructions."
    },
    "Ibuprofen": {
      "What it does": "Relieves pain, reduces inflammation, and lowers fever.",
      "How to use": "Take orally, typically every 4-6 hours. Follow dosage instructions on the label.",
      "Pros": "Effective for pain relief and reducing inflammation.",
      "Cons": "Can cause stomach upset or ulcers with long-term use; may interact with other medications.",
    },
    "Naproxen": {
      "What it does": "Relieves pain, reduces inflammation, and lowers fever.",
      "How to use": "Take orally, typically every 8-12 hours. Follow dosage instructions on the label.",
      "Pros": "Effective for long-lasting pain relief and reducing inflammation.",
      "Cons": "Can cause gastrointestinal issues and may interact with other medications.",
    },
    "Acetaminophen": {
      "What it does": "Relieves pain and reduces fever.",
      "How to use": "Taken orally, typically every 4-6 hours. Follow dosage instructions on the label.",
      "Pros": "Gentle on the stomach and effective for pain relief and fever reduction.",
      "Cons": "Overdose can lead to liver damage; less effective for inflammation compared to NSAIDs.",
    }
  };

  let model, webcam, labelContainer, maxPredictions, infoContainer;

  //function for cleaning up if user were to choose another model
  async function cleanup() {
    if (webcam) {
      await webcam.stop(); //stops the webcam
    }
    document.getElementById('webcam-container').innerHTML = '';
    document.getElementById('label-container').innerHTML = '';
    document.getElementById('info-container').innerHTML = '';
    maxPredictions = 0;
  }

  async function init(urlKey) {
    const modelURL = urlKey + 'model.json';
    const metadataURL = urlKey + 'metadata.json';

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(300, 300, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById('webcam-container').innerHTML = '';
    document.getElementById('webcam-container').appendChild(webcam.canvas);
    document.getElementById('label-container').innerHTML = '';
    labelContainer = document.getElementById('label-container');
    infoContainer = document.getElementById('info-container');
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.appendChild(document.createElement('div'));
    }

    infoContainer.innerHTML = '';
  }

  async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  }

  //function for formatting the info when displayed on the screen
  function formatAdditionalInfo(info) {
    if (info) {
      return Object.entries(info)
        .map(([key, value]) => `<p><strong class="infoKey">${key}:</strong> ${value}</p>`)
        .join('');
    } else {
      return '<div>No information available.</div>';
    }
  }

  async function predict() {
    const prediction = await model.predict(webcam.canvas);
    let maxIndex = 0;
    for (let i = 1; i < maxPredictions; i++) {
      if (prediction[i].probability > prediction[maxIndex].probability) {
        maxIndex = i;
      }
    }

    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    const bestPrediction = prediction[maxIndex];
    const bestClassName = bestPrediction.className;
    const additionalText = additionalInfo[bestClassName];
    infoContainer.innerHTML =
      `<h1 class="productLabel">${bestClassName}</h1>` + formatAdditionalInfo(additionalText); //formatting the information
  }

  const start = async(urlKey) => {
    await cleanup(); //cleans up any previous state
    init(urlKey);
  };

  //function for creating pdf of the info
  const downloadPDF = () => {
    const doc = new jsPDF();
    const productName = document.querySelector('.productLabel')?.innerText || 'Product';
    const infoContent = document.getElementById('info-container').innerText;
    const imageUrl = imageMap[productName];

    const margin = 20; //margin from edges
    const imageWidth = 150;
    const imageHeight = 150;
    const pageWidth = doc.internal.pageSize.width; //full width of the page
    const textX = margin;
    const textY = margin;
    const imageX = (pageWidth - imageWidth) / 2;
    const imageY = textY + 85; 

    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.text(textX, textY, 'Understand Your Menstrual Products'); //adding text to the pdf

    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    const splitTitle = doc.splitTextToSize(infoContent, pageWidth - 2 * margin);
    doc.text(textX, textY+10, splitTitle);


    if (imageUrl) {
      doc.addImage(imageUrl, 'PNG', imageX, imageY, imageWidth, imageHeight); //adding image to the pdf
    }

    doc.save(`${productName}_info.pdf`); //pdf name
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto px-0">
            <SideNavbar />
          </div>
          <div className="col mx-3">
            <div className="row d-flex justify-content-center">
              <div className="col-md-4 mx-3 mt-4 modelContainer">
                <div className="d-flex flex-row-reverse">
                  <Popup />
                </div>
                <h2 className="classifierTitle">Menstrual Product Classifier</h2>
                <div className="webcamAlign">
                  <div className="mt-4" id="webcam-container"></div>
                  <div id="label-container">
                    <p className="infoDefaultTxt">The classifier will appear here.</p>
                  </div>
                </div>
                <div className="buttonsAlign">
                  <button
                    className="mx-2 productsBtn"
                    type="button"
                    onClick={() => start(URL.products)}
                  >
                    Menstrual Products
                  </button>
                  <button
                    className="mx-2 pillsBtn"
                    type="button"
                    onClick={() => start(URL.pills)}
                  >
                    Menstrual Pills
                  </button>
                </div>
              </div>
              <div className="col-md-5 mx-3 mt-4 pt-2 informContainer">
                <h2 className="infoHeading">Understand Your Menstrual Products</h2>
                <div id="info-container">
                  <p className="infoDefaultTxt">
                    No information to display until a classifier is selected.
                  </p>
                </div>
                <div className="d-flex justify-content-center">
                  <button onClick={downloadPDF} className="downloadBtn">
                    Download PDF of the Information
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
