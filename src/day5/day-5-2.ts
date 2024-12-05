import { getInput } from '../utils';

type Page = {
    before: number[];
    after: number[];
}

type OrderRules = Map<number, Page>;

async function main() {
    const input = getInput('input.txt');

    const pages: OrderRules = new Map();
    const updates: number[][] = [];
    const incorrectUpdates = [];

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

        if (!isCorrect) {
            incorrectUpdates.push(update);
        }
    }

    const fixedIncorrectUpdates = [];
    for (const update of incorrectUpdates) {
        const sortedUpdate: number[] = [];
        const visited = new Set<number>();
        const visiting = new Set<number>();
    
        function dfs(page: number) {
            if (visited.has(page)) return;

            visiting.add(page);
            const beforePages = pages.get(page).before;
            for (const bPage of beforePages) {
                if (update.includes(bPage)) {
                    dfs(bPage);
                }
            }
        
            visiting.delete(page);
            visited.add(page);
            sortedUpdate.push(page);
        }
        
    
        for (const page of update) {
            if (visited.has(page)) continue;
            dfs(page);
        }
    
        sortedUpdate.reverse();
        fixedIncorrectUpdates.push(sortedUpdate);
    }

    let sum = 0;
    for (const update of fixedIncorrectUpdates) {
        sum += update[(update.length - 1 )/ 2];
    }

    console.log(sum)
}

void main();

// 75,47,61,53,29
// '75': { before: [97], after: [47, 61, 53, 29] }
// '47': { before: [97, 75], after: [53, 13, 61, 29] }
// '61': { before: [97, 47, 75], after: [13, 53, 29] }
// '53': { before: [47, 75, 61, 97], after: [29, 13] }
// '29': { before: [75, 97, 53, 61, 47], after: [13] }

// 75,97,47,61,53 => 97,75,47,61,53
// '75': { before: [97], after: [47, 61, 53, 29] }
// '97': { before: [], after: [ 13, 61, 47, 29, 53, 75 ] },
// '47': { before: [97, 75], after: [53, 13, 61, 29] }
// '61': { before: [97, 47, 75], after: [13, 53, 29] }
// '53': { before: [47, 75, 61, 97], after: [29, 13] }