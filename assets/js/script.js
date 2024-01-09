'use strict';
// ADD EVENT ON MULTIPLE EVENT
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);}}

// PRELOADING
const loadingElement = document.querySelector("[data-loading]");
window.addEventListener("load", function () {
  loadingElement.classList.add("loaded");
  document.body.classList.remove("active");});

// MOBILE NAVIGATION TOGGLING
const [navTogglers, navLinks, navbar, overlay] = [
  document.querySelectorAll("[data-nav-toggler]"),
  document.querySelectorAll("[data-nav-link]"),
  document.querySelector("[data-navbar]"),
  document.querySelector("[data-overlay]")];

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");}

addEventOnElements(navTogglers, "click", toggleNav);
const closeNav = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");}
addEventOnElements(navLinks, "click", closeNav);

// HEADER
const header = document.querySelector("[data-header]");
const activeElementOnScroll = function () {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");}}

window.addEventListener("scroll", activeElementOnScroll);

/*HERO SECTION TEXT ANIMATION*/
const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {

  // SETTING LOOP THROUGH ALL LETTER BOX
  for (let i = 0; i < letterBoxes.length; i++) {
    //SETTING LETTER ANIMATION DELAY(INITIAL)
    let letterAnimationDelay = 0;

    //GETS EVERY CHARACTERS FROM LETTER BOX(CURRENT)
    const letters = letterBoxes[i].textContent.trim();
    
    // EMPTY THE CURRENT LETTER BOX(REMOVES ALL CHARACTERS)
    letterBoxes[i].textContent = "";

    // LOOP THROUGH EACH AND EVERY LETTERS
    for (let j = 0; j < letters.length; j++) {

      // CREATE SPAN AND SET DELAY ON SPAN
      const span = document.createElement("span");
      span.style.animationDelay = `${letterAnimationDelay}s`;
      
      // SET CLASS ON SPAN, IF LBOX IS ACTIVE; ELSE class is "REJECTED"
      if (i === activeLetterBoxIndex) {span.classList.add("in");} else {span.classList.add("out");}
      span.textContent = letters[j];
      if (letters[j] === " ") span.classList.add("space");
      letterBoxes[i].appendChild(span);
      if (j >= letters.length - 1) break;
      // ELSE UPDATE
      letterAnimationDelay += 0.05;

    }

    // FIND DETAIL OF EXACT DELAY
    if (i === activeLetterBoxIndex) {totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));}
    if (i === lastActiveLetterBoxIndex) {letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }

  }
  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;
    activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : activeLetterBoxIndex++;
  setLetterEffect();}, (totalLetterBoxDelay * 1000) + 3000);
}

//CALL LETTER EFFECT
window.addEventListener("load", setLetterEffect);

/*CUSTOM CURSOR*/
const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

//CURSOR ELEMENT FOLLOW MOUSE POSITION
document.body.addEventListener("mousemove", function (event) {
  setTimeout(function () {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
});

// HOVER CLASS FOR CURSOR WHEN ACTIVE
const hoverActive = function () { cursor.classList.add("hovered"); }

// HOVER CLASS FOR CURSOR DEACTIVATE/NONACTIVE
const hoverDeactive = function () { cursor.classList.remove("hovered"); }

// WHEN HOVER OVER ANY HYPERLINK OR BUTTONS APPLY EFFECT
addEventOnElements(anchorElements, "mouseover", hoverActive);
addEventOnElements(anchorElements, "mouseout", hoverDeactive);
addEventOnElements(buttons, "mouseover", hoverActive);
addEventOnElements(buttons, "mouseout", hoverDeactive);

// WHEN MOUSE OUTSIDE RANGE/BODY DISABLE CLASS(CURSOR ELEMENT)
document.body.addEventListener("mouseout", function () {
  cursor.classList.add("disabled");
});

//WHEN MOUSE INSIDE/WITHIN BODY REMOVE DISABLED CLASS(CURSOR ELEMENT)
document.body.addEventListener("mouseover", function () {
  cursor.classList.remove("disabled");
});

/*BACK TO TOP BUTTON MECHANISM*/
const backTopBtn = document.querySelector("[data-back-top-btn]");
window.addEventListener("scroll", function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;
  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;
  
  // CRITERIA TO MAKE BACK TOP BUTTON VISIBLE
  if (totalScrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }
});

/*WHEN SCROLL REVEALS IMAGE*/
const revealElements = document.querySelectorAll("[data-reveal]");
const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}
window.addEventListener("scroll", scrollReveal);
scrollReveal();
