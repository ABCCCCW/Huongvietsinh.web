document.addEventListener("DOMContentLoaded", () => {

    /* ─── SCROLL REVEAL ─── */
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    /* ─── COUNTER ANIMATION ─── */
    const statNumbers = document.querySelectorAll(".stat-number[data-target]");

    function animateCounter(el) {
        const target = parseInt(el.getAttribute("data-target"));
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = current.toLocaleString("vi-VN");
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    if (statNumbers.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = "true";
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    }

});
