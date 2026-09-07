export function initHero() {
    const playerCountEl = document.getElementById('playerCount');
    if (!playerCountEl) return;

    // Имитация обновления онлайна
    function updatePlayerCount() {
        const base = 42;
        const variation = Math.floor(Math.random() * 16);
        const count = Math.min(base + variation, 64);
        playerCountEl.textContent = count;
    }

    // Обновляем сразу и каждые 8 секунд
    updatePlayerCount();
    setInterval(updatePlayerCount, 8000);

    // Копирование IP
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const ip = '';
            try {
                await navigator.clipboard.writeText(ip);
                copyBtn.innerHTML = '<i class="fa-regular fa-check"></i> Скопировано!';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Копировать';
                }, 2000);
            } catch (err) {
                console.error('Ошибка копирования:', err);
            }
        });
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#page-home')) {
        initHero();
    }
});