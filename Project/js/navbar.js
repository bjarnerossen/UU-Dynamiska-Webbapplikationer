// Function to toggle the navbar
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navLogo = document.querySelector('.nav-logo');
    const body = document.body;

    burger.addEventListener('click', () => {
        //Toggle Nav
        nav.classList.toggle('nav-active');
        body.classList.toggle('active');
        navLogo.classList.toggle('show');
        
        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

navSlide();


const navLinks = document.querySelectorAll('.nav-link');
const activeLink = document.querySelector('.nav-link.active');

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    if (activeLink && activeLink !== link) {
      activeLink.classList.remove('active');
    }
  });

  link.addEventListener('mouseleave', () => {
    if (activeLink && activeLink !== link) {
      activeLink.classList.add('active');
    }
  });
});

// LITTLE EASTER EGG 🐣🌝
const logo = document.querySelector('.logo');
const logoDot = document.querySelector('.dot');

// change the dot inner html to the guru on hover
logo.addEventListener('mouseover', () => {
  logoDot.innerHTML = '🧙‍♀️';
  logoDot.style.transition = '0.5s ease-in-out'; // Adding smooth transition effect
});

// change the dot inner html to the initial state, set timer for 5sec on mouseout
logo.addEventListener('mouseout', () => {
  setTimeout(() => {
    logoDot.innerHTML = '&#x2022;';
  }, 5000);
});

// On click of the logo redirect the user to the home website
logo.addEventListener('click', () => {
  window.location.href = "./index.html";
});