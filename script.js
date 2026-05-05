document.addEventListener("DOMContentLoaded", () => {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    const tabsContainer = document.querySelector(".tabs");

    // Create tab indicator dynamically
    const indicator = document.createElement("div");
    indicator.classList.add("tab-indicator");
    tabsContainer.appendChild(indicator);

    // Initialize indicator position
    function updateIndicator(activeBtn) {
        const btnRect = activeBtn.getBoundingClientRect();
        const containerRect = tabsContainer.getBoundingClientRect();
        
        // Calculate relative position
        const offsetLeft = btnRect.left - containerRect.left;
        
        indicator.style.width = `${btnRect.width - 16}px`; // minus padding
        indicator.style.transform = `translateX(${offsetLeft + 8}px)`; // plus padding offset
    }

    // Set initial position
    const initialActive = document.querySelector(".tab-btn.active");
    if(initialActive) {
        // slight delay to ensure fonts/layout are loaded
        setTimeout(() => updateIndicator(initialActive), 100);
    }

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => {
                c.classList.remove("active");
                // Reset animation state
                c.style.animation = 'none';
                c.offsetHeight; // trigger reflow
                c.style.animation = null; 
            });

            // Add active to clicked
            btn.classList.add("active");
            const target = btn.getAttribute("data-target");
            const content = document.getElementById(target);
            if(content) {
                content.classList.add("active");
            }

            // Move indicator
            updateIndicator(btn);
        });
    });

    // Handle window resize for indicator
    window.addEventListener("resize", () => {
        const activeBtn = document.querySelector(".tab-btn.active");
        if(activeBtn) updateIndicator(activeBtn);
    });
});
