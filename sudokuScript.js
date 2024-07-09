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

// Program to check if the sudoku is correct
function checkCorrect(sudokuGrid) {
    function isValidSet(set) {
        let seen = new Set();
        for (let num of set) {
            if(num === 0) {
                return false;
            } else {
                if (seen.has(num)) {
                    return false;
                }
                seen.add(num);
            }
        }
        return true;
    }
    function getRow(grid, row) {
        return grid[row];
    }
    function getColumn(grid, col) {
        let column = [];
        for (let i = 0; i < 9; i++) {
            column.push(grid[i][col]);
        }
        return column;
    }
    function getSubgrid(grid, startRow, startCol) {
        let subgrid = [];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                subgrid.push(grid[startRow + row][startCol + col]);
            }
        }
        return subgrid;
    }
    for (let row = 0; row < 9; row++) {
        if (!isValidSet(getRow(sudokuGrid, row))) {
            return false;
        }
    }
    for (let col = 0; col < 9; col++) {
        if (!isValidSet(getColumn(sudokuGrid, col))) {
            return false;
        }
    }
    for (let startRow = 0; startRow < 9; startRow += 3) {
        for (let startCol = 0; startCol < 9; startCol += 3) {
            if (!isValidSet(getSubgrid(sudokuGrid, startRow, startCol))) {
                return false;
            }
        }
    }
    return true;
}
