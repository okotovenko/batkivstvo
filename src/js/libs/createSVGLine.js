// Дозволяє створювати svg-лінію по обраним елементам з певним класом
// Реалізована можливість "росту" лінії під час прокрутки сторінки
// Документація https://github.com/tomislavjezidzic/draad

export default class Draad {
	/**
	 * @param {string} element
	 * @param options
	 * @param {string} options.parentClass
	 * @param {number} options.smoothing
	 * @param {number} options.offsetX
	 * @param {number} options.offsetY
	 * @param {string} options.fill
	 * @param {string} options.color
	 * @param {number} options.lineWidth
	 * @param {number} options.lineOpacity
	 * @param {string} options.dasharray
	 * @param {string} options.cap
	 * @param {boolean} options.responsive
	 * @param {number} options.wait
	 * @param {boolean} options.absoluteUnits
	 */
	constructor(element, options = {}) {

		let _defaults = {
			element: '',
			parentClass: '',
			offsetX: '',
			offsetY: '',
			fill: '',
			color: '#000',
			lineWidth: '1',
			lineOpacity: '',
			dasharray: '',
			cap: '',
			responsive: '',
			options: '',
			wait: 0,
			smoothing: 0.2,
			absoluteUnits: false
		};

		this.defaults = Object.assign({}, _defaults, options);

		this.element = element;
		this.parent = () => {
			if (this.defaults.parentClass.length < 1) {
				return document.getElementsByTagName('body')[0];
			} else {
				return this.findAncestor(document.getElementsByClassName(element)[0], this.defaults.parentClass);
			}
		};

		this.smoothing = this.defaults.smoothing;
		this.offsetX = this.defaults.offsetX;
		this.offsetY = this.defaults.offsetY;
		this.fill = this.defaults.fill;
		this.color = this.defaults.color;
		this.lineWidth = this.defaults.lineWidth;
		this.lineOpacity = this.defaults.lineOpacity;
		this.dasharray = this.defaults.dasharray;
		this.cap = this.defaults.cap;
		this.responsive = this.defaults.responsive;
		this.absoluteUnits = this.defaults.absoluteUnits;
		this.options = this.defaults;

		setTimeout(() => {
			this.init();
		}, this.defaults.wait);
	}

	/**
	 * @param {*} element
	 * @param {string} cls
	 * @returns {*}
	 */
	findAncestor(element, cls) {
		return element.closest('.' + cls);
	}

	/**
	 * It goes through elements and creates points with coordinates
	 * @returns {Array}
	 */
	goThroughDots() {
		let dots = document.getElementsByClassName(this.element);
		let points = [];
		let offsetX = this.offsetX;
		let offsetY = this.offsetY;
		const body = document.body;
		const docEl = document.documentElement;
		let scrollTop = window.scrollY || docEl.scrollTop || body.scrollTop;
		let clientTop = docEl.clientTop || body.clientTop || 0;

		if (this.parent() === document.getElementsByTagName('body')[0]) {
			for (let i = 0; i < dots.length; i++) {
				let currentDot = document.getElementsByClassName(this.element)[i];
				let top = currentDot.getBoundingClientRect().top + scrollTop - clientTop;
				let sampleDotOffsetX = offsetX || currentDot.offsetWidth / 2;
				let sampleDotOffsetY = offsetY || currentDot.offsetHeight / 2;
				let currentDotX = parseInt(currentDot.getBoundingClientRect().left + sampleDotOffsetX, 10);
				let currentDotY = parseInt(Math.round(top) + sampleDotOffsetY, 10);
				points.push([currentDotX, currentDotY]);
			}
		} else {
			for (let i = 0; i < dots.length; i++) {
				let currentDot = document.getElementsByClassName(this.element)[i];
				let sampleDotOffsetX = offsetX || currentDot.offsetWidth / 2;
				let sampleDotOffsetY = offsetY || currentDot.offsetHeight / 2;
				let top = currentDot.getBoundingClientRect().top + scrollTop - clientTop;
				let currentDotX = parseInt(currentDot.offsetLeft + sampleDotOffsetX, 10);
				let currentDotY = parseInt(currentDot.offsetTop + sampleDotOffsetY, 10);

				if (this.absoluteUnits === true) {
					currentDotX = parseInt(currentDot.getBoundingClientRect().left + sampleDotOffsetX, 10);
					currentDotY = parseInt(Math.round(top) + sampleDotOffsetY, 10);
				}
				points.push([currentDotX, currentDotY]);
			}
		}

		return points;
	}

