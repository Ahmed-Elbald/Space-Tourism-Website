
// Importing a function from main.js

import { manageOverlays } from "./main.js";

// Getting elements from the document

const content = document.querySelector("main .main__content");

const techImgPor = content.querySelector(".main__img img.portrait");
const techImgLand = content.querySelector(".main__img img.landscape");

const btnsContainer = content.querySelector(".buttons");
const techName = content.querySelector(".main__description__name");
const techText = content.querySelector(".main__description__text");

// Initializing global variables

let techData;


// When the document loads

document.addEventListener("DOMContentLoaded", () => {

  // Making a request to fetch the data
  let request = new XMLHttpRequest();
  request.open("GET", "./Data/data.json");
  request.send();

  request.onload = () => { // When the request loads....
    if (request.readyState == 4 && request.status == 200) {
      techData = JSON.parse(request.responseText)["technology"];
      showContent("first"); // "first" here means "when the page first load" => don't animate the process.
    }
  }

});

function showContent(techId) {
  if (techId != "first") { // Animate the process
    content.classList.add("fade");
    manageOverlays(true)
    setTimeout(() => {
      setBtns(techId);
      setData(techId);
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

function setBtns(techId) {
  let counter = 0, arr = Array.from(techData);
  btnsContainer.innerHTML = ""; // Empty the btnsContainer
  let btn = document.createElement("button");
  btn.className = "btn";
  btn.ariaLabel = "Choose a technology method"

  for (let i of arr) {

    let clone = btn.cloneNode(true);

    if (techId == arr.indexOf(i)) {
      clone.classList.add("active"); // add active to the button that was clicked
    }

    clone.addEventListener("click", (event) => {
      showContent(+event.target.dataset.id);
    })

    clone.style.display = "inline-block";
    clone.textContent = counter + 1;
    clone.dataset.id = counter; // add a data-id attribute to the button
    btnsContainer.appendChild(clone);
    counter++;
  }

}

// A function to add the content of the element

function setData(techId) {
  let dic = techData[techId]
  for (let i in dic) {
    switch (i) {
      case "description": {
        techText.textContent = dic[i];
        break;
      }
      case "name": {
        techName.textContent = dic[i];
        break;
      }
      case "images": {
        techImgPor.src = dic[i]["portrait"];
        techImgLand.src = dic[i]["landscape"];
        break;
      }
      default: {
        return;
      }
    }
  }

}
