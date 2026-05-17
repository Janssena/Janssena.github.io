// Handle smooth scroll link if it exists
if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({ behavior: "smooth" })
  })
}

// Toggle 'scrolled' class on navbar to enable dynamic styles (like drop shadow) on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
  const checkScroll = () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Run on load (in case page is refreshed while scrolled down)
  checkScroll();

  // Run on every scroll event
  window.addEventListener('scroll', checkScroll);
}