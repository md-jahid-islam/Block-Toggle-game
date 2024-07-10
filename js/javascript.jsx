document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.querySelector('.board');
    const resetButton = document.getElementById('resetButton');
    const levelButtons = document.querySelectorAll('.level-select button');
    let currentLevel = 1;
    let playerPosition = { x: 0, y: 0 };
    let gameBoard = [];

    const levels = {
        1: [
            ['P', '', '', 'T'],
            ['', 'X', 'X', ''],
            ['T', '', '', ''],
            ['', '', '', '']
        ],
        2: [
            ['P', 'X', '', 'T'],
            ['', '', 'X', ''],
            ['T', 'X', '', ''],
            ['', '', '', '']
        ],
        3: [
            ['P', '', 'X', 'T'],
            ['X', '', '', ''],
            ['T', '', 'X', ''],
            ['', '', '', '']
        ],
        4: [
            ['P', '', '', 'T'],
            ['', 'X', 'T', ''],
            ['T', '', 'X', ''],
            ['X', '', '', '']
        ]
    };

    function loadLevel(level) {
        currentLevel = level;
        gameBoard = levels[level].map(row => row.slice());
        renderBoard();
    }

    function renderBoard() {
        boardElement.innerHTML = '';
        boardElement.style.gridTemplateColumns = `repeat(${gameBoard[0].length}, 50px)`;
        gameBoard.forEach((row, y) => {
            row.forEach((cell, x) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                if (cell === 'P') {
                    cellElement.classList.add('player');
                    playerPosition = { x, y };
                } else if (cell === 'T') {
                    cellElement.classList.add('toggle');
                } else if (cell === 'X') {
                    cellElement.style.backgroundColor = '#000';
                }
                boardElement.appendChild(cellElement);
            });
        });
    }

    function movePlayer(dx, dy) {
        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;
        if (newX >= 0 && newX < gameBoard[0].length && newY >= 0 && newY < gameBoard.length) {
            const targetCell = gameBoard[newY][newX];
            if (targetCell !== 'X') {
                gameBoard[playerPosition.y][playerPosition.x] = '';
                gameBoard[newY][newX] = 'P';
                playerPosition = { x: newX, y: newY };
                renderBoard();
            }
        }
    }

    function toggleBlocks() {
        gameBoard = gameBoard.map(row => row.map(cell => (cell === 'T' ? '' : cell === '' ? 'T' : cell)));
        renderBoard();
    }

    document.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
                movePlayer(0, -1);
                break;
            case 'ArrowDown':
                movePlayer(0, 1);
                break;
            case 'ArrowLeft':
                movePlayer(-1, 0);
                break;
            case 'ArrowRight':
                movePlayer(1, 0);
                break;
            case ' ':
                toggleBlocks();
                break;
        }
    });

    resetButton.addEventListener('click', () => loadLevel(currentLevel));

    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            loadLevel(button.getAttribute('data-level'));
        });
    });

    loadLevel(1);
});
