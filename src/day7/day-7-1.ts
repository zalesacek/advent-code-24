import { getInput } from '../utils';

type Equatation = {
    target: number;
    numbers: number[];
};

const getEquatations = (lines: string[]): Equatation[] => {
    const equatations: Equatation[] = [];

    for (const line of lines) {
        const [target, numbersString] = line.split(': ');
        const numbers = numbersString.split(' ').map(Number);
        equatations.push({
            target: +target,
            numbers,
        });
    }

    return equatations;
}

function canEquatationReachTarget({ target, numbers }: Equatation): boolean {
    function helper(currentValue: number, depth: number): boolean {
        if (depth >= numbers.length) return currentValue === target;
        const leftValue = currentValue * numbers[depth];
        const rightValue = currentValue + numbers[depth];
        return helper(leftValue, depth + 1) || helper(rightValue, depth + 1);
    }
    return helper(numbers[0], 1);
}

async function main() {
    const lines = getInput('input.txt'); 
    const equatations = getEquatations(lines);

    let sum = 0;

    for (const e of equatations) {
        if (canEquatationReachTarget(e)) {
            sum += e.target;
        }
    }

    console.log(sum)
}

void main();

//     10
//  190  29

//             81
//     3240           121
// 87480  3267    3267   148