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
    for(let i = 0; i < 9; i++) {
        let row = document.createElement('div');
        for(let j = 0; j < 9; j++) {
            let cell = document.createElement('div');
            cell.contentEditable = 'true';
            cell.className = 'cell';
            cell.style.border = '0.5px dotted red';
            if(i % 3 == 2) {
                cell.style.borderRight = '2px solid red';
            }
            if(j % 3 == 2) {
                cell.style.borderBottom = '2px solid red';
            }
            if(sudoku[i][j] != 0) {
                cell.textContent = sudoku[i][j];
                cell.contentEditable = 'false';
            }
            row.appendChild(cell);
        }
        sudokuContainer.appendChild(row);
    }
    const cellWidth = sudokuContainer.querySelector('.cell').offsetHeight;
    const cellHeight = sudokuContainer.querySelector('.cell').offsetHeight;
    const sudokuWidth = cellWidth * 9;
    const sudokuHeight = cellHeight * 9;
    sudokuContainer.style.width = sudokuWidth + 'px';
    sudokuContainer.style.height = sudokuHeight + 'px';
    const maxContainerWidth = window.innerWidth * 0.9;
    const maxContainerHeight = window.innerHeight * 0.9;
    sudokuContainer.style.maxWidth = Math.min(sudokuWidth, maxContainerWidth) + 'px';
    sudokuContainer.style.maxHeight = Math.min(sudokuHeight, maxContainerHeight) + 'px';
    window.addEventListener('resize', sudokuContainer);
}

function getSudokuGridFromUI() {
    let grid = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
    let cells = sudokuContainer.querySelectorAll('.cell');
    
    for(let i = 0; i < 9; i++) {
        let cnt = i;
        for(let j = 0; j < 9; j++) {
            if(cells[cnt].textContent.trim() === '') {
                grid[i][j] = 0;
            } else {
                grid[i][j] = parseInt(cells[cnt].textContent.trim());
            }
            console.log(grid[i][j]);
            cnt = cnt + 9;
        }
        console.log();
    }

    return grid;
}
    
function showSolution() {
    let solutions = [];
    sudokuSolver(sudokuGrid, 0, 0, solutions);

    solutionsContainer.innerHTML = '';

    solutions.forEach((solution, index) => {
        let solutionDiv = document.createElement('div');
        solutionDiv.classList.add('sudoku-solution');
        solutionDiv.textContent = `Solution ${index + 1}:`;

        solution.forEach(row => {
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
        sudokuGrid = getSudokuGridFromUI();
        if(checkCorrect(sudokuGrid)) {
            resultDisplay.textContent = 'Congratulations! Sudoku solved correctly!';
            showSolutionBtn.style.display = 'none';
            newGameBtn.style.display = 'block';
        } else {
            resultDisplay.textContent = 'Solution is incorrect. Click "Show Solution" to see correct answers.';
            showSolutionBtn.style.display = 'block';
            showSolutionBtn.style.margin = '0 auto';
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
        resultDisplay.textContent = '';
        showSolutionBtn.style.display = 'none';
        newGameBtn.style.display = 'none';
        solutionsContainer.style.display = 'none';
        sudokuGrid = generateSudoku();
        generateSudokuGrid(sudokuGrid);
    });
});
