const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const categoryBtns = document.querySelectorAll('.category-btn');
const menuCategories = document.querySelectorAll('.menu-category');
const langBtns = document.querySelectorAll('.lang-btn');
const reviewNavBtns = document.querySelectorAll('.review-nav-btn');
const reviewsSlider = document.querySelector('.reviews-slider');

window.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMenu();
    initLanguageSwitch();
    initReviews();
    initSmoothScroll();
});

function initNavbar() {
    const updateNavbar = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };

    const closeMenu = () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar);

    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

function initMenu() {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;

            categoryBtns.forEach(categoryBtn => categoryBtn.classList.remove('active'));
            btn.classList.add('active');

            menuCategories.forEach(menuCategory => {
                menuCategory.classList.toggle('active', menuCategory.id === category);
            });
        });
    });
}

function initLanguageSwitch() {
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;

            langBtns.forEach(langBtn => langBtn.classList.remove('active'));
            btn.classList.add('active');
            translatePage(lang);
            localStorage.setItem('preferred-language', lang);
        });
    });

    initTranslation();
}

function initReviews() {
    let currentReview = 0;
    const reviewCards = document.querySelectorAll('.review-card');

    function updateReviewSlider() {
        reviewNavBtns.forEach((btn, index) => {
            btn.classList.toggle('active', index === currentReview);
        });

        if (reviewsSlider && reviewCards[currentReview]) {
            const cardWidth = reviewCards[currentReview].offsetWidth + 32;
            reviewsSlider.scrollTo({
                left: cardWidth * currentReview,
                behavior: 'smooth'
            });
        }
    }

    if (reviewNavBtns.length > 0) {
        reviewNavBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                currentReview = index;
                updateReviewSlider();
            });
        });

        setInterval(() => {
            currentReview = (currentReview + 1) % reviewNavBtns.length;
            updateReviewSlider();
        }, 5000);
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        const targetId = link.getAttribute('href');
        if (targetId.length < 2) return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        link.addEventListener('click', event => {
            event.preventDefault();
            const navbarHeight = navbar.offsetHeight;
            const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });
}
