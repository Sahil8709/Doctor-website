// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
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
      
      // Smooth scroll to section
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
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
  
  // ===== APPOINTMENT FORM SUBMISSION =====
  const appointmentForm = document.getElementById('appointmentForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');
  
  appointmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Change button text and disable
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    
    try {
      // Create FormData object
      const formData = new FormData(appointmentForm);
      
      // Send form data to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      // Show success or error message
      if (data.success) {
        showFormMessage("✅ Appointment request sent successfully! We'll contact you soon.", "success");
        appointmentForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = "none";
        }, 5000);
      } else {
        showFormMessage("❌ Error: " + (data.message || "Something went wrong. Please try again."), "error");
      }
    } catch (error) {
      showFormMessage("⚠️ Network error. Please check your connection and try again.", "warning");
    } finally {
      // Restore button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
  
  // Helper function to show form messages
  function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.style.display = "block";
    
    // Set background color based on type
    switch(type) {
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
  
  // ===== SET MINIMUM DATE FOR APPOINTMENT =====
// Date validation (optional)
if (date) {  // Only validate if date is provided
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    showError('date', 'Please select a future date');
    isValid = false;
  }
}
// If no date selected, it's okay - field is optional
  
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
  
  // Check on load and scroll
  window.addEventListener('load', fadeInOnScroll);
  window.addEventListener('scroll', fadeInOnScroll);
  
  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only handle anchor links
      if (href === "#" || href === "#!") return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===== FORM VALIDATION HELPERS =====
  const phoneInput = document.getElementById('phone');
  
  // Format phone number as user types
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Format: +91 98765 43210
    if (value.length > 0) {
      if (value.length <= 2) {
        value = '+' + value;
      } else if (value.length <= 5) {
        value = '+' + value.slice(0,2) + ' ' + value.slice(2);
      } else if (value.length <= 10) {
        value = '+' + value.slice(0,2) + ' ' + value.slice(2,7) + ' ' + value.slice(7);
      } else {
        value = '+' + value.slice(0,2) + ' ' + value.slice(2,7) + ' ' + value.slice(7,12);
      }
    }
    
    e.target.value = value;
  });
  
  // ===== INITIALIZE ANIMATIONS =====
  // Trigger initial fade-in check
  setTimeout(fadeInOnScroll, 100);
  
  // Add active class to current nav link
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
  
  // ===== SERVICE CARDS HOVER EFFECT ENHANCEMENT =====
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
  
  // ===== WHATSAPP BUTTON PULSE EFFECT =====
  const whatsappBtn = document.querySelector('.whatsapp-btn');
  
  // Add pulse animation every 5 seconds
  setInterval(() => {
    whatsappBtn.style.animation = 'pulse 1s';
    setTimeout(() => {
      whatsappBtn.style.animation = '';
    }, 1000);
  }, 5000);
  
  // Add CSS for pulse animation
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