// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";



//=Анімація заголовка "хвилею	"========================================================================= 

export function titleForVawe() {
	window.addEventListener('load', function () {
		//========================================================================== 
		// видалення тексту на кнопці для програвання відео
		const windowInnerWidth = window.innerWidth;
		const spanVideoPlay = this.document.querySelector('span._icon-triangle');

		if (windowInnerWidth < 401) {
			spanVideoPlay.innerText = ''
		}
		//========================================================================== 

		let titleArray = this.document.querySelectorAll('.title');

		titleArray.forEach(element => {
			// STR
			let str = element.childNodes[0];
			// SPAN
			let span = element.childNodes[1];
			let tittleWordsArrayNew = [];

			if (!element.childNodes[1].classList.contains('title-span')) {
				titleArray.forEach(element => {
					// Масив слів із заголовка
					let tittleWordsArray = element.innerText.split(' ');
					// Заповнюємо новий масив
					tittleWordsArray.forEach(element => {
						tittleWordsArrayNew.push(element)
					});
					// Робимо рядок зі слів масиву
					element.innerHTML = tittleWordsArrayNew.join(' ');
					// Кожну букву рядка загортаємо в "span"
					element.innerHTML = element.innerText.replace(/()/g, '<span>$1</span>');
					// element.classList.add('animation');
					// додаємо анімацію кожному "span'y"
					for (let i = 0, time = 0; i < element.children.length; i++, time += 0.1) {
						element.children[i].style = `
					animation-delay: ${time}s;
						`
					}
				});
			}

			else {
				// Беремо "text" в масив і видаляємо " "(пробіл) в кінці
				let tittleWordsArray = element.childNodes[0].textContent.split(' ');
				tittleWordsArray.splice(-1, 1);
				// Кожне слово розділяємо на окремі букви і додаємо в масив
				tittleWordsArray.forEach(word => {
					let wordLength = word.length;
					let arrayWord = word.split('');
					let arrayWordNew = [];
					// Кожну букву слова загортаємо в "span"
					arrayWord.forEach(letter => {
						letter = `<span> ${letter} </span>`;
						arrayWordNew.push(letter)
					})
					// Об'єднуємо букви
					let letterInSpan = arrayWordNew.join('');
					// Отримані букви загортаємо в "span"
					letterInSpan = `<span> ${letterInSpan} </span>`;
					tittleWordsArrayNew.push(letterInSpan)
					// // Букви і саме слово загорнуте в "span"
					// let newWord = tittleWordsArrayNew;
					// console.log(newWord)
				});

				// Беремо "span" з класом <span class="title-span">
				let spanTextArray = element.childNodes[1].innerText.split('');
				let spanTextArrayNew = [];
				// Кожну букву слова загортаємо в "span"
				spanTextArray.forEach(element => {
					element = `<span> ${element} </span>`
					spanTextArrayNew.push(element);
				});
				// Масив з букв загорнутих в "span"
				let wordSpanTextArrayNew = spanTextArrayNew.join('')
				// В "span" з класом <span class="title-span"> додаємо отриманий масив
				span.innerHTML = wordSpanTextArrayNew;
				// забороняємо перенесення
				// span.style = `
				// white-space: nowrap;
				// `
				// Додаємо слово в масив titleArray
				element.innerHTML = tittleWordsArrayNew.join(' ');
				// Додаємо <span class="title-span"> на сторінку
				element.append(span);

				// Для всхі вкладених "span" додаємо "style: animation-delay"
				titleArray.forEach(element => {
					// element.classList.add('animation');
					let valueSpan = 0;
					for (let i = 0, time = 0; i < element.children.length; i++) {
						// element.children.style = `
						// white-space: nowrap;
						// `

						valueSpan += element.children[i].children.length;
						for (let j = 0; j < element.children[i].children.length; j++, time += 0.2) {
							// element.children[i].style = `
							// 	white-space: nowrap;
							// 	display: inline-blok;
							// `
							element.children[i].children[j].style = `
								animation-delay: ${time}s;
							`
						}
					}
				});
			}
		});
	})
}

//=Анімація слів "хвилею" + стилізація курсори при наведенні========================================================================= 

