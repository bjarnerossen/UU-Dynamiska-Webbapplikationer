// const logo = document.querySelector('.logo');
// const dot = document.querySelector('.dot');
// const foodEmojis = ['🍆', '🍅', '🥦', '🌶️', '🍠', '🥕', '🍄', '🥔', '🥬', '🍏', '🍇', '🍓', '🍌', '🍉', '🍊', '🥑', '🥥'];
// let timeoutId;

// logo.addEventListener('click', () => {
//   const randomIndex = Math.floor(Math.random() * foodEmojis.length);
//   const randomFoodEmoji = foodEmojis[randomIndex];
//   dot.innerHTML = randomFoodEmoji;
  
//   // Reset the dot after 5 seconds
//   clearTimeout(timeoutId);
//   timeoutId = setTimeout(() => {
//     dot.innerHTML = '&#x2022;';
//   }, 5000);
// });



const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.body;

    burger.addEventListener('click', () => {
        //Toggle Nav
        nav.classList.toggle('nav-active');
        body.classList.toggle('active');
        
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
