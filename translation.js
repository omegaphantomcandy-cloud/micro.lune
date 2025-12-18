const CONFIG = {
    defaultLang: 'en',
    supportedLangs: ['en', 'it'],
    localesPath: 'locales'
};

class Translator {
    constructor() {
        this.lang = localStorage.getItem('lang') || this.getBrowserLang();
        this.page = this.getPageName();
        this.translations = {};
        this.adminMode = false;
    }

    getBrowserLang() {
        const lang = navigator.language.split('-')[0];
        return CONFIG.supportedLangs.includes(lang) ? lang : CONFIG.defaultLang;
    }

    getPageName() {
        const path = window.location.pathname;
        let page = path.split('/').pop().replace('.html', '');
        if (page === '' || page === '/') page = 'index';
        return page;
    }

    async init() {
        await this.loadTranslations(this.lang);
        this.applyTranslations();
        this.updateLangAttributes();
        this.initAdminTools();
        document.dispatchEvent(new CustomEvent('langChanged', { detail: this.lang }));
    }

    async loadTranslations(lang) {
        const pagePath = `${CONFIG.localesPath}/${this.page}/${lang}.json?t=${new Date().getTime()}`;
        try {
            const response = await fetch(pagePath);
            if (!response.ok) {
                console.warn(`Translation file not found: ${pagePath}`);
                return;
            }
            this.translations = await response.json();
            // If in admin mode, re-apply editable state logic if needed
            if (this.adminMode) this.enableEditing();
        } catch (e) {
            console.error(`Error loading translations: ${e}`);
        }
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = this.getNestedValue(this.translations, key);
            if (value) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = value;
                } else if (el.hasAttribute('data-i18n-target')) {
                    const attr = el.getAttribute('data-i18n-target');
                    el.setAttribute(attr, value);
                } else {
                    el.innerHTML = value;
                }
            }
        });
    }

    getNestedValue(obj, key) {
        return key.split('.').reduce((o, i) => (o ? o[i] : null), obj);
    }

    setNestedValue(obj, key, value) {
        const keys = key.split('.');
        let current = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
    }

    updateLangAttributes() {
        document.documentElement.lang = this.lang;
        document.body.classList.remove('lang-en', 'lang-it');
        document.body.classList.add(`lang-${this.lang}`);
    }

    async toggleLanguage() {
        const newLang = this.lang === 'en' ? 'it' : 'en';
        await this.setLanguage(newLang);
        return newLang;
    }

    async setLanguage(lang) {
        if (!CONFIG.supportedLangs.includes(lang)) return;
        this.lang = lang;
        localStorage.setItem('lang', lang);

        const btn = document.querySelector('.lang-toggle-btn');
        if (btn) btn.textContent = lang === 'en' ? 'IT' : 'EN';

        await this.loadTranslations(lang);
        this.applyTranslations();
        this.updateLangAttributes();
    }

    // ==========================================
    // ADMIN TOOLS
    // ==========================================
    initAdminTools() {
        // Create Admin Toggle Button (Top Left)
        const adminBtn = document.createElement('button');
        adminBtn.className = 'admin-debug-btn';
        adminBtn.textContent = '⚙️';
        adminBtn.title = 'Admin Debug Mode';
        document.body.appendChild(adminBtn);

        adminBtn.addEventListener('click', () => {
            if (this.adminMode) {
                this.disableAdminMode();
            } else {
                // Simple password check for prototype
                const pwd = prompt('Enter Admin Password:');
                if (pwd === 'admin123') { // Hardcoded for demo
                    this.enableAdminMode();
                } else if (pwd !== null) {
                    alert('Incorrect Password');
                }
            }
        });
    }

    enableAdminMode() {
        this.adminMode = true;
        document.body.classList.add('admin-mode-active');
        this.enableEditing();
        this.createAdminPanel();
    }

    disableAdminMode() {
        this.adminMode = false;
        document.body.classList.remove('admin-mode-active');
        this.disableEditing();
        const panel = document.querySelector('.admin-floating-panel');
        if (panel) panel.remove();
    }

    enableEditing() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            el.contentEditable = "true";
            el.classList.add('admin-editable');

            // Listen for changes
            el.onblur = (e) => {
                const key = el.getAttribute('data-i18n');
                const newValue = el.innerHTML; // Allow simple HTML
                this.setNestedValue(this.translations, key, newValue);
                console.log(`Updated ${key}:`, newValue);
                el.classList.add('admin-edited'); // Visual feedback
            };

            // Prevent navigating away on link click if editing
            if (el.tagName === 'A') {
                el.onclick = (e) => e.preventDefault();
            }
        });
    }

    disableEditing() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            el.contentEditable = "false";
            el.classList.remove('admin-editable');
            el.onblur = null;
            el.onclick = null;
        });
    }

    createAdminPanel() {
        let panel = document.querySelector('.admin-floating-panel');
        if (panel) return;

        panel = document.createElement('div');
        panel.className = 'admin-floating-panel';
        panel.innerHTML = `
            <h4>Admin Tools</h4>
            <p>Editing: <strong>${this.lang.toUpperCase()}</strong></p>
            <button id="toggleLangAdmin">Switch Language (Current: ${this.lang.toUpperCase()})</button>
            <button id="downloadTranslations">Download ${this.lang.toUpperCase()}.json</button>
            <button id="closeAdmin">Exit Admin</button>
        `;
        document.body.appendChild(panel);

        panel.querySelector('#toggleLangAdmin').addEventListener('click', async () => {
            const newLang = await this.toggleLanguage();
            // Update button text after toggle
            const btn = panel.querySelector('#toggleLangAdmin');
            btn.textContent = `Switch Language (Current: ${newLang.toUpperCase()})`;
            // Update panel text
            panel.querySelector('p strong').textContent = newLang.toUpperCase();
            // Update download button text
            const dlBtn = panel.querySelector('#downloadTranslations');
            dlBtn.textContent = `Download ${newLang.toUpperCase()}.json`;
        });

        panel.querySelector('#downloadTranslations').addEventListener('click', () => {
            this.downloadJSON(this.translations, `${this.lang}.json`);
        });

        panel.querySelector('#closeAdmin').addEventListener('click', () => {
            this.disableAdminMode();
        });
    }

    downloadJSON(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

window.translator = new Translator();
document.addEventListener('DOMContentLoaded', () => {
    window.translator.init();
});