export function linksForVawe() {
	window.addEventListener('load', function () {
		const menuLinkArray = document.querySelectorAll('.menu__link');
		const buttons = document.querySelectorAll('.button, .button-up')
		const cursor = document.querySelector('.cursor');
		menuLinkArray.forEach(element => {
			element.addEventListener('mouseenter', function () {
				cursor.style = `
				border: 2px solid #fff;
				opacity: 0.2;
				`
				// отримуємо пункт меню, ділемо на букви і кожну загортаємо в "span"
				// додаємо клас, який анімовано в css, додаємо різницю в запуску анімації
				element.innerHTML = element.innerText.replace(/(.)/g, '<span>$1</span>');
				element.classList.add('animation');
				for (let i = 0, time = 0; i < element.children.length; i++, time += 0.1) {
					element.children[i].style = `
					animation-delay: ${time}s;
					`
				}
			})

			element.addEventListener('mouseleave', function () {
				cursor.style = `
				border: 2px solid rgb(4, 89, 18);
				`
				// загорнуті раніше букви в "span" повертаємо і робтмо з них ціле слово
				// видаляємо доданий клас
				function remove() {
					let item = '';
					for (let i = 0; i < element.childNodes.length; i++) {
						let word = element.childNodes[i].innerHTML;
						item += word;
					}
					element.innerHTML = item;
					element.classList.remove('animation');
				}
				setTimeout(remove, 100)
			})
		});

		//=hover на кнопки========================================================================= 

		buttons.forEach(element => {
			element.addEventListener('mouseenter', function () {
				cursor.style = `
				border: 2px solid #fff;
				opacity: 0.6;
				`
			})

			element.addEventListener('mouseleave', function () {
				cursor.style = `
				border: 2px solid rgb(4, 89, 18);
				`
			})
		});
	})
}

//=Власний курсор=========================================================================

export function cursor() {
	window.addEventListener('mousemove', function (e) {
		const cursor = document.querySelector('.cursor');
		let cursortWidth = cursor.offsetWidth;
		let cursortHeigth = cursor.offsetHeight;
		let mouseY = e.clientY;
		let mouseX = e.clientX;
		cursor.style.transform = `translate3d(${e.clientX - (cursortWidth / 2)}px, ${e.clientY - (cursortHeigth / 2)}px, 0)`;
	})
}

//=Власний курсор + Магнітний курсор=========================================================================

export function cursorMove() {
	const buttonsList = document.querySelectorAll('.button, .button-up');
	const cursor = document.querySelector('.cursor');

	const animateMe = function (e) {
		const span = this.querySelector('span');
		console.log(span)
		const { offsetX: x, offsetY: y } = e,
			{ offsetWidth: width, offsetHeight: height } = this;

		let move = 10;
		let xMove = x / width * (move * 2) - move;
		let yMove = y / height * (move * 2) - move;

		span.style.transform = `translate(${xMove}px, ${yMove}px)`;

		if (e.type === 'mouseleave') span.style.transform = '';
	};

	const editCursor = e => {
		const { clientX: x, clientY: y } = e;
		cursor.style.left = x + 'px';
		cursor.style.top = y + 'px';
	};

	buttonsList.forEach(element => element.addEventListener('mousemove', animateMe));
	buttonsList.forEach(element => element.addEventListener('mouseleave', animateMe));
	window.addEventListener('mousemove', editCursor);
};

//=Затримка для анімацій=========================================================================

export function animationElements() {
	window.addEventListener('load', function () {
		let elementsHasDataWatch = this.document.querySelectorAll('._watcher-view')
		elementsHasDataWatch.forEach(element => {
			element.classList.add('animation');
		});
	})
}

//=видалення тексту на кнопці для програвання відео при динамічній зміні екрану========================================================================= 

export function deleteTextSpanVideo() {

	window.addEventListener('resize', function () {
		const windowInnerWidth = window.innerWidth;
		const spanVideoPlay = this.document.querySelector('span._icon-triangle');

		if (windowInnerWidth < 401) {
			spanVideoPlay.innerText = ''
		}

		else {
			spanVideoPlay.innerText = 'Cooking Process'
		}
	})
}

//=Прелоадер========================================================================= 

