import fs from 'fs';

export function readFileSync(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error(`Ошибка при чтении файла: ${filePath}`);
        console.error(error.message);
        process.exit(1);
    }
}

export function parseJsonFile(filePath) {
    try {
        const fileContent = readFileSync(filePath);
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Ошибка при парсинге JSON файла: ${filePath}`);
        console.error(error.message);
        process.exit(1); 
    }
}

