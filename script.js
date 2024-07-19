// script.js
document.addEventListener('DOMContentLoaded', function() {
    const sudokuContainer = document.getElementById('sudoku-container');
    const generateBtn = document.getElementById('generate-btn');
    const submitBtn = document.getElementById('submit-btn');
    const showSolutionBtn = document.getElementById('show-solution-btn');
    const newGameBtn = document.getElementById('new-game-btn');
    const resultDisplay = document.getElementById('result');
    const solutionsContainer = document.getElementById('solutions-container');

    let sudokuGrid = [];

    function generateSudokuGrid(sudoku) {
    sudokuContainer.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        let row = document.createElement('div');
        for (let j = 0; j < 9; j++) {
            let cell = document.createElement('div');
            cell.contentEditable = 'true';
            cell.className = 'cell';
            cell.style.border = '1px dotted red';
            if(i % 3 == 2) {
                cell.style.borderRight = '1px solid red';
            }
            if(j % 3 == 2) {
                cell.style.borderBottom = '1.5px solid red';
            }
            if (sudoku[i][j] != 0) {
                cell.textContent = sudoku[i][j];
                cell.contentEditable = 'false';
            }
            row.appendChild(cell);
        }
        sudokuContainer.appendChild(row);
    }
    const cellWidth = sudokuContainer.querySelector('.cell').offsetWidth;
    const cellHeight = sudokuContainer.querySelector('.cell').offsetHeight;
    const sudokuWidth = cellWidth * 9;
    const sudokuHeight = cellHeight * 9;
    sudokuContainer.style.width = sudokuWidth + 'px';
    sudokuContainer.style.height = sudokuHeight + 'px';
    const maxContainerWidth = window.innerWidth * 0.9;
    const maxContainerHeight = window.innerHeight * 0.8;
    sudokuContainer.style.maxWidth = Math.min(sudokuWidth, maxContainerWidth) + 'px';
    sudokuContainer.style.maxHeight = Math.min(sudokuHeight, maxContainerHeight) + 'px';
}

function transpose(grid) {
    return grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
}

function getSudokuGridFromUI() {
    let grid = [];
    let rows = sudokuContainer.querySelectorAll('.cell');
    let rowIndex = 0;
    let colIndex = 0;

    rows.forEach(cell => {
        if (colIndex === 0) {
            grid.push([]);
        }
        if (cell.textContent.trim() === '') {
            grid[rowIndex].push(0);
        } else {
            grid[rowIndex].push(parseInt(cell.textContent));
        }
        colIndex++;
        if (colIndex === 9) {
            colIndex = 0;
            rowIndex++;
        }
    });

    return grid;
}
    
function showSolution() {
    let solutions = [];
    sudokuSolver(sudokuGrid, 0, 0, solutions);

    solutionsContainer.innerHTML = '';

    solutions.forEach((solution, index) => {
        let transposedSolution = transpose(solution);

        let solutionDiv = document.createElement('div');
        solutionDiv.classList.add('sudoku-solution');
        solutionDiv.textContent = `Solution ${index + 1}:`;

        transposedSolution.forEach(row => {
            let rowDiv = document.createElement('div');
            rowDiv.textContent = row.join(' | ');
            rowDiv.style.border = '1px solid black';
            solutionDiv.appendChild(rowDiv);
        });

        solutionsContainer.appendChild(solutionDiv);
    });
}


    generateBtn.addEventListener('click', function() {
        sudokuGrid = generateSudoku();
        generateSudokuGrid(sudokuGrid);
        solutionsContainer.style.display = 'none';
        resultDisplay.textContent = '';
        showSolutionBtn.style.display = 'none';
        newGameBtn.style.display = 'none';
    });

    submitBtn.addEventListener('click', function() {
        sudokuGrid = transpose(getSudokuGridFromUI());
        if (checkCorrect(sudokuGrid)) {
            resultDisplay.textContent = 'Congratulations! Sudoku solved correctly!';
            showSolutionBtn.style.display = 'none';
            newGameBtn.style.display = 'block';
        } else {
            resultDisplay.textContent = 'Solution is incorrect. Click "Show Solution" to see correct answers.';
            showSolutionBtn.style.display = 'block';
            newGameBtn.style.display = 'none';
        }
    });

    showSolutionBtn.addEventListener('click', function() {
        solutionsContainer.style.display = 'inline-block';
        showSolution();
        showSolutionBtn.style.display = 'none';
        newGameBtn.style.display = 'block';
    });

    newGameBtn.addEventListener('click', function() {
        solutionsContainer.innerHTML = '';
        sudokuGrid = generateSudoku();
        generateSudokuGrid(sudokuGrid);
        resultDisplay.textContent = '';
        showSolutionBtn.style.display = 'none';
        newGameBtn.style.display = 'none';
        solutionsContainer.style.display = 'none';
    });
});