export function preloader() {
	window.addEventListener('load', function () {
		document.body.classList.add('loaded_hiding');
		window.setTimeout(function () {
			document.body.classList.add('loaded');
			document.body.classList.remove('loaded_hiding');
		}, 500);
	})
}
//=Запуск svg-анімації=========================================================================

export function animationSvg() {
	const animElement = document.querySelector('.page__decor-1');
	const arr = document.getElementsByTagName('animate');
	for (let i = 0; i < arr.length; i++) {
		let valueAttributeName = arr[i].attributes[0];
		valueAttributeName.value = 'd';
	}

	const stepsDecor = document.querySelectorAll('.steps__decor');
	let deg = 0;
	for (let i = 0; i < stepsDecor.length; i++) {
		stepsDecor[i].style.transform = `rotate(${deg}deg)`;
		deg += 15;
	}
}

//=Рандомна поява елементів в блоці================================================================

export function showElementRandom() {
	const arrayElements = document.querySelectorAll('.person');
	const parentBlock = document.querySelector('.clients__person');
	console.log(parentBlock)

	const newArray = Array.from(arrayElements);
	let time = 0;

	while (newArray.length !== 0) {

		let index = Math.floor(Math.random() * newArray.length);
		newArray[index].style = `
		animation-delay: ${time}s;
		`
		time += 0.2;
		newArray.splice(index, 1)
		index = 0;
	}
}

//=SVG========================================================================= 
export function toChangeSVGSize() {
	const windowInnerWidth = window.innerWidth;
	var mySVG = document.querySelector('.booking__waves');
	if (windowInnerWidth < 1200 && windowInnerWidth > 769) {
		mySVG.setAttribute("viewBox", "0 24 100 28");
	} else if (windowInnerWidth > 1200) {
		mySVG.setAttribute("viewBox", "0 24 150 28");
	}
	else {
		mySVG.setAttribute("viewBox", "0 24 50 28");
	}

}

//=Сортування за категоріями========================================================================= 

export function sortForTabs() {
	let worksButton = document.querySelectorAll('.collection__button');
	let worksItem = document.querySelectorAll('.collection__item');

	for (let i = 0; i < worksButton.length; i++) {
		worksButton[i].addEventListener('click', function () {
			for (let j = 0; j < worksButton.length; j++) {
				worksButton[j].classList.remove('active');
			}
			this.classList.add('active');

			let dataFilter = this.getAttribute('data-filter');

			for (let k = 0; k < worksItem.length; k++) {
				worksItem[k].classList.remove('active');
				worksItem[k].classList.add('hide');

				if (worksItem[k].getAttribute('data-item') == dataFilter || dataFilter == 'all') {
					worksItem[k].classList.remove('hide');
					worksItem[k].classList.add('active');
				}
			}
		})
	}
}

//=Виділення активного пункту меню========================================================================= 

export function activeMenu() {
	let a = document.querySelectorAll('.menu__link')
	a.forEach((el) => {
		if (el.getAttribute('href') == window.location.pathname.substring(1)) {
			el.classList.add('active')
		}
		el.classList.remove('active')
		if (el.getAttribute('href') == window.location.pathname.substring(1) + window.location.hash) {
			el.classList.add('active')
		}
	})

	//=Другий спосіб 
	//Додати тегу body атрибут data-id-page="ідентифікатор сторінки"
	//Додати пункту меню <a> атрибут data-id-nav="дентифікатор сторінки"
	let pageId = document.querySelector("[data-id-page]").getAttribute("data-id-page")
	if (document.querySelector(`[data-id-nav=${pageId}]`)) {
		let navItem = document.querySelector(`[data-id-nav=${pageId}]`);

		if (pageId == navItem.getAttribute("data-id-nav")) {
			navItem.classList.add("active");
		}
	}
}

//=Рух елементів в залежності від прокрутки========================================================================= 

export function moveOnScroll() {
	// let beginscrollPosition = window.scrollY;

	window.addEventListener('scroll', function () {

		let scrollPosition = this.window.scrollY;
		const firstImg = this.document.querySelector('.img-2')
		// firstImg.style.transform = `scale(calc(${scrollPosition}*0.005)) translate(` + scrollPosition + `px,` + scrollPosition * 0.5 + `px) `
		firstImg.style.transform = `translate(` + scrollPosition * 4 + `px,` + scrollPosition + `px) `

		if (scrollPosition > 300) {
			let diferentPosition = scrollPosition - 300;
			firstImg.style.transform = `translate(calc((300px - ${diferentPosition}px)*4),` + scrollPosition + `px) `
		}

	})
}

