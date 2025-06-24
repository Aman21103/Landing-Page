document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Tutup menu saat klik di luar menu
  document.addEventListener('click', (event) => {
    const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
    if (!isClickInside && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }
  });
});
