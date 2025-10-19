document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("header");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link a");
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // --- Dark Mode Functionality ---
  const applyTheme = (theme) => {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    } else {
      body.classList.remove("dark-mode");
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
  };

  darkModeToggle.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  });

  // --- Header Scroll & Scroll-to-Top Button ---
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
    scrollToTopBtn.classList.toggle("visible", window.scrollY > 300);
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- Hamburger Menu Functionality ---
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll("section[id]");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Contact Form Validation & Submission ---
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const formMessage = document.getElementById("form-message");

  const showError = (input, message) => {
    const formGroup = input.parentElement;
    input.classList.add("invalid");
    const error = formGroup.querySelector(".error-message");
    error.textContent = message;
    error.style.display = "block";
  };

  const hideError = (input) => {
    const formGroup = input.parentElement;
    input.classList.remove("invalid");
    const error = formGroup.querySelector(".error-message");
    error.style.display = "none";
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateInput = (input) => {
    const value = input.value.trim();
    if (input.id === "name") {
      if (value === "") {
        showError(input, "Name is required.");
        return false;
      }
    }
    if (input.id === "email") {
      if (value === "") {
        showError(input, "Email is required.");
        return false;
      }
      if (!validateEmail(value)) {
        showError(input, "Please enter a valid email.");
        return false;
      }
    }
    if (input.id === "message") {
      if (value === "") {
        showError(input, "Message cannot be empty.");
        return false;
      }
    }
    hideError(input);
    return true;
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const isNameValid = validateInput(nameInput);
    const isEmailValid = validateInput(emailInput);
    const isMessageValid = validateInput(messageInput);

    if (isNameValid && isEmailValid && isMessageValid) {
      formMessage.textContent =
        "Thank you for your message! I will get back to you shortly.";
      formMessage.className = "success";
      formMessage.style.display = "block";
      form.style.display = "none";
    }
  });

  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => validateInput(input));
  });

  // --- Initial Load ---
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  applyTheme(savedTheme);
});
