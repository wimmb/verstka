$(document).ready(function () {
	// Fancybox init
	if (document.querySelector('[data-fancybox]')) {
		Fancybox.bind('[data-fancybox]', {
			dragToClose: false,
			closeButton: false,
		});
	}

  // Reviews carousel swiper
	const reviews__carousel = document.querySelector('.reviews__carousel');
	if (reviews__carousel) {
		const swiper = new Swiper(reviews__carousel, {
			slidesPerView: 'auto',
			loop: true,
      		pagination: {
      			el: '.reviews__pagination',
      			clickable: true,
    		},
		});
	}

});


// Add .header--scroll to Header
function updateHeaderScrollClass() {
	const header = document.querySelector('.header');
	if (!header) return;
	
	if (window.scrollY > 0) {
		header.classList.add('header--scroll');
	} else {
		header.classList.remove('header--scroll');
	}
}
document.addEventListener('scroll', updateHeaderScrollClass);
document.addEventListener('DOMContentLoaded', updateHeaderScrollClass);

// Scroll links
document.addEventListener('DOMContentLoaded', function () {
	const OFFSET_DESKTOP = 84;
	const OFFSET_MOBILE = 58;
	const MOBILE_BREAKPOINT = 1079.98;

	const header = document.querySelector('.header');
	const burgerBtn = document.querySelector('.header__mobile-burger');
	const mobileMenu = document.querySelector('.header__mobile-menu');

	burgerBtn.addEventListener('click', function () {
		burgerBtn.classList.toggle('active');
		mobileMenu.classList.toggle('active');
		header.classList.toggle('open-menu');
	});

	function getHeaderOffset() {
		return window.innerWidth <= MOBILE_BREAKPOINT ? OFFSET_MOBILE : OFFSET_DESKTOP;
	}

	function scrollToTarget(id) {
		const target = document.getElementById(id);
		if (target) {
			const offset = getHeaderOffset();
			const top = target.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({
				top: top,
				behavior: 'smooth'
			});
		}
	}

	function handleLinkClick(e) {
		const href = this.getAttribute('href');
		if (href.startsWith('#') && href.length > 1) {
			e.preventDefault();
			const id = href.substring(1);
			scrollToTarget(id);

			if (window.innerWidth <= MOBILE_BREAKPOINT) {
				burgerBtn.classList.remove('active');
				mobileMenu.classList.remove('active');
				header.classList.remove('open-menu');
			}
		}
	}

	const links = document.querySelectorAll('a[href^="#"]:not([href="#"]), .scroll-btn');
	links.forEach(link => {
		link.addEventListener('click', handleLinkClick);
	});
});


//Counters
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".hero__counter-num");
  let animated = false;

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      const duration = 2000;
      const stepTime = 20; 
      let current = 0;
      const increment = target / (duration / stepTime);

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (
        entry.isIntersecting &&
		window.innerWidth > 599.98 &&
        !animated
      ) {
        animated = true;
        setTimeout(() => {
          animateCounters();
        }, 2000);
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroCounters = document.querySelector(".hero__counters");
  if (heroCounters) {
    observer.observe(heroCounters);
  }
});

//Hero slider
document.addEventListener("DOMContentLoaded", function () {
  const heroBgs = document.querySelector(".hero__bgs");

  if (heroBgs && window.innerWidth > 599.98) {
    const slides = heroBgs.querySelectorAll("img");
    if (slides.length === 0) return;

    let current = 0;

    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 5000);
  }
});

//Hero slider Mob
document.addEventListener("DOMContentLoaded", function () {
  const mheroBgs = document.querySelector(".mhero__bgs");

  if (mheroBgs && window.innerWidth <= 599.98) {
    const slides = mheroBgs.querySelectorAll("img");
    if (slides.length === 0) return;

    let current = 0;

    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 4000);
  }
});

//Gallery sliders
document.addEventListener("DOMContentLoaded", function () {
  const galleries = document.querySelectorAll(".gall__card");
  if (galleries.length === 0) return;

  const delay = 800;
  const hold = 3500;

  let current = 0;

  function changeSlides() {
    galleries.forEach((gallery, i) => {
      setTimeout(() => {
        const slides = gallery.querySelectorAll("img");
        if (slides.length === 0) return;

        const active = gallery.querySelector("img.active");
        let index = Array.from(slides).indexOf(active);
        active.classList.remove("active");

        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
      }, i * delay);
    });

    setTimeout(changeSlides, galleries.length * delay + hold);
  }

  changeSlides();
});

//Team carousel
document.addEventListener("DOMContentLoaded", function () {
	const carousel = document.querySelector(".team__carousel");
	if (!carousel) return;

	let swiperInstance = null;
	const breakpoint = 1079.98;

	function initSwiper() {
    if (window.innerWidth <= breakpoint && !swiperInstance) {
      swiperInstance = new Swiper(".team__carousel", {
        slidesPerView: 'auto',
		loop: true,
      	pagination: {
      		el: '.team__pagination',
      		clickable: true,
    	},
    });
    } else if (window.innerWidth > breakpoint && swiperInstance) {
    	swiperInstance.destroy(true, true);
    	swiperInstance = null;
    }
	}

	initSwiper();
	window.addEventListener("resize", initSwiper);
});

// Toggles FAQ
document.addEventListener('DOMContentLoaded', function () {
	const toggleBlocks = document.querySelectorAll('.faq__toggle');

	if (toggleBlocks.length === 0) {
		return;
	}

	toggleBlocks.forEach(block => {
		const header = block.querySelector('.toggle__header');
		const button = block.querySelector('.toggle__header-btn');
		const content = block.querySelector('.toggle__content');

		if (!header || !button || !content) {
			return;
		}

		header.addEventListener('click', function () {
			if (content.style.maxHeight) {
				content.style.maxHeight = null;
				content.style.paddingTop = null;
				//content.style.paddingBottom = null;
				button.classList.remove('v_active');
			} else {
				content.style.maxHeight = content.scrollHeight + 30 + 'px';
				content.style.paddingTop = '20px';
				//content.style.paddingBottom = '20px';
				button.classList.add('v_active');
			}
		});
	});
});

// Scroll to Top
document.addEventListener("DOMContentLoaded", function() {
    const scrollTopBtn = document.getElementById("scr_top");
    const scrollOffset = 800;

    window.addEventListener("scroll", () => {
        scrollTopBtn.classList.toggle("visible", window.scrollY > scrollOffset);
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});