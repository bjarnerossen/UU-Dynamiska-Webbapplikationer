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
