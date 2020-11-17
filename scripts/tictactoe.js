let playerTurn = true;
let computerMoveTimeout = 0;
const blank = "&nbsp;";

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
	// Setup the click event for the "New game" button
	let newBtn = document.getElementById("newGameButton");
	newBtn.addEventListener("click", newGame);

	// Create click-event listeners for each cell in the game board
	let cells = getGameBoard();
	for (let cell of cells) {
		cell.addEventListener("click", function () { cellClicked(cell); });
	}

	// Call newGame() to make sure the board is clear
	newGame();
}

// Returns an array of 9 <td> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoard() {
	let gameBoardTable = document.getElementById("gameBoard");
	let result = [];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			result.push(gameBoardTable.rows[i].cells[j]);
		}
	}
	return result;
}

function newGame() {
	clearTimeout(computerMoveTimeout);
	let gameBoardTable = document.getElementById("gameBoard");
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			gameBoardTable.rows[i].cells[j].innerHTML = blank;
		}
	}
	playerTurn = true;
	document.getElementById("turnInfo").innerHTML = "Your turn";
}

function cellClicked(cell) {
	if (playerTurn)
	{
		if (cell.innerHTML == blank)
		{
			cell.innerHTML = 'X';
			cell.style.color = "red";
			switchTurn();
		}
	}
}

function switchTurn() {
	if (checkForWin())
		return;
	if (playerTurn)
	{
		playerTurn = false;
		computerMoveTimeout = setTimeout(makeComputerMove, 1000);
		document.getElementById("turnInfo").innerHTML = "Computer's turn";
	}
	else
	{
		playerTurn = true;
		document.getElementById("turnInfo").innerHTML = "Your turn";
	}
}

function makeComputerMove() {
	let gameBoardTable = document.getElementById("gameBoard");
	let notDone = true;
	while (notDone)
	{
		let randRow = Math.floor(Math.random() * 3); 
		let randCol = Math.floor(Math.random() * 3); 
		if (gameBoardTable.rows[randRow].cells[randCol].innerHTML == blank)
		{
			notDone = false;
			gameBoardTable.rows[randRow].cells[randCol].innerHTML = 'O';
			gameBoardTable.rows[randRow].cells[randCol].style.color = "blue";
		}
	}
	switchTurn();
}

function checkForWin()
{
	let gameBoardTable = document.getElementById("gameBoard");
	if ((gameBoardTable.rows[0].cells[0].innerHTML == 'X' && gameBoardTable.rows[0].cells[1].innerHTML == 'X' && gameBoardTable.rows[0].cells[2].innerHTML == 'X') ||
		(gameBoardTable.rows[1].cells[0].innerHTML == 'X' && gameBoardTable.rows[1].cells[1].innerHTML == 'X' && gameBoardTable.rows[1].cells[2].innerHTML == 'X') ||
		(gameBoardTable.rows[2].cells[0].innerHTML == 'X' && gameBoardTable.rows[2].cells[1].innerHTML == 'X' && gameBoardTable.rows[2].cells[2].innerHTML == 'X') ||
		(gameBoardTable.rows[0].cells[0].innerHTML == 'X' && gameBoardTable.rows[1].cells[0].innerHTML == 'X' && gameBoardTable.rows[2].cells[0].innerHTML == 'X') ||
		(gameBoardTable.rows[0].cells[1].innerHTML == 'X' && gameBoardTable.rows[1].cells[1].innerHTML == 'X' && gameBoardTable.rows[2].cells[1].innerHTML == 'X') ||
		(gameBoardTable.rows[0].cells[2].innerHTML == 'X' && gameBoardTable.rows[1].cells[2].innerHTML == 'X' && gameBoardTable.rows[2].cells[2].innerHTML == 'X') ||
		(gameBoardTable.rows[0].cells[0].innerHTML == 'X' && gameBoardTable.rows[1].cells[1].innerHTML == 'X' && gameBoardTable.rows[2].cells[2].innerHTML == 'X') ||
		(gameBoardTable.rows[2].cells[0].innerHTML == 'X' && gameBoardTable.rows[1].cells[1].innerHTML == 'X' && gameBoardTable.rows[0].cells[2].innerHTML == 'X'))
	{
		document.getElementById("turnInfo").innerHTML = "You win!";
		playerTurn = false;
		return true;
	}
	else if ((gameBoardTable.rows[0].cells[0].innerHTML == 'O' && gameBoardTable.rows[0].cells[1].innerHTML == 'O' && gameBoardTable.rows[0].cells[2].innerHTML == 'O') ||
		(gameBoardTable.rows[1].cells[0].innerHTML == 'O' && gameBoardTable.rows[1].cells[1].innerHTML == 'O' && gameBoardTable.rows[1].cells[2].innerHTML == 'O') ||
		(gameBoardTable.rows[2].cells[0].innerHTML == 'O' && gameBoardTable.rows[2].cells[1].innerHTML == 'O' && gameBoardTable.rows[2].cells[2].innerHTML == 'O') ||
		(gameBoardTable.rows[0].cells[0].innerHTML == 'O' && gameBoardTable.rows[1].cells[0].innerHTML == 'O' && gameBoardTable.rows[2].cells[0].innerHTML == 'O') ||
		(gameBoardTable.rows[0].cells[1].innerHTML == 'O' && gameBoardTable.rows[1].cells[1].innerHTML == 'O' && gameBoardTable.rows[2].cells[1].innerHTML == 'O') ||
		(gameBoardTable.rows[0].cells[2].innerHTML == 'O' && gameBoardTable.rows[1].cells[2].innerHTML == 'O' && gameBoardTable.rows[2].cells[2].innerHTML == 'O') ||
		(gameBoardTable.rows[0].cells[0].innerHTML == 'O' && gameBoardTable.rows[1].cells[1].innerHTML == 'O' && gameBoardTable.rows[2].cells[2].innerHTML == 'O') ||
		(gameBoardTable.rows[2].cells[0].innerHTML == 'O' && gameBoardTable.rows[1].cells[1].innerHTML == 'O' && gameBoardTable.rows[0].cells[2].innerHTML == 'O'))
	{
		document.getElementById("turnInfo").innerHTML = "Computer wins!";
		playerTurn = false;
		return true;
	}
	else if (gameBoardTable.rows[0].cells[0].innerHTML != blank && gameBoardTable.rows[0].cells[1].innerHTML != blank && gameBoardTable.rows[0].cells[2].innerHTML != blank &&
			 gameBoardTable.rows[1].cells[0].innerHTML != blank && gameBoardTable.rows[1].cells[1].innerHTML != blank && gameBoardTable.rows[1].cells[2].innerHTML != blank &&
			 gameBoardTable.rows[2].cells[0].innerHTML != blank && gameBoardTable.rows[2].cells[1].innerHTML != blank && gameBoardTable.rows[2].cells[2].innerHTML != blank)
	{
		document.getElementById("turnInfo").innerHTML = "Draw game";
		playerTurn = false;
		return true;	
	}
}

