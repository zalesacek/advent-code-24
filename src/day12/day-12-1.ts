import { getInput } from '../utils';

type Island = {
    area: number;
    perimeter: number;
}

const directionsMap = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const visited = new Map<string, true>();
 
const exploreNeighboors = (grid: string[][], [startY, startX]: [number, number]) => {
    const currChar = grid[startY][startX];
    let area = 0;
    let perimeter = 0;
    let queue = [ [startY, startX] ];
    visited.set(`${startY}-${startX}`, true);

    while (queue.length) {
        const [currentY, currentX] = queue.pop();
        area++;

        for (const [dy, dx] of directionsMap) {
            const newY = currentY + dy;
            const newX = currentX + dx;
        
            if (newY >= 0 && newY < grid.length && newX >= 0 && newX < grid[0].length) {
                const candidateValue = grid[newY][newX];
                
                if (candidateValue === currChar) { 
                    if (!visited.has(`${newY}-${newX}`)) {
                        queue.push([newY, newX]);
                        visited.set(`${newY}-${newX}`, true);
                    }
                } else {
                    perimeter++;
                }
            } else {
                perimeter++;
            }
        }
    }

    return {
        area: area === 0 ? 1 : area,
        perimeter,
    };
}

const exploreGrid = (grid: string[][]) => {
    const islandsMap = new Map<string, Island>();

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const cordsKey = `${y}-${x}`;
            if (visited.has(cordsKey)) continue;
            const island = exploreNeighboors(grid, [y, x]);
            islandsMap.set(`${grid[y][x]}-${islandsMap.size + 1}`, island);
        }
    }

    return islandsMap;
}

async function main() {
    const lines = getInput('input.txt');
    const grid = lines.map(l => l.split(''));
    const islands = exploreGrid(grid);

    let totalSum = 0;
    for (let [key, { area, perimeter }] of islands) {
        totalSum += area*perimeter;
    }
    console.log(totalSum)
}

void main();