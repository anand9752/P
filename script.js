// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimatedCounters();
    initializeFormHandler();
    initializeSmoothScrolling();
    initializeIntersectionObserver();
    
    // Enhanced initializations
    initializeHeroAnimations();
    initializeCourseCardEffects();
    initializeFormValidationEnhanced();
    initializeScrollAnimationsEnhanced();
    initializeInteractiveElements();
    initializePerformanceOptimizedScroll();
    addFormValidationStyles();
    
    // Additional features
    initializeParallax();
    initializeTestimonialCarousel();
    initializeLazyLoading();
    initializeKeyboardNavigation();
});

// Navigation Functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navCta = document.querySelector('.btn-nav-cta');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Nav CTA button click
    if (navCta) {
        navCta.addEventListener('click', () => {
            scrollToSection('courses');
        });
    }

    // Sticky navbar on scroll with enhanced effects
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add smooth hover effects to nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to Section Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Animated Counters
function initializeAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Scroll Effects and Animations
function initializeScrollEffects() {
    // Floating buttons visibility
    const floatingButtons = document.querySelector('.floating-buttons');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Show floating buttons after scrolling past hero section
        if (scrollPosition > windowHeight * 0.5) {
            floatingButtons.style.opacity = '1';
            floatingButtons.style.visibility = 'visible';
        } else {
            floatingButtons.style.opacity = '0';
            floatingButtons.style.visibility = 'hidden';
        }
    });

    // Initialize floating buttons as hidden
    floatingButtons.style.opacity = '0';
    floatingButtons.style.visibility = 'hidden';
    floatingButtons.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
}

// Intersection Observer for Animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(`
        .course-card,
        .testimonial-card,
        .about-card,
        .contact-item,
        .hero-content,
        .hero-image
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Form Handler
function initializeFormHandler() {
    const form = document.getElementById('inquiryForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            mobile: formData.get('mobile'),
            message: formData.get('message')
        };

        // Simple validation
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showNotification('Thank you for your inquiry! We will get back to you soon.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Form Validation
function validateForm(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!data.mobile || !isValidMobile(data.mobile)) {
        errors.push('Please enter a valid mobile number');
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }

    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }

    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mobile validation
function isValidMobile(mobile) {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile.replace(/\D/g, ''));
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        }
        
        .notification-success {
            border-left: 5px solid #28a745;
        }
        
        .notification-error {
            border-left: 5px solid #dc3545;
        }
        
        .notification-content {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
        }
        
        .notification-message {
            flex: 1;
            white-space: pre-line;
            color: #333;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #999;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            color: #333;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;

    // Add styles to head if not already present
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax Effect for Hero Section
function initializeParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-illustration');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Course Card Hover Effects
function initializeCourseCardEffects() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Add click handlers for course enrollment
    document.querySelectorAll('.btn-course').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseName = this.closest('.course-card').querySelector('h3').textContent;
            showNotification(`Thank you for your interest in ${courseName}! We will contact you soon.`, 'success');
        });
    });
}

// Enhanced Hero Animations
function initializeHeroAnimations() {
    // Floating icons animation
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });

    // Graphic elements orbital animation
    const graphicElements = document.querySelectorAll('.graphic-element');
    graphicElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
    });

    // Parallax effect for hero elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroElements = document.querySelectorAll('.floating-shape');
        
        heroElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Enhanced form validation with real-time feedback
function initializeFormValidationEnhanced() {
    const form = document.getElementById('inquiryForm');
    const inputs = form.querySelectorAll('input, textarea');

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateFieldRealTime(this);
        });

        input.addEventListener('blur', function() {
            validateFieldRealTime(this);
        });
    });

    function validateFieldRealTime(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Remove existing validation styling
        field.classList.remove('valid', 'invalid');
        const existingFeedback = field.parentNode.querySelector('.field-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        switch (field.type) {
            case 'text':
                if (value.length < 2) {
                    isValid = false;
                    message = 'Name must be at least 2 characters';
                }
                break;
            case 'email':
                if (!isValidEmail(value)) {
                    isValid = false;
                    message = 'Please enter a valid email address';
                }
                break;
            case 'tel':
                if (!isValidMobile(value)) {
                    isValid = false;
                    message = 'Please enter a valid mobile number';
                }
                break;
            default:
                if (value.length < 10) {
                    isValid = false;
                    message = 'Message must be at least 10 characters';
                }
        }

        // Apply validation styling
        if (value.length > 0) {
            field.classList.add(isValid ? 'valid' : 'invalid');
            
            if (!isValid) {
                const feedback = document.createElement('div');
                feedback.className = 'field-feedback';
                feedback.textContent = message;
                field.parentNode.appendChild(feedback);
            }
        }
    }
}

