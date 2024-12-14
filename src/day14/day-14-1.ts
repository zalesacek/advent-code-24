import { getInput } from '../utils';

type Direction = 'up' | 'down' | 'left' | 'right';

type Robot = {
    id: number;
    x: number;
    y: number;
    vX: number;
    vY: number;
    dX: Direction;
    dY: Direction;
}

const createGrid = (rows: number, columns: number): string[][] => {
    const grid: string[][] = [];
    for (let i = 0; i < rows; i++) {
        const row: string[] = new Array(columns).fill('.');
        grid.push(row);
    }
    return grid;
}

const getRobots = (lines: string[]) => {
    const robots = [];

    for (let i = 0; i < lines.length; i++) {
        const [posString, velString] = lines[i].split(' ');
        const [pS, posValuesString] = posString.split('=');
        const [vS, velValuesString] = velString.split('=');
        const [pX, pY] = posValuesString.split(',');
        const [vX, vY] = velValuesString.split(',');
        const dX = +vX > 0 ? 'right' : 'left';
        const dY = +vY > 0 ? 'down' : 'top';
        robots.push({
            x: +pX,
            y: +pY,
            vX: +vX,
            vY: +vY,
            dX,
            dY,
        })
    }

    return robots;
}

const getRobotDestination = (robot: Robot, steps: number, grid: string[][]) => {
    let remaining = steps;
    let queue = [ [robot.y, robot.x] ]
    const { vX, vY } = robot;

    while (remaining > 0) {
        const [currentY, currentX] = queue.pop();

        let newY = currentY + vY;
        let newX = currentX + vX;

        if (newY < 0 || newY >= grid.length) {
            newY = Math.abs(grid.length - Math.abs(newY));
        }
        if (newX < 0 || newX >= grid[0].length) {
            newX = Math.abs(grid[0].length - Math.abs(newX));
        }

        remaining--;
        queue.push([newY, newX]);
    }

    return queue[0];
}

const getFinalGrid = (
    robotsFinalDestinations: [number, number][],
    robotMap: Map<string, number>,
    grid: string[][],
) => {
    for (const robot of robotsFinalDestinations) {
        const [y, x] = robot;
        const key = `${y}-${x}`;
        if (robotMap.has(key)) {
            const currentCount = robotMap.get(key);
            robotMap.set(key, currentCount + 1);
            grid[y][x] = String(currentCount + 1);
        } else {
            robotMap.set(key, 1);
            grid[y][x] = '1';
        }
    }
}

const getQuadrantsCount = (grid: string[][]) => {
    const bannedX = Math.floor(grid[0].length / 2); // 5
    const bannedY = Math.floor(grid.length / 2); // 3

    const topLeft = [];
    const topRight = [];
    const bottomLeft = [];
    const bottomRight = [];

    for (let y = 0; y < grid.length; y++) {
        if (y === bannedY) continue;

        for (let x = 0; x < grid[0].length; x++) {
            if (x === bannedX) continue;
            if (isNaN(+grid[y][x])) continue;

            if (y < bannedY && x < bannedX) {
                topLeft.push(+grid[y][x]);
            } else if (y < bannedY && x > bannedX) {
                topRight.push(+grid[y][x]);
            } else if (y > bannedY && x < bannedX) {
                bottomLeft.push(+grid[y][x]);
            } else if (y > bannedY && x > bannedX) {
                bottomRight.push(+grid[y][x]);
            }
        }
    }

    return [
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
    ];
}

async function main() {
    const lines = getInput('input.txt');
    const grid = createGrid(103, 101);
    const robots = getRobots(lines);

    const robotsFinalDestinations = [];
    for (const robot of robots) {
        const dest = getRobotDestination(robot, 100, grid);
        robotsFinalDestinations.push(dest);
    }

    const robotMap = new Map<string, number>();
    getFinalGrid(robotsFinalDestinations, robotMap, grid);
    const quadrantsCount = getQuadrantsCount(grid);

    let sum;
    for (const quadrant of quadrantsCount) {
        const robotsCount = quadrant.reduce((acc, val) => acc + val, 0);
        if (sum) {
            sum *= robotsCount;
        } else {
            sum = robotsCount;
        }
    }
    console.log(sum);
}

void main();
