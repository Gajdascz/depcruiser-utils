import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { run } from './run.js';
import path from 'node:path';

interface GenerateGraphOpts {
  srcPattern: string;
  configPath: string;
  writePath: string;
  graphSvgName?: string;
}
export function generateGraph({
  configPath,
  writePath,
  srcPattern,
  graphSvgName = 'graph'
}: GenerateGraphOpts) {
  console.log('📊 Generating dependency graph...');
  if (!existsSync(writePath)) mkdirSync(writePath, { recursive: true });

  const dotOutput = run(
    `npx depcruise ${srcPattern} --config ${configPath} --output-type dot`
  );
  const svgOutput = execSync('dot -T svg', { input: dotOutput }).toString();
  writeFileSync(path.join(writePath, graphSvgName + '.svg'), svgOutput);
  console.log(`✅ Dependency graph generated at ${writePath}.`);
}
