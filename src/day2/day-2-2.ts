import { getInput } from '../utils';

const getReports = (lines: string[]) => {
    const reports = [];

    for (const line of lines) {
        const values = line.split(' ');
        const report = [];
        const base = [...values.map(v => +v)];
        report.push(base);

        for (let i = 0; i < base.length; i++) {
            let copy = [...base];
            copy.splice(i, 1);
            report.push(copy);
        }

        reports.push(report);
    }

    return reports;
}

const checkReport = (report: number[]): boolean => {
    let isIncreasing = report[0] < report[1];

    for (let i = 1; i < report.length; i++) {
        const diff = Math.abs(report[i - 1] - report[i]);
        const order = report[i - 1] < report[i];
        
        if (diff < 1 || diff > 3 || isIncreasing !== order) return false;
    }

    return true;
}

const checkReports = (reports: number[][]) => {
    for (const report of reports) {
       const isValidReport = checkReport(report);
       if (isValidReport) return true;
    }
    
    return false;
}

async function main() {
    const lines = getInput('input.txt');
    const reports = getReports(lines);
    const areReportsSafe = reports.map(checkReports);
    const safeReportsCount = areReportsSafe.filter(Boolean).length;
    console.log(safeReportsCount);
}

void main();