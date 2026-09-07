import { scpData } from '../config/scp-data.js';
import { modal } from '../ui/modal.js';

export function renderSCP() {
    const container = document.querySelector('#page-scp .container');
    if (!container) return;

    const html = `
        <div class="section-header">
            <span class="section-tag">Архивы сдерживания</span>
            <h2 class="section-title">База данных аномалий</h2>
            <p class="section-sub">Объекты, требующие постоянного внимания.</p>
        </div>
        <div class="scp-grid">
            ${scpData.map(scp => scpCardHTML(scp)).join('')}
        </div>
    `;

    container.innerHTML = html;

    // Обработчики кнопок "Протокол"
    document.querySelectorAll('.protocol-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const number = btn.dataset.number;
            const scp = scpData.find(s => s.number === number);
            if (scp) showProtocol(scp);
        });
    });
}

function scpCardHTML(scp) {
    const classMap = {
        'Safe': 'class-safe',
        'Euclid': 'class-euclid',
        'Keter': 'class-keter',
        'Thaumiel': 'class-thaumiel'
    };

    return `
        <div class="scp-card">
            <div class="head">
                <span class="number">${scp.number}</span>
                <span class="class ${classMap[scp.class] || 'class-euclid'}">${scp.class}</span>
            </div>
            <div class="name">${scp.name}</div>
            <div class="desc">${scp.description}</div>
            <button class="btn btn-ghost protocol-btn" data-number="${scp.number}">
                <i class="fa-solid fa-file-shield"></i> Протокол сдерживания
            </button>
        </div>
    `;
}

function showProtocol(scp) {
    modal.open({
        title: `Протокол сдерживания ${scp.number}`,
        content: `
            <div class="protocol">${scp.protocol}</div>
            <p style="color:var(--text-dim);font-size:0.9rem;margin-top:8px;">
                <i class="fa-solid fa-triangle-exclamation" style="color:var(--primary-red);"></i> 
                Нарушение протокола влечёт за собой немедленное отстранение от должности.
            </p>
        `,
        type: scp.class
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#page-scp')) {
        renderSCP();
    }
});