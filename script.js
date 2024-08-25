let gameBoard = [];
let currentPlayer = 'X';
let gameOver = false;
let player1 = 'Player 1';
let player2 = 'Player 2';

// Initialize game board
for (let i = 0; i < 9; i++) {
    gameBoard.push('');
    document.getElementById(`cell-${i}`).addEventListener('click', handleCellClick);
}

// Handle cell click
function handleCellClick(event) {
    if (gameOver) return;
    const cellIndex = event.target.id.split('-')[1];
    if (gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = currentPlayer;
        updateCell(cellIndex, currentPlayer);
        checkGameStatus();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updatePlayerTurn();
    }
}

// Update cell with current player's mark
function updateCell(cellIndex, player) {
    document.getElementById(`cell-${cellIndex}`).classList.add(player.toLowerCase());
    document.getElementById(`cell-${cellIndex}`).innerText = player;
    playSound('click');
}

// Check game status
function checkGameStatus() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (gameBoard[combination[0]] === gameBoard[combination[1]] &&
            gameBoard[combination[1]] === gameBoard[combination[2]] &&
            gameBoard[combination[0]] !== '') {
            gameOver = true;
            document.getElementById('game-status').innerText = `${getPlayerName(gameBoard[combination[0]])} wins!`;
            animateWin(combination);
            playSound('win');
            break;
        }
    }

    if (!gameOver && gameBoard.every(cell => cell !== '')) {
        gameOver = true;
        document.getElementById('game-status').innerText = 'It\'s a draw!';
        playSound('draw');
    }
}

// Get player name
function getPlayerName(player) {
    return player === 'X' ? player1 : player2;
}

// Update player turn
function updatePlayerTurn() {
    document.getElementById('player-turn').innerText = `Turn: ${getPlayerName(currentPlayer)}`;
}

// Reset game
document.getElementById('reset-button').addEventListener('click', resetGame);

function resetGame() {
    gameBoard = [];
    currentPlayer = 'X';
    gameOver = false;
    document.getElementById('game-status').innerText = 'Game in progress...';
    updatePlayerTurn();
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).classList.remove('x', 'o');
        document.getElementById(`cell-${i}`).innerText = '';
        gameBoard.push('');
    }
}

// Initialize player names
document.getElementById('player1-name').addEventListener('input', (event) => {
    player1 = event.target.value;
    updatePlayerTurn();
});

document.getElementById('player2-name').addEventListener('input', (event) => {
    player2 = event.target.value;
    updatePlayerTurn();
});

// Initialize player turn
updatePlayerTurn();

// Play sound effects
function playSound(sound) {
    if (sound === 'win') {
        const audio = new Audio('3.mp3');
        audio.play();
    } else if (sound === 'click') {
        const audio = new Audio('1.wav');
        audio.play();
    } else if (sound === 'draw') {
        const audio = new Audio('2.mp3');
        audio.play();
    }
}

// Animate win
function animateWin(combination) {
    combination.forEach((cellIndex) => {
        document.getElementById(`cell-${cellIndex}`).classList.add('win');
    });
    setTimeout(() => {
        combination.forEach((cellIndex) => {
            document.getElementById(`cell-${cellIndex}`).classList.remove('win');
        });
    }, 2000);
}

