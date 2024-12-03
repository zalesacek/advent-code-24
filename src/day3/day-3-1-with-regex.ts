import { getInput } from '../utils';

function tryParseNumber(value: string): number {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? NaN : parsed;
}

function parseMulInstruction(segment: string): [number, number] | null {
    const match = segment.match(/^mul\((\d{1,3}),(\d{1,3})\)$/);
    if (!match) return null;

    const left = tryParseNumber(match[1]);
    const right = tryParseNumber(match[2]);

    if (isNaN(left) || isNaN(right)) return null;

    return [left, right];
}

async function main() {
    // Disable '\n' splitter in getInput to get valid input
    const input = getInput('input.txt');

    const regex = /mul\(\d{1,3},\d{1,3}\)/g;
    const matches = input.match(regex) || [];

    let sum = 0;

    for (const match of matches) {
        const parsed = parseMulInstruction(match);
        if (parsed) {
            const [left, right] = parsed;
            sum += left * right;
        }
    }

    console.log("Sum:", sum);
}

void main();
