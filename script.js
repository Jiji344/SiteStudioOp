// ========================================
// Menu Mobile Toggle
// ========================================
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fermer le menu lors du clic sur un lien
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ========================================
// Smooth Scrolling
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Header Scroll Effect
// ========================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.12)';
        header.style.background = 'rgba(255, 255, 255, 0.6)';
    } else {
        header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
        header.style.background = 'rgba(255, 255, 255, 0.4)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Animations au scroll - Fade In
// ========================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer les éléments fade-in
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => {
    fadeInObserver.observe(element);
});

// ========================================
// Animations Services - Slide Up
// ========================================
const slideUpObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Ajouter un délai pour chaque élément
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, observerOptions);

const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
    slideUpObserver.observe(item);
});

// ========================================
// Scroll infini des témoignages
// ========================================
const testimonialsTrack = document.getElementById('testimonials-track');

if (testimonialsTrack) {
    // Dupliquer le contenu pour l'effet de boucle infinie
    const testimonialItems = Array.from(testimonialsTrack.children);
    
    // Dupliquer tous les témoignages plusieurs fois pour un scroll fluide
    testimonialItems.forEach(item => {
        const clone1 = item.cloneNode(true);
        const clone2 = item.cloneNode(true);
        testimonialsTrack.appendChild(clone1);
        testimonialsTrack.appendChild(clone2);
    });
    
    let scrollPosition = 0;
    let animationId;
    let isPaused = false;
    
    // Fonction d'animation fluide
    function scrollTestimonials() {
        if (!isPaused) {
            scrollPosition -= 1; // Vitesse de défilement (ajustable)
            
            // Calculer la largeur d'un set complet de témoignages
            const firstItemWidth = testimonialItems[0].offsetWidth;
            const gap = 32; // 2rem = 32px
            const totalWidth = testimonialItems.length * (firstItemWidth + gap);
            
            // Reset la position quand on a scrollé un set complet
            if (Math.abs(scrollPosition) >= totalWidth) {
                scrollPosition = 0;
            }
            
            testimonialsTrack.style.transform = `translateX(${scrollPosition}px)`;
        }
        
        animationId = requestAnimationFrame(scrollTestimonials);
    }
    
    // Démarrer l'animation
    scrollTestimonials();
    
    // Pause au survol
    testimonialsTrack.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    testimonialsTrack.addEventListener('mouseleave', () => {
        isPaused = false;
    });
}

// ========================================
// Formulaire de Contact
// ========================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Animation du bouton
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Envoi en cours...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simuler l'envoi (à remplacer par votre logique d'envoi réelle)
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message envoyé !</span><i class="fas fa-check"></i>';
            submitBtn.style.background = '#4CAF50';
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            // Remettre le bouton à son état initial après 3 secondes
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
        
        console.log('Formulaire soumis:', formData);
    });
}

// ========================================
// Animation des inputs du formulaire
// ========================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    // Placeholder trick pour l'animation du label
    input.setAttribute('placeholder', ' ');
});

// ========================================
// Chargement des projets depuis Decap CMS
// ========================================
async function loadProjects() {
    // Utiliser le loader de projets-loader.js si disponible
    if (typeof initProjects === 'function') {
        await initProjects();
    } else {
        console.log('Mode développement - projets statiques affichés');
    }
}

// ========================================
// Parallax Effect sur la section héros
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled <= window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// Active Link dans la Navigation
// ========================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// ========================================
// Initialisation au chargement de la page
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Charger les projets
    loadProjects();
    
    // Animation d'entrée de la page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Netlify Identity (pour Decap CMS)
// ========================================
if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        if (!user) {
            window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
            });
        }
    });
}

