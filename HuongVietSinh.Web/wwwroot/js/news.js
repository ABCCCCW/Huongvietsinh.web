document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const articleCards = document.querySelectorAll(".news-card[data-category]");

    if (tabButtons.length && articleCards.length) {
        tabButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const category = button.getAttribute("data-category");
                tabButtons.forEach((b) => b.classList.remove("active"));
                button.classList.add("active");

                articleCards.forEach((card) => {
                    const cardCategory = card.getAttribute("data-category");
                    const show = category === "all" || cardCategory === category;
                    card.style.display = show ? "block" : "none";
                });
            });
        });
    }
});
