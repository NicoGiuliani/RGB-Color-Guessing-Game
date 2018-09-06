const squares = document.querySelectorAll(".square");
const reset = document.querySelector("#reset");
const message = document.querySelector("#message");
const h1 = document.querySelector("h1");
const easyBtn = document.querySelector("#easy");
const hardBtn = document.querySelector("#hard");
let numberSquares = 6;
let display = document.querySelector("#display");
let possibleColors;
let winningColor;

easyBtn.addEventListener('click', () => {
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	numberSquares = 3;
	for (let i = 0; i < squares.length; i++) {
		squares[i].style.visibility = "hidden";
	}
	setupGame();
});

hardBtn.addEventListener('click', () => {
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	numberSquares = 6;
	setupGame();
});

function genColor() {
	const a = Math.floor(Math.random() * 255);
	const b = Math.floor(Math.random() * 255);
	const c = Math.floor(Math.random() * 255);
	return `rgb(${a}, ${b}, ${c})`;
}

function setupGame() {
	h1.style.backgroundColor = "steelblue";
	reset.innerText = "New Colors";
	message.innerText = winningColor = "";
	possibleColors = [];
	for (let i = 0; i < numberSquares; i++) {
		possibleColors.push(genColor());
		squares[i].style.visibility = "visible";
		squares[i].style.backgroundColor = possibleColors[i];
		squares[i].addEventListener('click', () => performCheck(squares[i]));
	}
	winningColor = possibleColors[Math.floor(Math.random() * numberSquares)];
	display.innerText = winningColor;
}

function performCheck(square) {
	const chosenColor = square.style.backgroundColor;
	if (chosenColor == winningColor) {
		message.innerText = "Correct!";
		reset.innerText = "Play again?";
		h1.style.backgroundColor = winningColor;
		for (let i = 0; i < numberSquares; i++) {
			squares[i].style.visibility = "visible";
			squares[i].style.backgroundColor = winningColor;
		}
	}
	else {
		square.style.visibility = "hidden";
		message.innerText = "Try again";
	}
}

setupGame();
reset.addEventListener('click', () => setupGame());