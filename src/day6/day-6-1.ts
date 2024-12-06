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
    startPosition: [number, number] | null,
    direction: Direction,
    visited: Map<string, boolean>
): void => {
    let currentDirection = direction;
    let nextStep = [startPosition];

    while (nextStep.length) {
        const [x, y] = nextStep.pop()!;

        visited.set(`${x}-${y}`, true);

        const [dx, dy, nextDirection] = directionsMap[currentDirection];
        let nextX = x + dx;
        let nextY = y + dy;

        if (!grid[nextY]?.[nextX]) return;

        const candidate = grid[nextY][nextX];

        if (candidate === '#') {
            currentDirection = nextDirection;
            const [newDx, newDy] = directionsMap[currentDirection];
            nextX = x + newDx;
            nextY = y + newDy;
            if (!grid[nextY]?.[nextX]) return; 
        }

        nextStep.push([nextX, nextY]);
    }
};


async function main() {
    const puzzle = getInput('test.txt');
    const { grid, startPosition, direction } = getGridFromPuzzle(puzzle);
    const visited = new Map<string, boolean>();
    moveGuardOutOfGrid(grid, startPosition, direction, visited);
    console.log(visited.size)
}

void main();