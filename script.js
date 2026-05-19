document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
    setupExternalLinks();
    setupProfileImageRotation();
    setupJuniorMeowMeow();

    const defaultBtn = document.querySelector(".tab-btn");
    if (defaultBtn) {
        defaultBtn.click();
    } else {
        console.error("Could not find tab buttons.");
    }
});

async function loadTab(filename, buttonElement) {
    const contentContainer = document.getElementById("dynamic-content");

    try {
        const response = await fetch(filename);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

        const htmlContent = await response.text();
        contentContainer.innerHTML = htmlContent;

        setupExternalLinks(contentContainer);

        document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
        if (buttonElement) {
            buttonElement.classList.add("active");
        }
    } catch (error) {
        console.error("Fetch failed:", error);
        contentContainer.innerHTML = `<p>Error loading content: ${error.message}</p>`;
    }
}

function initializeTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (!themeToggleBtn) return;

    const iconElement = themeToggleBtn.querySelector("iconify-icon");
    const isLight = localStorage.getItem("portfolio-theme") === "light";

    if (isLight) {
        document.body.classList.add("light-mode");
        iconElement.setAttribute("icon", "ri:moon-fill");
    } else {
        iconElement.setAttribute("icon", "ri:sun-fill");
    }

    themeToggleBtn.addEventListener("click", () => {
        const isNowLight = document.body.classList.toggle("light-mode");

        localStorage.setItem("portfolio-theme", isNowLight ? "light" : "dark");
        iconElement.setAttribute("icon", isNowLight ? "ri:moon-fill" : "ri:sun-fill");
    });
}

function setupExternalLinks(container = document) {
    const links = container.querySelectorAll('a[href^="http"]');
    links.forEach((link) => {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });
}

function setupProfileImageRotation() {
    const profilePic = document.getElementById("profile-pic");
    if (!profilePic) return;

    const images = ["images/profile.jpg", "images/profile-alt.jpg"];

    let currentIndex = 0;

    profilePic.addEventListener("click", () => {
        profilePic.classList.add("flip-out");

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            profilePic.src = images[currentIndex];
            profilePic.classList.remove("flip-out");
        }, 200);
    });
}

function setupJuniorMeowMeow() {
    const jmmSpan = document.getElementById("jmm-name");
    if (!jmmSpan) return;

    let isMeowMeow = false;

    jmmSpan.addEventListener("click", () => {
        if (isMeowMeow) return;
        isMeowMeow = true;

        jmmSpan.classList.add("meowmeow");

        setTimeout(() => {
            jmmSpan.classList.remove("meowmeow");

            setTimeout(() => {
                isMeowMeow = false;
            }, 400);
        }, 2000);
    });
}