	/**
	 * @param {array} points
	 */
	connectingMagic(points) {
		const smoothing = this.smoothing;
		const svgParent = this.parent();

		const line = (pointA, pointB) => {
			const lengthX = pointB[0] - pointA[0];
			const lengthY = pointB[1] - pointA[1];
			return {
				length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
				angle: Math.atan2(lengthY, lengthX)
			};
		};

		const controlPoint = (current, previous, next, reverse) => {
			const prev = previous || current;
			const nex = next || current;

			const l = line(prev, nex);

			const angle = l.angle + (reverse ? Math.PI : 0);
			const length = l.length * smoothing;

			const xAxis = current[0] + Math.cos(angle) * length;
			const yAxis = current[1] + Math.sin(angle) * length;
			return [xAxis, yAxis];
		};

		const bezierCommand = (point, i, a) => {
			const cps = controlPoint(a[i - 1], a[i - 2], point);
			const cpe = controlPoint(point, a[i - 1], a[i + 1], true);
			return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
		};

		const svgPath = (points, command) => {
			const dAttr = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${command(point, i, a)}`, "");
			return dAttr;
		};

		const pointsLength = points.length;
		const firstPoint = points[0][1];
		const lastPoint = points[pointsLength - 1][1];

		const xmlns = "http://www.w3.org/2000/svg";
		const svgEl = document.createElementNS(xmlns, "svg");
		svgEl.setAttribute('class', `draad-line draad-line--${this.element}`);
		const path = document.createElementNS(xmlns, "path");
		path.setAttribute('d', svgPath(points, bezierCommand));
		path.setAttribute('fill', 'none');
		path.setAttribute('stroke', 'black');
		svgEl.appendChild(path);

		const fill = this.fill;
		const lineColor = this.color;
		const lineWidth = this.lineWidth;
		const lineOpacity = this.lineOpacity;
		const lineDasharray = this.dasharray;
		const linecap = this.cap;

		path.setAttribute(
			"style",
			`fill: ${fill}; ` +
			`stroke: ${lineColor}; ` +
			`stroke-width: ${lineWidth};` +
			`stroke-opacity: ${lineOpacity};` +
			`stroke-dasharray: ${lineDasharray};` +
			`stroke-linecap: ${linecap}`
		);

		svgEl.setAttribute(
			"style",
			"width: 100%; " +
			"min-height: 100%; " +
			`height: ${lastPoint - firstPoint + 1000}px;` +
			"top: 0; " +
			"left: 0; " +
			"bottom: 0; " +
			"right: 0; " +
			"position: absolute; "
		);

		svgParent.appendChild(svgEl);

		// Додаємо функцію для анімації лінії при скролі. Якщо ввімкнути - лінія стане СУЦІЛЬНОЮ, а не ПУНКТИРНОЮ
		// this.animateLineOnScroll(path);

		console.log(svgEl.height);
	}

	/**
	 * Line initialization
	 */
	init() {
		this.connectingMagic(this.goThroughDots());
		let self = this;

		/**
		 * If responsive option is true, line will be recalculated on resize
		 */
		if (this.responsive === true) {
			window.addEventListener('resize', () => {
				this.resize(self);
			});
		}
	}

	/**
	 * Resize check
	 */
	resize(self) {
		if (document.getElementsByClassName(`draad-line--${self.element}`)[0]) {
			document.getElementsByClassName(`draad-line--${self.element}`)[0].remove();
			this.connectingMagic(self.goThroughDots());
		}
	}

	/**
	 * Draad instance destroy()
	 */
	destroyDraad() {
		if (document.getElementsByClassName(`draad-line--${this.element}`)[0]) {
			document.getElementsByClassName(`draad-line--${this.element}`)[0].remove();
			window.removeEventListener('resize', this.resize);
			this.options = {};
		}
	}

	get destroy() {
		return this.destroyDraad();
	}

	/**
	 * Анімація "росту" лінії при скролі
	 * @param {Element} path
	 */
	animateLineOnScroll(path) {

		const pathLength = path.getTotalLength();
		path.style.strokeDasharray = pathLength;
		path.style.strokeDashoffset = pathLength;

		const updateDashOffset = () => {
			const scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
			path.style.strokeDashoffset = pathLength - (scrollPercentage * pathLength); // Щоб сповільнити/пришвидшити рух треба помножити на ...
		};

		window.addEventListener('scroll', updateDashOffset);
	}
}

const newDraad = new Draad("_icon-circle", {
	// parentClass: 'wrapper',
	wait: 1000,
	absoluteUnits: true,

	responsive: true,
	// offsetX: 0,
	// offsetY: 0,
	lineWidth: 3,
	lineOpacity: 0.8,
	color: "#028fff",
	smoothing: 0.3,
	dasharray: "5 10",
	cap: 'round'
});
