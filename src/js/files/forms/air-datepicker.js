/* Календарь  air-datapicker*/

// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей
import { flsModules } from "../modules.js";

// Подключение модуля
import AirDatepicker from 'air-datepicker';

const picker = new AirDatepicker('[data-datepicker]', {
	selectedDates: [new Date()],
	// відображати відразу
	// inline: true,
	// для мобільного (відкривається в модальному вікні)
	isMobile: true,
	autoClose: true,
	// відображення часу
	timepicker: true,
})

flsModules.AirDatepicker = picker;