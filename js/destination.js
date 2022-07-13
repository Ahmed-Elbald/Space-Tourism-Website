
// Importing a function from main.js

import { manageOverlays } from "./main.js";

// Getting elements from the document

const content = document.querySelector("main .main__content");

const planetImg = content.querySelector(".main__img img");
const destinationsBtnsContainer = content.querySelector(".main__description__destinations");
const destinationsBtn = destinationsBtnsContainer.querySelector(".destination");
const descriptionTitle = content.querySelector(".main__description__title");
const descriptionText = content.querySelector(".main__description__text");
const distanceColumn = content.querySelector(".col.distance");
const timeColumn = content.querySelector(".col.time");

// Initializing global variables

let destinationsData;


// When the document loads

document.addEventListener("DOMContentLoaded", () => {

  // Making a request to fetch the data
  let request = new XMLHttpRequest();
  request.open("GET", "./Data/data.json");
  request.send();

  request.onload = () => { // When the request loads....
    if (request.readyState == 4 && request.status == 200) {
      destinationsData = JSON.parse(request.responseText)["destinations"];
      showContent("first"); // "first" here means "when the page first load" => don't animate the process.
    }
  }

});


function showContent(destinationId) {
  if (destinationId != "first") { // Animate the process
    content.classList.add("fade");
    manageOverlays(true)
    setTimeout(() => {
      setBtns(destinationId);
      setData(destinationId);
    }, 700)
    setTimeout(() => {
      content.classList.remove("fade");
      manageOverlays(false)
    }, 800)
  } else { // Don't animate the process
    setBtns(0);
    setData(0);
  }
}


function setBtns(destinationId) {
  let counter = 0, arr = Array.from(destinationsData);
  destinationsBtnsContainer.innerHTML = ""; // Empty the btnsContainer
  for (let i of arr) {

    let clone = destinationsBtn.cloneNode(true);
    let btn = clone.firstElementChild;

    if (destinationId == arr.indexOf(i)) {
      btn.classList.add("active"); // add active to the button that was clicked
    }

    btn.addEventListener("click", (event) => {
      showContent(+event.target.dataset.id);
    })

    clone.style.display = "block";
    btn.textContent = i["name"];
    btn.dataset.id = counter; // add a data-id attribute to the button
    destinationsBtnsContainer.appendChild(clone);
    counter++;
  }

}

// A function to add the content of the element

function setData(destinationId) {
  let dic = destinationsData[destinationId]
  for (let i in dic) {
    switch (i) {
      case "description": {
        descriptionText.textContent = dic[i];
        break;
      }
      case "distance": {
        distanceColumn.children[1].textContent = dic[i];
        break;
      }
      case "travel": {
        timeColumn.children[1].textContent = dic[i];
        break;
      }
      case "name": {
        descriptionTitle.textContent = dic[i];
        break;
      }
      case "images": {
        planetImg.src = dic[i]["png"];
        break;
      }
      default: {
        return;
      }
    }
  }

}
