export function initFooter() {
    const footer = document.querySelector('#footer');
    if (!footer) return;

    // Футер уже статичный в HTML, просто добавляем функциональность
    const currentYear = new Date().getFullYear();
    const yearElement = footer.querySelector('.footer-bottom span:first-child');
    if (yearElement) {
        yearElement.textContent = `© ${currentYear} SCP Foundation RP Project. All Rights Reserved.`;
    }

    // Обработчики для ссылок в футере
    footer.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            document.dispatchEvent(new CustomEvent('navigate', { detail: { page } }));
        });
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initFooter();
});