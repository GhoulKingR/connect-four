export enum Player {
    One,
    Two,
    Neither,
    CPU,
}
export function generateBlankBoard(): Player[] {
    const board: Player[] = [];
    for (let i = 0; i < 6; i++)
        for (let j = 0; j < 7; j++) board.push(Player.Neither);
    return board;
}

export function makeMove(
    player: Player,
    column: number,
    board: Player[],
): boolean {
    if (column >= 0 && column < 7) {
        let lowestFree = column;

        if (board[lowestFree] !== Player.Neither) return false;
        while (board[lowestFree + 7] === Player.Neither) lowestFree += 7;

        board[lowestFree] = player;
        return true;
    }
    return false;
}

export function getWinningIndices(
    board: Player[],
    player: Player,
): number[] | null {
    const rows = 6;
    const cols = 7;

    // Helper function to get the value at a specific row and column
    function getCell(row: number, col: number): Player {
        return board[row * cols + col];
    }

    // Check horizontal
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col <= cols - 4; col++) {
            if (
                getCell(row, col) === player &&
                getCell(row, col + 1) === player &&
                getCell(row, col + 2) === player &&
                getCell(row, col + 3) === player
            ) {
                return [
                    row * cols + col,
                    row * cols + col + 1,
                    row * cols + col + 2,
                    row * cols + col + 3,
                ];
            }
        }
    }

    // Check vertical
    for (let row = 0; row <= rows - 4; row++) {
        for (let col = 0; col < cols; col++) {
            if (
                getCell(row, col) === player &&
                getCell(row + 1, col) === player &&
                getCell(row + 2, col) === player &&
                getCell(row + 3, col) === player
            ) {
                return [
                    row * cols + col,
                    (row + 1) * cols + col,
                    (row + 2) * cols + col,
                    (row + 3) * cols + col,
                ];
            }
        }
    }

    // Check diagonal (bottom-left to top-right)
    for (let row = 0; row <= rows - 4; row++) {
        for (let col = 0; col <= cols - 4; col++) {
            if (
                getCell(row, col) === player &&
                getCell(row + 1, col + 1) === player &&
                getCell(row + 2, col + 2) === player &&
                getCell(row + 3, col + 3) === player
            ) {
                return [
                    row * cols + col,
                    (row + 1) * cols + col + 1,
                    (row + 2) * cols + col + 2,
                    (row + 3) * cols + col + 3,
                ];
            }
        }
    }

    // Check diagonal (top-left to bottom-right)
    for (let row = 3; row < rows; row++) {
        for (let col = 0; col <= cols - 4; col++) {
            if (
                getCell(row, col) === player &&
                getCell(row - 1, col + 1) === player &&
                getCell(row - 2, col + 2) === player &&
                getCell(row - 3, col + 3) === player
            ) {
                return [
                    row * cols + col,
                    (row - 1) * cols + col + 1,
                    (row - 2) * cols + col + 2,
                    (row - 3) * cols + col + 3,
                ];
            }
        }
    }

    return null;
}

export function getCPUMove(board: Player[], player: Player): number {
    const rows = 6;
    const cols = 7;
    const opponent = player === Player.CPU ? Player.One : Player.CPU;

    // Helper function to get the value at a specific row and column
    function getCell(row: number, col: number): Player {
        return board[row * cols + col];
    }

    // Helper function to set the value at a specific row and column
    function setCell(row: number, col: number, value: Player): void {
        board[row * cols + col] = value;
    }

    // Helper function to check if a column is full
    function isColumnFull(col: number): boolean {
        return getCell(0, col) !== Player.Neither;
    }

    // Helper function to get the next available row in a column
    function getNextAvailableRow(col: number): number | null {
        for (let row = rows - 1; row >= 0; row--) {
            if (getCell(row, col) === Player.Neither) {
                return row;
            }
        }
        return null;
    }

    // Check if a move leads to a win
    function isWinningMove(
        row: number,
        col: number,
        currentPlayer: Player,
    ): boolean {
        setCell(row, col, currentPlayer);
        const winningIndices = getWinningIndices(board, currentPlayer);
        setCell(row, col, Player.Neither); // Reset cell
        return winningIndices !== null;
    }

    // First, check if the AI can win in the next move
    for (let col = 0; col < cols; col++) {
        if (!isColumnFull(col)) {
            const row = getNextAvailableRow(col);
            if (row !== null && isWinningMove(row, col, player)) {
                return col;
            }
        }
    }

    // Second, check if the opponent can win in the next move and block it
    for (let col = 0; col < cols; col++) {
        if (!isColumnFull(col)) {
            const row = getNextAvailableRow(col);
            if (row !== null && isWinningMove(row, col, opponent)) {
                return col;
            }
        }
    }

    // Otherwise, pick a column that is not full and has a strategic advantage (e.g., center columns)
    const preferredColumns = [3, 2, 4, 1, 5, 0, 6];
    for (let col of preferredColumns) {
        if (!isColumnFull(col)) {
            return col;
        }
    }

    // Fallback in case all preferred columns are full
    for (let col = 0; col < cols; col++) {
        if (!isColumnFull(col)) {
            return col;
        }
    }

    throw new Error('Board is full, no moves available');
}
