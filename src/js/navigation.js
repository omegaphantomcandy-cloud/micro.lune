document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
});

function initNavigation() {
    // 1. Inject Stylesheet if not present (handled by update steps, but safe to check)
    // For this implementation, we assume navigation.css is linked in HTML

    const nav = document.querySelector('.nav') || document.body;
    
    // 2. Create the Menu Button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'nav-hamburger-trigger';
    menuBtn.innerHTML = `
        <div class="menu-icon">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    nav.appendChild(menuBtn);

    // 2.5 Create Language Toggle
    const langBtn = document.createElement('button');
    langBtn.className = 'lang-toggle-btn';
    langBtn.textContent = 'EN';
    nav.appendChild(langBtn);

    langBtn.addEventListener('click', () => {
        if (window.translator) {
            window.translator.toggleLanguage().then(lang => {
                // Text update handled by translator event or here
                // langBtn.textContent = lang === 'en' ? 'IT' : 'EN';
            });
        }
    });

    // 3. Create the Overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.innerHTML = `
        <ul class="nav-menu">
            <li class="nav-item">
                <a href="index.html" class="nav-link-main" data-text="Base" data-i18n="nav.base">Base</a>
            </li>
            <li class="nav-item">
                <a href="pipeline.html" class="nav-link-main" data-text="Framework" data-i18n="nav.framework">Framework</a>
            </li>
            <li class="nav-item">
                <a href="resources.html" class="nav-link-main" data-text="Resources" data-i18n="nav.resources">Resources</a>
            </li>
            <li class="nav-item">
                <a href="about.html" class="nav-link-main" data-text="About" data-i18n="nav.about">About</a>
            </li>
            <li class="nav-item">
                <a href="index.html#contact" class="nav-link-main" data-text="Contact" data-i18n="nav.contact">Contact</a>
            </li>
        </ul>
    `;
    document.body.appendChild(overlay);

    // 4. Interaction Logic
    let isOpen = false;

    menuBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        toggleMenu(isOpen);
    });

    // Close menu when clicking a link
    const links = overlay.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            toggleMenu(false);
        });
    });

    function toggleMenu(open) {
        if (open) {
            menuBtn.classList.add('nav-hamburger-open');
            overlay.classList.add('active');
        } else {
            menuBtn.classList.remove('nav-hamburger-open');
            overlay.classList.remove('active');
        }
    }
}
