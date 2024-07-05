import React, {useState} from "react";
import * as tmImage from "@teachablemachine/image";
import * as tf from "@tensorflow/tfjs";

export default function ProductsScreen() {
  const URL = {
      products: "https://teachablemachine.withgoogle.com/models/kVK7us0sg/",
      pills: "https://teachablemachine.withgoogle.com/models/JmId9pDdi/",
  }

  const additionalInfo = {
    "Pad": "Pads are absorbent items worn in underwear to catch menstrual blood.",
    "Tampon": "Tampons are cylinders of absorbent material inserted into the vagina to absorb menstrual blood.",
    "Menstrual Cup": "Menstrual cups are reusable cups inserted into the vagina to collect menstrual blood.",
    "Ibuprofen": "Hello",
    "Naproxen": "Bye",
    "Acetaminophen": "Hola",
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
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
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
    infoContainer.innerHTML = `${additionalText}`; //displaying the info
  }

  const start = (urlKey) => {
    init(urlKey);
  }

  return (
    <div>
      <div>Teachable Machine Image Model</div>
      <button type="button" onClick={() => start(URL.products)}>
        Menstrual Products
      </button>
      <button type="button" onClick={() => start(URL.pills)}>
        Menstrual Pills
      </button>
      <div id="webcam-container"></div>
      <div id="label-container"></div>
      <div id="info-container"></div>
    </div>
  );
};
