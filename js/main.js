// main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1) Dynamically load header & footer
    Promise.all([
        fetch("header.html").then(res => res.text()),
        fetch("footer.html").then(res => res.text())
    ])
        .then(([headerData, footerData]) => {
            // Insert the HTML into our placeholders
            const headerContainer = document.getElementById("header-include");
            const footerContainer = document.getElementById("footer-include");

            if (headerContainer) headerContainer.innerHTML = headerData;
            if (footerContainer) footerContainer.innerHTML = footerData;

            // 2) Now that header/footer are loaded, set up our event listeners
            initPage();
        })
        .catch(err => {
            console.error("Failed to load header or footer:", err);
        });
});

function initPage() {
    // SCROLL TO TOP
    const scrollBtn = document.getElementById('scroll-top');
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // MOBILE MENU
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // THEME TOGGLE (DARK / LIGHT)
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    // Make dark-mode default
    htmlElement.classList.add('dark-mode');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark-mode')) {
                htmlElement.classList.remove('dark-mode');
                htmlElement.classList.add('light-mode');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                htmlElement.classList.remove('light-mode');
                htmlElement.classList.add('dark-mode');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // If your publication filters / sorting exist on this page, attach them:
    setupPublicationsFiltering();
    // etc.
}

function setupPublicationsFiltering() {
    // Example if you have .filter-btn, #sort-year, etc.
    const filterBtns = document.querySelectorAll('.filter-btn');
    const publications = document.querySelectorAll('.timeline-item');
    const sortSelect = document.getElementById('sort-year');
    const publicationsList = document.getElementById('publications-list');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                publications.forEach(pub => {
                    if (type === 'all') {
                        pub.style.display = 'block';
                    } else {
                        pub.style.display = pub.dataset.type === type ? 'block' : 'none';
                    }
                });
            });
        });
    }

    if (sortSelect && publicationsList) {
        sortSelect.addEventListener('change', () => {
            sortPublications(sortSelect.value, publicationsList);
        });
    }
}

function sortPublications(order, container) {
    let itemsArray = Array.from(container.querySelectorAll('.timeline-item'));
    itemsArray.sort((a, b) => {
        const yearA = parseInt(a.getAttribute('data-year'), 10);
        const yearB = parseInt(b.getAttribute('data-year'), 10);
        return (order === 'asc') ? (yearA - yearB) : (yearB - yearA);
    });
    itemsArray.forEach(item => container.appendChild(item));
}
