/*********************************************
 * script.js
 *********************************************/
document.addEventListener('DOMContentLoaded', () => {
    // Load the default section on page load, e.g. "about"
    loadSection('about');

    // If you want to preserve the user’s dark mode preference across refreshes,
    // you can check localStorage here:
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // ============ HAMBURGER MENU TOGGLE ============
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            // Toggle the .show-menu class to open/close the nav on mobile
            navMenu.classList.toggle('show-menu');
        });
    }
});

/**
 * Dynamically loads the specified section’s HTML file
 * into the #content-container.
 * E.g., loadSection("about") loads about.html
 */
function loadSection(sectionName) {
    fetch(`${sectionName}.html`)
        .then(response => {
            if (!response.ok) throw new Error(`Cannot find ${sectionName}.html`);
            return response.text();
        })
        .then(html => {
            document.getElementById('content-container').innerHTML = html;
            // Scroll to top of content each time a new section loads
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(err => {
            console.error(err);
            document.getElementById('content-container').innerHTML =
                `<p>Error loading section: ${sectionName}</p>`;
        });
}

/**
 * Toggles Dark Mode by adding/removing a .dark-theme class
 * on the <body> and saves preference to localStorage.
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

/**
 * Scroll back to top of the page.
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Parse "YYYY-MM" into a numeric value for sorting
function parseDateValue(dateStr) {
    const parts = dateStr.split("-");
    const year = parseInt(parts[0], 10) || 0;
    const month = parseInt(parts[1], 10) || 0;
    return year * 100 + month;
}

// Sort publications descending by data-date attribute
function sortPublications() {
    const container = document.getElementById("publications-list");
    if (!container) return;

    const items = Array.from(container.querySelectorAll(".publication-item"));
    items.sort((a, b) => {
        const aVal = parseDateValue(a.dataset.date);
        const bVal = parseDateValue(b.dataset.date);
        return bVal - aVal;
    });
    items.forEach(item => container.appendChild(item));
}

// Call sortPublications() if on publications page
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("publications-list")) {
        sortPublications();
    }
});
