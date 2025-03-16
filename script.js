document.addEventListener('DOMContentLoaded', function () {
    // Loading page fade-out
    setTimeout(function () {
        const loadingPage = document.getElementById('loading-page');
        if (loadingPage) {
            loadingPage.classList.add('hide'); // Add the 'hide' class for fade-out

            // Remove the loading page from the DOM after the fade-out
            setTimeout(() => {
                loadingPage.remove();
            }, 500); // Match the transition duration
        }
    }, 3000); // Adjust the delay as needed

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = moonIcon;
    } else if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = sunIcon;
    } else {
        if (prefersDark) {
            htmlElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = sunIcon;
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = moonIcon;
        }
    }

    themeToggle.addEventListener('click', function () {
        if (htmlElement.getAttribute('data-theme') === 'light') {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = sunIcon;
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = moonIcon;
        }
    });

    // Collapsible card functionality
    const cardHeaders = document.querySelectorAll('.card-header');

    cardHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const parentCard = this.parentElement;
            parentCard.classList.toggle('collapsed');
            const cardId = parentCard.id;
            if (cardId) {
                localStorage.setItem(`card_${cardId}`, parentCard.classList.contains('collapsed') ? 'collapsed' : 'expanded');
            }
        });
    });

    document.querySelectorAll('.card[id]').forEach(card => {
        const cardId = card.id;
        if (localStorage.getItem(`card_${cardId}`) === 'collapsed') {
            card.classList.add('collapsed');
        }
    });

    // External link handling
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
        if (!link.querySelector('i.fa-external-link-alt')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-external-link-alt';
            icon.style.marginLeft = '0.25rem';
            icon.style.fontSize = '0.8rem';
            link.appendChild(icon);
        }
        link.classList.add('university-name');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Element animation on scroll
    const animateOnScroll = function () {
        document.querySelectorAll('.card').forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            if (elementPosition < window.innerHeight / 1.2) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Print handling
    const printButton = document.querySelector('.print-resume');
    if (printButton) {
        printButton.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.card.collapsed').forEach(card => {
                card.classList.remove('collapsed');
            });
            window.print();
        });
    }

    // Update current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});
