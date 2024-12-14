import { getInput } from '../utils';

type Cords = {
    x: number;
    y: number;
}

type Machine = {
    id: number;
    btnA: Cords;
    btnB: Cords;
    prize: Cords;
}

const parseInputLine = (line: string) => {
    const stringArray = line.split(' ');

    if (stringArray[0] === 'Button') {
        const [ _, type, xOffset, yOffset ] = stringArray;
        const valueType = type[0] === 'A' ? 'btnA' : 'btnB';
        const xCord = xOffset.split('+')[1].slice(0, xOffset.length - 3);
        const yCord = yOffset.split('+')[1];
        return {
            valueType,
            xCord: +xCord,
            yCord: +yCord,
        }
    }

    const [ _, xOffset, yOffset ] = stringArray;
    const xCord = xOffset.split('=')[1].slice(0, xOffset.length - 3);
    const yCord = yOffset.split('=')[1];
    return {
        valueType: 'prize',
        xCord: +xCord,
        yCord: +yCord,
    }
}

const getMachines = (lines: string[]): Machine[] => {
    const machines: Machine[] = [];
    let temp = {} as Machine;

    for (let i = 0; i < lines.length; i++) {
        const curr = lines[i];
        const { valueType, xCord, yCord } = parseInputLine(curr);

        if (valueType === 'prize') {
            temp.prize = { x: xCord + 10000000000000, y: yCord + 10000000000000 };
            machines.push(temp);
            temp = {} as Machine;
        } else if (valueType === 'btnA') {
            temp.id = machines.length + 1;
            temp.btnA = { x: xCord, y: yCord };
        } else if (valueType === 'btnB') {
            temp.btnB = { x: xCord, y: yCord };
        }
    }

    return machines;
}

const checkMachineSteps = ({
    id,
    btnA,
    btnB,
    prize,
}: Machine) => {
    // prize.X = (m1 * btnA.x) + (n1 * btnB.x) => 8400 = (m1*94) + (n1*22) => 8400 = (80*94) + (40*22)
    // prize.Y = (m2 * btnA.y) + (n2 * btnB.y) => 5400 = (m2*34) + (n2*67) => 5400 = (80*34) + (40*67)
    // Math.min(m1, m2) = 80
    // Math.min(n1, n2) = 40
    // return { a: 80, b: 40 }

    const determinant = btnA.x * btnB.y - btnA.y * btnB.x;
    if (determinant === 0) return null;

    const m = (prize.x * btnB.y - prize.y * btnB.x) / determinant;
    const n = (btnA.x * prize.y - btnA.y * prize.x) / determinant;

    if (m >= 0 && n >= 0 && Number.isInteger(m) && Number.isInteger(n)) {
        return { aSteps: m, bSteps: n };
    }

    return null;
}

async function main() {
    const lines = getInput('input.txt');
    const machines = getMachines(lines);

    let sum = 0;
    for (const m of machines) {
        const res = checkMachineSteps(m);
        if (res) {
            const { aSteps, bSteps } = res;
            sum += aSteps * 3;
            sum += bSteps;
        }
    }

    console.log(sum);
}

void main();