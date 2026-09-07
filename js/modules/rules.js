export function initAccordion() {
    const items = document.querySelectorAll('.accordion-item');
    
    items.forEach(item => {
        const head = item.querySelector('.head');
        if (head) {
            head.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Закрываем все (опционально)
                // items.forEach(i => i.classList.remove('active'));
                
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#page-rules')) {
        initAccordion();
    }
});