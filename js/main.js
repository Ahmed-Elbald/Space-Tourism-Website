
// Getting elements from the document

const openNav = document.querySelector(".header__toggle__btn");
const closeNav = document.querySelector(".nav__close__btn");
const nav = document.querySelector("nav.nav");

const exploreBtn = document.querySelector(".main__link")

const content = document.querySelector("main .main__content");
let overlays;
if (content) {
  overlays = content.querySelectorAll(".overlay");
}


// When the page loads its content


document.addEventListener("DOMContentLoaded", () => {

  document.addEventListener("click", (event) => {
    if (window.innerWidth <= 768) {  // Don't do this in big screens (Tablets and desktop)

      // If a descendant of the nav gets clicked, do nothing
      if (isDescendant(nav, event.target) != 0 && !event.target.isSameNode(closeNav)) return;

      // If it's the toggle button or the explore button, open the nav
      if (event.target.isSameNode(openNav) || event.target.isSameNode(exploreBtn)) {
        nav.classList.add("opened");
      } else { // If not, close it
        nav.classList.remove("opened");
      }
    }

  });

});


// A function to detect if an element is a descendant of another element

function isDescendant(parent, element) {

  if (parent.isSameNode(element)) {
    return 1;
  }

  let found = false;
  function isChild(childs) {
    for (let i of childs) {
      if (i.isSameNode(element)) {
        found = true;
        return 2;
      }
      if (i.children) {
        isChild(i.children)
        if (found) {
          return 2;
        }
      }
    }
    return 0;
  }

  return isChild(parent.children);
}

// A function to make the overlays stretch and cover 50% of the content width

export function manageOverlays(show) {
  overlays.forEach(overlay => {
    show ? overlay.classList.add("filling") : overlay.classList.remove("filling")
  });
}