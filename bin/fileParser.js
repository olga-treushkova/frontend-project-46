// fileParser.js
import fs from 'fs';

export function readFileSync(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

export function parseJsonFile(filePath) {
    const fileContent = readFileSync(filePath);
    return JSON.parse(fileContent);
}
