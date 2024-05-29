import {
    Player,
    getWinningIndices,
    generateBlankBoard,
    makeMove,
} from '../src/libs';
import {describe, test} from '@jest/globals';

describe('library functions', () => {
    test('generating a blank board', () => {
        // generate a board
        const board = generateBlankBoard();
        expect(board.length).toBe(6 * 7);

        // values initialized
        for (let i = 0; i < board.length; i++) {
            expect(board[i]).toBe(Player.Neither);
        }
    });

    test('insertion in place works correctly', () => {
        const board = generateBlankBoard();
        for (let i = 0; i < board.length; i += 7) {
            makeMove(Player.One, 0, board);
        }

        for (let i = 0; i < board.length; i += 7) {
            expect(board[i]).toBe(Player.One);
        }

        expect(makeMove(Player.One, 0, board)).toBe(false);
        expect(makeMove(Player.One, -1, board)).toBe(false);
        expect(makeMove(Player.One, 8, board)).toBe(false);
    });

    test('insertion works correctly', () => {
        const board = generateBlankBoard();
        for (let i = 0; i < 7; i++) {
            makeMove(Player.Two, i, board);
        }

        for (let i = 35; i < 41; i++) {
            expect(board[i]).toBe(Player.Two);
        }

        expect(makeMove(Player.Two, -1, board)).toBe(false);
        expect(makeMove(Player.Two, 8, board)).toBe(false);
    });

    test('can know if player wins vertically', () => {
        const board = generateBlankBoard();
        for (let i = 0; i < 4; i++) {
            makeMove(Player.One, 0, board);
        }

        expect(getWinningIndices(board, Player.One)?.length).toBe(4);
        expect(getWinningIndices(board, Player.Two)).toBeNull();

        for (let i = 0; i < 3; i++) {
            makeMove(Player.Two, 4, board);
        }
        expect(getWinningIndices(board, Player.Two)).toBeNull();

        makeMove(Player.Two, 4, board);
        expect(getWinningIndices(board, Player.Two)?.length).toBe(4);
    });

    test('can know if player wins horizontally', () => {
        const board = generateBlankBoard();
        for (let i = 3; i < 7; i++) {
            makeMove(Player.Two, i, board);
        }

        expect(getWinningIndices(board, Player.Two)?.length).toBe(4);
        expect(getWinningIndices(board, Player.One)).toBeNull();

        makeMove(Player.Two, 3, board);
        makeMove(Player.One, 4, board);
        makeMove(Player.Two, 5, board);
        makeMove(Player.One, 6, board);

        expect(getWinningIndices(board, Player.Two)?.length).toBe(4);
        expect(getWinningIndices(board, Player.One)).toBeNull();

        for (let i = 3; i < 6; i++) {
            makeMove(Player.One, i, board);
        }
        expect(getWinningIndices(board, Player.One)).toBeNull();

        makeMove(Player.One, 6, board);
        expect(getWinningIndices(board, Player.One)?.length).toBe(4);
    });

    test('can know if player wind diagonally', () => {
        const board = generateBlankBoard();

        for (let j = 3; j >= 0; j--) {
            for (let i = 0; i < j; i++) {
                makeMove(Player.One, j, board);
            }
            makeMove(Player.Two, j, board);
        }

        expect(getWinningIndices(board, Player.Two)?.length).toBe(4);
        expect(getWinningIndices(board, Player.One)).toBeNull();
    });
});
