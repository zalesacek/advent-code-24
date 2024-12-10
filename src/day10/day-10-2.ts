import { getInput } from '../utils';

const directionsMap = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const getMatrix = (lines: string[]): {
    matrix: number[][],
    startPositions: [number, number][],
} => {
    const grid = [];
    const startPositions = [];

    for (let y = 0; y < lines.length; y++) {
        const currentLine = lines[y].split('').map(Number);
        grid.push(currentLine);

        for (let x = 0; x < currentLine.length; x++) {
            if (currentLine[x] === 0) {
                startPositions.push([y, x]);
            }
        }
    }

    return {
        matrix: grid,
        startPositions,
    };
}

const helper = (matrix: number[][], startPosition: [number, number]) => {
    let queue = [ startPosition ];
    let sum = 0;

    while (queue.length) {
        const [currentY, currentX ] = queue.pop();
        const currentValue = matrix[currentY][currentX];

        if (currentValue === 9) {
            sum++;
        } else {
            for (const [dy, dx] of directionsMap) {
                const newY = currentY + dy;
                const newX = currentX + dx;
            
                if (newY >= 0 && newY < matrix.length && newX >= 0 && newX < matrix[0].length) {
                    const candidateValue = matrix[newY][newX];
                    if (candidateValue - currentValue === 1) {
                        queue.push([newY, newX]);
                    }
                }
            }
        }
    }

    return sum;
}

async function main() {
    const lines = getInput('input.txt');
    const { matrix, startPositions } = getMatrix(lines);

    let totalSum = 0;
    for (const sp of startPositions) {
        totalSum += helper(matrix, sp);
    }

    console.log(totalSum)
}

void main();
