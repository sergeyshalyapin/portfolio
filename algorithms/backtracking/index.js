/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const n = board.length;
    const m = board[0].length;

    // traversal through the path
    const traversal = (i, j, idx) => {
        if (idx == word.length) return true;
        if (i < 0 || j < 0 || i >= n || j >= m) return false;
        if (board[i][j] !== word[idx]) return false;

        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        for (let dir of directions) {
            const x = dir[0];
            const y = dir[1];

            const curLetter = board[i][j];
            board[i][j] = -1;
            if (traversal(i + x, j + y, idx + 1)) {
                return true;
            }
            board[i][j] = curLetter;
        }
        return false;
    }

    const boardDict = new Map();

    // create map of characters in board + count
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const curLetter = board[i][j];
            const letterInBoard = boardDict.get(curLetter);
            if (!!letterInBoard) {
                boardDict.set(curLetter, letterInBoard+1);
            } else {
                boardDict.set(curLetter, 1);
            }
        }
    }

    // check if number of letters in word fits board
    for (let i = 0; i < word.length; i++) {
        const curLetter = word[i];
        const letterInWord = boardDict.get(curLetter);

        if (letterInWord && letterInWord > 0) {
            boardDict.set(curLetter, letterInWord - 1);
        } else {
            return false;
        }
    }

    // traversal
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (traversal(i, j, 0)) {
                return true
            }
        }
    }

    return false;
};

const board1 = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
const word1 = "ABCCED";

const board2 = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
const word2 = "SEE";

const board3 = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
const word3 = "ABCB";