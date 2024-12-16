import { getInput } from '../utils';

type Direction = 'top' | 'right' | 'bottom' | 'left';

const DirectionsMap: Record<Direction, [number, number]> = {
    'top': [-1, 0],
    'right': [0, 1],
    'bottom': [1, 0],
    'left': [0, -1],
};

const TurnsToScore: Record<string, number> = {
    'top-top': 1,
    'top-right': 1001,
    'top-bottom': 2001,
    'top-left': 1001,
    'right-top': 1001,
    'right-right': 1,
    'right-bottom': 1001,
    'right-left': 2001,
    'bottom-top': 2001,
    'bottom-right': 1001,
    'bottom-bottom': 1,
    'bottom-left': 1001,
    'left-top': 1001,
    'left-right': 2001,
    'left-bottom': 1001,
    'left-left': 1,
};

const parseLinesToInitState = (lines: string[]) => {
    const grid: string[][] = [];
    let startPosition: [number, number] | null = null;
    let endPosition: [number, number] | null = null;

    for (let y = 0; y < lines.length; y++) {
        const currentLine = lines[y].split('');
        grid.push(currentLine);
        for (let x = 0; x < currentLine.length; x++) {
            if (currentLine[x] === 'S') startPosition = [y, x];
            if (currentLine[x] === 'E') endPosition = [y, x];
        }
    }

    return {
        grid,
        startPosition: startPosition!,
        endPosition: endPosition!,
    };
};

const moveReindeerInGrid = (
    grid: string[][],
    direction: Direction,
    startPosition: [number, number],
    [endY, endX]: [number, number],
): number => {
    const queue: [number, number, Direction, number][] = [[...startPosition, direction, 0]];
    const visited = new Map<string, number>();
    let minScore = Infinity;

    while (queue.length) {
        const [currY, currX, currDir, currScore] = queue.shift();

        if (currY === endY && currX === endX) {
            minScore = Math.min(minScore, currScore);
            continue;
        }

        const key = `${currY}-${currX}-${currDir}`;
        if (visited.has(key) && visited.get(key)! <= currScore) continue;
        visited.set(key, currScore);

        for (const [nextDir, [dy, dx]] of Object.entries(DirectionsMap)) {
            const nextY = currY + dy;
            const nextX = currX + dx;

            if (grid[nextY][nextX] !== '#') {
                const turnScore = TurnsToScore[`${currDir}-${nextDir}`];
                queue.push([nextY, nextX, nextDir as Direction, currScore + turnScore]);
            }
        }
    }

    return minScore;
};

async function main() {
    const lines = getInput('input.txt');
    const { grid, startPosition, endPosition } = parseLinesToInitState(lines);
    const score = moveReindeerInGrid(grid, 'right', startPosition, endPosition);
    console.log(score);
}

void main();
