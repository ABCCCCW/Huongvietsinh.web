/* d:/web/js/recruitment.js */

document.addEventListener('DOMContentLoaded', () => {

    // Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const jobCards = document.querySelectorAll('.job-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                jobCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === category) {
                        card.style.display = 'flex';
                        // Add animation could go here
                        card.style.opacity = '0';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Modal Logic
    const modal = document.getElementById('jobModal');
    const closeBtn = document.querySelector('.close-modal');
    const openBtns = document.querySelectorAll('.open-modal');

    // Hardcoded job details for demo (mapping keys to content)
    const jobDetails = {
        'insurance': {
            title: 'Nhân Viên Hành Chính (Chuyên Bảo Hiểm)',
            salary: '10 - 12 Triệu',
            deadline: '30/03/2026',
            location: 'Long Biên, Hà Nội'
        },
        'chef': {
            title: 'Đầu Bếp Chính (Bếp Ăn Công Nghiệp)',
            salary: '12 - 15 Triệu',
            deadline: '15/04/2026',
            location: 'Long Biên / Gia Lâm'
        },
        'driver': {
            title: 'Lái Xe Tải (Bằng C trở lên)',
            salary: '10 - 14 Triệu',
            deadline: '30/03/2026',
            location: 'Toàn Quốc'
        },
        'kitchen_helper': {
            title: 'Phụ Bếp / Sơ Chế',
            salary: '7 - 9 Triệu',
            deadline: '30/03/2026',
            location: 'Long Biên, Hà Nội'
        },
        'farm_tech': {
            title: 'Nhân Viên Kỹ Thuật Nông Trại',
            salary: '8 - 10 Triệu',
            deadline: '20/04/2026',
            location: 'Bắc Ninh'
        }
    };

    if (openBtns.length > 0 && modal) {
        openBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const jobKey = btn.getAttribute('data-job');

                // Update Modal Content if data exists (Demo purpose)
                // In real app, fetch from API or DOM
                if (jobDetails[jobKey]) {
                    document.getElementById('modalJobTitle').textContent = jobDetails[jobKey].title;
                    // Note: Just updating title for demo simplicity, keeping body content static as per request (Demo JD Bao Hiem)
                    // If wanted to update specific fields, would target them by ID
                }

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
