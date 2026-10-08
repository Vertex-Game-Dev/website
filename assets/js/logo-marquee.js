document.addEventListener('DOMContentLoaded', () => {
    const logoSection = document.getElementById('logo-marquee-section');

    if (!logoSection) {
        return;
    }

    const triggerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    logoSection.classList.add('is-visible');
                } else {
                    logoSection.classList.remove('is-visible');
                }
            });
        },
        {
            // Triggers when the section reaches approximately 75% of the viewport height.
            rootMargin: '0px 0px -25% 0px',
            threshold: 0
        }
    );

    triggerObserver.observe(logoSection);
});