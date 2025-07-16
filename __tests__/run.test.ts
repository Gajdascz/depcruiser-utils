import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('node:child_process', () => ({ execSync: vi.fn() }));

import { run } from '../src/run.js';
import { execSync } from 'node:child_process';

describe('run', () => {
  const mockLog = vi.spyOn(console, 'log').mockImplementation(() => {});
  const mockError = vi.spyOn(console, 'error').mockImplementation(() => {
    return;
  });
  const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => {
    throw new Error('process.exit called');
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('calls execSync and returns its result', () => {
    (execSync as unknown as ReturnType<typeof vi.fn>).mockReturnValue('output');
    const result = run('echo test');
    expect(mockLog).toHaveBeenCalledWith('$ echo test');
    expect(execSync).toHaveBeenCalledWith('echo test', { stdio: 'pipe' });
    expect(result).toBe('output');
  });

  it('handles execSync error with Error instance', () => {
    (execSync as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => {
      throw Object.assign(new Error('fail!'), {});
    });
    expect(() => run('bad command')).toThrow();
    expect(mockLog).toHaveBeenCalledWith('$ bad command');
    expect(mockError).toHaveBeenCalledWith('❌ Error executing command: fail!');
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('handles execSync error with non-Error', () => {
    (execSync as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => {
      throw 'fail string' as unknown;
    });
    expect(() => run('bad command')).toThrow();
    expect(mockLog).toHaveBeenCalledWith('$ bad command');
    expect(mockError).toHaveBeenCalledWith(
      '❌ Error executing command:',
      'fail string'
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