// Add CSS for form validation feedback
function addFormValidationStyles() {
    const styles = `
        .form-group input.valid,
        .form-group textarea.valid {
            border-color: #28a745 !important;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='m2.3 6.73l.9-.9 1.7-1.7-.8-.8L3 4.38l-.5-.5-.8.8z'/%3e%3c/svg%3e") !important;
            background-repeat: no-repeat !important;
            background-position: right 12px center !important;
            background-size: 16px 16px !important;
        }
        
        .form-group input.invalid,
        .form-group textarea.invalid {
            border-color: #dc3545 !important;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath d='m6 3v3'/%3e%3cpath d='M6 9h.01'/%3e%3c/svg%3e") !important;
            background-repeat: no-repeat !important;
            background-position: right 12px center !important;
            background-size: 16px 16px !important;
        }
        
        .field-feedback {
            color: #dc3545;
            font-size: 0.8rem;
            margin-top: 0.25rem;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .field-feedback::before {
            content: '⚠';
            font-size: 0.7rem;
        }
    `;

    if (!document.querySelector('#form-validation-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'form-validation-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

// Enhanced scroll animations with stagger effect
function initializeScrollAnimationsEnhanced() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for grid items
                if (entry.target.classList.contains('course-card') || 
                    entry.target.classList.contains('testimonial-card')) {
                    const gridItems = entry.target.parentNode.children;
                    const itemIndex = Array.from(gridItems).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${itemIndex * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(`
        .course-card,
        .testimonial-card,
        .about-card,
        .contact-item,
        .hero-content,
        .hero-image,
        .section-header,
        .stat-item
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
}

// Interactive elements enhancement
function initializeInteractiveElements() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation CSS
    const rippleStyles = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#ripple-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'ripple-styles';
        styleSheet.textContent = rippleStyles;
        document.head.appendChild(styleSheet);
    }
}

// Performance optimized scroll handler
function initializePerformanceOptimizedScroll() {
    let ticking = false;

    function updateScrollEffects() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Floating buttons visibility with smooth transition
        const floatingButtons = document.querySelector('.floating-buttons');
        if (floatingButtons) {
            const shouldShow = scrollTop > windowHeight * 0.3;
            floatingButtons.style.opacity = shouldShow ? '1' : '0';
            floatingButtons.style.visibility = shouldShow ? 'visible' : 'hidden';
            floatingButtons.style.transform = shouldShow ? 'translateY(-50%)' : 'translateY(-50%) translateX(100px)';
        }

        // Navbar background opacity
        const navbar = document.getElementById('navbar');
        if (navbar) {
            const opacity = Math.min(scrollTop / 100, 1);
            navbar.style.background = `rgba(255, 255, 255, ${0.95 + (0.03 * opacity)})`;
        }

        ticking = false;
    }

    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestScrollUpdate);
}

// Testimonial Carousel (if you want to add auto-rotation)
function initializeTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    function rotateTestimonials() {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.opacity = index === currentIndex ? '1' : '0.5';
            testimonial.style.transform = index === currentIndex ? 'scale(1)' : 'scale(0.95)';
        });
        
        currentIndex = (currentIndex + 1) % testimonials.length;
    }

    // Auto-rotate every 5 seconds (optional)
    // setInterval(rotateTestimonials, 5000);
}

// Lazy Loading for Images (if you add images later)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Keyboard Navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeParallax();
    initializeCourseCardEffects();
    initializeTestimonialCarousel();
    initializeLazyLoading();
    initializeKeyboardNavigation();
});

// Utility function for debouncing scroll events
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

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(function() {
    // Any scroll-heavy operations can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyles = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
        animation: pulse 1.5s infinite;
    }
`;

// Add loading styles
if (!document.querySelector('#loading-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'loading-styles';
    styleSheet.textContent = loadingStyles;
    document.head.appendChild(styleSheet);
}

// Fade-in animation for founder section
window.addEventListener('DOMContentLoaded', function() {
    var fadeSection = document.querySelector('.fade-in-on-scroll');
    if (!fadeSection) return;
    function onScrollFadeIn() {
        var rect = fadeSection.getBoundingClientRect();
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < windowHeight - 60) {
            fadeSection.classList.add('visible');
            window.removeEventListener('scroll', onScrollFadeIn);
        }
    }
    window.addEventListener('scroll', onScrollFadeIn);
    onScrollFadeIn(); // Initial check in case already in view
});
