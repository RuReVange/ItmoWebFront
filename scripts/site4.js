(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const loadTime = performance.now();
        const footer = document.createElement('footer');
        footer.textContent = `Page loaded in ${loadTime.toFixed(2)} ms`;
        document.body.appendChild(footer);

        const currentPage = document.location.pathname.split('/').pop();
        document.querySelectorAll('.navigation__links ul li a').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    });
})();
