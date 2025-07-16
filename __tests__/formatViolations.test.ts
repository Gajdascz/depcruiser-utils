import { describe, it, expect } from 'vitest';
import { formatViolations } from '../src/formatViolations';

describe('formatViolations', () => {
  const sampleViolations = [
    {
      from: 'src/a.ts',
      to: 'src/b.ts',
      type: 'forbidden',
      rule: { severity: 'error', name: 'no-circular' }
    },
    {
      from: 'src/c.ts',
      to: 'src/d.ts',
      type: 'allowed',
      rule: { severity: 'warn', name: 'no-foo' }
    }
  ];

  it('formats violations with default icons', () => {
    const result = formatViolations(sampleViolations);
    expect(result).toContain('[🚨] 2 Dependency Violations');
    expect(result).toContain(
      '[❌] forbidden from src/a.ts to src/b.ts (error: no-circular)'
    );
    expect(result).toContain(
      '[❌] allowed from src/c.ts to src/d.ts (warn: no-foo)'
    );
  });

  it('formats violations with custom icons', () => {
    const result = formatViolations(sampleViolations, {
      headerIcon: '🔥',
      violationIcon: '⚡'
    });
    expect(result).toContain('[🔥] 2 Dependency Violations');
    expect(result).toContain(
      '[⚡] forbidden from src/a.ts to src/b.ts (error: no-circular)'
    );
    expect(result).toContain(
      '[⚡] allowed from src/c.ts to src/d.ts (warn: no-foo)'
    );
  });

  it('formats empty violations array', () => {
    const result = formatViolations([]);
    expect(result).toBe('[🚨] 0 Dependency Violations\n');
  });

  it('formats with undefined violations argument', () => {
    const result = formatViolations();
    expect(result).toBe('[🚨] 0 Dependency Violations\n');
  });

  it('formats with empty options object', () => {
    const result = formatViolations(sampleViolations, {});
    expect(result).toContain('[🚨] 2 Dependency Violations');
    expect(result).toContain(
      '[❌] forbidden from src/a.ts to src/b.ts (error: no-circular)'
    );
  });
});
