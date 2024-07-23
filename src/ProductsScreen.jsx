import './ProductsScreen.css'
import React, {useState} from "react";
import * as tmImage from "@teachablemachine/image";
import * as tf from "@tensorflow/tfjs";
import Navbar from './components/Navbar';
import SideNavbar from './components/SideNavbar';
import Popup from './components/Popup';

export default function ProductsScreen() {
  const URL = {
      products: "https://teachablemachine.withgoogle.com/models/kVK7us0sg/",
      pills: "https://teachablemachine.withgoogle.com/models/JmId9pDdi/",
  }

  const additionalInfo = {
    "Pad": {
      "How to use": "Wear inside underwear and secure with adhesive strips on the pad.",
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
 
  // Load the image model and setup the webcam
  async function init(urlKey) {
    const modelURL = urlKey + "model.json";
    const metadataURL = urlKey + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").innerHTML = '';
    document.getElementById("webcam-container").appendChild(webcam.canvas); // append elements to the DOM
    labelContainer = document.getElementById("label-container");
    infoContainer = document.getElementById("info-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
    
    infoContainer.innerHTML = '';
  }

  async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  function formatAdditionalInfo(info) {
    if (info) {
      return Object.entries(info)
        .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
        .join(''); // Join the array of strings into a single HTML string
    } else {
      return '<div>No information available.</div>';
    }
  }
  
  // run the webcam image through the image model
  async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);

    //finding the highest probability and saving the index
    let maxIndex = 0;
    for (let i = 1; i < maxPredictions; i++) {
        if (prediction[i].probability > prediction[maxIndex].probability) {
            maxIndex = i;
        }
    }
    
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    
    const bestPrediction = prediction[maxIndex]; //finding best prediction
    const bestClassName = bestPrediction.className; //getting class name
    const additionalText = additionalInfo[bestClassName]; //getting the additional info
    infoContainer.innerHTML = `<h1>${bestClassName}</h1>` + formatAdditionalInfo(additionalText); //displaying the info
  }

  const start = (urlKey) => {
    init(urlKey);
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto px-0">
            <SideNavbar/>
          </div>
          <div className="col mx-3">
            <div className="row d-flex justify-content-center">
              <div className="col-md-4 mx-3 mt-4 modelContainer">
                <div className="d-flex flex-row-reverse">
                 <Popup />
                </div>
                <h2 className="classifierTitle">Menstrual Product Classifier</h2>
                <div className="buttonsAlign">
                  <button className="productsBtn" type="button" onClick={() => start(URL.products)}>
                    Menstrual Products
                  </button>
                  <button className="pillsBtn" type="button" onClick={() => start(URL.pills)}>
                    Menstrual Pills
                  </button>
                </div>
                <div className="webcamAlign">
                  <div className="mt-4" id="webcam-container"></div>
                  <div id="label-container"></div>
                </div>
              </div>
              <div className="col-md-5 mx-3 mt-4 pt-2 informContainer">
                <h2 className="infoHeading">Understand Your Menstrual Products</h2>
                <div id="info-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
