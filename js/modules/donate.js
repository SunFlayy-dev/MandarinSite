import { DONATE_ITEMS } from '../config/donate-data.js';
import { cartStore } from './cart.js';
import { formatPrice } from '../utils/helpers.js';

let currentFilter = 'all';

export function renderDonate() {
    const container = document.querySelector('#page-donate .container');
    if (!container) return;

    const filtered = DONATE_ITEMS.filter(item => {
        if (currentFilter === 'all') return true;
        return item.category === currentFilter;
    });

    // Сортируем: сначала привилегии, потом кейсы, потом предметы
    const order = { privilege: 0, case: 1, item: 2 };
    filtered.sort((a, b) => order[a.category] - order[b.category]);

    const html = `
        <div class="section-header">
            <span class="section-tag">Поддержка проекта</span>
            <h2 class="section-title">Магазин привилегий</h2>
            <p class="section-sub">Выбери свой путь в Фонде.</p>
        </div>

        <div class="filter-group" id="donateFilters">
            <button class="filter-btn active" data-filter="all">Все</button>
            <button class="filter-btn" data-filter="privilege">Привилегии</button>
            <button class="filter-btn" data-filter="case">Кейсы</button>
            <button class="filter-btn" data-filter="item">Предметы</button>
        </div>

        <div id="donateItems">
            ${renderItems(filtered)}
        </div>
    `;

    container.innerHTML = html;

    // Обработчики фильтров
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderDonate();
        });
    });

    // Обработчики кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            cartStore.addItem(btn.dataset.id);
        });
    });
}

function renderItems(items) {
    if (items.length === 0) {
        return '<p style="color:var(--text-muted);text-align:center;padding:40px 0;">Нет товаров в этой категории.</p>';
    }

    // Группировка по категориям
    const groups = {
        privilege: items.filter(i => i.category === 'privilege'),
        case: items.filter(i => i.category === 'case'),
        item: items.filter(i => i.category === 'item')
    };

    let html = '';
    const groupTitles = {
        privilege: 'Привилегии',
        case: 'Кейсы',
        item: 'Предметы'
    };

    for (const [category, categoryItems] of Object.entries(groups)) {
        if (categoryItems.length === 0) continue;

        html += `
            <div class="donate-group">
                <h3 class="donate-group-title">${groupTitles[category]}</h3>
                <div class="donate-grid">
                    ${categoryItems.map(item => cardHTML(item)).join('')}
                </div>
            </div>
        `;
    }

    return html;
}

function cardHTML(item) {
    let extra = item.featured ? ' featured' : '';
    let badge = item.featured ? '<span class="badge">🔥 Популярный</span>' : '';
    let period = item.period ? ` / ${item.period}` : '';
    
    let caseList = '';
    if (item.isCase) {
        caseList = `
            <ul style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:4px 12px;margin:8px 0 12px;text-align:left;">
                ${item.caseItems.map(i => `<li><i class="fa-solid fa-gift"></i> ${i}</li>`).join('')}
            </ul>
        `;
    }
    
    let loreHTML = item.lore ? 
        `<div class="lore-tip"><i class="fa-solid fa-circle-info"></i> ${item.lore}</div>` : '';

    return `
        <div class="donate-card${extra}">
            ${badge}
            <div>
                <div class="title"><i class="fa-solid ${item.icon || 'fa-tag'}"></i> ${item.name}</div>
                <div class="price">${formatPrice(item.price)}${period}</div>
                ${item.desc ? `<p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:8px;">${item.desc}</p>` : ''}
                ${caseList}
                ${loreHTML}
            </div>
            <button class="btn ${item.featured ? 'btn-primary' : 'btn-outline'} add-to-cart" data-id="${item.id}">
                <i class="fa-solid fa-cart-plus"></i> В корзину
            </button>
        </div>
    `;
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#page-donate')) {
        renderDonate();
    }
});