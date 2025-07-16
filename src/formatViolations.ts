import type { Violation } from './types.js';

export interface FormatViolationsOpts {
  headerIcon?: string;
  violationIcon?: string;
}
export const formatViolations = (
  violations: Violation[] = [],
  { headerIcon = '🚨', violationIcon = '❌' }: FormatViolationsOpts = {}
) => {
  const header = `[${headerIcon}] ${violations.length.toString()} Dependency Violations`;
  const violationsList = violations.reduce<string>(
    (acc, { from, rule, to, type }: Violation) => {
      const { severity, name } = rule;
      acc += `  [${violationIcon}] ${type} from ${from} to ${to} (${severity}: ${name})\n`;
      return acc;
    },
    ''
  );
  return `${header}\n${violationsList}`;
};
