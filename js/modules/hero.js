// js/modules/stats.js

class SiteStats {
    constructor() {
        this.visitors = 0;
        this.pageViews = 0;
        this.lastUpdated = null;
        this.storageKey = 'siteStats';
        this.visitorKey = 'visitorId';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.visitorKey)) {
            localStorage.setItem(this.visitorKey, 'visitor_' + Date.now());
        }
        this.updateStats();
        this.renderStats();
        setInterval(() => this.updateStats(), 30000);
    }

    updateStats() {
        const base = 42;
        const variation = Math.floor(Math.random() * 16);
        this.visitors = Math.min(base + variation, 64);
        this.pageViews += Math.floor(Math.random() * 3) + 1;
        this.lastUpdated = new Date().toLocaleString('ru-RU');
        
        localStorage.setItem(this.storageKey, JSON.stringify({
            visitors: this.visitors,
            pageViews: this.pageViews,
            lastUpdated: this.lastUpdated
        }));
        
        this.renderStats();
    }

    renderStats() {
        const container = document.querySelector('#siteStats');
        if (!container) return;

        container.innerHTML = `
            <div class="stats-grid">
                <div class="stat-box">
                    <i class="fa-solid fa-users"></i>
                    <span class="stat-num">${this.visitors}</span>
                    <span class="stat-label">Онлайн</span>
                </div>
                <div class="stat-box">
                    <i class="fa-solid fa-eye"></i>
                    <span class="stat-num">${this.pageViews}</span>
                    <span class="stat-label">Просмотров</span>
                </div>
                <div class="stat-box">
                    <i class="fa-solid fa-clock"></i>
                    <span class="stat-num">${this.lastUpdated || '—'}</span>
                    <span class="stat-label">Обновлено</span>
                </div>
            </div>
        `;

        const playerEl = document.getElementById('playerCount');
        if (playerEl) playerEl.textContent = this.visitors;
    }
}

export const siteStats = new SiteStats();

document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('#siteStats')) {
        const container = document.querySelector('.container');
        if (container) {
            const div = document.createElement('div');
            div.id = 'siteStats';
            container.prepend(div);
        }
    }
    siteStats.init();
});