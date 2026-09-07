export function initFactions() {
    const tabs = document.querySelectorAll('.faction-tabs .tab');
    const panels = {
        'class-d': document.getElementById('panel-class-d'),
        'security': document.getElementById('panel-security'),
        'science': document.getElementById('panel-science'),
        'mtf': document.getElementById('panel-mtf'),
        'chaos': document.getElementById('panel-chaos')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Убираем активность у всех табов
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Скрываем все панели
            Object.values(panels).forEach(p => p?.classList.remove('active'));

            // Показываем нужную
            const key = this.dataset.faction;
            if (panels[key]) {
                panels[key].classList.add('active');
            }
        });
    });

    // Устанавливаем активную панель по умолчанию
    const activeTab = document.querySelector('.faction-tabs .tab.active');
    if (activeTab) {
        const key = activeTab.dataset.faction;
        if (panels[key]) {
            panels[key].classList.add('active');
        }
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#page-factions')) {
        initFactions();
    }
});