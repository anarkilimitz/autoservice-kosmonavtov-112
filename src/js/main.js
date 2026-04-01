'use strict';

import { initForm } from './app.js';
import { initPhoneMask } from './mask.js';

initForm();
initPhoneMask();

const openButtons = document.querySelectorAll('[data-action="open-form"]');
const formModal = document.querySelector('.container-form');
const closeBtn = document.querySelector('.close-form');

// --- scroll lock ---
function lockScroll() {
	document.body.style.overflow = 'hidden';
}

function unlockScroll() {
	document.body.style.overflow = '';
}

// --- открытие ---
openButtons.forEach((btn) => {
	btn.addEventListener('click', () => {
		formModal.classList.add('active');
		lockScroll();
	});
});

// --- закрытие (ЕДИНАЯ функция) ---
function closeModal() {
	formModal.classList.remove('active');
	unlockScroll();
}

// кнопка закрытия
closeBtn?.addEventListener('click', closeModal);

// клик вне формы
formModal.addEventListener('click', (e) => {
	if (e.target === formModal) closeModal();
});

// ESC
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && formModal.classList.contains('active')) {
		closeModal();
	}
});

// СВАЙПЕР
const beforeSwiper = new Swiper('.beforeSwiper', {
	slidesPerView: 1,
	spaceBetween: 10,

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

const afterSwiper = new Swiper('.afterSwiper', {
	slidesPerView: 1,
	spaceBetween: 10,
	allowTouchMove: false, // чтобы не листали отдельно
	speed: 700, // плавность
});

// синхронизация
beforeSwiper.on('slideChange', () => {
	setTimeout(() => {
		afterSwiper.slideTo(beforeSwiper.activeIndex);
	}, 150); // задержку второму слайдеру сделал для красоты
});

// ------------------- дата в футере----------------------
// Автоматическое обновление года в футере
document.getElementById('current-year').textContent = new Date().getFullYear();

// -------  Услуги   -------

const priceTriggers = document.querySelectorAll('[data-action="toggle-price"]');

priceTriggers.forEach((trigger) => {
	trigger.addEventListener('click', () => {
		const parent = trigger.closest('.services__item');

		// закрыть другие + обновить их кнопки
		document.querySelectorAll('.services__item').forEach((item) => {
			if (item !== parent) {
				item.classList.remove('active');

				const btn = item.querySelector('[data-action="toggle-price"]');
				if (btn) btn.textContent = 'Подробнее / Прайс';
			}
		});

		// переключение текущего
		parent.classList.toggle('active');

		// текст текущей кнопки
		if (parent.classList.contains('active')) {
			trigger.textContent = 'Скрыть прайс';
		} else {
			trigger.textContent = 'Подробнее / Прайс';
		}
	});
});
