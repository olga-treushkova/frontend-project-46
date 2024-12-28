#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
.version('1.0.0') 
.description('Compares two configuration files and shows a difference.')
.arguments('<filepath1> <filepath2>')
.option('-f, --format <type>', 'output format')
.action((filepath1, filepath2, options) => {
  console.log(`Comparing ${filepath1} and ${filepath2}`);
  if (options.format) {
      console.log(`Output format: ${options.format}`);
  } else {
      console.log('No output format specified.');
  }
});
program.parse();