//=Анімація SVG-логотипа========================================================================= 

export function animateSVGPaths() {

	const pathElements = document.querySelectorAll("path");

	pathElements.forEach((path, index) => {
		const pathLength = path.getTotalLength();

		path.style.strokeDasharray = pathLength; // Match the path length
		path.style.strokeDashoffset = pathLength; // Match the path length
		path.style.fill = "none";
		path.style.stroke = "none"; // Initially, set to "none" to make the path invisible
		path.style.strokeLinecap = "round";
		// швидкість малювання
		// const drawingTime = pathLength > 200 ? ((0.01 * pathLength) / 4) : (0.01 * pathLength);
		const drawingTime = 5;

		// Start the animation after a brief delay
		setTimeout(() => {
			path.style.animation = `draw ${drawingTime}s infinite normal forwards`;
			path.style.stroke = "#ffffff"; // Set the stroke color
			path.style.strokeWidth = "4";
		}, drawingTime * index);

		const style = document.createElement("style");
		style.innerHTML = `
			  @keyframes draw {
					from {
						 stroke-dashoffset: ${pathLength}/2;
					}
					to {
						 stroke-dashoffset: 0;
					}
			  }
		 `;
		document.head.appendChild(style);
	});
}

//=Копіювання змісту поля, по якому було здійснено клік в форму/попап ======================================================= 

export function openForm() {
	document.addEventListener('click', function (e) {
		let targetElement = e.target;
		// в textarea
		if (targetElement.closest('[data-text]') && targetElement.closest('.services__item')) {
			document.querySelector('.input-textarea').value = targetElement.innerText;
		}
		// в src зображення
		if (targetElement.closest('[data-img]') && targetElement.closest('.certificates__img')) {
			document.querySelector('.popup__link').src = targetElement.src;
		}
	})
}

//=Кастомна пагінація для зображень на сторінці ========================================================================= 
export function addPaginationToProjectPage() {
	document.addEventListener('DOMContentLoaded', function () {
		const content = document.querySelector('.projects__container.projects__container--project');

		if (content) {
			const itemsPerPage = 4; // Кількість article для відображення на кожній сторінці
			let currentPage = 0;  // номер поточної сторінки
			const items = Array.from(content.getElementsByTagName('article')).slice(0);

			console.log(items)

			function showPage(page) {
				const startIndex = page * itemsPerPage;
				const endIndex = startIndex + itemsPerPage;
				items.forEach((item, index) => {
					item.classList.toggle('hidden', index < startIndex || index >= endIndex); // додавання класу для стилізації "зайвих" елементів
				});
				updateActiveButtonStates();
			}

			function createPageButtons() {
				const totalPages = Math.ceil(items.length / itemsPerPage);
				const paginationContainer = document.createElement('nav');
				const paginationDiv = document.body.appendChild(paginationContainer);
				paginationContainer.classList.add('navigation', 'pagination');

				for (let i = 0; i < totalPages; i++) {
					const pageButton = document.createElement('button');
					pageButton.classList.add('page-numbers');
					pageButton.textContent = i + 1;
					pageButton.addEventListener('click', () => {
						currentPage = i;
						showPage(currentPage);
						updateActiveButtonStates();
					});

					content.appendChild(paginationContainer);
					paginationDiv.appendChild(pageButton);
				}

			}
			function updateActiveButtonStates() {
				const pageButtons = document.querySelectorAll('.pagination button');
				pageButtons.forEach((button, index) => {
					if (index === currentPage) {
						button.classList.add('active');
					} else {
						button.classList.remove('active');
					}
				});
			}

			createPageButtons();
			showPage(currentPage);

		}
	})
}

//=Перемикачі========================================================================= 

export function toggleButton() {
	let buttons = document.querySelectorAll('.toggle');

	buttons.forEach(element => {
		element.addEventListener('click', function () {

			element.classList.toggle('active')
		})
	});
}



















