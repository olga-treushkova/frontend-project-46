#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
      const resolvedFile1 = path.resolve(process.cwd(), filepath1);
      const resolvedFile2 = path.resolve(process.cwd(), filepath2);

      if (!fs.existsSync(resolvedFile1) || !fs.existsSync(resolvedFile2)) {
          console.error(`Один из файлов не найден: ${resolvedFile1} или ${resolvedFile2}`);
          process.exit(1); 
      }

      const data1 = parseJsonFile(resolvedFile1);
      const data2 = parseJsonFile(resolvedFile2);

      const diff = genDiff(data1, data2, options.format);
      console.log(diff);
  });
  
export function parseJsonFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Ошибка при чтении или парсинге файла: ${filePath}`);
        console.error(error.message);
        process.exit(1);
    }
}

export function genDiff(obj1, obj2, format) {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
    const diffLines = [];

    keys.forEach((key) => {
        if (!_.has(obj1, key)) {
            diffLines.push(`  + ${key}: ${obj2[key]}`);
        } else if (!_.has(obj2, key)) {
            diffLines.push(`  - ${key}: ${obj1[key]}`);
        } else if (!_.isEqual(obj1[key], obj2[key])) {
            diffLines.push(`  - ${key}: ${obj1[key]}`);
            diffLines.push(`  + ${key}: ${obj2[key]}`);
        } else {
            diffLines.push(`    ${key}: ${obj1[key]}`);
        }
    });

    return `{\n${diffLines.join('\n')}\n}`;
}

program.parse(process.argv);
