class ModalManager {
    constructor() {
        this.overlay = document.querySelector('#modalOverlay');
        this.isOpen = false;
        this.onClose = null;
    }

    open({ title, content, type = 'info', actions = [] }) {
        const classMap = {
            'info': 'modal-info',
            'success': 'modal-success',
            'warning': 'modal-warning',
            'error': 'modal-error',
            'Euclid': 'modal-euclid',
            'Keter': 'modal-keter',
            'Safe': 'modal-safe'
        };

        const iconMap = {
            'info': 'fa-circle-info',
            'success': 'fa-check-circle',
            'warning': 'fa-triangle-exclamation',
            'error': 'fa-circle-exclamation',
            'Euclid': 'fa-flask',
            'Keter': 'fa-skull',
            'Safe': 'fa-shield-halved'
        };

        const modalHTML = `
            <div class="modal-box ${classMap[type] || 'modal-info'}">
                <button class="close" id="modalClose">&times;</button>
                <div class="modal-header">
                    <span class="icon"><i class="fa-solid ${iconMap[type] || iconMap.info}"></i></span>
                    <h3>${title}</h3>
                    ${['Euclid', 'Keter', 'Safe', 'Thaumiel'].includes(type) ? 
                        `<span class="badge-class class-${type.toLowerCase()}">${type}</span>` : ''}
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    ${actions.map(action => `
                        <button class="btn ${action.class || 'btn-primary'}" data-action="${action.id}">
                            ${action.label}
                        </button>
                    `).join('')}
                    <button class="btn btn-outline close-btn">Закрыть</button>
                </div>
            </div>
        `;

        this.overlay.innerHTML = modalHTML;
        this.overlay.classList.add('active');
        this.isOpen = true;

        // Обработчики
        this.overlay.querySelector('#modalClose')?.addEventListener('click', () => this.close());
        this.overlay.querySelector('.close-btn')?.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        actions.forEach(action => {
            const btn = this.overlay.querySelector(`[data-action="${action.id}"]`);
            if (btn && action.handler) {
                btn.addEventListener('click', action.handler);
            }
        });

        // Закрытие по Esc
        document.addEventListener('keydown', this.handleEsc);
    }

    close() {
        this.overlay.classList.remove('active');
        this.isOpen = false;
        document.removeEventListener('keydown', this.handleEsc);
        if (this.onClose) this.onClose();
    }

    handleEsc = (e) => {
        if (e.key === 'Escape' && this.isOpen) {
            this.close();
        }
    }

    setOnClose(callback) {
        this.onClose = callback;
    }

    isModalOpen() {
        return this.isOpen;
    }
}

export const modal = new ModalManager();

// Упрощенный API
export function openModal(props) {
    modal.open(props);
}

export function closeModal() {
    modal.close();
}