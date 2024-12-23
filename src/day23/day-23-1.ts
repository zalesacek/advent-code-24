import { getInput } from '../utils';

const getConnections = (lines: string[]) => {
    const connections = new Map<string, Set<string>>();

    for (const line of lines) {
        const [left, right] = line.split('-');
        if (!connections.has(left)) {
            connections.set(left, new Set());
        }
        if (!connections.has(right)) {
            connections.set(right, new Set());
        }
        connections.get(left).add(right);
        connections.get(right).add(left);
    }

    return connections;
}

const getThreesomes = (connections: Map<string, Set<string>>) => {
    const threesomes = new Set<string[]>();
    const existing = new Set();

    for (const [compId, pairs] of connections) {
        for (const pair1 of pairs) {
            for (const pair2 of pairs) {
                if (pair1 !== pair2 && connections.get(pair1).has(pair2)) {
                    const trio = [compId, pair1, pair2].sort();
                    const key = trio.join(',');
                    if (!existing.has(key)) {
                        threesomes.add(trio);
                        existing.add(key);
                    }
                }
            }
        }
    }

    return threesomes;
}

async function main() {
    const lines = getInput('input.txt');
    const connections = getConnections(lines);
    const threesomes = getThreesomes(connections);

    let sum = 0;

    for (const three of threesomes) {
        let hasChiefCandidate = false;
        for (const compId of three) {
            if (compId[0] === 't') {
                hasChiefCandidate = true;
            }
        }
        if (hasChiefCandidate) {
            sum++;
        }
    }

    console.log(sum);
}

void main();
