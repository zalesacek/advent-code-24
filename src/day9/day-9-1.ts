import { getInput } from '../utils';

const getPairs = (numbersArr: number[]) => { // numbersArr: 1,2,3,4,5
    const result = [];
    for (let i = 0; i < numbersArr.length; i++) {
        const pair = [numbersArr[i], numbersArr[i + 1] || 0];
        result.push(pair);
        i++;
    }
    return result;
}

const transformPairs = (numbersArr: [number, number][]) => {
    // numbersArr: [ [1, 2], [3,4], [5, 0] ]
    const result = [];
    for (let i = 0; i < numbersArr.length; i++) {
        const [ blockFile, freeSpace ] = numbersArr[i]; // [1, 2]
        result.push(...Array(blockFile).fill(i));
        result.push(...Array(freeSpace).fill('.'));
    }
    return result;
}

const moveFreeSpace = (numbersArr: string[]) => { // 0..111....22222
    let result = [...numbersArr];
    let start = 0;
    let end = numbersArr.length - 1;

    while (start < end) {
        // 1st -> 0..111....22222  0 - 2 -> . 2
        const left = result[start];
        const right = result[end];
        if (left !== '.') {
            start++;
        }
        if (right === '.') {
            end--;
        }
        if (left === '.' && right !== '.') {
            [result[start], result[end]] = [result[end], result[start]];
            start++;
            end--;
        }
    }

    return result; // 022111222......
}

async function main() {
    const lines = getInput('input.txt');
    const inputArray = lines.split('').map(Number);
    const pairs = getPairs(inputArray); // pairs = [ [1, 2], [3,4], [5, 0] ]
    const transformedArray = transformPairs(pairs); // transformedArray = 0..111....22222
    const sorted = moveFreeSpace(transformedArray);

    let sum = 0;
    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i] === '.') continue;
        sum += i * parseInt(sorted[i]);
    }

    console.log(sum);
}

void main();

// 12345 -> 12 34 5
// 0..111....22222