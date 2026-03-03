document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle Logic
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Check saved theme or system preference
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  body.classList.remove("light-mode", "dark-mode");
  body.classList.add(`${savedTheme}-mode`);

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.classList.contains("light-mode")
      ? "light"
      : "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    body.classList.remove(`${currentTheme}-mode`);
    body.classList.add(`${newTheme}-mode`);
    localStorage.setItem("theme", newTheme);
  });

  // Gallery Logic
  const mainImg = document.getElementById("pd-main-img");
  const thumbs = document.querySelectorAll(".thumb");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  let currentIndex = 0;

  const updateGallery = (index) => {
    currentIndex = index;
    const newSrc = thumbs[currentIndex].getAttribute("data-src");

    // Add fade effect
    mainImg.style.opacity = "0.3";

    // Create a temporary image to pre-load
    const tempImg = new Image();
    tempImg.onload = () => {
      mainImg.src = newSrc;
      mainImg.style.opacity = "1";
    };
    tempImg.src = newSrc;

    thumbs.forEach((t) => t.classList.remove("active"));
    thumbs[currentIndex].classList.add("active");
  };

  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener("click", () => updateGallery(idx));
  });

  prevBtn.addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
    updateGallery(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % thumbs.length;
    updateGallery(newIndex);
  });

  // Sticky Header Scroll Effect
  const header = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.padding = "0.5rem 0";
      header.style.boxShadow = "0 10px 15px -3px var(--shadow)";
    } else {
      header.style.padding = "1.5rem 0";
      header.style.boxShadow = "none";
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  mobileMenuBtn.addEventListener("click", () => {
    // Simple alert or implementation if needed. For now just visual toggle for the icon
    mobileMenuBtn.classList.toggle("active");
    // A real implementation would show a menu overlay
    console.log("Mobile menu clicked");
  });

  // Interactive Hover for feature cards
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  // Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".animate-up")
    .forEach((el) => observer.observe(el));

  // FAQ Accordion Logic
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach((i) => i.classList.remove("active"));

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // Manufacturing Process Tabs Logic
  const processTabs = document.querySelectorAll(".tab-btn");
  const processInfos = document.querySelectorAll(".process-info");
  const processImg = document.getElementById("process-display-img");
  const pPrevBtn = document.getElementById("p-nav-prev");
  const pNextBtn = document.getElementById("p-nav-next");
  let currentStepIndex = 0;

  const updateProcessStep = (index) => {
    currentStepIndex = index;
    const activeTab = processTabs[currentStepIndex];
    const processId = activeTab.getAttribute("data-process");

    // Update Tabs
    processTabs.forEach((btn) => btn.classList.remove("active"));
    activeTab.classList.add("active");

    // Update Content
    processInfos.forEach((info) => info.classList.remove("active"));
    const activeInfo = document.querySelector(
      `.process-info[data-process="${processId}"]`,
    );
    activeInfo.classList.add("active");

    // Update Image with a simple random placeholder based on index
    processImg.style.opacity = "0.3";
    setTimeout(() => {
      processImg.src = `https://picsum.photos/800/600?random=${40 + index}`;
      processImg.style.opacity = "1";
    }, 200);
  };

  processTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => updateProcessStep(index));
  });

  pPrevBtn.addEventListener("click", () => {
    const newIndex =
      (currentStepIndex - 1 + processTabs.length) % processTabs.length;
    updateProcessStep(newIndex);
  });

  pNextBtn.addEventListener("click", () => {
    const newIndex = (currentStepIndex + 1) % processTabs.length;
    updateProcessStep(newIndex);
  });

  // Applications Slider Logic
  const appSlider = document.getElementById("app-slider");
  const appPrevBtn = document.getElementById("app-prev");
  const appNextBtn = document.getElementById("app-next");
  let autoSlideInterval;

  const getScrollAmount = () => {
    const card = appSlider.querySelector(".app-card");
    const gap = parseInt(getComputedStyle(appSlider).gap) || 0;
    return card.offsetWidth + gap;
  };

  const slideNext = () => {
    const maxScroll = appSlider.scrollWidth - appSlider.clientWidth;
    if (appSlider.scrollLeft >= maxScroll - 5) {
      appSlider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      appSlider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    }
  };

  const slidePrev = () => {
    if (appSlider.scrollLeft <= 5) {
      const maxScroll = appSlider.scrollWidth - appSlider.clientWidth;
      appSlider.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      appSlider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    }
  };

  const startAutoSlide = () => {
    autoSlideInterval = setInterval(slideNext, 4000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  appNextBtn.addEventListener("click", () => {
    stopAutoSlide();
    slideNext();
    startAutoSlide();
  });

  appPrevBtn.addEventListener("click", () => {
    stopAutoSlide();
    slidePrev();
    startAutoSlide();
  });

  appSlider.addEventListener("mouseenter", stopAutoSlide);
  appSlider.addEventListener("mouseleave", startAutoSlide);
  appSlider.addEventListener("touchstart", stopAutoSlide);
  appSlider.addEventListener("touchend", startAutoSlide);

  startAutoSlide();

  // Testimonials Slider Logic
  const testimonialSlider = document.getElementById("testimonial-slider");
  let testimonialInterval;

  const slideNextTestimonial = () => {
    const card = testimonialSlider.querySelector(".testimonial-card");
    const gap = parseInt(getComputedStyle(testimonialSlider).gap) || 0;
    const scrollAmount = card.offsetWidth + gap;
    const maxScroll =
      testimonialSlider.scrollWidth - testimonialSlider.clientWidth;

    if (testimonialSlider.scrollLeft >= maxScroll - 5) {
      testimonialSlider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      testimonialSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const startTestimonialAutoSlide = () => {
    testimonialInterval = setInterval(slideNextTestimonial, 5000);
  };

  const stopTestimonialAutoSlide = () => {
    clearInterval(testimonialInterval);
  };

  testimonialSlider.addEventListener("mouseenter", stopTestimonialAutoSlide);
  testimonialSlider.addEventListener("mouseleave", startTestimonialAutoSlide);
  testimonialSlider.addEventListener("touchstart", stopTestimonialAutoSlide);
  testimonialSlider.addEventListener("touchend", startTestimonialAutoSlide);

  startTestimonialAutoSlide();

  // Modal Logic
  const modal = document.getElementById("callback-modal");
  const talkExpertBtn = document.getElementById("talk-expert-btn");
  const closeModalBtn = document.getElementById("close-modal");

  const openModal = () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  talkExpertBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Also hook up any "Learn More" buttons in Portfolio if desired
  document.querySelectorAll(".btn-card").forEach((btn) => {
    btn.addEventListener("click", openModal);
  });
});
