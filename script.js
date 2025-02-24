document.addEventListener('DOMContentLoaded', () => {
    // Function to dynamically update section numbers (for section titles)
    function updateSectionNumbers() {
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach((title, index) => {
            title.style.setProperty('--section-number', `'0${index + 1}.'`); // Example using CSS variables - CSS not actually using this, but could be if desired
            title.textContent = `<${title.textContent}/>`; // Ensure angle brackets added again if needed, although CSS handles this in this version
            title.insertAdjacentText('afterbegin', `0${index + 1}. `); // Simpler prefix for now
        });
    }
    updateSectionNumbers(); // Call on page load


    // Hero Section Entry Animation
    const heroContent = document.querySelector('.hero-content');
    const heroTerminal = document.querySelector('.hero-terminal-window');
    heroContent.classList.add('animate');
    heroTerminal.classList.add('animate');


    // Set up Intersection Observer for Scroll Reveal Animations
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.15 // Trigger animation when 15% of element is visible
    });

    // Observe Section Titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });

    // Observe About Section Elements
    document.querySelectorAll('.about-text, .about-image').forEach(el => {
        observer.observe(el);
    });

    // Observe Skill Items and Animate Skill Circles
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        observer.observe(item);
        const skillLevelCircle = item.querySelector('.inner-circle');
        if (skillLevelCircle) {
            observer.observe(skillLevelCircle);
        }
    });

    // Observe Project Items
    document.querySelectorAll('.project-item').forEach(item => {
        observer.observe(item);
    });

    // Observe Timeline Items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Observe Contact Section
    observer.observe(document.querySelector('.contact-info'));


    // Function to animate skill circles when they become visible
    const skillCircleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevelCircle = entry.target;
                skillLevelCircle.classList.add('animate');
                observer.unobserve(skillLevelCircle);
            }
        });
    }, {
        threshold: 0.9 // Trigger when almost fully visible
    });

    document.querySelectorAll('.inner-circle').forEach(bar => {
        skillCircleObserver.observe(bar);
    });


    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});