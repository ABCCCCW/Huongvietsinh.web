/* ecosystem-map.js */
document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map-container');
    const viewport = document.getElementById('map-viewport');
    
    // Config
    const bgWidth = 3200;
    const bgHeight = 1800;

    let isDragging = false;
    let startX, startY, currentX = 0, currentY = 0;
    let translateX = 0, translateY = 0;

    // Start Drag
    function onPointerDown(e) {
        if (e.target.closest('.hotspot')) return; // Let hotspot clicks pass through
        
        isDragging = true;
        const pointer = e.touches ? e.touches[0] : e;
        startX = pointer.clientX - translateX;
        startY = pointer.clientY - translateY;
        
        viewport.style.cursor = 'grabbing';
    }

    // Dragging
    function onPointerMove(e) {
        if (!isDragging) return;
        e.preventDefault(); // Prevent default mobile scrolling

        const pointer = e.touches ? e.touches[0] : e;
        currentX = pointer.clientX - startX;
        currentY = pointer.clientY - startY;

        // Apply boundaries so map doesn't get dragged off screen
        const maxX = 0;
        const minX = viewport.clientWidth - bgWidth;
        const maxY = 0;
        const minY = viewport.clientHeight - bgHeight;

        // Constrain
        translateX = Math.max(minX, Math.min(maxX, currentX));
        translateY = Math.max(minY, Math.min(maxY, currentY));

        mapContainer.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }

    // End Drag
    function onPointerUp() {
        if (!isDragging) return;
        isDragging = false;
        viewport.style.cursor = 'grab';
    }

    // Event Listeners
    viewport.addEventListener('mousedown', onPointerDown);
    viewport.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    viewport.addEventListener('mouseleave', onPointerUp);

    // Touch Support
    viewport.addEventListener('touchstart', onPointerDown, { passive: false });
    viewport.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);

    // Center map initially
    function centerMap() {
        const minX = viewport.clientWidth - bgWidth;
        const minY = viewport.clientHeight - bgHeight;
        translateX = minX / 2;
        translateY = minY / 2;
        mapContainer.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
    
    // Call center on load and attach resize listener
    centerMap();
    window.addEventListener('resize', () => {
        // Enforce boundaries on resize
        const maxX = 0;
        const minX = viewport.clientWidth - bgWidth;
        const maxY = 0;
        const minY = viewport.clientHeight - bgHeight;
        translateX = Math.max(minX, Math.min(maxX, translateX));
        translateY = Math.max(minY, Math.min(maxY, translateY));
        mapContainer.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });

    // =====================================
    // Modal Popup Logic 
    // =====================================
    const hotspots = document.querySelectorAll('.hotspot');
    const modal = document.getElementById('ecosystemModal');
    const closeBtn = document.querySelector('.modal-close');
    const mapModalBody = document.querySelector('.modal-body');
    const mapModalTitle = document.getElementById('modal-title');

    hotspots.forEach(spot => {
        spot.addEventListener('click', (e) => {
            e.stopPropagation();
            const title = spot.getAttribute('data-title');
            const desc = spot.getAttribute('data-desc');
            const placeholderImageUrl = spot.getAttribute('data-img') || 'https://via.placeholder.com/600x400.png?text=' + encodeURIComponent(title);

            // Populate Modal
            mapModalTitle.textContent = title;
            mapModalBody.innerHTML = `
                <img src="${placeholderImageUrl}" alt="${title}" class="modal-image" />
                <p class="modal-desc">${desc}</p>
            `;

            // Show
            modal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close when clicking outside modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});
