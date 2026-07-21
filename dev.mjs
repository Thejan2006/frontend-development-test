import { spawn } from 'node:child_process';

const children = [];

const commands = [
  { label: 'backend', command: 'npm', args: ['run', 'dev', '--prefix', 'backend'] },
  { label: 'frontend', command: 'npm', args: ['run', 'dev', '--prefix', 'frontend'] }
];

const stopChildren = () => {
  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }
};

process.on('SIGINT', () => {
  stopChildren();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopChildren();
  process.exit(0);
});

for (const item of commands) {
  const child = spawn(item.command, item.args, {
    stdio: 'inherit',
    shell: true
  });

  children.push(child);

  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(${item.label} exited with code );
      stopChildren();
      process.exitCode = code;
    }
  });
}
