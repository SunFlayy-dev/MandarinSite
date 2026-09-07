class ThemeManager {
    constructor() {
        this.html = document.documentElement;
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.toggleButton = document.querySelector('#themeToggle');
    }

    init() {
        this.setTheme(this.currentTheme);
        this.toggleButton?.addEventListener('click', () => this.toggle());
    }

    setTheme(theme) {
        this.html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateButtonIcon();
        
        // Диспатчим событие для других модулей
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }

    toggle() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    updateButtonIcon() {
        if (this.toggleButton) {
            this.toggleButton.innerHTML = this.currentTheme === 'dark' 
                ? '<i class="fa-solid fa-moon"></i>' 
                : '<i class="fa-solid fa-sun"></i>';
        }
    }

    getTheme() {
        return this.currentTheme;
    }

    isDark() {
        return this.currentTheme === 'dark';
    }
}

export const themeManager = new ThemeManager();