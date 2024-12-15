import { getInput } from '../utils';

type Direction = '^' | '>' | 'v' | '<';

const DirectionsMap: Record<Direction, [number, number]> = {
    '^': [-1, 0],
    '>': [0, 1],
    'v': [1, 0],
    '<': [0, -1],
};

const parseLinesToInitState = (lines: string[]) => {
    const grid = [];
    const moves: Direction[] = [];
    let initRobotPosition: [number, number] | null = null;

    for (let y = 0; y < lines.length; y++) {
        const currentLine = lines[y].split('');
        if (currentLine[0] === '#') {
            grid.push(currentLine);

            if (!initRobotPosition) {
                for (let x = 0; x < currentLine.length; x++) {
                    if (currentLine[x] === '@') {
                        initRobotPosition = [y, x];
                    }
                }
            }
        } else {
            moves.push(...currentLine as Direction[]);
        }
    }

    return {
        grid,
        moves,
        initRobotPosition,
    }
}

const moveItems = (
    grid: string[][],
    startPosition: [number, number],
    dir: Direction,
)=> {
    const [dY, dX] = DirectionsMap[dir];
    let queue = [ [...startPosition] ];
    let moved = false;

    while (queue.length) {
        const [currY, currX] = queue.pop();
        const newY = currY + dY;
        const newX = currX + dX;
        const candidate = grid[newY]?.[newX];

        if (candidate === '.') {
            grid[startPosition[0]][startPosition[1]] = '.';
            grid[newY][newX] = 'O';
            moved = true;
        }
        if (candidate === 'O') {
            queue.push([newY, newX]);
        }
    }

    return moved;
}

const moveRobotInGrid = (
    grid: string[][],
    startPosition: [number, number],
    moves: Direction[],
): void => {
    let currentCords = startPosition;

    for (let i = 0; i < moves.length; i++) {
        const currentMove = moves[i];
        const [dY, dX] = DirectionsMap[currentMove];
        const newY = currentCords[0] + dY;
        const newX = currentCords[1] + dX;
        const candidate = grid[newY]?.[newX];
        if (candidate === '#') continue;

        let canMoveRobot = true;
        if (candidate === 'O') {
            canMoveRobot = moveItems(grid, [newY, newX], currentMove);
        }
        if (canMoveRobot) {
            grid[currentCords[0]][currentCords[1]] = '.';
            grid[newY][newX] = '@';
            currentCords = [newY, newX];
        }
    }
}

const getBoxesCoordinates = (
    grid: string[][],
    cordsMap: Map<string, [number, number]>,
) => {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const current = grid[y][x];
            if (current === 'O') {
                cordsMap.set(`${y}-${x}`, [y, x]);
            }
        }
    }
}

async function main() {
    const lines = getInput('input.txt');
    const { grid, moves, initRobotPosition } = parseLinesToInitState(lines);
    moveRobotInGrid(grid, initRobotPosition, moves);
    const boxesCords = new Map<string, [number, number]>();
    getBoxesCoordinates(grid, boxesCords);

    let sum = 0;
    for (const [key, [y, x]] of boxesCords) {
        sum += ((100 * y) + x);
    }

    console.log(sum);
}

void main();
