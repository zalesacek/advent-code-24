import { getInput } from '../utils';

const isOutOfMatrix = (
    x: number,
    y: number, 
    matrix: string[][],
) => x < 0 || y < 0 || y >= matrix.length || x >= matrix[0].length

const getMatrix = (
    lines: string[],
    antennasMap: Map<string, [number, number][]>,
): string[][] => {
    const matrix = [];

    for (let l = 0; l < lines.length; l++) {
        const arr = lines[l].split('');
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== '.') {
                antennasMap.set(
                    arr[i],
                    [
                        ...(antennasMap.get(arr[i]) || []),
                        [l, i],
                    ]
                );
            }
        }
        matrix.push(arr);
    }

    return matrix;
}


async function main() {
    const lines = getInput('input.txt');
    const antennasMap = new Map<string, [number, number][]>();
    const matrix = getMatrix(lines, antennasMap);
    const candidates = [];

    for (const [key, value] of antennasMap) {
        for (let j = 0; j < value.length - 1; j++) {
            const [ y1, x1 ] = value[j];
            for (let i = j + 1; i < value.length; i++) {
                const [ y2, x2 ] = value[i];
                const resY = Math.abs(y1 - y2);
                const resX = Math.abs(x1 - x2);
                if (x1 < x2) {
                    candidates.push([ [y1 - resY, x1 - resX], [y2 + resY, x2 + resX] ]);
                } else {
                    candidates.push([ [y1 - resY, x1 + resX], [y2 + resY, x2 - resX] ]);
                }

            }
        }
    }

    let sum = 0;

    for (let j = 0; j < candidates.length; j++) {
       const [ [y1, x1], [y2, x2] ] = candidates[j];

       if (!isOutOfMatrix(x1, y1, matrix) && matrix[y1][x1] !== '#') {
           matrix[y1][x1] = '#';
           sum++;
       }
       if (!isOutOfMatrix(x2, y2, matrix) && matrix[y2][x2] !== '#') {
           matrix[y2][x2] = '#';
           sum++;
       }
    }

    console.log(sum)
}

void main();


// a : [ [x4, y3], [x5, y5] ] -> [ [x3, y1], [x6, y7] ]

// 1, 3 ... 2,0 ... 6,2 ... 7,6

// [ 3, 4 ] [ 4, 8 ]  <
// [ 3, 4 ] [ 5, 5 ]  <
// [ 4, 8 ] [ 5, 5 ]  >
