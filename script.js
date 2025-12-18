const SUBTITLES = [
    {
        en: "Make More. Worry Less.",
        it: "Produci di più. Preoccupati di meno."
    },
    {
        en: "Faster Production. Lower Costs. Less Work.",
        it: "Produzione più veloce. Costi ridotti. Meno lavoro manuale."
    },
    {
        en: "Print More. Fail Less. Grow Faster.",
        it: "Stampa di più. Fallisci meno. Cresci più velocemente."
    },
    {
        en: "Scale Production Without Scaling Headcount.",
        it: "Scala la produzione senza assumere nuovo personale."
    },
    {
        en: "From Design to Profit. Automated.",
        it: "Dalla progettazione al profitto. Automatizzato."
    },
    {
        en: "Small Scale. Big Efficiency.",
        it: "Piccolo è il nuovo grande."
    },
    {
        en: "Where Makers Meet Machines.",
        it: "Dove i maker incontrano le macchine."
    },
    {
        en: "Automation That Understands Manufacturing.",
        it: "Automazione che capisce la manifattura."
    },
    {
        en: "Your Bottleneck Is Our Optimization.",
        it: "Il tuo collo di bottiglia è la nostra ottimizzazione."
    },
    {
        en: "Micro Lune: Making the Impossible, Routine.",
        it: "Micro Lune: rendere l'impossibile, routine."
    }
];

class HeroSubtitleManager {
    constructor() {
        this.element = document.getElementById('hero-subtitle');
        this.currentSubtitle = null;
        this.init();
    }

    init() {
        if (!this.element) return;

        // Pick random subtitle on load
        const randomIndex = Math.floor(Math.random() * SUBTITLES.length);
        this.currentSubtitle = SUBTITLES[randomIndex];

        // Initial render
        this.updateText();

        // Listen for language changes
        document.addEventListener('langChanged', () => this.updateText());
    }

    updateText() {
        if (!this.currentSubtitle || !window.translator) return;
        const lang = window.translator.lang;

        // Smooth fade out/in effect
        this.element.style.opacity = '0';
        setTimeout(() => {
            this.element.textContent = this.currentSubtitle[lang];
            this.element.style.opacity = '1';
        }, 300);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP Animations (existing code) - Fades disabled per user request
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations - Removed fade-ins
    // All content is statically visible by default via CSS changes.

    // Initialize Project Card Animations - Removed scroll-triggered fades
    // Cards are visible by default.

    // Scroll effect for navigation
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Initialize Subtitle Manager
    new HeroSubtitleManager();

    // Mobile Menu Logic
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('nav-active');
        });
    }

    // Close menu when a link is clicked
    if (navLinksItems) {
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('nav-active');
            });
        });
    }
});
