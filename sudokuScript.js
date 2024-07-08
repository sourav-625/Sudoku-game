// Program to generate a random incomplete sudoku
function generateSudoku() {
    let sudoku = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
    fillSudoku(sudoku);
    removeNumbers(sudoku);
    return sudoku;
}
function fillSudoku(sudoku) {
    function canPlaceNumber(row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (sudoku[row][i] === num) return false;
        }
        for (let i = 0; i < 9; i++) {
            if (sudoku[i][col] === num) return false;
        }
        let sr = row - (row % 3);
        let sc = col - (col % 3);
        for (let i = sr; i < sr + 3; i++) {
            for (let j = sc; j < sc + 3; j++) {
                if (sudoku[i][j] === num) return false;
            }
        }
        return true;
    }
    function solveSudoku() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (sudoku[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (canPlaceNumber(row, col, num)) {
                            sudoku[row][col] = num;
                            if (solveSudoku()) {
                                return true;
                            }
                            sudoku[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    solveSudoku();
}
function removeNumbers(sudoku) {
    let remaining = 50;
    while (remaining > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (sudoku[row][col] !== 0) {
            sudoku[row][col] = 0;
            remaining--;
        }
    }
}

// Program to solve the sudoku
function safe(sudoku, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (sudoku[row][i] === num) return false;
    }
    for (let i = 0; i < 9; i++) {
        if (sudoku[i][col] === num) return false;
    } 
    let sr = row - (row % 3);
    let sc = col - (col % 3);
    for (let i = sr; i < sr + 3; i++) {
        for (let j = sc; j < sc + 3; j++) {
            if (sudoku[i][j] === num) return false;
        }
    }
    return true;
}
function sudokuSolver(sudoku, row, col, sols) {
    if (col === 9) {
        let solution = sudoku.map(row => [...row]);
        sols.push(solution);
        return;
    }
    if (row === 9) {
        sudokuSolver(sudoku, 0, col + 1, sols);
        return;
    }
    if (sudoku[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
            if (safe(sudoku, row, col, num)) {
                sudoku[row][col] = num;
                sudokuSolver(sudoku, row + 1, col, sols);
                sudoku[row][col] = 0;
            }
        }
    } else {
        sudokuSolver(sudoku, row + 1, col, sols);
    }
}

// Program to check if the solution given by user is correct or incomplete
function checkCorrect(sudoku) {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(sudoku[i][j] === 0) return false;
            return safe(sudoku, i, j, sudoku[i][j]);
        }
    }
}
