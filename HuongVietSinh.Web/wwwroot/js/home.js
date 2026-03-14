/* ==========================================
   TRANG CHỦ - JAVASCRIPT
   Hiệu ứng: Counter, Scroll Reveal, Parallax
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {

    // ========== SCROLL REVEAL ==========
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Thêm delay nếu có
                const delay = entry.target.style.transitionDelay || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ========== COUNTER ANIMATION ==========
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        counterObserver.observe(statsBar);
    }

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 giây
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);

                // Format số với dấu chấm phân cách
                counter.textContent = formatNumber(current);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    function formatNumber(num) {
        if (num >= 1000) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        return num.toString();
    }


    // ========== HEADER SCROLL EFFECT ==========
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }

        lastScroll = currentScroll;
    }, { passive: true });


    // ========== PARALLAX HERO PARTICLES ==========
    const heroSection = document.querySelector('.hero');
    const particles = document.querySelectorAll('.hero-particle');

    if (heroSection && particles.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;

            if (scrolled <= heroHeight) {
                const ratio = scrolled / heroHeight;
                particles.forEach((p, i) => {
                    const speed = (i % 3 + 1) * 0.3;
                    p.style.transform = `translateY(${scrolled * speed}px)`;
                });
            }
        }, { passive: true });
    }


    // ========== SMOOTH SCROLL FOR HERO ARROW ==========
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            const statsSection = document.querySelector('.stats-section');
            if (statsSection) {
                statsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        heroScroll.style.cursor = 'pointer';
    }

});
