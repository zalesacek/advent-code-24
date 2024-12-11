import { getInput } from '../utils';

const getMapFromArray = (numArr: number[]): Map<number, number> => {
    const result = new Map<number, number>();
    for (const v of numArr) {
        result.set(v, (result.get(v) || 0) + 1);
    }
    return result;
}

const isEven = (input: string) => input.length % 2 === 0;

const halfNumber = (input: string) => {
    const middle = Math.floor(input.length / 2);
    const firstHalf = input.slice(0, middle);
    const secondHalf = input.slice(middle);
    return [+firstHalf, +secondHalf];
};
const cachedResults = new Map<number, number[]>();

const blink = (values: Map<number, number>): Map<number, number> => {
    const result = new Map<number, number>();

    for (const [key, value] of values) {
        const valAsString = key.toString();

        if (!cachedResults.has(key)) {
            let newValue: number[];

            if (key === 0) {
                newValue = [1];
            } else if (isEven(valAsString)) {
                const [num1, num2] = halfNumber(valAsString);
                newValue = [num1, num2];
            } else {
                newValue = [key * 2024];
            }

            cachedResults.set(key, newValue);
        }

        const newValue = cachedResults.get(key)!;
        for (const v of newValue) {
            result.set(v, (result.get(v) || 0) + value);
        }
    }

    return result;
};

const doBlinks = (values: Map<number, number>, count: number): Map<number, number> => {
    let temp = values;

    for (let i = 0; i < count; i++) {
        temp = blink(temp);
    }

    return temp;
};

async function main() {
    const lines = getInput('input.txt');
    const numberArray = lines.split(' ').map(Number);

    const initialMap = getMapFromArray(numberArray);
    const finalMap = doBlinks(initialMap, 75);

    const totalSum = Array.from(finalMap.values()).reduce((acc, val) => acc + val, 0);

    console.log(totalSum);
}

void main();