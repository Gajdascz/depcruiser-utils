import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
vi.mock('node:child_process', () => {
  return { execSync: vi.fn() };
});
vi.mock('node:fs', () => {
  return { writeFileSync: vi.fn(), existsSync: vi.fn(), mkdirSync: vi.fn() };
});
import * as runModule from '../src/run.js';
import { generateGraph } from '../src/generateGraph.js';
import { execSync } from 'node:child_process';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';

describe('generateGraph', () => {
  const mockRun = vi.spyOn(runModule, 'run');
  const mockLog = vi.spyOn(console, 'log').mockImplementation(() => {
    return;
  });
  let mockExecSync;
  let mockWriteFileSync;
  let mockExistsSync;
  let mockMkdirSync;

  beforeEach(() => {
    vi.resetAllMocks();
    mockExecSync = vi.mocked(execSync);
    mockWriteFileSync = vi.mocked(writeFileSync);
    mockExistsSync = vi.mocked(existsSync);
    mockMkdirSync = vi.mocked(mkdirSync);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('creates output directory if it does not exist, runs depcruise, pipes to dot, writes SVG, and logs', () => {
    const opts = {
      srcPattern: 'src/**/*.ts',
      configPath: 'depcruise.json',
      writePath: 'out',
      graphSvgName: 'graph'
    };
    const fakeDot = Buffer.from('dot-output');
    const fakeSvg = '<svg>output</svg>';

    mockExistsSync.mockReturnValue(false);
    mockRun.mockReturnValue(fakeDot);
    mockExecSync.mockReturnValue({ toString: () => fakeSvg });

    generateGraph(opts);

    expect(mockExistsSync).toHaveBeenCalledWith('out');
    expect(mockMkdirSync).toHaveBeenCalledWith('out', { recursive: true });
    expect(mockLog).toHaveBeenCalledWith('📊 Generating dependency graph...');
    expect(mockRun).toHaveBeenCalledWith(
      'npx depcruise src/**/*.ts --config depcruise.json --output-type dot'
    );
    expect(mockExecSync).toHaveBeenCalledWith('dot -T svg', { input: fakeDot });
    expect(mockWriteFileSync).toHaveBeenCalledWith('out/graph.svg', fakeSvg);
    expect(mockLog).toHaveBeenCalledWith(
      '✅ Dependency graph generated at out.'
    );
  });

  it('does not create output directory if it exists', () => {
    const opts = {
      srcPattern: 'src/**/*.ts',
      configPath: 'depcruise.json',
      writePath: 'out',
      graphSvgName: 'graph'
    };
    const fakeDot = Buffer.from('dot-output');
    const fakeSvg = '<svg>output</svg>';

    mockExistsSync.mockReturnValue(true);
    mockRun.mockReturnValue(fakeDot);
    mockExecSync.mockReturnValue({ toString: () => fakeSvg });

    generateGraph(opts);

    expect(mockExistsSync).toHaveBeenCalledWith('out');
    expect(mockMkdirSync).not.toHaveBeenCalled();
    expect(mockWriteFileSync).toHaveBeenCalledWith('out/graph.svg', fakeSvg);
  });
});
