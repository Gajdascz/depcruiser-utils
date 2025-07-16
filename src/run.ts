import { execSync } from 'node:child_process';

export const run = (command: string) => {
  console.log(`$ ${command}`);
  try {
    return execSync(command, { stdio: 'pipe' });
  } catch (error) {
    if (error instanceof Error)
      console.error(`❌ Error executing command: ${error.message}`);
    else console.error('❌ Error executing command:', error);
    process.exit(1);
  }
};
