import { FormValidator } from './validator.js';

export function initForm() {
	const form = document.querySelector('#contactForm');
	if (!form) return;

	const btn = form.querySelector('button[type="submit"]');
	if (!btn) return;

	const btnTextEl = btn.querySelector('.btn-text');
	const defaultBtnText = btnTextEl ? btnTextEl.textContent : btn.textContent;

	// валидация
	const validator = new FormValidator(form, {
		firstName: [
			{
				validator: (v) => /^[a-zA-Zа-яА-ЯёЁ-]+$/.test(v),
				message: 'Только буквы',
			},
			{
				validator: (v) => v.length >= 2,
				message: 'Минимум 2 символа',
			},
		],

		lastName: [
			{
				validator: (v) => /^[a-zA-Zа-яА-ЯёЁ-]+$/.test(v),
				message: 'Только буквы',
			},
			{
				validator: (v) => v.length >= 2,
				message: 'Минимум 2 символа',
			},
		],

		phone: [
			{
				validator: (v) => v.replace(/\D/g, '').length === 11,
				message: 'Введите корректный номер',
			},
		],

		email: [
			{
				validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
				message: 'Неверный email',
			},
		],

		message: [
			{
				validator: (v) => v.length >= 10,
				message: 'Минимум 10 символов',
			},
		],

		agree: [
			{
				validator: (v) => v === true,
				message: 'Необходимо согласие',
			},
		],
	});

	// отправка формы
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		if (!validator.validateForm()) return;

		btn.classList.add('loading');
		btn.disabled = true;

		if (btnTextEl) {
			btnTextEl.textContent = 'Отправка...';
		} else {
			btn.textContent = 'Отправка...';
		}

		setTimeout(() => {
			btn.classList.remove('loading');
			btn.disabled = false;

			if (btnTextEl) {
				btnTextEl.textContent = defaultBtnText;
			} else {
				btn.textContent = defaultBtnText;
			}

			form.reset(); // очищаем значения
			validator.reset(); // очищаем состояние валидации
		}, 2000);
	});
}
