document.addEventListener('DOMContentLoaded', () => {
  // Update copyright year otomatis
  const copyrightYearSpan = document.getElementById('copyright-year');
  if (copyrightYearSpan) {
    const currentYear = new Date().getFullYear();
    copyrightYearSpan.textContent = currentYear;
  }

  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Tutup menu saat klik di luar menu dengan smooth scroll ke anchor
  document.querySelectorAll('.footer-column a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.open(href, '_blank');
      }
    });
  });

  // Fungsi untuk membuat dan mengatur dots indikator kegiatan
  const kegiatanWrapper = document.querySelector('.kegiatan-wrapper');
  const kegiatanList = document.querySelector('.kegiatan-list');
  const kegiatanDots = document.querySelector('.kegiatan-dots');

  if (kegiatanWrapper && kegiatanList && kegiatanDots) {
    const images = kegiatanList.querySelectorAll('img');
    let activeIndex = 0;

    // Buat dot sesuai jumlah gambar
    images.forEach((img, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        kegiatanWrapper.scrollTo({
          left: img.offsetLeft,
          behavior: 'smooth'
        });
      });
      kegiatanDots.appendChild(dot);
    });

    // Update dot aktif saat scroll dengan scroll snap kompatibel dan debounce
    let scrollTimeout;
    kegiatanWrapper.addEventListener('scroll', () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = kegiatanWrapper.scrollLeft;
        let newIndex = 0;
        images.forEach((img, index) => {
          if (Math.abs(scrollLeft - img.offsetLeft) < Math.abs(scrollLeft - images[newIndex].offsetLeft)) {
            newIndex = index;
          }
        });
        if (newIndex !== activeIndex) {
          kegiatanDots.children[activeIndex].classList.remove('active');
          kegiatanDots.children[newIndex].classList.add('active');
          activeIndex = newIndex;
        }
      }, 100);
    });
  }

  // Tutup menu saat klik di luar menu
  document.addEventListener('click', (event) => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
    if (!isClickInside && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }
  });

  // Drag scroll untuk .kegiatan-wrapper agar bisa geser gambar di Android dan desktop
  if (kegiatanWrapper) {
    let isDown = false;
    let startX;
    let scrollLeft;

    kegiatanWrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      kegiatanWrapper.classList.add('active');
      startX = e.pageX - kegiatanWrapper.offsetLeft;
      scrollLeft = kegiatanWrapper.scrollLeft;
    });

    kegiatanWrapper.addEventListener('mouseleave', () => {
      isDown = false;
      kegiatanWrapper.classList.remove('active');
    });

    kegiatanWrapper.addEventListener('mouseup', () => {
      isDown = false;
      kegiatanWrapper.classList.remove('active');
    });

    kegiatanWrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - kegiatanWrapper.offsetLeft;
      const walk = (x - startX) * 2; //scroll-fast
      kegiatanWrapper.scrollLeft = scrollLeft - walk;
    });

    // Untuk touch device
    kegiatanWrapper.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - kegiatanWrapper.offsetLeft;
      scrollLeft = kegiatanWrapper.scrollLeft;
    });

    kegiatanWrapper.addEventListener('touchend', () => {
      isDown = false;
    });

    kegiatanWrapper.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - kegiatanWrapper.offsetLeft;
      const walk = (x - startX) * 2;
      kegiatanWrapper.scrollLeft = scrollLeft - walk;
    });
  }
});
