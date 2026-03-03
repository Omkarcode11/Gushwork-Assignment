const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");

  // Header Scroll & Sticky Logic with throttling
  if (header) {
    window.addEventListener(
      "scroll",
      throttle(() => {
        if (window.scrollY > 50) {
          header.classList.add("header-scrolled");
          header.style.padding = "0.4rem 0";
          header.style.boxShadow = "0 10px 15px -3px var(--shadow)";
        } else {
          header.classList.remove("header-scrolled");
          header.style.padding = "0.75rem 0";
          header.style.boxShadow = "none";
        }
      }, 100),
    );
  }

  // Gallery Logic
  const mainImg = document.getElementById("pd-main-img");
  const thumbs = document.querySelectorAll(".thumb");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  let currentIndex = 0;

  if (mainImg && thumbs.length) {
    const updateGallery = (index) => {
      currentIndex = index;
      const newSrc = thumbs[currentIndex].getAttribute("data-src");

      mainImg.style.opacity = "0.3";

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

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const newIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
        updateGallery(newIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const newIndex = (currentIndex + 1) % thumbs.length;
        updateGallery(newIndex);
      });
    }
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking links
    navLinks.querySelectorAll("a").forEach((link) => {
      if (!link.parentElement.classList.contains("dropdown")) {
        link.addEventListener("click", () => {
          mobileMenuBtn.classList.remove("active");
          navLinks.classList.remove("active");
        });
      }
    });

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      const btn = dropdown.querySelector(".drop-btn");
      if (btn) {
        btn.addEventListener("click", (e) => {
          if (window.innerWidth <= 968) {
            e.preventDefault();
            dropdown.classList.toggle("active");
          }
        });
      }
    });
  }

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
    if (question) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        faqItems.forEach((i) => i.classList.remove("active"));
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });

  // Manufacturing Process Tabs Logic
  const processTabs = document.querySelectorAll(".tab-btn");
  const processInfos = document.querySelectorAll(".process-info");
  const processImg = document.getElementById("process-display-img");
  const pPrevBtn = document.getElementById("p-nav-prev");
  const pNextBtn = document.getElementById("p-nav-next");
  const pStepBadge = document.getElementById("process-step-badge");
  const mPrevBtn = document.getElementById("m-nav-prev");
  const mNextBtn = document.getElementById("m-nav-next");
  let currentStepIndex = 0;

  const updateProcessStep = (index) => {
    currentStepIndex = index;
    const activeTab = processTabs[currentStepIndex];
    if (!activeTab) return;
    const processId = activeTab.getAttribute("data-process");
    const stepName = activeTab.innerText.trim();

    processTabs.forEach((btn) => btn.classList.remove("active"));
    activeTab.classList.add("active");

    processInfos.forEach((info) => info.classList.remove("active"));
    const activeInfo = document.querySelector(
      `.process-info[data-process="${processId}"]`,
    );
    if (activeInfo) activeInfo.classList.add("active");

    if (pStepBadge) {
      pStepBadge.innerText = `Step ${currentStepIndex + 1}/${processTabs.length}: ${stepName}`;
      if (activeInfo && !activeInfo.contains(pStepBadge)) {
        activeInfo.prepend(pStepBadge);
      }
    }

    const processImages = [
      "https://res.cloudinary.com/dulamnm2q/image/upload/v1772567644/j26shplmxjge6l97mzpf.png",
      "https://res.cloudinary.com/dulamnm2q/image/upload/v1772568368/qitlsdupasfjohpae6fq.png",
      "https://res.cloudinary.com/dulamnm2q/image/upload/v1772568368/vontjkxy150tsbb7rn7n.png",
    ];

    if (processImg) {
      processImg.style.opacity = "0.3";
      setTimeout(() => {
        processImg.src = processImages[index % processImages.length];
        processImg.style.opacity = "1";
      }, 200);
    }
  };

  processTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => updateProcessStep(index));
  });

  const handlePrev = () => {
    const newIndex =
      (currentStepIndex - 1 + processTabs.length) % processTabs.length;
    updateProcessStep(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentStepIndex + 1) % processTabs.length;
    updateProcessStep(newIndex);
  };

  if (pPrevBtn) pPrevBtn.addEventListener("click", handlePrev);
  if (pNextBtn) pNextBtn.addEventListener("click", handleNext);
  if (mPrevBtn) mPrevBtn.addEventListener("click", handlePrev);
  if (mNextBtn) mNextBtn.addEventListener("click", handleNext);

  // Applications Slider Logic
  const appSlider = document.getElementById("app-slider");
  const appPrevBtn = document.getElementById("app-prev");
  const appNextBtn = document.getElementById("app-next");
  let autoSlideInterval;

  if (appSlider) {
    const getScrollAmount = () => {
      const card = appSlider.querySelector(".app-card");
      if (!card) return 0;
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

    if (appNextBtn) {
      appNextBtn.addEventListener("click", () => {
        stopAutoSlide();
        slideNext();
        startAutoSlide();
      });
    }

    if (appPrevBtn) {
      appPrevBtn.addEventListener("click", () => {
        stopAutoSlide();
        slidePrev();
        startAutoSlide();
      });
    }

    appSlider.addEventListener("mouseenter", stopAutoSlide);
    appSlider.addEventListener("mouseleave", startAutoSlide);
    appSlider.addEventListener("touchstart", stopAutoSlide);
    appSlider.addEventListener("touchend", startAutoSlide);

    startAutoSlide();
  }

  // Testimonials Slider Logic
  const testimonialSlider = document.getElementById("testimonial-slider");
  let testimonialInterval;

  if (testimonialSlider) {
    const slideNextTestimonial = () => {
      const card = testimonialSlider.querySelector(".testimonial-card");
      if (!card) return;
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
  }

  // Portfolio Slider Logic
  const portfolioSlider = document.getElementById("portfolio-slider");
  const portPrevBtn = document.getElementById("portfolio-prev");
  const portNextBtn = document.getElementById("portfolio-next");
  let portfolioInterval;

  if (portfolioSlider) {
    const getScrollAmount = () => {
      const card = portfolioSlider.querySelector(".portfolio-card");
      if (!card) return 0;
      const gap = parseInt(getComputedStyle(portfolioSlider).gap) || 0;
      return card.offsetWidth + gap;
    };

    const slideNext = () => {
      const maxScroll =
        portfolioSlider.scrollWidth - portfolioSlider.clientWidth;
      if (portfolioSlider.scrollLeft >= maxScroll - 5) {
        portfolioSlider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        portfolioSlider.scrollBy({
          left: getScrollAmount(),
          behavior: "smooth",
        });
      }
    };

    const slidePrev = () => {
      if (portfolioSlider.scrollLeft <= 5) {
        const maxScroll =
          portfolioSlider.scrollWidth - portfolioSlider.clientWidth;
        portfolioSlider.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        portfolioSlider.scrollBy({
          left: -getScrollAmount(),
          behavior: "smooth",
        });
      }
    };

    const startAutoSlide = () => {
      portfolioInterval = setInterval(slideNext, 6000);
    };

    const stopAutoSlide = () => {
      clearInterval(portfolioInterval);
    };

    if (portNextBtn) {
      portNextBtn.addEventListener("click", () => {
        stopAutoSlide();
        slideNext();
        startAutoSlide();
      });
    }

    if (portPrevBtn) {
      portPrevBtn.addEventListener("click", () => {
        stopAutoSlide();
        slidePrev();
        startAutoSlide();
      });
    }

    portfolioSlider.addEventListener("mouseenter", stopAutoSlide);
    portfolioSlider.addEventListener("mouseleave", startAutoSlide);
    portfolioSlider.addEventListener("touchstart", stopAutoSlide);
    portfolioSlider.addEventListener("touchend", startAutoSlide);

    startAutoSlide();
  }

  // Generic Modal Logic
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  };

  // Setup triggers for Callback Modal
  const callbackTriggers = [
    "talk-expert-btn",
    "quote-btn-hero",
    "quote-btn-performance",
    "close-modal",
  ];

  callbackTriggers.forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) {
      if (id === "close-modal") {
        btn.addEventListener("click", () => closeModal("callback-modal"));
      } else {
        btn.addEventListener("click", () => openModal("callback-modal"));
      }
    }
  });

  // Setup triggers for Catalogue Modal
  const catalogueTriggers = [
    "request-catalogue-btn",
    "download-datasheet-btn",
    "close-catalogue-modal",
  ];

  catalogueTriggers.forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) {
      if (id === "close-catalogue-modal") {
        btn.addEventListener("click", () => closeModal("catalogue-modal"));
      } else {
        btn.addEventListener("click", () => openModal("catalogue-modal"));
      }
    }
  });

  // Close modals on background click
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Escape key listener for modals
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.active").forEach((modal) => {
        closeModal(modal.id);
      });
    }
  });

  // Hook up Portfolio "Learn More" buttons to Callback Modal
  document.querySelectorAll(".btn-card").forEach((btn) => {
    btn.addEventListener("click", () => openModal("callback-modal"));
  });

  // Form submission prevention (UI only)
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your request has been received.");
      const modal = form.closest(".modal");
      if (modal) closeModal(modal.id);
    });
  });
});
