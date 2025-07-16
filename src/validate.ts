import type { Result } from './types.js';
import { run } from './run.js';
import { formatViolations } from './formatViolations.js';

type EndBehavior = undefined | 'exitProcess' | 'returnResult';
interface ValidateOpts {
  scanPathPattern: string;
  configPath: string;
}
export function validate(
  { scanPathPattern, configPath }: ValidateOpts,
  endBehavior?: 'exitProcess'
): void;
export function validate(
  { scanPathPattern, configPath }: ValidateOpts,
  endBehavior: 'returnResult'
): Result;
export function validate(
  { scanPathPattern, configPath }: ValidateOpts,
  endBehavior?: EndBehavior
) {
  console.log('🕵️ Validating dependencies...');
  const output = run(
    `npx depcruise ${scanPathPattern} --config ${configPath} --output-type json`
  );
  const { violations = [] } = JSON.parse(output.toString()) as Result;
  if (violations.length > 0) {
    console.error(formatViolations(violations));
    if (endBehavior === 'exitProcess') process.exit(1);
    return { violations };
  } else {
    console.log('✅ No dependency violations found.\n');
    return { violations: [] };
  }
}
