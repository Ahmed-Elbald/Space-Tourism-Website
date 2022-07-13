
// Importing a function from main.js

import { manageOverlays } from "./main.js";

// Getting elements from the document

const content = document.querySelector(".main__content");

const memberImg = content.querySelector(".main__img img");
const memberRole = content.querySelector(".main__description__role");
const memberName = content.querySelector(".main__description__name");
const memberText = content.querySelector(".main__description__text");


const btnsContainer = content.querySelector(".main__description__bullets");
const btnSample = content.querySelector(".main__description__bullets  .bullet");

// Initializing global variables

let crewData;

// When the document loads

document.addEventListener("DOMContentLoaded", () => {

  // Making a request to fetch the data
  let request = new XMLHttpRequest();
  request.open("GET", "./Data/data.json");
  request.send();

  request.onload = () => { // When the request loads....
    if (request.readyState == 4 && request.status == 200) {
      console.log("loaded")
      crewData = JSON.parse(request.responseText)["crew"];
      showContent("first"); // "first" here means "when the page first load" => don't animate the process.
    }
  }
});

function showContent(memberId) {
  if (memberId != "first") { // Animate the process
    content.classList.add("fade");
    manageOverlays(true)
    setTimeout(() => {
      setBtns(memberId);
      setData(memberId);
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

function setBtns(memberId) {
  let counter = 0, arr = Array.from(crewData);
  btnsContainer.innerHTML = ""; // Empty the btnsContainer
  for (let i of arr) {

    let btn = btnSample.cloneNode(true);

    if (memberId == arr.indexOf(i)) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", (event) => {
      showContent(+event.target.dataset.id);
    })

    btn.style.display = "inline-block";
    btn.dataset.id = counter; // add a data-id attribute to the button
    btnsContainer.appendChild(btn);
    counter++;
  }

}

// A function to add the content of the element

function setData(memberId) {
  let dic = crewData[memberId]
  for (let i in dic) {
    switch (i) {
      case "name": {
        memberName.textContent = dic[i];
        break;
      }
      case "images": {
        memberImg.src = dic[i]["png"];
        break;
      }
      case "role": {
        memberRole.textContent = dic[i];
        break;
      }
      case "bio": {
        memberText.textContent = dic[i];
        break;
      }
      default: {
        return;
      }
    }
  }

}
