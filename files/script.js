/**
 * Alma del Tango - Interactive Scripts
 * Elegant interactions for the tango school website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initContactForm();
    initAnimations();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Scroll effect for navigation
    if (nav) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }
}

/**
 * Scroll-based effects
 */
function initScrollEffects() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Parallax effect for hero (subtle)
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        }, { passive: true });
    }
}

/**
 * Contact form handling
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (form && formSuccess) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate
            if (!validateForm(data)) {
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                form.style.display = 'none';
                formSuccess.classList.add('active');
                
                // Reset form
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateInput(input);
                }
            });
        });
    }
}

/**
 * Form validation
 */
function validateForm(data) {
    let isValid = true;
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showError('name', 'Please enter your name');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

function validateInput(input) {
    const value = input.value.trim();
    const name = input.name;
    
    clearError(name);
    
    if (name === 'name' && value.length < 2) {
        showError(name, 'Please enter your name');
        return false;
    }
    
    if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(name, 'Please enter a valid email');
            return false;
        }
    }
    
    if (name === 'message' && value.length < 10 && value.length > 0) {
        showError(name, 'Message too short');
        return false;
    }
    
    return true;
}

function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.classList.add('error');
        field.style.borderColor = '#A41034';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorEl = document.createElement('span');
        errorEl.className = 'error-message';
        errorEl.style.cssText = 'color: #A41034; font-size: 0.75rem; margin-top: 0.25rem;';
        errorEl.textContent = message;
        field.parentNode.appendChild(errorEl);
    }
}

function clearError(fieldName) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.classList.remove('error');
        field.style.borderColor = '';
        
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
}

/**
 * Scroll-triggered animations
 */
function initAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.feature-card, .teacher-card, .info-card, .value-item, .intro-content, .story-content'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animated class styles
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Stagger animation for grid items
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
