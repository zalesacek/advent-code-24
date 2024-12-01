import { getInput } from '../utils';

async function main() {
    const lines = getInput('input.txt');
    const listLeft: number[] = [];
    const appeareces = new Map<number, number>();

    for (const line of lines) {
        const [left, right] = line.split('   ');
        const rightAsNumber = parseInt(right);
        listLeft.push(parseInt(left));
        appeareces.set(rightAsNumber, (appeareces.get(rightAsNumber) || 0) + 1 );
    }

    const similaryScore: number[] = [];
    for (const value of listLeft) {
        if (appeareces.has(value)) {
            const fromRightList = appeareces.get(value);
            similaryScore.push(value * fromRightList);
        }
    }

    const sum = similaryScore.reduce((acc, x) => acc + x, 0);
    console.log(sum);
}

void main();