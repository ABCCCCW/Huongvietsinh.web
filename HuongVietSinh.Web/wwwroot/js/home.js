document.addEventListener("DOMContentLoaded", () => {
    /* ─── HERO SLIDER ─── */
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-nav-dot");
    if (slides.length) {
        let idx = 0;
        let timer;

        function show(i) {
            idx = (i + slides.length) % slides.length;
            slides.forEach((s, k) => s.classList.toggle("active", k === idx));
            dots.forEach((d, k) => d.classList.toggle("active", k === idx));
        }

        function next() { show(idx + 1); }

        dots.forEach((d, i) => d.addEventListener("click", () => {
            show(i);
            clearInterval(timer);
            timer = setInterval(next, 5000);
        }));

        timer = setInterval(next, 5000);

        const hero = document.querySelector(".home-hero");
        if (hero) {
            hero.addEventListener("mouseenter", () => clearInterval(timer));
            hero.addEventListener("mouseleave", () => { timer = setInterval(next, 5000); });
        }
    }

    /* ─── SCROLL-TRIGGERED REVEAL ─── */
    const revealElements = document.querySelectorAll(".reveal, .reveal-children");

    if (revealElements.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    // Don't unobserve so we can re-trigger if needed
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    /* ─── ECOSYSTEM SCROLL ANIMATION ─── */
    const ecoMap = document.getElementById("ecoMap");

    if (ecoMap) {
        const ecoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ecoMap.classList.add("active");
                } else {
                    ecoMap.classList.remove("active");
                }
            });
        }, {
            threshold: 0.3
        });

        ecoObserver.observe(ecoMap);
    }
});
