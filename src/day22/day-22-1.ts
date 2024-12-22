import { getInput } from '../utils';

const multiply = (secretNumber: number, multiplier: number) =>
    secretNumber * multiplier;

const mix = (a: number, b: number) => ((a >>> 0) ^ (b >>> 0)) >>> 0;

const prune = (secretNumber: number, pruner: number) =>
    secretNumber % pruner;

const divider = (secretNumber: number, divider: number) =>
    secretNumber / divider;

const memoizedValues = new Map<number, number>();

const generateNewSecretStep1 = (secretNumber: number) => {
    const multiplied = multiply(secretNumber, 64);
    const mixed = mix(multiplied, secretNumber);
    return prune(mixed, 16777216);
}

const generateNewSecretStep2 = (secretNumber: number) => {
    const divided = Math.floor(divider(secretNumber, 32));
    const mixed = mix(divided, secretNumber);
    return prune(mixed, 16777216);
}

const generateNewSecretStep3 = (secretNumber: number) => {
    const multiplied = multiply(secretNumber, 2048);
    const mixed = mix(multiplied, secretNumber);
    return prune(mixed, 16777216);
}

const getNextSecretNumber = (secretNumber: number) => {
    if (memoizedValues.has(secretNumber)) return memoizedValues.get(secretNumber);
    const step1 = generateNewSecretStep1(secretNumber);
    const step2 = generateNewSecretStep2(step1);
    const step3 = generateNewSecretStep3(step2);
    memoizedValues.set(secretNumber, step3);
    return step3;
}

const getNthSecretNumber = (secretNumber: number, nth: number) => {
    let temp = secretNumber;

    for (let i = 0; i < nth; i++) {
        temp = getNextSecretNumber(temp);
    }

    return temp;
}

async function main() {
    const numbers = getInput('input.txt').map(Number);
    let sum = 0;
    for (const num of numbers) {
        const res = getNthSecretNumber(num, 2000);
        sum += res;
    }

    console.log(sum);
}

void main();
