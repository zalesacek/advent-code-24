import { getInput } from '../utils';

const guardChars = new Set(['^', '>', 'v', '<']);

type Direction = 'top' | 'right' | 'bottom' | 'left';

const directionsMap: Record<Direction, [number, number, Direction]> = {
    top: [0, -1, 'right'],
    right: [1, 0, 'bottom'],
    bottom: [0, 1, 'left'],
    left: [-1, 0, 'top'],
};

const getGuardDirection = (guard: string): Direction => {
    if (guard === '^') return 'top';
    if (guard === '>') return 'right';
    if (guard === 'v') return 'bottom';
    return 'left';
}

const getGridFromPuzzle = (puzzle: string[]): { 
    grid: string[][], 
    startPosition: [number, number], 
    direction: Direction,
} => {
    const grid = [];
    let startPosition = [];
    for (let y = 0; y < puzzle.length; y++) {
        const lineAsArray = puzzle[y].split('');
        grid.push(lineAsArray);
        if (startPosition.length > 0) continue;

        for (let x = 0; x < lineAsArray.length; x++) {
            const char = lineAsArray[x];
            if (guardChars.has(char)) {
                startPosition.push(x, y);
            }
        }
    }

    return { 
        grid,
        startPosition: startPosition as [number, number],
        direction: getGuardDirection(grid[startPosition[1]][startPosition[0]]),
    };
}

const moveGuardOutOfGrid = (
    grid: string[][],
    startPosition: [number, number],
    direction: Direction,
    visited: Map<string, boolean>
): boolean => {
    let [x, y] = startPosition;
    let currentDirection = direction;

    while (true) {
        if (x < 0 || y < 0 || y >= grid.length || x >= grid[0].length) return false;

        const key = `${x}-${y}-${currentDirection}`;
        if (visited.has(key)) return true;
        visited.set(key, true);

        const [dx, dy, nextDirection] = directionsMap[currentDirection];
        let nextX = x + dx;
        let nextY = y + dy;

        if (grid[nextY]?.[nextX] === '#') {
            currentDirection = nextDirection;
        } else {
            x = nextX;
            y = nextY;
        }
    }
};


const getAllCombinationsOfPuzzle = (grid: string[][], startPosition: [number, number]) => {
    const grids = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if ((i === startPosition[1] && j === startPosition[0]) ||
                (grid[i][j] === '#')) continue;

            const newGrid = grid.map(row => [...row]);
            newGrid[i][j] = '#';
            grids.push(newGrid);
        }
    }

    return grids;
};

async function main() {
    const puzzle = getInput('input.txt');

    const { grid, startPosition, direction } = getGridFromPuzzle(puzzle);
    const grids = getAllCombinationsOfPuzzle(grid, startPosition);

    let loops = 0;

    for (const g of grids) {
        const visited = new Map<string, boolean>();
        const hasLoop = moveGuardOutOfGrid(g, startPosition, direction, visited);
        if (hasLoop) {
            loops++;
        }
    }
    
    console.log(loops)
}

void main();