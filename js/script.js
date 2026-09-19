// ==================== WAIT FOR DOM TO LOAD ====================
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Portfolio Script Loaded");

  // ==================== PARTICLE GENERATION ====================
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 20 + "s";
      particle.style.animationDuration = Math.random() * 15 + 15 + "s";
      particlesContainer.appendChild(particle);
    }
  }

  // ==================== COPYRIGHT YEAR ====================
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ==================== HEADER SCROLL EFFECT ====================
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // ==================== MOBILE MENU TOGGLE ====================
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.textContent = navLinks.classList.contains("active")
        ? "✕"
        : "☰";
    });

    // Close mobile menu on link click
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.textContent = "☰";
      });
    });
  }

  // ==================== TYPEWRITER EFFECT ====================
  const typeTarget = document.getElementById("typewriter-text");
  if (typeTarget) {
    const phrases = [
      "Learning React & Node.js.",
      "Building Academic Projects.",
      "Solving Algorithm Problems.",
      "Exploring Full Stack Tech.",
      "Seeking Internship Opportunities.",
    ];
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typeTarget.textContent = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
      } else {
        typeTarget.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
      }

      let typeSpeed = 80;
      if (isDeleting) typeSpeed /= 2;

      if (!isDeleting && letterIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);
  }

  // ==================== SCROLL ANIMATIONS ====================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Trigger counter animation for stats only once
        if (entry.target.querySelector(".stat-number")) {
          animateCounters();
        }
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")
    .forEach((el) => {
      observer.observe(el);
    });

  // ==================== COUNTER ANIMATION ====================
  let countersAnimated = false;
  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    const counters = document.querySelectorAll(".stat-number");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + (target === 100 ? "%" : "+");
        }
      };
      updateCounter();
    });
  }

  // ==================== SECURE CONTACT FORM (Web3Forms + SweetAlert) ====================
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");

  // Check if SweetAlert is loaded
  if (typeof Swal === "undefined") {
    console.warn("⚠️ SweetAlert2 not found. Did you include the CDN script?");
  }

  if (form && submitBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // 1. Get Values
      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const subjectInput = form.querySelector('input[name="subject"]');
      const messageInput = form.querySelector('textarea[name="message"]');

      let isValid = true;
      let errors = [];

      // Reset Styles
      [nameInput, emailInput, subjectInput, messageInput].forEach((el) => {
        if (el) el.style.borderColor = "var(--glass-border)";
      });

      // --- VALIDATION RULES ---

      // A. Name
      const nameVal = nameInput.value.trim();
      if (nameVal.length < 2) {
        isValid = false;
        nameInput.style.borderColor = "#F72585";
        errors.push("Name must be at least 2 characters.");
      } else if (!/^[a-zA-Z\s]+$/.test(nameVal)) {
        isValid = false;
        nameInput.style.borderColor = "#F72585";
        errors.push("Name should only contain letters.");
      }

      // B. Email
      const emailVal = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        isValid = false;
        emailInput.style.borderColor = "#F72585";
        errors.push("Email is required.");
      } else if (!emailRegex.test(emailVal)) {
        isValid = false;
        emailInput.style.borderColor = "#F72585";
        errors.push("Please enter a valid email address.");
      }

      // C. Subject
      const subjectVal = subjectInput.value.trim();
      if (subjectVal.length < 5) {
        isValid = false;
        subjectInput.style.borderColor = "#F72585";
        errors.push("Subject must be at least 5 characters.");
      }

      // D. Message
      const messageVal = messageInput.value.trim();
      if (messageVal.length < 10) {
        isValid = false;
        messageInput.style.borderColor = "#F72585";
        errors.push("Message must be at least 10 characters.");
      } else if (messageVal.length > 2000) {
        isValid = false;
        messageInput.style.borderColor = "#F72585";
        errors.push("Message is too long (max 2000 chars).");
      }

      // --- HANDLE ERRORS ---
      if (!isValid) {
        if (typeof Swal !== "undefined") {
          Swal.fire({
            icon: "error",
            title: "Validation Failed",
            html: `<ul style="text-align:left; margin:0; padding-left:20px; color:#fff;">
                        ${errors.map((err) => `<li>${err}</li>`).join("")}
                    </ul>`,
            confirmButtonColor: "#F72585",
            background: "#1a1a1a",
            color: "#fff",
          });
        } else {
          alert(errors.join("\n"));
        }
        return;
      }

      // --- PREPARE DATA ---
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = "Sending...";

      const formData = new FormData(form);
      const object = {};
      formData.forEach((value, key) => {
        object[key] = value; // Simple serialization
      });

      // Ensure Access Key
      if (!object.access_key) {
        object.access_key = "c0a337f3-6645-4cd1-9c83-bd7a6ec1fe96";
      }

      // --- SEND REQUEST ---
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(object),
      })
        .then(async (response) => {
          if (response.status == 200) {
            const data = await response.json();
            if (data.success) {
              if (typeof Swal !== "undefined") {
                await Swal.fire({
                  title: "Success!",
                  text: "Your message has been securely sent to Amanath.",
                  icon: "success",
                  confirmButtonColor: "#00a524",
                  confirmButtonText: "OK",
                  background: "#1a1a1a",
                  color: "#fff",
                  backdrop: "rgba(0,0,0,0.8)",
                });
              } else {
                alert("Message sent successfully!");
              }
              form.reset();
            } else {
              throw new Error(data.message || "Submission failed.");
            }
          } else {
            throw new Error("Server error.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          if (typeof Swal !== "undefined") {
            Swal.fire({
              icon: "error",
              title: "Submission Failed",
              text: error.message || "Check your internet connection.",
              confirmButtonColor: "#F72585",
              background: "#1a1a1a",
              color: "#fff",
            });
          } else {
            alert("Error: " + error.message);
          }
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        });
    });
  } else {
    console.log(
      "ℹ️ Contact form not found on this page (Normal if not on home page)",
    );
  }

  // ==================== TERMINAL EASTER EGG ====================
  const termTrigger = document.getElementById("termTrigger");
  const termModal = document.getElementById("termModal");
  const termOverlay = document.getElementById("termOverlay");
  const termClose = document.getElementById("termClose");

  if (termTrigger && termModal) {
    function openTerminal() {
      termModal.classList.add("active");
      termOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeTerminal() {
      termModal.classList.remove("active");
      termOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }

    termTrigger.addEventListener("click", openTerminal);
    if (termClose) termClose.addEventListener("click", closeTerminal);
    if (termOverlay) termOverlay.addEventListener("click", closeTerminal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && termModal.classList.contains("active")) {
        closeTerminal();
      }
    });
  }

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ==================== ACTIVE NAV LINK ====================
  const sections = document.querySelectorAll("section");
  const navLinksList = document.querySelectorAll(".nav-links a");

  if (sections.length > 0 && navLinksList.length > 0) {
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      navLinksList.forEach((link) => {
        link.style.color = "";
        if (link.getAttribute("href").slice(1) === current) {
          link.style.color = "var(--accent-cyan)";
        }
      });
    });
  }
});

const buttons = document.querySelectorAll(".btn");
buttons.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});
