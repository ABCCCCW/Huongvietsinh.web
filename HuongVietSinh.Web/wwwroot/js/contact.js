/* d:/web/js/contact.js */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation
            const name = document.getElementById('fullname').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!name || !phone) {
                alert('Vui lòng điền đầy đủ Họ tên và Số điện thoại.');
                return;
            }

            if (phone.length < 10) {
                alert('Số điện thoại không hợp lệ.');
                return;
            }

            // Simulate API call
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
            btn.disabled = true;

            setTimeout(() => {
                alert(`Cảm ơn ${name}! Chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ lại qua SĐT ${phone} sớm nhất.`);
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
