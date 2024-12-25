import { getInput } from '../utils';

const getKeysAndLocks = (sections: string[][]) => {
    const keys = [];
    const locks = [];

    for (const section of sections) {
        if (section[0] === '#####') {
            locks.push(section);
        } else if (section[0] === '.....') {
            keys.push(section);
        }
    }

    return {
        keys,
        locks,
    }
}

const getPinHeights = (entity: string[]) => {
    const heights = Array(entity[0].length).fill(entity.length - 1);

    for (let y = 0; y < entity.length; y++) {
        const current = entity[y].split('');

        for (let x = 0; x < current.length; x++) {
            if (current[x] === '.') {
                heights[x]--;
            }
        }
    }

    return heights;
}

async function main() {
    const sections = getInput('input.txt');
    const { keys, locks } = getKeysAndLocks(sections);
    const locksHeights = locks.map(getPinHeights);
    const keysHeights = keys.map(getPinHeights);
    let result = 0;
    for (const l of locksHeights) {
        for (const k of keysHeights) {
            let isValid = true;
            for (let i = 0; i < l.length; i++) {
                if (l[i] + k[i] > 5) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) {
                result++;
            }
        }
    }

    console.log(result);
}

void main();
