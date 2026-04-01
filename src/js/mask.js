export function initPhoneMask() {
	function phoneMask(input) {
		function getDigits(v) {
			return v.replace(/\D/g, '');
		}

		function format(d) {
			if (!d) return '';

			if (d[0] === '8') d = '7' + d.slice(1);
			if (d[0] !== '7') d = '7' + d;

			d = d.slice(0, 11);

			let r = '+7';

			if (d.length > 1) r += ' (' + d.slice(1, 4);
			if (d.length >= 4) r += ') ' + d.slice(4, 7);
			if (d.length >= 7) r += '-' + d.slice(7, 9);
			if (d.length >= 9) r += '-' + d.slice(9, 11);

			return r;
		}

		input.addEventListener('input', () => {
			let digits = getDigits(input.value);

			input.value = format(digits);
		});

		input.addEventListener('keydown', (e) => {
			if (e.key !== 'Backspace') return;

			const pos = input.selectionStart;

			// если удаляем служебный символ — пропускаем его
			if (/[()\-\s]/.test(input.value[pos - 1])) {
				e.preventDefault();
				input.setSelectionRange(pos - 1, pos - 1);
			}
		});

		input.addEventListener('focus', () => {
			if (!input.value) input.value = '+7 (';
		});

		input.addEventListener('blur', () => {
			if (getDigits(input.value).length <= 1) input.value = '';
		});
	}

	document.querySelectorAll('input[name="phone"]').forEach(phoneMask);
}
