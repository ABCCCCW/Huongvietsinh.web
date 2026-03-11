document.addEventListener('DOMContentLoaded', () => {
    // Menu Tabs (Catering page)
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');

    if (menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                menuTabs.forEach(t => t.classList.remove('active'));
                menuContents.forEach(c => c.classList.remove('active'));

                tab.classList.add('active');
                const day = tab.getAttribute('data-day');
                const target = document.getElementById('menu-' + day);
                if (target) target.classList.add('active');
            });
        });
    }

    // Product Card Flip (mobile touch support)
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                card.classList.toggle('flipped');
            }
        });
    });

    // Products carousel: luôn hiển thị 2 hàng, auto slide + mũi tên
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        const cards = Array.from(productsGrid.querySelectorAll('.product-card'));
        const prevBtn = document.querySelector('.products-arrow.prev');
        const nextBtn = document.querySelector('.products-arrow.next');
        let startIndex = 0;
        let visibleCount = 6; // desktop: 2 hàng x 3
        let autoTimer = null;

        const calcVisibleCount = () => {
            const w = window.innerWidth;
            if (w <= 480) return 2;      // 2 card (1 hàng x 2)
            if (w <= 768) return 4;      // 4 card (2 hàng x 2)
            return 6;                    // 6 card (2 hàng x 3)
        };

        const renderCarousel = () => {
            visibleCount = calcVisibleCount();
            const total = cards.length;
            if (total === 0) return;

            cards.forEach((card, index) => {
                const offset = (index - startIndex + total) % total;
                card.style.display = offset < visibleCount ? '' : 'none';
            });
        };

        const goNext = () => {
            if (!cards.length) return;
            startIndex = (startIndex + 1) % cards.length;
            renderCarousel();
        };

        const goPrev = () => {
            if (!cards.length) return;
            startIndex = (startIndex - 1 + cards.length) % cards.length;
            renderCarousel();
        };

        const resetAuto = () => {
            if (autoTimer) clearInterval(autoTimer);
            autoTimer = setInterval(goNext, 7000); // 7s tự chuyển 1 card
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goPrev();
                resetAuto();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goNext();
                resetAuto();
            });
        }

        window.addEventListener('resize', () => {
            renderCarousel();
        });

        renderCarousel();
        resetAuto();
    }

    // Scroll-triggered animations
    const animatedElements = document.querySelectorAll('.animate-fade-in');

    if ('IntersectionObserver' in window && animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            const delay = el.style.animationDelay;
            if (delay) {
                el.style.transitionDelay = delay;
            }
            observer.observe(el);
        });
    }
});
