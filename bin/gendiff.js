#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import { parseJsonFile } from './fileParser.js'; 
import fs from 'fs';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
  
      const resolvedFile1 = path.resolve(process.cwd(), filepath1);
      const resolvedFile2 = path.resolve(process.cwd(), filepath2);
  
      console.log(`Comparing ${resolvedFile1} and ${resolvedFile2}`);

      if (!fs.existsSync(resolvedFile1)) {
          console.error(`Файл не найден: ${resolvedFile1}`);
          process.exit(1); 
      }

      if (!fs.existsSync(resolvedFile2)) {
          console.error(`Файл не найден: ${resolvedFile2}`);
          process.exit(1); 
      }

      const data1 = parseJsonFile(resolvedFile1);
      const data2 = parseJsonFile(resolvedFile2);
  
      console.log('Содержимое файла 1:', data1);
      console.log('Содержимое файла 2:', data2);
    
  });

program.parse(process.argv);