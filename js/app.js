// Импорты ядра
import { themeManager } from './core/theme.js';
import { router } from './core/router.js';

// Импорты модулей
import { headerModule } from './modules/header.js';
import { cartStore } from './modules/cart.js';
import { initHero } from './modules/hero.js';
import { initFactions } from './modules/factions.js';
import { renderSCP } from './modules/scp.js';
import { renderDonate } from './modules/donate.js';
import { initAccordion } from './modules/rules.js';
import { initFooter } from './modules/footer.js';

// Импорты UI
import { modal } from './ui/modal.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // 1. Ядро
    themeManager.init();
    router.init();

    // 2. Модули (универсальные)
    headerModule.init();
    initFooter();

    // 3. Модули (специфичные для страниц)
    initHero();
    initFactions();
    initAccordion();

    // 4. Ленивая инициализация страниц
    // Страницы SCP и Donate инициализируются через router.initPage()
    // или при переходе на них

    // 5. Глобальные обработчики событий
    document.addEventListener('pageChanged', (e) => {
        const page = e.detail.page;
        // Можно добавить аналитику или другие действия
        console.log(`[Router] Переход на страницу: ${page}`);
    });

    // 6. Обработчик уведомлений
    document.addEventListener('notification', (e) => {
        // Используем простой alert пока нет кастомных уведомлений
        // В реальном проекте здесь будет Notification UI
        console.log(`[Notification] ${e.detail.message}`);
    });

    // 7. Навигация через события (для футера и других элементов)
    document.addEventListener('navigate', (e) => {
        router.navigate(e.detail.page);
    });

    console.log('🚀 SCP Foundation RP приложение запущено!');
    console.log(`📦 Текущая тема: ${themeManager.getTheme()}`);
    console.log(`🛒 Товаров в корзине: ${cartStore.getCount()}`);
});

// Экспорт глобальных объектов для отладки
window.__app = {
    themeManager,
    router,
    cartStore,
    modal
};