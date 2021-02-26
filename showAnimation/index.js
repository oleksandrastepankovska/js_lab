const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const snowflakesNumber = 250;
const snowflakesArray = [];
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

const random = (min, max) => {
	return min + Math.random() * (max - min + 1);
};

const clientResize = () => {
	width = window.innerWidth;
	height = window.innerHeight;
};

window.addEventListener('resize', clientResize);

const createSnowflakes = () => {
	for (let i = 0; i < snowflakesNumber; i++) {
		snowflakesArray.push({
			x: Math.random() * width,
			y: Math.random() * height,
			opacity: Math.random(),
			speedX: random(34, -3),
			speedY: random(-7, 17),
			radius: random(0.7, 3.7),
		});
	}
};

const drawSnowflakes = () => {
	for (let i = 0; i < snowflakesNumber; i++) {
		const gradient = context.createRadialGradient(
			snowflakesArray[i].x,
			snowflakesArray[i].y,
			0,
			snowflakesArray[i].x,
			snowflakesArray[i].y,
			snowflakesArray[i].radius
		);

		gradient.addColorStop(
			0,
			'rgba(255, 255, 255,' + snowflakesArray[i].opacity + ')'
		);
		gradient.addColorStop(
			0.8,
			'rgba(210, 236, 242,' + snowflakesArray[i].opacity + ')'
		);
		gradient.addColorStop(
			1,
			'rgba(237, 247, 249,' + snowflakesArray[i].opacity + ')'
		);

		context.beginPath();
		context.arc(
			snowflakesArray[i].x,
			snowflakesArray[i].y,
			snowflakesArray[i].radius,
			0,
			Math.PI * 2,
			false
		);

		context.fillStyle = gradient;
		context.fill();
	}
};

const moveSnowflakes = () => {
	for (var i = 0; i < snowflakesNumber; i++) {
		(snowflakesArray[i].x += snowflakesArray[i].speedX),
		(snowflakesArray[i].y += snowflakesArray[i].speedY);

		if (snowflakesArray[i].y > height) {
			(snowflakesArray[i].x = Math.random() * width * 1), 5;
			snowflakesArray[i].y = -50;
		}
	}
};

const updateSnowFall = () => {
	context.clearRect(0, 0, width, height);
	drawSnowflakes();
	moveSnowflakes();
};

setInterval(updateSnowFall, 50);
createSnowflakes();
