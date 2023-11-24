// Imports
import { keyPressed } from "../base/helpers.js";

// Elements
const mainNav = document.getElementById("main-nav");
const mainNavOpenBtn = document.querySelector<HTMLButtonElement>(".js-main-nav-open");
const mainNavCloseBtn = document.querySelector<HTMLButtonElement>(".js-main-nav-close");

// Event Listeners
mainNavOpenBtn?.addEventListener("click", handleNavOpen);
mainNavCloseBtn?.addEventListener("click", handleNavDismiss);

// Functions
function handleNavOpen() {

    // Change the aria-expanded attribute to "true"
    updateNavState("true");

    // Show the nav
    mainNav?.classList.add("js-show-up");

    // Move focus to the "mainNavCloseBtn"
    setTimeout(() => {

        mainNavCloseBtn?.focus();
        window.addEventListener("keydown", handleNavKeydown);

    }, 100);

}

function handleNavDismiss() {

    // Change the aria-expanded attribute to "false"
    updateNavState("false");

    // Hide the nav
    mainNav?.classList.remove("js-show-up");

    // Move focus to the "mainNavOpenBtn"
    setTimeout(() => mainNavOpenBtn?.focus(), 100);

}

function updateNavState(expanded: string) {

    mainNavOpenBtn!.setAttribute("aria-expanded", expanded)
    mainNavCloseBtn!.setAttribute("aria-expanded", expanded)

}

function handleNavKeydown(keydownEvent: KeyboardEvent) {

    // When the nav is opened:
    // Wait for the "Escape" button to be pressed; if so, hide the nav.
    if (keyPressed(keydownEvent, "Escape")) {
        handleNavDismiss();
        window.removeEventListener("keydown", handleNavKeydown)
    }

}