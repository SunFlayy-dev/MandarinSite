import { renderDonate } from '../modules/donate.js';

let currentPage = 'home';

export function navigateTo(page) {
  if (page === currentPage) return;
  
  // Скрыть все страницы
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Показать нужную
  const target = document.getElementById(`page-${page}`);
  if (target) target.classList.add('active');
  
  // Обновить навигацию
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
  
  currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Ленивая загрузка контента
  if (page === 'donate') renderDonate();
  
  history.pushState({ page }, '', `#${page}`);
}