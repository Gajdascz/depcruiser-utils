# 🚢 depcruiser-utils

![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

A set of utilities for working with
[dependency-cruiser](https://github.com/sverweij/dependency-cruiser), including
validation and graph generation, with both CLI and programmatic APIs.

---

## Features

- **Validate** your codebase against dependency-cruiser rules.
- **Generate** SVG dependency graphs from your codebase.
- **Format** violations for readable output.
- **Programmatic API** for integration in scripts and tools.

---

## CLI

### Usage

```sh
depcruiser-utils <command> [options]
```

### Commands

- `validate` &nbsp;&nbsp;&nbsp;&nbsp;Validate dependencies against configuration
- `generate` &nbsp;&nbsp;&nbsp;&nbsp;Generate dependency graph SVG
- `help`
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show
  help

### Options

- `--scan <pattern>` &nbsp;&nbsp;&nbsp;&nbsp;Files to scan (default:
  `src/**/*.ts`)
- `--config <path>` &nbsp;&nbsp;&nbsp;&nbsp;Config file path (default:
  `.dep-cruiser.cjs`)
- `--output <path>` &nbsp;&nbsp;&nbsp;&nbsp;Graph output file path (default:
  `docs/dependencies/graph.svg`)

### Examples

```sh
depcruiser-utils validate
depcruiser-utils generate --output ./graph.svg
depcruiser-utils validate --scan "./lib/**/*"
```

---

## Programmatic API

You can use all features directly in Node.js:

```ts
import {
  validate,
  generateGraph,
  formatViolations,
  run,
  type ModuleDependency,
  type Module,
  type Violation,
  type Result,
  type FormatViolationsOpts
} from 'depcruiser-utils';
```

### `validate({ scanPathPattern, configPath }, endBehavior?)`

Validates your codebase using dependency-cruiser.

- **Parameters:**
  - `scanPathPattern` (string): Glob pattern for files to scan.
  - `configPath` (string): Path to dependency-cruiser config.
  - `endBehavior` (optional): `'exitProcess'` to exit on violations.

- **Returns:** `{ violations: Violation[] }`

---

### `generateGraph({ srcPattern, configPath, writePath })`

Generates a dependency graph SVG.

- **Parameters:**
  - `srcPattern` (string): Glob pattern for files to scan.
  - `configPath` (string): Path to dependency-cruiser config.
  - `writePath` (string): Output SVG file path.

---

### `formatViolations(violations, opts?)`

Formats violations for readable output.

- **Parameters:**
  - `violations` (Violation[]): List of violations.
  - `opts` (optional): Formatting options.

- **Returns:** `string`

---

### `run(command: string): Buffer`

Runs a shell command and returns the output as a Buffer.

---

### Types

- `ModuleDependency`
- `Module`
- `Violation`
- `Result`
- `FormatViolationsOpts`

---

## Requirements

- [dependency-cruiser](https://github.com/sverweij/dependency-cruiser)
  (installed automatically)
- [Graphviz](https://graphviz.gitlab.io/) (`dot` command) for SVG graph
  generation

---

## License

MIT – © 2025 [Nolan Gajdascz](https://github.com/gajdascz)

- [NPM](https://www.npmjs.com/gajdascz/depcruiser-utils)
- [GitHub](https://github.com/gajdascz/depcruiser-utils)
