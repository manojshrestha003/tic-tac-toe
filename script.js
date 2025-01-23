const board = document.getElementById('board');
const winnerDisplay = document.getElementById('winner');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;
const cells = [];

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (!gameActive || cell.classList.contains('taken')) return;

  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin()) {
    gameActive = false;
    winnerDisplay.textContent = `${currentPlayer} Wins!`;
    return;
  }

  if (cells.every(cell => cell.classList.contains('taken'))) {
    gameActive = false;
    winnerDisplay.textContent = `It's a Draw!`;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winPatterns.some(pattern => {
    return pattern.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

restartButton.addEventListener('click', () => {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  gameActive = true;
  winnerDisplay.textContent = '';
});

createBoard();