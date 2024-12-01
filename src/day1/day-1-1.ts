import { getInput } from '../utils';

async function main() {
    const lines = getInput('input.txt');
    const listLeft: number[] = [];
    const listRight: number[] = [];

    for (const line of lines) {
        const [left, right] = line.split('   ');
        listLeft.push(parseInt(left));
        listRight.push(parseInt(right))
    }

    listLeft.sort((a, b) => a - b);
    listRight.sort((a, b) => a - b);

    const distances: number[] = [];
    for (let i = 0; i < listRight.length; i++) {
        const left = listLeft[i];
        const right = listRight[i];
        distances.push(Math.abs(left - right));
    }

    const sum = distances.reduce((acc, x) => acc + x, 0);

    console.log(sum);
}

void main();