const CONFIG = {
    defaultLang: 'en',
    supportedLangs: ['en', 'it'],
    langPath: '../../lang'
};

class Translator {
    constructor() {
        this.lang = localStorage.getItem('lang') || this.getBrowserLang();
        this.page = this.getPageName();
        this.translations = {};
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
        
        // Update language toggle button text
        const btn = document.querySelector('.lang-toggle-btn');
        if (btn) btn.textContent = this.lang === 'en' ? 'IT' : 'EN';

        document.dispatchEvent(new CustomEvent('langChanged', { detail: this.lang }));
    }

    async loadTranslations(lang) {
        const commonPath = `${CONFIG.langPath}/common/${lang}.json?t=${new Date().getTime()}`;
        const pagePath = `${CONFIG.langPath}/${this.page}/${lang}.json?t=${new Date().getTime()}`;

        try {
            const [commonRes, pageRes] = await Promise.all([
                fetch(commonPath).catch(() => null),
                fetch(pagePath).catch(() => null)
            ]);

            let commonData = {};
            let pageData = {};

            if (commonRes && commonRes.ok) {
                commonData = await commonRes.json();
            }

            if (pageRes && pageRes.ok) {
                pageData = await pageRes.json();
            } else {
                // Not strictly an error, many pages might rely purely on common data
                // console.log(`Note: Specific translation file not found for ${this.page}`);
            }

            // Merge: Page overrides Common
            this.translations = this.deepMerge(commonData, pageData);

        } catch (e) {
            console.error(`Error loading translations: ${e}`);
        }
    }

    deepMerge(target, source) {
        const result = { ...target };
        for (const key in source) {
            if (source[key] instanceof Object && key in result && result[key] instanceof Object) {
                result[key] = this.deepMerge(result[key], source[key]);
            } else {
                result[key] = source[key];
            }
        }
        return result;
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
                    // Fix for animated nav links that use data-text for hover effects
                    if (el.hasAttribute('data-text')) {
                        el.setAttribute('data-text', value);
                    }
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
}

window.translator = new Translator();
document.addEventListener('DOMContentLoaded', () => {
    window.translator.init();
});
