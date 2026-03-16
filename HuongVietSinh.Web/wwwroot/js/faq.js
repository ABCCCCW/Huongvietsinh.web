document.addEventListener("DOMContentLoaded", () => {
    const groupButtons = document.querySelectorAll(".faq-group-btn");
    const faqItems = document.querySelectorAll(".faq-item");
    const groupTitles = document.querySelectorAll(".faq-group-title");
    const faqLists = document.querySelectorAll(".faq-list");

    // Function to activate a specific group
    function activateGroup(group) {
        groupButtons.forEach((b) => {
            b.classList.toggle("active", b.getAttribute("data-group") === group);
        });

        faqItems.forEach((item) => {
            const itemGroup = item.getAttribute("data-group");
            const show = group === "all" || itemGroup === group;
            item.style.display = show ? "block" : "none";
            item.classList.remove("open");
            const ans = item.querySelector(".faq-answer");
            if (ans) ans.style.maxHeight = null;
        });

        groupTitles.forEach((title) => {
            const titleGroup = title.getAttribute("data-group-heading");
            const show = group === "all" || titleGroup === group;
            title.style.display = show ? "flex" : "none";
        });

        faqLists.forEach((list) => {
            const listGroup = list.getAttribute("data-group-title");
            const show = group === "all" || listGroup === group;
            list.style.display = show ? "block" : "none";
        });
    }

    // Check URL hash on load, default to "source"
    const hash = window.location.hash.replace("#", "");
    const validGroups = ["source", "meal", "company"];
    activateGroup(validGroups.includes(hash) ? hash : "source");

    // Filter by group
    groupButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const group = btn.getAttribute("data-group");
            groupButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            // Show/hide items
            faqItems.forEach((item) => {
                const itemGroup = item.getAttribute("data-group");
                const show = group === "all" || itemGroup === group;
                item.style.display = show ? "block" : "none";
                // Close open items when filtering
                item.classList.remove("open");
                const ans = item.querySelector(".faq-answer");
                if (ans) ans.style.maxHeight = null;
            });

            // Show/hide group titles
            groupTitles.forEach((title) => {
                const titleGroup = title.getAttribute("data-group-heading");
                const show = group === "all" || titleGroup === group;
                title.style.display = show ? "flex" : "none";
            });

            // Show/hide faq-list wrappers
            faqLists.forEach((list) => {
                const listGroup = list.getAttribute("data-group-title");
                const show = group === "all" || listGroup === group;
                list.style.display = show ? "block" : "none";
            });
        });
    });

    // Accordion behaviour
    faqItems.forEach((item) => {
        const questionBtn = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!questionBtn || !answer) return;

        questionBtn.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");

            // Close all
            faqItems.forEach((it) => {
                it.classList.remove("open");
                const ans = it.querySelector(".faq-answer");
                if (ans) ans.style.maxHeight = null;
            });

            // Open clicked one
            if (!isOpen) {
                item.classList.add("open");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
