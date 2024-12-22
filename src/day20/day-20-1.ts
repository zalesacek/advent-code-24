import { getInput } from '../utils';

type Cords = {
    x: number;
    y: number;
}

const DirectionsMap = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
];

const getInitData = (lines: string[]) => {
    const grid = [];
    let startPosition: Cords | null = null;
    let endPosition: Cords | null = null;

    for (let y = 0; y < lines.length; y++) {
        const line = lines[y].split('');
        grid.push(line);

        if (!startPosition || !endPosition) {
            for (let x = 0; x < line.length; x++) {
                if (line[x] === 'S') startPosition = { x, y };
                if (line[x] === 'E') endPosition = { x, y };
            }
        }
    }

    return {
        grid,
        startPosition,
        endPosition,
    };
}

const isNotOutOfGrid = (grid: string[][], {x, y}: Cords) =>
    y >= 0 && y < grid.length && x >= 0 && x < grid[0].length && grid[y][x] !== '#';

const countPicoseconds = (grid: string[][], start: Cords, end: Cords) => {
    const queue: [Cords, number][] = [[start, 0]];
    const visited = new Set<string>();
    visited.add(`${start.x},${start.y}`);

    while (queue.length > 0) {
        const [current, steps] = queue.shift()!;

        if (current.x === end.x && current.y === end.y) return steps;

        for (const dir of DirectionsMap) {
            const next = { x: current.x + dir.x, y: current.y + dir.y };

            if (isNotOutOfGrid(grid, next) && !visited.has(`${next.x},${next.y}`)) {
                visited.add(`${next.x},${next.y}`);
                queue.push([next, steps + 1]);
            }
        }
    }

    return Infinity;
}

const getPicosecondsWithCheats = (grid: string[][], start: Cords, end: Cords) => {
    const originalTime = countPicoseconds(grid, start, end);
    const timesWithCheating = [];

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === '#') {
                grid[y][x] = '.';

                const newTime = countPicoseconds(grid, start, end);
                if (newTime < originalTime) {
                    timesWithCheating.push(originalTime - newTime);
                }

                grid[y][x] = '#';
            }
        }
    }

    return timesWithCheating;
}

async function main() {
    const lines = getInput('test.txt');
    const { grid, startPosition, endPosition } = getInitData(lines);
    const picosecondsWithCheats = getPicosecondsWithCheats(grid, startPosition, endPosition);
    const result = picosecondsWithCheats.filter(saving => saving >= 100).length;
    console.log(result);
}

void main();
