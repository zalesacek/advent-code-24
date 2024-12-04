import { getInput } from '../utils';

const getGrid = (lines: string[]): string[][] => {
    const grid = [];
    for (const line of lines) {
        grid.push(line.split(''));
    }
    return grid;
}

const isValidMatch = (value: string): boolean => value === 'MAS' || value === 'SAM';

const checkTopLeftBottomRight = (grid: string[][], x: number, y: number): boolean => {
    if (!grid[x-1] || !grid[x+1] || !grid[x-1][y-1] || !grid[x+1][y+1]) return false;

    const candidate = `${grid[x-1][y-1]}A${grid[x+1][y+1]}`;
    if (isValidMatch(candidate)) return true;
    return false;
}

const checkTopRightBottomLeft = (grid: string[][], x: number, y: number): boolean => {
    if (!grid[x-1] || !grid[x+1] || !grid[x-1][y+1] || !grid[x+1][y-1]) return false;

    const candidate = `${grid[x-1][y+1]}A${grid[x+1][y-1]}`;
    if (isValidMatch(candidate)) return true;
    return false;
}

const checkAllDirections = (grid: string[][], x: number, y: number): number => {
    let sum = 0;

    const hasTopLeftBottomRight = checkTopLeftBottomRight(grid, x, y);
    const hasTopRightBottomLeft = checkTopRightBottomLeft(grid, x, y);

    if (hasTopLeftBottomRight && hasTopRightBottomLeft) {
        sum++;
    }

    return sum;
}

async function main() {
    const lines = getInput('input.txt');
    const grid = getGrid(lines);

    let sum = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 'A') {
                sum += checkAllDirections(grid, i, j);
            }
        }
    }

    console.log(sum)
}

void main();