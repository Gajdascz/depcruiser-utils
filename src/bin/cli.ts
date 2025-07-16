#!/usr/bin/env node

import { validate, generateGraph } from '../index.js';
import path from 'node:path';

const DEFAULTS = {
  scan: path.join(process.cwd(), 'src/**/*.ts'),
  config: path.join(process.cwd(), '.dep-cruiser.cjs'),
  graphOutput: path.join(process.cwd(), 'docs/dependencies'),
  graphSvgName: 'graph'
};

function showHelp() {
  console.log(`
🚢 depcruiser-utils - Dependency Cruiser utilities

Usage:
  depcruiser-utils <command> [options]

Commands:
  validate    Validate dependencies against configuration
  generate    Generate dependency graph SVG
  help        Show this help

Options:
  --scan <pattern>     Files to scan (default: ${DEFAULTS.scan})
  --config <path>      Config file path (default: ${DEFAULTS.config})
  --output <path>      Graph Output file path (default: ${DEFAULTS.graphOutput})

Examples:
  depcruiser-utils validate
  depcruiser-utils generate --output ./graph.svg
  depcruiser-utils validate --scan "./lib/**/*"
`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const command = args[0];
  const options = { ...DEFAULTS };

  for (let i = 1; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];

    switch (flag) {
      case '--scan':
        options.scan = value ?? '';
        break;
      case '--config':
        options.config = value ?? '';
        break;
      case '--output':
        options.graphOutput = value ?? '';
        break;
    }
  }

  return { command, options };
}

function main() {
  const { command, options } = parseArgs();

  switch (command) {
    case 'validate':
      validate({ scanPathPattern: options.scan, configPath: options.config });
      break;
    case 'generate':
      generateGraph({
        srcPattern: options.scan,
        configPath: options.config,
        writePath: options.graphOutput,
        graphSvgName: options.graphSvgName
      });
      break;
    case 'help':
    case undefined:
      showHelp();
      break;
    default:
      console.error(`❌ Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

main();
