class Sudoku {

/**
 * Creates an instace of Sudoku 
 * @param {Array} matrix  A 2D array that initializes the grid of the Sudoku
 */
    constructor(matrix) {
        this.grid = matrix;
    }

/**
 * Inputs a number in the specified x, y location in this.grid
 * @param {number} x  X location where num should be placed
 * @param {number} y  Y location where num should be placed
 * @param {number} num  Number between 1-9 that should be inputted in the 
            appropriate x, y location in this.grid
 */
    inputNum(x, y, num) {
        this.grid[x][y] = num;
    }

/**
 * Creates three separate lists of all numbers in a given row, column, and box
 * @param {number} x  X location that should be checked
 * @param {number} y  Y location that should be checked
 * @return {Array}  Three elements in the array that correspond to the
            row list, column list, and box list
 */
    createRCBLists(x, y) {
        // "listR" contains all the numbers in a given row "x"
        var listR = this.grid[x];

        // "listC" contains all the numbers in a given column "y"
        var listC = [];
        for (let i = 0; i < 9; i++) {
            listC.push(this.grid[i][y])
        }

        // "listB" contains all the numbers in a given cell's box
        var listB = [];
        var listMR = [];
        var listMC = [];
        var modR = (x + 1) % 3;
        var modC = (y + 1) % 3;
        if (modR == 0) {
            var listMR = [x, x - 1, x - 2];
        }
        else if (modR == 1) {
            listMR = [x, x + 1, x + 2];
        }
        else {
            listMR = [x - 1, x, x + 1];
        }

        if (modC == 0) {
            listMC = [y, y - 1, y - 2];
        }

        else if (modC == 1) {
            listMC = [y, y + 1, y + 2];
        }
        else {
            listMC = [y - 1, y, y + 1];
        }
        for (let i = 0; i < listMR.length; i++) {
            for (let j = 0; j < listMC.length; j++) {
                listB.push(this.grid[listMR[i]][listMC[j]]);
            }
        }

        return [listR, listC, listB];
    }

/**
 * Checks if a single number is valid in a given row, column, or box
 * @param {number} x  X location that should be checked
 * @param {number} y  Y location that should be checked
 * @param {number} num  Number between 1-9 that should be inputted in the 
            appropriate x, y location in this.grid
 * @return {boolean}  true if the number is valid in the given location
 */
    checkNum(x, y, num) {
        if (this.grid[x][y] != 0) {
            return false;
        }

        var lists = this.createRCBLists(x, y);
        var listR = lists[0];
        var listC = lists[1];
        var listB = lists[2];

        // Checks if num is in any of the lists created
        if (listR.includes(num)) {
            return false;
        }
        else if (listC.includes(num)) {
            return false;
        }
        else if (listB.includes(num)) {
            return false;
        }
        else {
            return true;
        }

    }

/**
 * Ensures that the inputted sudoku is valid
 * @return {boolean}  True if the inputted sudoku is valid; false otherwise
 */
    validate() {

        // Loops through all 81 positions in "grid" using a nested for loop
        for (x = 0; x < 9; x++) {
            for (y = 0; y < 9; y++) {

                // Creates arrays that contain all numbers in a given row, column, and box
                var lists = this.createRCBLists(x, y);
                var listR = lists[0];
                var listC = lists[1];
                var listB = lists[2];

                // Obtains the number in a specific cell
                var num = this.grid[x][y];

                // Resets the counts of each list to 0
                var countR = 0;
                var countC = 0;
                var countB = 0;

                // Loops through lists "listR", "listC", and "listB"; counts how many times num appears in each list
                for (i = 0; i < listR.length; i++) {
                    if (num == listR[i] && listR[i] != 0) {
                        countR += 1;
                    }
                }
                for (i = 0; i < listC.length; i++) {
                    if (num == listC[i] && listC[i] != 0) {
                        countC += 1;
                    }
                }
                for (i = 0; i < listB.length; i++) {
                    if (num == listB[i] && listB[i] != 0) {
                        countB += 1;
                    }
                }

                // If any count is greater than 1, the sudoku is invalid
                if (countR > 1 || countC > 1 || countB > 1) {
                    return false;
                }
            }
        }
        
        return true;
    }

/**
 * Helper method for solve(). Finds a location in self.grid that is 0, which represents an empty location
 * @return {Array}  the empty location in the grid. x and y are used to find a specific location in a 2D array
 */
    locateEmpty() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (this.grid[x][y] == 0) {
                    return [x, y];
                }
            }
        }
    }

 /**
 * Recursive function that solves a given grid with a backtracking algorithm
    
    Loops through all possible numbers in a certain cell. If the number is 
    valid (no conflicts in the row, column, or box), it will input the 
    number and continue. If at some point, a cell can not hold any valid 
    numbers, the algorithm will input a different number in an empty cell.

 * @return {boolean}  true if the solve is valid, false otherwise
 */   
    solve() {
        let emptyLoc = this.locateEmpty();

        // If there are no empty locations in the grid, the Sudoku is solved
        if (!emptyLoc) {
            return true;
        }
        else {
            var x = emptyLoc[0];
            var y = emptyLoc[1];
        }

        // Inputs numbers in all grid locations such that every number is valid and there are no empty locations
        for (let i = 1; i < 10; i++) {
            if (this.checkNum(x, y, i)) {
                this.inputNum(x, y, i);

                if (this.solve()) {
                    return true;
                }

                this.inputNum(x, y, 0);
            }
        }

        return false;
    }

/**
 * Returns the grid that contains all numbers in the Sudoku
 * @return {Array}  2D array of numbers
 */
    returnArray() {
        return this.grid;
    }
}

export default Sudoku;