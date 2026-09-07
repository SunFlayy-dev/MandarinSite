// js/modules/stats.js

class SiteStats {
    constructor() {
        this.visitors = 0;
        this.pageViews = 0;
        this.lastUpdated = null;
        this.storageKey = 'siteStats';
        this.visitorKey = 'visitorId';
        
        this.loadFromStorage();
        this.init();
    }

    init() {
        // Генерация уникального ID посетителя
        if (!localStorage.getItem(this.visitorKey)) {
            localStorage.setItem(this.visitorKey, this.generateVisitorId());
        }

        // Обновляем счетчик
        this.updateStats();
        
        // Обновляем UI
        this.renderStats();

        // Запускаем автообновление каждые 30 секунд
        setInterval(() => this.updateStats(), 30000);
    }

    generateVisitorId() {
        return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const data = JSON.parse(saved);
                this.visitors = data.visitors || 0;
                this.pageViews = data.pageViews || 0;
                this.lastUpdated = data.lastUpdated || null;
            }
        } catch (e) {
            console.error('Ошибка загрузки статистики:', e);
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify({
                visitors: this.visitors,
                pageViews: this.pageViews,
                lastUpdated: this.lastUpdated
            }));
        } catch (e) {
            console.error('Ошибка сохранения статистики:', e);
        }
    }

    updateStats() {
        // Имитация обновления онлайна
        const base = 42;
        const variation = Math.floor(Math.random() * 16);
        this.visitors = Math.min(base + variation, 64);
        
        // Увеличиваем просмотры
        this.pageViews += Math.floor(Math.random() * 3) + 1;
        this.lastUpdated = new Date().toLocaleString('ru-RU');
        
        this.saveToStorage();
        this.renderStats();
        
        // Диспатчим событие для других модулей
        document.dispatchEvent(new CustomEvent('statsUpdated', {
            detail: {
                visitors: this.visitors,
                pageViews: this.pageViews,
                lastUpdated: this.lastUpdated
            }
        }));
    }

    renderStats() {
        const statsContainer = document.querySelector('#siteStats');
        if (!statsContainer) return;

        statsContainer.innerHTML = `
            <div class="stats-container">
                <div class="stat-item">
                    <i class="fa-solid fa-users"></i>
                    <span class="stat-value" id="statsVisitors">${this.visitors}</span>
                    <span class="stat-label">Онлайн</span>
                </div>
                <div class="stat-item">
                    <i class="fa-solid fa-eye"></i>
                    <span class="stat-value" id="statsViews">${this.pageViews}</span>
                    <span class="stat-label">Просмотров</span>
                </div>
                <div class="stat-item">
                    <i class="fa-solid fa-clock"></i>
                    <span class="stat-value" id="statsTime">${this.lastUpdated || '—'}</span>
                    <span class="stat-label">Обновлено</span>
                </div>
            </div>
        `;

        // Обновляем playerCount на главной
        const playerCountEl = document.getElementById('playerCount');
        if (playerCountEl) {
            playerCountEl.textContent = this.visitors;
        }
    }

    getStats() {
        return {
            visitors: this.visitors,
            pageViews: this.pageViews,
            lastUpdated: this.lastUpdated
        };
    }
}

export const siteStats = new SiteStats();

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Создаем контейнер для статистики, если его нет
    if (!document.querySelector('#siteStats')) {
        const container = document.querySelector('.container');
        if (container) {
            const statsDiv = document.createElement('div');
            statsDiv.id = 'siteStats';
            // Вставляем после hero или в нужное место
            const hero = document.querySelector('.hero');
            if (hero && hero.parentNode) {
                hero.parentNode.insertBefore(statsDiv, hero.nextSibling);
            } else {
                container.prepend(statsDiv);
            }
        }
    }
    
    siteStats.init();
});