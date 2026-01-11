/**
 * Mokkachi Premium Enhancements
 * Advanced Interactive Effects
 */

(function () {
    'use strict';

    // ============================================
    // Initialize Premium Effects
    // ============================================
    document.addEventListener('DOMContentLoaded', function () {
        initParticles();
        initScrollIndicator();
        initCursorGlow();
        initSmoothReveal();
        initPageLoader();
        initTiltEffect();
        initCounterAnimation();
    });

    // ============================================
    // Floating Particles Background
    // ============================================
    function initParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-bg';
        particlesContainer.setAttribute('aria-hidden', 'true');

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.animationDuration = `${15 + Math.random() * 15}s`;
            particle.style.opacity = `${0.3 + Math.random() * 0.5}`;
            particle.style.width = `${4 + Math.random() * 6}px`;
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }

        document.body.insertBefore(particlesContainer, document.body.firstChild);
    }

    // ============================================
    // Scroll Progress Indicator
    // ============================================
    function initScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.setAttribute('aria-hidden', 'true');
        document.body.appendChild(indicator);

        window.addEventListener('scroll', function () {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            indicator.style.width = `${scrollPercent}%`;
        }, { passive: true });
    }

    // ============================================
    // Cursor Glow Effect
    // ============================================
    function initCursorGlow() {
        // Only on desktop
        if (window.innerWidth < 1024) return;

        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.setAttribute('aria-hidden', 'true');
        document.body.appendChild(glow);

        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        function animateGlow() {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            glow.style.left = `${currentX}px`;
            glow.style.top = `${currentY}px`;
            requestAnimationFrame(animateGlow);
        }

        animateGlow();
    }

    // ============================================
    // Smooth Reveal on Scroll
    // ============================================
    function initSmoothReveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.transitionDelay = entry.target.dataset.delay || '0s';
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.slide-up, .service-card, .objective-card, .contact-box').forEach(function (el, index) {
            el.dataset.delay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }

    // ============================================
    // Page Loader
    // ============================================
    function initPageLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="loader-ring"></div>';
        document.body.appendChild(loader);

        window.addEventListener('load', function () {
            setTimeout(function () {
                loader.classList.add('hidden');
                setTimeout(function () {
                    loader.remove();
                }, 500);
            }, 300);
        });
    }

    // ============================================
    // 3D Tilt Effect for Cards
    // ============================================
    function initTiltEffect() {
        // Only on desktop
        if (window.innerWidth < 1024) return;

        const cards = document.querySelectorAll('.service-card, .objective-card');

        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateY(-10px) 
                    scale(1.02)
                `;
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
            });
        });
    }

    // ============================================
    // Counter Animation for Statistics
    // ============================================
    function initCounterAnimation() {
        const counters = document.querySelectorAll('[data-count]');

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (counter) {
            observer.observe(counter);
        });

        function animateCounter(element) {
            const target = parseInt(element.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            }

            updateCounter();
        }
    }

    // ============================================
    // Parallax Effect for Hero
    // ============================================
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');

        if (hero && scrolled < window.innerHeight) {
            const heroImg = hero.querySelector('.hero-bg');
            if (heroImg) {
                heroImg.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0002})`;
            }
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            }
        }
    }, { passive: true });

    // ============================================
    // Magnetic Button Effect
    // ============================================
    document.querySelectorAll('.btn-primary').forEach(function (btn) {
        btn.addEventListener('mousemove', function (e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
        });

        btn.addEventListener('mouseleave', function () {
            btn.style.transform = '';
        });
    });

    // ============================================
    // Smooth Scroll Enhancement
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // Easter Egg: Konami Code
    // ============================================
    let konamiCode = [];
    const konamiPattern = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

    document.addEventListener('keydown', function (e) {
        konamiCode.push(e.keyCode);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiPattern.join(',')) {
            document.body.style.animation = 'rainbowBg 2s ease-in-out';
            setTimeout(function () {
                document.body.style.animation = '';
            }, 2000);
        }
    });

    // Add rainbow animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbowBg {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

})();
