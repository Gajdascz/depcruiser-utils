import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as runModule from '../src/run.js';
import * as formatModule from '../src/formatViolations.js';
import { validate } from '../src/validate.js';

describe('validate', () => {
  const mockRun = vi.spyOn(runModule, 'run');
  const mockFormat = vi.spyOn(formatModule, 'formatViolations');
  const mockLog = vi.spyOn(console, 'log').mockImplementation(() => {
    return;
  });
  const mockError = vi.spyOn(console, 'error').mockImplementation(() => {
    return;
  });
  const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => {
    throw new Error('process.exit called');
  });

  const opts = { scanPathPattern: 'src/**/*.ts', configPath: 'depcruise.json' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('logs and returns violations when present (returnResult)', () => {
    const violations = [
      {
        from: 'a',
        to: 'b',
        type: 'forbidden',
        rule: { severity: 'error', name: 'no-forbidden-imports' }
      }
    ];
    mockRun.mockReturnValue(Buffer.from(JSON.stringify({ violations })));
    mockFormat.mockReturnValue('formatted violations');

    const result = validate(opts, 'returnResult');
    expect(mockLog).toHaveBeenCalledWith('🕵️ Validating dependencies...');
    expect(mockRun).toHaveBeenCalled();
    expect(mockFormat).toHaveBeenCalledWith(violations);
    expect(mockError).toHaveBeenCalledWith('formatted violations');
    expect(result).toEqual({ violations });
    expect(mockExit).not.toHaveBeenCalled();
  });

  it('logs, errors, and exits when violations and endBehavior is exitProcess', () => {
    const violations = [
      {
        from: 'a',
        to: 'b',
        type: 'forbidden',
        rule: { severity: 'error', name: 'no-forbidden-imports' }
      }
    ];
    mockRun.mockReturnValue(Buffer.from(JSON.stringify({ violations })));
    mockFormat.mockReturnValue('formatted violations');

    expect(() => validate(opts, 'exitProcess')).toThrow('process.exit called');
    expect(mockLog).toHaveBeenCalledWith('🕵️ Validating dependencies...');
    expect(mockFormat).toHaveBeenCalledWith(violations);
    expect(mockError).toHaveBeenCalledWith('formatted violations');
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('logs and returns empty violations when none found', () => {
    mockRun.mockReturnValue(Buffer.from(JSON.stringify({ violations: [] })));

    const result = validate(opts, 'returnResult');
    expect(mockLog).toHaveBeenCalledWith('🕵️ Validating dependencies...');
    expect(mockLog).toHaveBeenCalledWith(
      '✅ No dependency violations found.\n'
    );
    expect(result).toEqual({ violations: [] });
    expect(mockError).not.toHaveBeenCalled();
    expect(mockExit).not.toHaveBeenCalled();
  });

  it('handles missing violations property in result', () => {
    mockRun.mockReturnValue(Buffer.from(JSON.stringify({})));

    const result = validate(opts, 'returnResult');
    expect(result).toEqual({ violations: [] });
    expect(mockLog).toHaveBeenCalledWith(
      '✅ No dependency violations found.\n'
    );
  });
});
