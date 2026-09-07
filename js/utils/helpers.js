// Форматирование цены
export function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
}

// Дебаунс для оптимизации событий
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Копирование текста в буфер обмена
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Ошибка копирования:', err);
        return false;
    }
}

// Генерация случайного ID
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Проверка на пустой объект
export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// Получение параметров из URL
export function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
        result[key] = value;
    }
    return result;
}

// Троттлинг (ограничение частоты вызовов)
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Плюрализация
export function pluralize(number, one, two, five) {
    const n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}