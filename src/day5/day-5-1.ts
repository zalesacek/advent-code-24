import { getInput } from '../utils';

type Page = {
    before: number[];
    after: number[];
}

type OrderRules = Map<number, Page>;

async function main() {
    const input = getInput('test.txt');

    const pages: OrderRules = new Map();
    const updates: number[][] = [];
    const correctUpdates = [];

    for (const rule of input) {
        const [left, right] = rule.split('|').map(Number);
        if (left && right) { 
            const existingLeft = pages.get(left);
            if (existingLeft) {
                pages.set(left, {
                    before: [...existingLeft.before],
                    after: [...existingLeft.after, right],
                })
            } else {
                pages.set(left, {
                    before: [],
                    after: [right],
                })
            }
            
            const existingRight = pages.get(right);
            if (existingRight) {
                pages.set(right, {
                    before: [...existingRight.before, left],
                    after: [...existingRight.after],
                })
            } else {
                pages.set(right, {
                    before: [left],
                    after: [],
                })
            }
        } else {
            updates.push(rule.split(',').map(Number));
        }
    }

    for (const update of updates) {
        let isCorrect = true;

        let lastBefore = null;

        for (const value of update) { 
            const page = pages.get(value);
            if (!lastBefore) {
                lastBefore = page.before;
                continue
            }

            if (lastBefore.includes(value)) { 
                isCorrect = false;
                break;
            } else {
                lastBefore = page.before;
            }
            
        }   

        if (isCorrect) {
            correctUpdates.push(update);
        }
    }

    let sum = 0;

    for (const update of correctUpdates) {
        sum += update[(update.length - 1 )/ 2];
    }

    console.log(sum)
}

void main();