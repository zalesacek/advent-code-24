import { getInput } from '../utils';

const getGrid = (lines: string[]): string[][] => {
    const grid = [];
    for (const line of lines) {
        grid.push(line.split(''));
    }
    return grid;
}

const checkLeft = (grid: string[][], x: number, y: number): number => {
    const line = grid[x];
    const candidate = line.slice(y-3, y).join('');
    if (candidate === 'SAM') return 1;
    return 0;
}

const checkTopLeft = (grid: string[][], x: number, y: number): number => {
    if (x < 3 || y < 3) return 0;
    const candidate = `${grid[x-3][y-3]}${grid[x-2][y-2]}${grid[x-1][y-1]}`;
    if (candidate === 'SAM') return 1;
    return 0;
}

const checkRight = (grid: string[][], x: number, y: number): number => {
    const line = grid[x];
    const candidate = line.slice(y+1, y+4).join('');
    if (candidate === 'MAS') return 1;
    return 0;
}

const checkTopRight = (grid: string[][], x: number, y: number): number => {
    if (x < 3 || y > grid[0].length - 3) return 0;
    const candidate = `${grid[x-1][y+1]}${grid[x-2][y+2]}${grid[x-3][y+3]}`;
    if (candidate === 'MAS') return 1;
    return 0;
}

const checkTop = (grid: string[][], x: number, y: number): number => {
    if (x < 3) return 0;
    const candidate = `${grid[x-3][y]}${grid[x-2][y]}${grid[x-1][y]}`;
    if (candidate === 'SAM') return 1;
    return 0;
}

const checkBottom = (grid: string[][], x: number, y: number): number => {
    if (x > grid.length - 4) return 0;
    const candidate = `${grid[x+1][y]}${grid[x+2][y]}${grid[x+3][y]}`;
    if (candidate === 'MAS') return 1;
    return 0;
}

const checkBottomLeft = (grid: string[][], x: number, y: number): number => {
    if (x > grid.length - 4 || y < 3) return 0;
    const candidate = `${grid[x+1][y-1]}${grid[x+2][y-2]}${grid[x+3][y-3]}`;
    if (candidate === 'MAS') return 1;
    return 0;
}

const checkBottomRight = (grid: string[][], x: number, y: number): number => {
    if (x > grid.length - 4 || y > grid[0].length - 4) return 0;
    const candidate = `${grid[x+1][y+1]}${grid[x+2][y+2]}${grid[x+3][y+3]}`;
    if (candidate === 'MAS') return 1;
    return 0;
}

const checkAllDirections = (grid: string[][], x: number, y: number): number => {
    let sum = 0;

    sum += checkLeft(grid, x, y);
    sum += checkRight(grid, x, y);
    sum += checkTop(grid, x, y);
    sum += checkBottom(grid, x, y);
    sum += checkTopLeft(grid, x, y);
    sum += checkTopRight(grid, x, y);
    sum += checkBottomLeft(grid, x, y);
    sum += checkBottomRight(grid, x, y);

    return sum;
}

async function main() {
    const lines = getInput('input.txt');
    const grid = getGrid(lines);

    let sum = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 'X') {
                sum += checkAllDirections(grid, i, j);
            }
        }
    }

    console.log(sum)
}

void main();