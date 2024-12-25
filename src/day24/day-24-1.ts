import { getInput } from '../utils';

const operationTypes = ['AND', 'OR', 'XOR'] as const;

type OperationType = typeof operationTypes[number];

type Operation = {
    left: string;
    operation: OperationType;
    right: string;
    result: string;
}

const getInitGatesInputs = (lines: string[]) => {
    const initGatesMap = new Map<string, number>();
    const operations: Operation[] = [];

    for (const line of lines) {
        if (line.includes(': ')) {
            const [gate, value] = line.split(': ');
            initGatesMap.set(gate, +value);
        } else {
            const [left, operation, right, _, result] = line.split(' ');
            operations.push({
                left,
                right,
                operation: operation as OperationType,
                result,
            });
        }
    }

    return {
        initGatesMap,
        operations,
    };
}

const getResultValue = (left: number, right: number, operation: OperationType) => {
    switch (operation) {
        case 'AND':
            return left && right ? 1 : 0;
        case 'OR':
            return left || right ? 1 : 0;
        case 'XOR':
            return left ^ right ? 1 : 0;
    }
}

const fullfillMap = (
    initGatesMap: Map<string, number>,
    operations: Operation[],
) => {
    const results = new Map<string, number>();
    const queue = [ ...operations ];

    while (queue.length) {
        const current = queue.shift();
        const {
            left,
            operation,
            right,
            result,
        } = current;

        if (initGatesMap.has(left) && initGatesMap.has(right)) {
            const lV = initGatesMap.get(left);
            const rV = initGatesMap.get(right);
            const resV = getResultValue(lV, rV, operation);
            if (result[0] === 'z') {
                results.set(result, resV);
            }
            initGatesMap.set(result, resV);
        } else {
            queue.push(current);
        }
    }

    return results;
}

const sortMapBySignificance = (map: Map<string, number>) => new Map(
    Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]))
);

async function main() {
    const lines = getInput('input.txt');
    const { initGatesMap, operations } = getInitGatesInputs(lines);
    const result =  fullfillMap(initGatesMap, operations);
    const sortedMap = sortMapBySignificance(result);

    let binaryString = '';
    for (const [key, value] of sortedMap) {
        binaryString += value;
    }
    const decimal = parseInt(binaryString, 2)
    console.log(decimal);
}

void main();
