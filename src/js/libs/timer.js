// Клас дозволяє створити декілька таймерів на сторінці.
// В CountdownTimer() необхідно передати такі аргументи: кінцеву дату у форматі Date;
// функцію, яку потрібно виконувати кожну секунду (її, наприклад, можна використовувати
// для оновлення вмісту елементів, які використовуються для відображення часу, що залишився);
// у разі потреби функцію, яку потрібно виконати після завершення таймера.
//
// Ініціалізація решти таймерів на сторінці за допомогою new CountdownTimer() виконується аналогічно.
//https://itchief.ru/javascript/countdown-timer

import { flsModules } from "../files/modules.js";

class CountdownTimer {
	constructor(deadline, cbChange, cbComplete) {
		this._deadline = deadline;
		this._cbChange = cbChange;
		this._cbComplete = cbComplete;
		this._timerId = null;
		this._out = {
			days: '', hours: '', minutes: '', seconds: '',
			daysTitle: '', hoursTitle: '', minutesTitle: '', secondsTitle: ''
		};
		this._start();
	}
	static declensionNum(num, words) {
		return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
	}
	_start() {
		this._calc();
		this._timerId = setInterval(this._calc.bind(this), 1000);
	}
	_calc() {
		const diff = this._deadline - new Date();
		const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
		const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
		const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
		const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
		this._out.days = days < 10 ? '0' + days : days;
		this._out.hours = hours < 10 ? '0' + hours : hours;
		this._out.minutes = minutes < 10 ? '0' + minutes : minutes;
		this._out.seconds = seconds < 10 ? '0' + seconds : seconds;
		// Відмінювання. Приклад  ['день', 'дня', 'дней']);
		this._out.daysTitle = CountdownTimer.declensionNum(days, ['days', 'days', 'days']);
		this._out.hoursTitle = CountdownTimer.declensionNum(hours, ['hours', 'hours', 'hours']);
		this._out.minutesTitle = CountdownTimer.declensionNum(minutes, ['min', 'min', 'min']);
		this._out.secondsTitle = CountdownTimer.declensionNum(seconds, ['sec', 'sec', 'sec']);
		this._cbChange ? this._cbChange(this._out) : null;
		if (diff <= 0) {
			clearInterval(this._timerId);
			this._cbComplete ? this._cbComplete() : null;
		}
	}
}

if (document.querySelector('[data-timer-days]')) {
// 1. Отримаємо елементи в які потрібно вивести кількість днів, годин, хвилин і секунд, що залишилася.
// Додаючи відповідні дата-атрибути. 
const elDays1 = document.querySelector('[data-timer-days]');
const elHours1 = document.querySelector('[data-timer-hours]');
const elMinutes1 = document.querySelector('[data-timer-minutes]');
const elSeconds1 = document.querySelector('[data-timer-seconds]');

// 2. Встановлення чвсу відліку
const deadline1 = new Date(Date.now() + (60 * 1000) * 60 * (24 * 7));

// 3. Створення нового об'єкту, використовуючи new CountdownTimer()
new CountdownTimer(deadline1, (timer) => {
	elDays1.textContent = timer.days;
	elHours1.textContent = timer.hours;
	elMinutes1.textContent = timer.minutes;
	elSeconds1.textContent = timer.seconds;
	elDays1.dataset.title = timer.daysTitle;
	elHours1.dataset.title = timer.hoursTitle;
	elMinutes1.dataset.title = timer.minutesTitle;
	elSeconds1.dataset.title = timer.secondsTitle;
});

// Запускаємо та додаємо в об'єкт модулів
flsModules.CountdownTimer = new CountdownTimer({});
}