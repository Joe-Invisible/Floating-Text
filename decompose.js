const decompose = document.querySelectorAll(".decompose");
const linVel = 10;

class MovBatch {
	/**
	 * @param {Array<HTMLElement> | HTMLElement} e
	 */
	constructor(e) {
		this.elemBatch = e instanceof Array ? e : [e];
		this.assignAnimation();
	}

	getRandDuration = () => {
		const basis = Math.random() * 20000;
		return basis < 15000 ? basis + 15000 : basis;
	};

	updateDir = () => {
		const magX = Math.random() * (-1) ** Math.round(Math.random());
		const magY = Math.random() * (-1) ** Math.round(Math.random());
		const e = Math.sqrt(magX * magX + magY * magY);
		return [magX / e, magY / e];
	};

	assignAnimation = () => {
		const duration = this.getRandDuration();
		const currDir = this.updateDir();
		/**@type {Keyframe} */
		const animation = [
			{
				transform: `
				translate(
				    ${(currDir[0] * linVel * duration) / 1000}px, ${(currDir[1] * linVel * duration) / 1000}px)
				`,
			},
		];
		setTimeout(this.assignAnimation, duration);

		for (let elem of this.elemBatch) {
			elem.animate(animation, { duration: duration, fill: "forwards" });
		}
	};
}

/**
 * @param {Array} arr
 */
function shuffle(_arr) {
	const arr = Array.from(_arr);
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

/**
 * @param {String} ch
 * @param {Number} i
 * @returns
 */
function createSpan(ch, i) {
	const float = document.createElement("span");
	float.innerText = ch;
	float.classList.add("floats");
	float.insertAdjacentHTML("afterbegin", `<sup>${i}</sup>`);
	return float;
}

for (let el of decompose) {
	const /**@type {String} */ dropTab = el.textContent.replaceAll("\t", "").replaceAll("\n", "").replaceAll(" ", "");

	el.innerHTML = "";
	Array.prototype.forEach.call(dropTab, (/**@type {String}*/ ch, /**@type {Number}*/ i) => {
		el.append(createSpan(ch, i));
	});

	const floatSpans = document.querySelectorAll("span.floats");

	for (let span of floatSpans) {
		new MovBatch(span);
	}
}
