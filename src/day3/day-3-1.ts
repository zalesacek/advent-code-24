import { getInput } from '../utils';

function tryParseValue(value?: string): string | number {
    const parsed = parseInt(value);
    return isNaN(parsed) ? value : parsed;
}


function isNumber(value?: string | number): value is number {
    return typeof value === 'number';
}

const expStart = 'mul(';

async function main() {
    // Disable '\n' splitter in getInput to get valid input
    const input = getInput('input.txt');
    const chars = input.split('');

    const list = [];
    let temp = [];
    let number = '';
    let isSaving = false;
    
    for (let i = 0; i < chars.length; i++) {
        const current = tryParseValue(chars[i]);

        if (isSaving) {
            if (isNumber(current)) {
                number += current.toString();
                continue;
            } else if (current === ',') {
                temp.push(number);
                number = '';
                continue;
            } else if (current === ')') {
                temp.push(number);
                list.push(temp);
            }

            number = '';
            temp = [];
            isSaving = false;
        }

        if (current === '(' && i >= 3) {
            const isValidMulStart = chars.slice(i - 3, i + 1).join('') === expStart;
            if (isValidMulStart) {
                isSaving = true;
            }
        }
    }

    let sum = 0;

    for (const [left, right] of list) {
        if (left && right) {
            sum += left * right;
        }
    }

    console.log(sum)
}

void main();