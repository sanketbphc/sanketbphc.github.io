// main.js

document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top button
    const scrollBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if(menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // News ticker animation timing
    const ticker = document.querySelector('.ticker-content');
    if (ticker) {
        const tickerWidth = ticker.offsetWidth;
        // Adjust speed based on content width (example formula)
        const duration = (tickerWidth / 100) * 20;
        ticker.style.animationDuration = `${duration}s`;
    }

    // Publication filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const publications = document.querySelectorAll('.timeline-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;

            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            publications.forEach(pub => {
                if (type === 'all') {
                    pub.style.display = 'block';
                } else {
                    pub.style.display = pub.dataset.type === type ? 'block' : 'none';
                }
            });
        });
    });

    // Theme toggle (dark mode / light mode)
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (themeToggle) {
        // Default to dark mode
        htmlElement.classList.add('dark-mode');

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
});
