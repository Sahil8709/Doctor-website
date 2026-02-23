
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

  // ===== MOBILE NAVIGATION TOGGLE =====
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== APPOINTMENT FORM =====
  const appointmentForm = document.getElementById('appointmentForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');

  appointmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // ===== VALIDATION =====
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;

    // Name
    if (name.length < 2) {
      showFormMessage("⚠️ Please enter your full name.", "warning");
      return;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage("⚠️ Please enter a valid email address.", "warning");
      return;
    }

    // Phone - minimum 10 digits
    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      showFormMessage("⚠️ Please enter a valid 10 digit phone number.", "warning");
      return;
    }

    // Service
    if (!service) {
      showFormMessage("⚠️ Please select a service.", "warning");
      return;
    }

    // Date - only if provided
    if (date) {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        showFormMessage("⚠️ Please select a future date.", "warning");
        return;
      }
    }

    // ===== SUBMIT =====
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const formData = new FormData(appointmentForm);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        showFormMessage("✅ Appointment request sent successfully! We'll contact you soon.", "success");
        appointmentForm.reset();
        setTimeout(() => {
          formMessage.style.display = "none";
        }, 5000);
      } else {
        showFormMessage("❌ Error: " + (data.message || "Something went wrong. Please try again."), "error");
      }
    } catch (error) {
      showFormMessage("⚠️ Network error. Please check your connection and try again.", "warning");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  // ===== SHOW FORM MESSAGE =====
  function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.style.display = "block";

    switch (type) {
      case "success":
        formMessage.style.backgroundColor = "rgba(46, 204, 113, 0.1)";
        formMessage.style.color = "#27ae60";
        break;
      case "error":
        formMessage.style.backgroundColor = "rgba(231, 76, 60, 0.1)";
        formMessage.style.color = "#c0392b";
        break;
      case "warning":
        formMessage.style.backgroundColor = "rgba(241, 196, 15, 0.1)";
        formMessage.style.color = "#f39c12";
        break;
    }
  }

  // ===== PHONE INPUT - backspace works freely =====
  const phoneInput = document.getElementById('phone');

  phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/[^\d\s\+\-]/g, '');
    e.target.value = value;
  });

  // ===== FADE-IN ANIMATION ON SCROLL =====
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  window.addEventListener('load', fadeInOnScroll);
  window.addEventListener('scroll', fadeInOnScroll);

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === "#" || href === "#!") return;
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== INITIALIZE ANIMATIONS =====
  setTimeout(fadeInOnScroll, 100);

  // ===== HIGHLIGHT ACTIVE NAV LINK =====
  const sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add('active');
      } else {
        navLink?.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);

  // ===== SERVICE CARDS HOVER =====
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // ===== WHATSAPP PULSE =====
  const whatsappBtn = document.querySelector('.whatsapp-btn');

  setInterval(() => {
    whatsappBtn.style.animation = 'pulse 1s';
    setTimeout(() => {
      whatsappBtn.style.animation = '';
    }, 1000);
  }, 5000);

  const pulseStyle = document.createElement('style');
  pulseStyle.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); box-shadow: 0 5px 20px rgba(37, 211, 102, 0.3); }
      50% { transform: scale(1.05); box-shadow: 0 8px 25px rgba(37, 211, 102, 0.5); }
      100% { transform: scale(1); box-shadow: 0 5px 20px rgba(37, 211, 102, 0.3); }
    }
  `;
  document.head.appendChild(pulseStyle);

  console.log('Website initialized successfully!');
});