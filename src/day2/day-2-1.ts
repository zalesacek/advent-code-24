import { getInput } from '../utils';

const getReports = (lines: string[]): number[][] => {
    const reports = [];

    for (const line of lines) {
        const values = line.split(' ');
        reports.push([...values.map(v => +v)]);
    }

    return reports;
}

const checkReport = (report: number[]): boolean => {
    let isIncreasing = report[0] < report[1];

    for (let i = 1; i < report.length; i++) {
        const diff = Math.abs(report[i - 1] - report[i]);
        const order = report[i - 1] < report[i];
        if (diff < 1 || diff > 3 || isIncreasing !== order) {
            return false;
        }
    }

    return true;
}

async function main() {
    const lines = getInput('input.txt');
    const reports = getReports(lines);
    const areReportsSafe = reports.map(checkReport);
    const safeReportsCount = areReportsSafe.filter(Boolean).length;
    console.log(safeReportsCount);
}

void main();