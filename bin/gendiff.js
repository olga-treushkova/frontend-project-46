#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

// program
//   .description('Compares two configuration files and shows a difference.')
//   .version('0.01')
//   .option('-f, --format <type>', 'output format', 'stylish')
//   // .argument('<filepath1>', 'required file path to get diff')
//   // .argument('<filepath2>', 'required file path to get diff')
//   // .action((filepath1, filepath2) => {
//   //   console.log(genDiff(filepath1, filepath2, program.opts().format));
//   // });
// program.parse();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  // .option('-V, --version', 'output the version number')
  // .option('-h, --help', 'output usage information');
  .helpOption('-h, --help', 'output usage information');
program.parse();

// if (program.opts().help) {
//   program.outputHelp();
// }
